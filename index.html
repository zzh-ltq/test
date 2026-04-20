// 天天基金 API 代理函数
exports.handler = async (event) => {
  const { path, queryStringParameters } = event;

  // 提取实际 API 路径（去掉 /api 前缀）
  const apiPath = path.replace(/^\/api/, '');
  let targetUrl = `https://fund.eastmoney.com${apiPath}`;

  if (queryStringParameters && Object.keys(queryStringParameters).length) {
    const params = new URLSearchParams(queryStringParameters);
    targetUrl += `?${params.toString()}`;
  }

  // 伪造请求头，避免 302 重定向
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://fund.eastmoney.com/',
    'Accept': 'text/javascript, application/json, */*',
  };

  try {
    const response = await fetch(targetUrl, { headers });
    let text = await response.text();

    // 去除 JSONP 包裹（如 callback({...})）
    const jsonpMatch = text.match(/^[a-zA-Z0-9_]+\((.*)\);?$/);
    if (jsonpMatch) text = jsonpMatch[1];

    // 尝试解析 JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { error: 'Invalid JSON', preview: text.substring(0, 200) };
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Proxy failed', detail: err.message }),
    };
  }
};