

const createObjFrom2Ary = (a, b) => Object.fromEntries(
  a.map((_, i) => [a[i], b[i]])
);


const intersect = (a, b) => {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter(x => setB.has(x)));
  return Array.from(intersection);
};
module.exports = { createObjFrom2Ary, intersect };