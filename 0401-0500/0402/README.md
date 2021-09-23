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



```python
"""
贪心：
题解：如果我们当前遇到的数字比上一个数字要小的话，肯定是删除上一个数字比较划算。我们最多能删除k个字符。所以我们使用一个单调栈来存储每一个字符，如果当前读进来的数字比前一个数字小，我们就将栈顶元素出栈，直至出栈了k个字符或者栈顶元素已经比当前元素还小。这样在我们删除k个元素后，栈中元素就是剩下的数字啦。这时候我们需要考虑的就是删除前导0和空栈的情况啦。字符串有push和pop操作，所以我们可以直接用字符串来模拟栈，效果是一样的。
"""
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        stack = []
        remain = len(num) - k 
        for c in num:
            while stack and stack[-1] > c and k:
                stack.pop()
                k -= 1
            stack.append(c)
        return ''.join(stack[:remain]).lstrip('0') or '0'
       
```

