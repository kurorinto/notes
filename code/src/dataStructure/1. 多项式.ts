// f(x) = a0 + a1*x + ... + an*x^n
const fn1 = (n: number, a: number[], x: number): number => {
	let result = a[0];
	for (let i = 1; i <= n; i++) {
		result += a[i] * Math.pow(x, i);
	}
	return result;
};


// f(x) = a0 + x(a1 + x(...(an-1 + x*an)...))
const fn2 = (n: number, a: number[], x: number): number => {
  let result = a[0];
  for (let i = n; i > 0; i--) {
    result += a[i - 1] + x * a[i]
  }
  return result;
}

let start = Date.now();
fn1(100000000, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5], 1000000);
console.log('spent:', Date.now() - start);

start = Date.now();
fn2(100000000, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5], 1000000);
console.log('spent:', Date.now() - start);
export {}
