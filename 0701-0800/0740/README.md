#  [740. 删除与获得点数](https://leetcode-cn.com/problems/delete-and-earn/)

## 题意



## 题解



```c++
class Solution {
public:
    using PII = pair<int, int>;
    const int N = 10000;

    int deleteAndEarn(vector<int>& nums) {
        vector<int> cnt(N + 1);
        for (auto v : nums)
            cnt[v] ++ ;

        vector<vector<int>> f(N + 1, vector<int>(3));
        // 0 上一个被删 1 本身被删 2 不被删
        int res = 0;
        for (int i = 1, j = 0; i <= N; ++ i ) {
            auto x = i, y = cnt[x];
            f[i][0] = f[i - 1][1];
            f[i][1] = max(f[i - 1][0], f[i - 1][2]) + x * y;
            f[i][2] = max(f[i - 1][0], f[i - 1][2]);
            res = max(res, f[i][1]);
        }
        return res;
    }
};
```

```c++
const int N = 10010;
int cnt[N], f[N][2];

class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        memset(cnt, 0, sizeof cnt);
        memset(f, 0, sizeof f);
        for (auto x: nums) cnt[x] ++ ;
        int res = 0;
        for (int i = 1; i < N; i ++ ) {
            f[i][0] = max(f[i - 1][0], f[i - 1][1]);
            f[i][1] = f[i - 1][0] + i * cnt[i];
            res = max(res, max(f[i][0], f[i][1]));
        }
        return res;
    }
};
```



```python3

```

