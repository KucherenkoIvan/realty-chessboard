export function validateNumber(min, max, number) {
  return number <= max && number >= min;
}

export function validateKey(key, obj) {
  return key in Object.keys(obj);
}
