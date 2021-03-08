export default (request, response, next) => {
  const { method, url, params, query, ip } = request;
  console.log(method, url, params, query, ip);

  next();
};
