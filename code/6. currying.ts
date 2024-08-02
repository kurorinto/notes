const sum = (...args1: number[]) => {
  const add = (...args2: number[]) => {
    return sum(...args2, ...args1);
  };

  add.sumOf = () => {
    return args1.reduce((acc, curr) => acc + curr, 0);
  };

  return add;
};

console.log(sum(1, 2).sumOf()); // 返回 3
console.log(sum(1, 2)(3).sumOf()); // 返回 6
console.log(sum(1)(2, 3, 4).sumOf()); // 返回 10
console.log(sum(1, 2)(3, 4)(5).sumOf()); // 返回 15
console.log(sum(1, 3, 2)(3, 4)(5)(6)(7).sumOf()); // 返回 31
