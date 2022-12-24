const checkValue = (required, value, type) => {
  const dataType = typeof value;
  if (required) {
    if (value) {
      if (type == dataType) return;
      return new Error('Type error');
    }
    return new Error('Value is required');
  } else {
    if (value) {
      if (type == dataType) return;
      return new Error('Type error');
    }
  }
};

module.exports = { checkValue };
