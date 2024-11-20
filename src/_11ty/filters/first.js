export default function(array) {
  if (Array.isArray(array) && array.length > 0) {
    return array[0];
  }
  
  return null;
};
