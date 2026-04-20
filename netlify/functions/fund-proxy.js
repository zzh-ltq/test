exports.handler = async (event) => {
  // 从 event 中解构出路径和查询参数
  const { path, queryStringParameters } = event;

  // 去掉 /api 前缀，得到真实 API 路径（例如 /f10/FundNetReturnAnalysis.ashx）
  const apiPath = path.replace(/^\/api/, '');
  let targetUrl = `https://fund.eastmoney.com${apiPath}`;

  // 拼接查询参数
  if (queryStringParameters && Object.keys(queryStringParameters).length) {
    const params = new URLSearchParams(queryStringParameters);
    targetUrl += `?${params.toString()}`;
  }

  // 必须携带的请求头，模拟浏览器访问
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://fund.eastmoney.com/',
    'Accept': 'text/javascript, application/json, */*',
  };

  try {
    const response = await fetch(targetUrl, { headers });
    let text = await response.text();

    // 去除 JSONP 包裹（如 callback_123({...})）
    const jsonpMatch = text.match(/^[a-zA-Z0-9_]+\((.*)\);?$/);
    if (jsonpMatch) {
      text = jsonpMatch[1];
    }

    // 尝试解析为 JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      data = { error: 'Invalid JSON response', preview: text.substring(0, 200) };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('Proxy error:', err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Proxy request failed', detail: err.message }),
    };
  }
};
