import User from '../models/User';

export default (request, response, next) => {
  const { params } = request;

  console.log(params);

  next();
};
