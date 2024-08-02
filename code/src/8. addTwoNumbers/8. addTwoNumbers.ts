// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 示例 1：
// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.

// 示例 2：
// 输入：l1 = [0], l2 = [0]
// 输出：[0]

// 示例 3：
// 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// 输出：[8,9,9,9,0,0,0,1]

// 提示：
// 每个链表中的节点数在范围 [1, 100] 内
// 0 <= Node.val <= 9
// 题目数据保证列表表示的数字不含前导零

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const res = new ListNode(0);
  let current = res;
  let cl1 = l1;
  let cl2 = l2;
  let carry = 0;

  while (cl1 || cl2) {
    const num1 = cl1?.val || 0;
    const num2 = cl2?.val || 0;
    cl1 = cl1?.next || null;
    cl2 = cl2?.next || null;
    const sum = num1 + num2 + carry;
    // current.val = sum % 10
    carry = Math.floor(sum / 10);

    current.next = new ListNode(sum % 10);
    current = current.next;
  }

  if (carry) {
    current.next = new ListNode(carry);
  }

  return res.next;
}

// 2 -> 4 -> 3
const createListNode = (nums: number[]) => {
  if (!nums.length) return null;

  const res = new ListNode(nums[0]);
  let current = res;

  for (let i = 1; i < nums.length; i++) {
    current.next = new ListNode(nums[i]);
    current = current.next;
  }
  return res;
};

// [2, 4, 3]
// [5, 6, 4]
// [7, 0, 8]

// [9,9,9,9,9,9,9]
// [9,9,9,9]
// [8,9,9,9,0,0,0,1]
const l1 = createListNode([9, 9, 9, 9, 9, 9, 9]);
const l2 = createListNode([9, 9, 9, 9]);

console.log(JSON.stringify(addTwoNumbers(l1, l2)));
