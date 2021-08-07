#  [402. 移掉K位数字](https://leetcode-cn.com/problems/remove-k-digits/)

## 题意



## 题解



```c++
class Solution {
public:
    string removeKdigits(string num, int k) {
        int n = num.size();
        string res;
        for (int i = 0; i < n; ++ i ) {
            while (!res.empty() && k && res.back() > num[i]) res.pop_back(), -- k ;
            res.push_back(num[i]);
        }
        while (k -- ) res.pop_back();
        while (!res.empty() && res[0] == '0') res.erase(res.begin());
        if (res.empty()) res = "0";
        return res;
    }
};
```

```c++
// yxc
class Solution {
public:
    string removeKdigits(string num, int k) {
        k = min(k, (int)num.size());
        string res;
        for (auto c: num) {
            while (k && res.size() && res.back() > c) {
                k -- ;
                res.pop_back();
            }
            res += c;
        }
        while (k -- ) res.pop_back();
        k = 0;
        while (k < res.size() && res[k] == '0') k ++ ;
        if (k == res.size()) res += '0';
        return res.substr(k);
    }
};
```



```python3

```

