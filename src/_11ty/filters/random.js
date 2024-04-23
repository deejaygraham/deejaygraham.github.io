module.exports = function(array) {
  arrary.sort(() => {
    return 0.5 - Math.random();
  });
  return array.slice(0, 1);
}
