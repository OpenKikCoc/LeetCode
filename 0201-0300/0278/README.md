#  [278. 第一个错误的版本](https://leetcode.cn/problems/first-bad-version/)

## 题意



## 题解



```c++
// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {
        int l = 1, r = n;
        while (l < r) {
            int mid = (long long)l + r >> 1;
            if (isBadVersion(mid)) r = mid;
            else l = mid + 1;
        }
        return l;
    }
};
```



```python
# The isBadVersion API is already defined for you.
# @param version, an integer
# @return an integer
# def isBadVersion(version):

class Solution:
    def firstBadVersion(self, n):
        l, r = 1, n + 1
        while l < r:
            m = l + (r - l) // 2
            if not isBadVersion(m):
                l = m + 1
            else:r = m
        return l
        
```

