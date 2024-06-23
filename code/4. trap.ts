// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
// 如下图
// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png

// 示例 1：
// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 

// 示例 2：
// 输入：height = [4,2,0,3,2,5]
// 输出：9

// 提示：
// n == height.length
// 1 <= n <= 2 * 104
// 0 <= height[i] <= 105

// 1. 暴力法：遍历每个格子，找到左右两边最高的格子，得到当前这个格子能接的水的高度
function trap1(height: number[]): number {
  let ans = 0

  for (let i = 1; i < height.length - 1; i++) {
    // 找到左右两边最高的墙
    let rightMax = 0
    let leftMax = 0
    for (let r = 0; r < i; r++) {
      rightMax = Math.max(rightMax, height[r])
    }
    for (let l = i + 1; l < height.length; l++) {
      leftMax = Math.max(leftMax, height[l])
    }
    // 算出能接的水的高度
    ans += Math.max(0, Math.min(rightMax, leftMax) - height[i])
  }

  return ans
};

// 2. 动态规划，两次遍历拿到每个格子的最高左柱子和最高右柱子，第三次遍历所有格子得到积水量
function trap2(height: number[]): number {
  let ans = 0
  // lMaxHeights[i]代表第 i 列的左边最高的墙的高度
  // rMaxHeights[i]代表第 i 列的右边最高的墙的高度
  let lMaxHeights = new Array(height.length)
  let rMaxHeights = new Array(height.length)

  // 两边的墙忽略不计
  for (let i = 1; i < height.length - 1; i++) {
    lMaxHeights[i] = Math.max(lMaxHeights[i - 1] || 0, height[i - 1])
  }
  for (let i = height.length - 2; i >= 0; i--) {
    rMaxHeights[i] = Math.max(rMaxHeights[i + 1] || 0, height[i + 1])
  }
  for (let i = 1; i < height.length - 1; i++) {
    ans += Math.max(Math.min(rMaxHeights[i], lMaxHeights[i]) - height[i], 0)
  }

  return ans
};

// 2.1 空间优化
function trap2_1(height: number[]): number {
  let ans = 0
  // rMaxHeights[i]代表第 i 列的右边最高的墙的高度
  let rMaxHeights = new Array(height.length)
  let leftMax = 0

  // 两边的墙忽略不计
  for (let i = height.length - 2; i >= 0; i--) {
    rMaxHeights[i] = Math.max(rMaxHeights[i + 1] || 0, height[i + 1])
  }
  for (let i = 1; i < height.length - 1; i++) {
    leftMax = Math.max(leftMax, height[i - 1])
    ans += Math.max(Math.min(rMaxHeights[i], leftMax) - height[i], 0)
  }

  return ans
};

// 3. 双指针 再次空间优化
function trap3(height: number[]): number {
  let ans = 0
  // 左右指针，墙边忽略
  let left = 0
  let right = height.length - 1
  let leftMax = 0
  let rightMax = 0

  // 两边忽略不计
  while (left < right) {
    // 较矮一边的指针向中间靠拢
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left])
      ans += Math.max(0, leftMax - height[left])
      left++
    } else {
      rightMax = Math.max(rightMax, height[right])
      ans += Math.max(0, rightMax - height[right])
      right--
    }
  }

  return ans
};

// 4. 单调栈
function trap4(height: number[]): number {
  let ans = 0
  const stack = []

  for (let i = 0; i < height.length; i++) {
    while (stack.length !== 0 && height[i] > height[stack[stack.length - 1]]) {
      const current = stack.pop()!
      if (stack.length === 0) break
      const w = i - stack[stack.length - 1] - 1
      const h = Math.min(height[stack[stack.length - 1]], height[i]) - height[current]
      ans += w * h
    }
    stack.push(i)
  }

  return ans
};

//           *
// *         *
// *     *   *
// * *   * * *
// * *   * * *
console.log(trap4([0,1,0,2,1,0,1,3,2,1,2,1]))
console.log(trap4([4, 2, 0, 3, 2, 5]))