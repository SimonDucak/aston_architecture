export default {
  required(value) {
    return new String(value).length > 0;
  },
  minMaxString(value, params) {
    const string = new String(value);

    if (params.min >= 0 && string.length < params.min) return false;

    return !(params.max >= 0 && string.length > params.max);
  }
}
