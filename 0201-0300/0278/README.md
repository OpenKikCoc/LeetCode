#  [278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

## 题意



## 题解



```c++
// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {
        int l = 0, r = n;
        while (l < r) {
            int m = (long long)l + (r - l) / 2;
            if(isBadVersion(m)) r = m;
            else l = m + 1;
        }
        return l;
    }
};
```



```python3

```

