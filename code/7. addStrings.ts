// 大整数字符串相加

// 暴力翻转
function addStrings1(num1: string, num2: string): string {
  const reA = num1.split('').reverse()
  const reB = num2.split('').reverse()
  const n = Math.max(reA.length, reB.length)

  // 4321
  // 321
  let res: string[] = []
  let remain = 0
  for (let i = 0; i < n; i++) {
    if (i > 0 && remain > 0) {
      res[i] = `${remain}`
    }
    const n1 = +(reA[i] || 0)
    const n2 = +(reB[i] || 0)
    const sum = n1 + n2 + remain
    remain = Math.floor(sum / 10)
    res[i] = `${sum >= 10 ? sum % 10 : sum}`
  }

  return (remain ? '1' : '') + res.reverse().join('')
};

function addStrings(num1: string, num2: string): string {
  let i = num1.length - 1, j = num2.length - 1, remain = 0, res = ''

  while (i >= 0 || j >= 0) {
    const n1 = i >= 0 ? num1[i] : 0
    const n2 = j >= 0 ? num2[j] : 0
    const total = +n1 + +n2 + remain
    // 字符串拼接
    res = total % 10 + res
    remain = Math.floor(total / 10)
    i--; j--
  }

  return (remain ? '1' : '') + res
};

// 584
//  18
console.log(addStrings('1', '9')) // 10
console.log(addStrings('584', '18')) // 602
console.log(addStrings('456', '77')) // 533
