#  [788. 旋转数字](https://leetcode-cn.com/problems/rotated-digits/)

## 题意



## 题解



```c++
class Solution {
public:
    set<int> s1{0, 1, 8}, s2{2, 5, 6, 9};
    bool check(int x) {
        bool is_diff = false;
        for (auto c : to_string(x)) {
            int t = c - '0';
            if (!s1.count(t) && !s2.count(t))
                return false;
            if (s2.count(t))
                is_diff = true;
        }
        return is_diff;
    }

    int rotatedDigits(int n) {
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            if (check(i))
                res ++ ;
        return res;
    }
};
```



```python3

```

