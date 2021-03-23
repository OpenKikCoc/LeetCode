#  [728. 自除数](https://leetcode-cn.com/problems/self-dividing-numbers/)

## 题意



## 题解



```c++
class Solution {
public:
    bool check(int x) {
        int t = x;
        while (t) {
            int d = t % 10;
            if (!d || x % d)
                return false;
            t /= 10;
        }
        return true;
    }

    vector<int> selfDividingNumbers(int left, int right) {
        vector<int> res;
        for (int i = left; i <= right; ++ i )
            if (check(i))
                res.push_back(i);
        return res;
    }
};
```



```python3

```

