#  [738. 单调递增的数字](https://leetcode-cn.com/problems/monotone-increasing-digits/)

## 题意



## 题解



```c++
class Solution {
public:
    int monotoneIncreasingDigits(int N) {
        string ns = to_string(N);
        int n = ns.size();
        int i = 1;
        while (i < n && ns[i - 1] <= ns[i]) ++ i ;
        if (i < n) {
            // now ns[i - 1] > ns[i]
            while (i > 0 && ns[i - 1] > ns[i]) -- ns[i - 1], -- i ;
            for (int j = i + 1; j < n; ++ j ) ns[j] = '9';
        }
        return stoi(ns);
    }
};
```



```c++
class Solution {
public:
    int monotoneIncreasingDigits(int N) {
        auto str = to_string(N);
        int k = 0;
        while (k + 1 < str.size() && str[k] <= str[k + 1]) k ++ ;
        if (k == str.size() - 1) return N;
        while (k && str[k - 1] == str[k]) k -- ;
        str[k] -- ;
        for (int i = k + 1; i < str.size(); i ++ ) str[i] = '9';
        return stoi(str);
    }
};
```



```python3

```

