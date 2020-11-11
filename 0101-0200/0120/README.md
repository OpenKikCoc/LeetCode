#  [120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/)

## 题意



## 题解



```c++
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        if(!n) return 0;
        vector<int> f(n+1);
        for(int i = n-1; i >= 0; --i)
            for(int j = 0; j <= i; ++j)
                f[j] = min(f[j], f[j+1]) + triangle[i][j];
        return f[0];
    }
};
```



```python3

```

