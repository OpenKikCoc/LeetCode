#  [388. 文件的最长绝对路径](https://leetcode-cn.com/problems/longest-absolute-file-path/)

## 题意



## 题解



```c++
class Solution {
public:
    int lengthLongestPath(string input) {
        stack<int> stk;
        int res = 0;
        for (int i = 0, sum = 0; i < input.size(); i ++ ) {
            int k = 0;
            while (i < input.size() && input[i] == '\t') i ++ , k ++ ;
            while (stk.size() > k) sum -= stk.top(), stk.pop();
            int j = i;
            while (j < input.size() && input[j] != '\n') j ++ ;
            int len = j - i;
            stk.push(len), sum += len;
            if (input.substr(i, len).find('.') != -1)
                res = max(res, sum + (int)stk.size() - 1);
            i = j;
        }
        return res;
    }
};
```



```python3

```

