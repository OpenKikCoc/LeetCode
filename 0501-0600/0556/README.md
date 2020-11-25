#  [556. 下一个更大元素 III](https://leetcode-cn.com/problems/next-greater-element-iii/)

## 题意



## 题解



```c++
class Solution {
public:
    int nextGreaterElement(int n) {
        string s = to_string(n);
        int k = s.size() - 1;
        while (k && s[k - 1] >= s[k]) -- k;
        if (!k) return -1;
        int t = k;
        while (t + 1 < s.size() && s[t + 1] > s[k - 1]) ++ t;
        swap(s[k - 1], s[t]);
        reverse(s.begin() + k, s.end());
        long long r = stoll(s);
        if (r > INT_MAX) return -1;
        return r;
    }
};
```



```python3

```

