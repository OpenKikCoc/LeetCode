#  [202. 快乐数](https://leetcode-cn.com/problems/happy-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int trans(int n) {
        int res = 0;
        while(n) {
            res += (n%10)*(n%10);
            n /= 10;
        }
        return res;
    }
    bool isHappy(int n) {
        unordered_map<int, bool> m;
        m[n] = true;
        while(n != 1) {
            n = trans(n);
            if(m[n]) return false;
            m[n] = true;
        }
        return true;
    }
};
```



```python3

```

