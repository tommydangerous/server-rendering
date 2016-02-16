export default (string) => {
  const length = string.length;
  if (string.slice(length - 3, length) === 'ies') {
    return `${string.slice(0, length - 3)}y`;
  } else {
    return string.slice(0, length - 1);
  }
};
