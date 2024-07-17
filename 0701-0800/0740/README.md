#  [740. 删除与获得点数](https://leetcode.cn/problems/delete-and-earn/)

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



```python
# 选了x 不能选择x + 1 和 x - 1；这和打家劫舍的题很像
# 状态机dp问题：有限制的选择问题（一般 有限制的选择问题 都可以用dp来做：背包问题也是有限制的选择问题）
# 用一个数组存储每个数字出现的次数；
# 考虑前i个数， 每个数都后面一个数都有影响；选择了i，就不能选i + 1；
# 对于每个数都有两种情况：选 :  f[i][1]: / 不选 : f[i][0]； 
# f[i][0] : 不选i，那i - 1  可选 可不选；1) 选i - 1 2）不选 i -1 ：f[i][0] = max(f[i-1][0], f[i-1][1])
# f[i][1]: 选择了i，那i-1一定不能选；f[i][1] = f[i-1][0] + i * cnt[i](i选一个 还是选两个 对其他数的影响都是一样的)
# 时间复杂度是O(N)， 一共有N个状态

class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        n = len(nums)
        cnt = [0] * 10010
        m = 0
        for x in nums:
            cnt[x] += 1 
            m = max(m, x)
        print(m)
        f = [[0] * 2 for i in range(m + 1)]
        for i in range(1, m + 1):
            f[i][0] = max(f[i - 1][0], f[i - 1][1])
            f[i][1] = f[i - 1][0] + cnt[i] * i 
        return max(f[m][0], f[m][1])
```

