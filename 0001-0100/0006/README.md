#  [6. Z 字形变换](https://leetcode-cn.com/problems/zigzag-conversion/)

## 题意



## 题解



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



```python3

```

