#  [118. 杨辉三角](https://leetcode.cn/problems/pascals-triangle/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for (int i = 1; i <= numRows; ++ i ) {
            vector<int> t;
            for (int j = 1; j <= i; ++ j ) {
                if (i == 1 || j == 1 || j == i) t.push_back(1);
                else t.push_back(res[i - 2][j - 2] + res[i - 2][j - 1]);
            }
            res.push_back(t);
        }
        return res;
    }
};

class Solution {
public:
    vector<vector<int>> generate(int n) {
        vector<vector<int>> f;
        for (int i = 0; i < n; i ++ ) {
            vector<int> line(i + 1);
            line[0] = line[i] = 1;
            for (int j = 1; j < i; j ++ )
                line[j] = f[i - 1][j - 1] + f[i - 1][j];
            f.push_back(line);
        }
        return f;
    }
};
```



```python
# 递推 模拟题
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        if numRows == 0: return []
        res = [[1]]
        for i in range(1, numRows):
            path = [1] * (i + 1)
            path[0] = path[i] = 1
            for j in range(1, i):
                path[j] = res[i - 1][j - 1] + res[i - 1][j]
            res.append(path)
        return res
```

