#  [202. 快乐数](https://leetcode-cn.com/problems/happy-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int trans(int n) {
        int res = 0;
        while (n) {
            res += (n % 10) * (n % 10);
            n /= 10;
        }
        return res;
    }

    bool isHappy(int n) {
        unordered_map<int, bool> m;
        m[n] = true;
        while (n != 1) {
            n = trans(n);
            if (m[n]) return false;
            m[n] = true;
        }
        return true;
    }
};
```

也可以用类似快慢指针的方式来做

```c++
class Solution {
public:
    int get(int x) {
        int res = 0;
        while (x) {
            res += (x % 10) * (x % 10);
            x /= 10;
        }
        return res;
    }

    bool isHappy(int n) {
        int fast = get(n), slow = n;
        while (fast != slow) {
            fast = get(get(fast));
            slow = get(slow);
        }
        return fast == 1;
    }
};
```



```python3

```

