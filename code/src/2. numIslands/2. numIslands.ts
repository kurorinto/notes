// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
// 此外，你可以假设该网格的四条边均被水包围。

// 示例 1：
// 输入：grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// 输出：1

// 示例 2：
// 输入：grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// 输出：3

// 提示：
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 300
// grid[i][j] 的值为 '0' 或 '1'

function numIslands(grid: string[][]): number {
  const inArea = (r: number, c: number) => {
    return 0 <= r && r < grid.length && 0 <= c && c < grid[r].length;
  };

  const dfs = (r: number, c: number) => {
    // 是否越界
    if (!inArea(r, c)) {
      return;
    }
    if (grid[r][c] !== "1") {
      return;
    }
    // 标记 被遍历过的格子，此处赋值非'1'的值都可以，只需不满足上述grid[r][c] !== '1'即可
    grid[r][c] = "0";
    // 可先判断越界再遍历，也可以先递归再判断越界
    dfs(r, c - 1);
    dfs(r, c + 1);
    dfs(r - 1, c);
    dfs(r + 1, c);
  };

  let res = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "1") {
        res++;
        dfs(r, c);
      }
    }
  }
  return res;

  // const dfs = (row: number, column: number) => {
  //   if (0 <= row && row < grid.length && 0 <= column && column < grid[row].length) return

  //   if (grid[row][column] !== '1') return

  //   grid[row][column] = '0'

  //   dfs(row, column - 1)
  //   dfs(row, column + 1)
  //   dfs(row - 1, column)
  //   dfs(row + 1, column)
  // }

  // let res = 0

  // for (let row = 0; row < grid.length; row++) {
  //   for (let column = 0; column < grid[row].length; column++) {
  //     if (grid[row][column] === '1') {
  //       res++
  //       dfs(row, column)
  //     }
  //   }
  // }

  // return res
}

console.log(
  numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "1"],
    ["0", "0", "0", "1", "0"],
  ]),
);
