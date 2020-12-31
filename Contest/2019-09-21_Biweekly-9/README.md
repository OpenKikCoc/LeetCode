## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-9/)


### [1196. 最多可以买到的苹果数量](https://leetcode-cn.com/problems/how-many-apples-can-you-put-into-the-basket/)

略

```c++
class Solution {
public:
    int maxNumberOfApples(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int n = arr.size(), s = 0;
        for (int i = 0; i < n; ++ i ) {
            s += arr[i];
            if (s > 5000) return i;
        }
        return n;
    }
};
```


### [1197. 进击的骑士](https://leetcode-cn.com/problems/minimum-knight-moves/)

时限较紧，使用 map pair 记录距离超时，故使用静态数组

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 400, M = 800;
    int d[M][M];
    vector<int> dx = {-1, -2, -2, -1, 1, 2, 2, 1}, dy = {-2, -1, 1, 2, 2, 1, -1, -2};
    int minKnightMoves(int x, int y) {
        memset(d, -1, sizeof d);
        queue<PII> q;
        q.push({x + N, y + N});
        d[x + N][y + N] = 0;
        while (q.size()) {
            auto [x, y] = q.front(); q.pop();
            if (x == N && y == N) return d[x][y];
            for (int i = 0; i < 8; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= M || ny < 0 || ny >= M || d[nx][ny] != -1) continue;
                q.push({nx, ny});
                d[nx][ny] = d[x][y] + 1;
            }
        }
        return -1;
    }
};
```

### [1198. 找出所有行中最小公共元素](https://leetcode-cn.com/problems/find-smallest-common-element-in-all-rows/)

并非使用堆。

正解：统计每行出现的元素，若某元素数量达 n 则为答案。

【关键在于题中所给的数据范围: 所有数值小于 10000 】

```c++
class Solution {
public:
    int smallestCommonElement(vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();
        vector<int> cnt(10010);
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (j == 0 || mat[i][j] != mat[i][j - 1])
                    ++ cnt[mat[i][j]];
        for (int i = 1; i <= 10000; ++ i)
            if (cnt[i] == n)
                return i;
        return -1;
    }
};
```

### [1199. 建造街区的最短时间](https://leetcode-cn.com/problems/minimum-time-to-build-blocks/) [TAG]

贪心: 哈夫曼树合并

>
> 分裂工人的操作，实际上就等价于把这两个街区合并为了一个建造时间为
>
> split + max(blocks[0], blocks[1])
>
> 的新街区。
>

贪婪: 挑最小的两个合并(取大值+split)成新节点

```c++
class Solution {
public:
    int minBuildTime(vector<int>& blocks, int split) {
        priority_queue<int, vector<int>, greater<int>> heap;
        for (auto v : blocks) heap.push(v);
        
        while (heap.size() > 1) {
            int minv = heap.top(); heap.pop();  // 最小值
            int secv = heap.top(); heap.pop();  // 次小值
            heap.push(split + secv);
        }
        return heap.top();
    }
};
```
