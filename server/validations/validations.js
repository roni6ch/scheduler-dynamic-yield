const checkValidation = params => {
  let validator = true;
    Object.keys(params).forEach((v, i) => {
    if (params[v] === "" || typeof params[v] === "undefined" || params[v] === null) validator = false;
  });
  return validator;
};
module.exports = {
    checkValidation
};
