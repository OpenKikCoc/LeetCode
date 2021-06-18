#  [118. 杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        if(!numRows) return res;
        res.push_back(vector<int>{1});
        if(numRows == 1) return res;
        for(int i = 1; i < numRows; ++i) {
            vector<int> line;
            line.push_back(1);
            for(int j = 1; j < i; ++j) {
                line.push_back(res[i-1][j-1]+res[i-1][j]);
            }
            line.push_back(1);
            res.push_back(line);
        }
        return res;
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

