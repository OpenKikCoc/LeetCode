## [比赛链接](https://leetcode.cn/contest/biweekly-contest-9/)


### [1196. 最多可以买到的苹果数量](https://leetcode.cn/problems/how-many-apples-can-you-put-into-the-basket/)

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


### [1197. 进击的骑士](https://leetcode.cn/problems/minimum-knight-moves/)

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

这类题显然可以慢慢推数学结论:

```c++
class Solution {
public:
    int minKnightMoves(int x, int y) {
        x = abs(x), y = abs(y);
        // 特判
        if (x + y == 1) return 3;
        // (x + 1) / 2,(y + 1) / 2      走到x，y所需要的最小步数
        // (x + y + 2) / 3              每次最多走三步，所以走到 x + y 的最小步数为 (x + y + 2) / 3
        int res = max(max((x + 1) / 2, (y + 1) / 2), (x + y + 2) / 3);
        // 结论：如果x,y 同奇同偶 只有偶数步才能走到x,y点
        //      如果    一奇一偶 奇数步才能走到x,y点
        res += (res ^ x ^ y) & 1;
        return res;
    }
};
```

### [1198. 找出所有行中最小公共元素](https://leetcode.cn/problems/find-smallest-common-element-in-all-rows/)

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

### [1199. 建造街区的最短时间](https://leetcode.cn/problems/minimum-time-to-build-blocks/) [TAG]

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
