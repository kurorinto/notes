const fn = (nums: number[]) => {
  let n = nums.length;
  let currentSum = 0;
  let maxSum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      currentSum = 0;
      for (let k = i; k <= j; k++) {
        currentSum += nums[k];
      }
      if (currentSum > maxSum) {
        maxSum = currentSum;
      }
    }
  }
  return maxSum;
};

const fn1 = (nums: number[]) => {
  let n = nums.length;
  let currentSum = 0;
  let maxSum = 0;
  for (let i = 0; i < n; i++) {
    currentSum = 0;
    for (let j = i; j < n; j++) {
      currentSum += nums[j];
      if (currentSum > maxSum) {
        maxSum = currentSum;
      }
    }
  }
  return maxSum;
};

function maxCrossingSum(nums: number[], left: number, mid: number, right: number): number {
  let leftSum = Number.NEGATIVE_INFINITY;
  let rightSum = Number.NEGATIVE_INFINITY;
  let sum = 0;

  // 计算左半部分的最大和
  for (let i = mid; i >= left; i--) {
    sum += nums[i];
    if (sum > leftSum) {
      leftSum = sum;
    }
  }

  sum = 0;

  // 计算右半部分的最大和
  for (let i = mid + 1; i <= right; i++) {
    sum += nums[i];
    if (sum > rightSum) {
      rightSum = sum;
    }
  }

  // 返回跨中央的最大和
  return leftSum + rightSum;
}

function maxSubarraySum(nums: number[], left: number, right: number): number {
  // 基本情况
  if (left === right) {
    return nums[left];
  }

  const mid = Math.floor((left + right) / 2);

  const leftMax = maxSubarraySum(nums, left, mid);
  const rightMax = maxSubarraySum(nums, mid + 1, right);
  const crossMax = maxCrossingSum(nums, left, mid, right);

  return Math.max(leftMax, rightMax, crossMax);
}

function fn2(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  return maxSubarraySum(nums, 0, nums.length - 1);
}

function fn3(nums: number[]): number {
  if (nums.length === 0) return 0;

  let maxCurrent = nums[0];
  let maxGlobal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
    maxGlobal = Math.max(maxGlobal, maxCurrent);
  }

  return maxGlobal;
}

console.log(fn3([4, -3, 5, -2, -1, 2, 6, -2]));
// export {}
