#  [412. Fizz Buzz](https://leetcode.cn/problems/fizz-buzz/)

## 题意



## 题解



```c++
class Solution {
public:
    string get(int x) {
        string ret;
        bool f = false;
        if (x % 3 == 0) ret += "Fizz", f = true;
        if (x % 5 == 0) ret += "Buzz", f = true;
        if (f) return ret;
        return to_string(x);
    }
    vector<string> fizzBuzz(int n) {
        vector<string> res;
        for (int i = 1; i <= n; ++ i )
            res.push_back(get(i));
        return res;
    }
};
```



```python3

```

