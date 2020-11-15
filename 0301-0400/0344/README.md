#  [344. 反转字符串](https://leetcode-cn.com/problems/reverse-string/)

## 题意



## 题解



```c++
class Solution {
public:
    void reverseString(vector<char>& s) {
        int n = s.size();
        for(int i = 0; i < n/2; ++i)
            swap(s[i], s[n-1-i]);
        return;
    }
};
```



```python3

```

