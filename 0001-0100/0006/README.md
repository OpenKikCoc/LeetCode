#  [6. Z 字形变换](https://leetcode.cn/problems/zigzag-conversion/)

## 题意



## 题解


```c++
// 更简单实现
class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows < 2)
            return s;
        
        vector<string> t(numRows);
        int line = 0, flag = -1;    // flag 初始化-1特殊处理
        for (auto x : s) {
            t[line].push_back(x);
            if (line == 0 || line == numRows - 1)
                flag = -flag;
            line += flag;
        }

        string res;
        for (auto x : t)
            res += x;
        return res;
    }
};
```

```c++
class Solution {
public:
    string convert(string s, int numRows) {
        // numRpws = 1, sig = 0;
        if (numRows == 1) return s;
        int len = s.size();
        int sig = 2 * (numRows - 1);
        string res;
        for(int i = 0; i < numRows; ++i) {
            int j = i;
            int add = sig-i*2;
            if (add == 0) add = sig;
            while (j < len) {
                res.push_back(s[j]);
                j += add;
                add = sig - add;
                if(add == 0) add = sig;
            }
        }
        return res;
    }
};
```



```python
"""
从中我们发现，对于行数是 n 的情况：

对于第一行和最后一行，是公差为 2(n−1)的等差数列，首项是 0和 n−1；
对于第 i行(0<i<n−1)，是两个公差为 2(n−1) 的等差数列交替排列，首项分别是 i 和 2n−i−2；
所以我们可以从上到下，依次打印每行的字符。
"""

# 对于只有一行的数据要特殊处理。
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        res = []
        k = numRows * 2 - 2 if numRows != 1 else 1
        n = len(s)
        for i in range(numRows):
            for j in range(i, n, k):
                res.append(s[j])
                if i != 0 and i != numRows - 1:
                    nxt = j + (numRows - i - 1) * 2
                    if nxt < n:
                        res.append(s[nxt])
        return ''.join(res)




# Z字形，就是两种状态，一种垂直向下，还有一种斜向上
# 控制好边界情况就可以了。
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1 or len(s) < numRows: return s
        res = [""] * numRows
        row, step = 0, 0
        for char in s:
            res[row] += char
            if row == 0:
                step = 1
            if row == numRows - 1:
                step = -1
            row += step
        return "".join(res)




```

