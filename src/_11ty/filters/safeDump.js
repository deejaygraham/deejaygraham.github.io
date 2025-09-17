// safer dump filter without recursion
// usage: {{ post.date | safedump }}
// thanks to https://abdullahyahya.com/2022/08/11ty-ways-to-debug-data/
const dumpWithoutCircularity = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (key === 'templateContent') {
      return;
    }
    
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }  
      seen.add(value);
    }
    return value;
  };
};

export default function (obj) {
  return JSON.stringify(obj, dumpWithoutCircularity(), 4);
}
