#  [718. 最长重复子数组](https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/)

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



```python3

```

