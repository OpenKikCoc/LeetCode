#  [481. 神奇字符串](https://leetcode-cn.com/problems/magical-string/)

## 题意



## 题解



```c++
class Solution {
public:
    int magicalString(int n) {
        string s = "122";
        // 前3位对应 12 最后从下标2的位置开始向后生成
        for (int i = 2, k = 1; s.size() < n; ++ i, k = 3 - k )
            for (int j = 0; j < s[i] - '0'; ++ j )
                s += to_string(k);
        int res = 0;
        for (int i = 0; i < n; ++ i ) res += s[i] == '1';
        return res;
    }
};
```



```python3

```

