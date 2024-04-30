module.exports = function(text) {
  const parts = text.split(' ');
  const lines = parts.reduce((prev, current) => {

    if (!prev.length) {
      return [current];
    }
  
    let lastOne = prev[prev.length - 1];

    if (lastOne.length + current.length > 19) {
      return [...prev, current];
    }

    prev[prev.length - 1] = lastOne + ' ' + current;

    return prev;
    }, []
  );

  return lines;
};