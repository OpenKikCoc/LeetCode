#  [718. 最长重复子数组](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/)

## 题意



## 题解



```c++
class Solution {
public:
    int findLength(vector<int>& A, vector<int>& B) {
        int n = A.size(), m = B.size();
        vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
        int ans = 0;

        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= m; j++) {
                if (A[i - 1] == B[j - 1])
                    f[i][j] = f[i - 1][j - 1] + 1;
                else
                    f[i][j] = 0;

                ans = max(ans, f[i][j]);
            }

        return ans;
    }
};
```



```python
# 不是最长公共子序列的问题（子序列不需要连续）子数组 需要连续。
class Solution:
    def findLength(self, A: List[int], B: List[int]) -> int:
        m, n = len(A), len(B)
        f = [[0]*(n + 1) for _ in range(m + 1)]
        res = 0
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if A[i-1] == B[j-1]:
                    f[i][j] = f[i-1][j-1] + 1
                else:f[i][j] = 0
                res = max(res, f[i][j])
        return res
```

