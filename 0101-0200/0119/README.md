#  [119. 杨辉三角 II](https://leetcode-cn.com/problems/pascals-triangle-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    // 第 3 行 第 0 位 为 1 ， 第 1 位 为 3
    vector<int> getRow(int rowIndex) {
        vector<int> f(rowIndex+1);
        f[0] = 1;
        for(int i = 1; i <= rowIndex; ++i) {
            for(int j = i; j > 0; --j) f[j] = f[j] + f[j-1];
        }
        return f;
    }
};
```



```python3

```

