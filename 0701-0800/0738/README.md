#  [738. 单调递增的数字](https://leetcode.cn/problems/monotone-increasing-digits/)

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



```python
class Solution:
    def monotoneIncreasingDigits(self, N: int) -> int:
        s = list(str(N))  # 踩坑，要转化为string类型的列表
        n = len(s)
        k = 0 
        while k + 1 < n and s[k] <= s[k + 1]:k += 1
        if k == n - 1:return N 
        while k and s[k - 1] == s[k]:k -= 1 
        s[k] = str(int(s[k]) - 1) # 最开始相等的位置， 减去1
        for i in range(k + 1, n):  # 后面位置都变成 ‘9’
            s[i] = '9'
        return ''.join(s).lstrip('0')
```

