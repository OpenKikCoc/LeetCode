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
      

      
# 以下写法有一个case会过不了：'9',1
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        stack = []
        n = len(num)
        for i in range(n):
            while stack and stack[-1] > num[i] and k > 0:
                stack.pop()
                k -= 1 
            stack.append(num[i])
        res = ''.join(stack).lstrip('0')
        return res if res else '0'
# 上述代码的问题在于：需要注意的是，如果给定的数字是一个单调递增的数字，那么我们的算法会永远选择不丢弃。这个题目中要求的，我们要永远确保丢弃 k 个矛盾。
# 一个简单的思路就是：每次丢弃一次，k 减去 1。当 k 减到 0 ，我们可以提前终止遍历。
# 而当遍历完成，如果 k 仍然大于 0。不妨假设最终还剩下 x 个需要丢弃，那么我们需要选择删除末尾 x 个元素。修改后，可以通过：

class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        stack = []
        n = len(num)
        for i in range(n):
            while stack and stack[-1] > num[i] and k > 0:
                stack.pop()
                k -= 1 
            stack.append(num[i])
        while k > 0:   # 判断：是否已经移除了k位！！！
            stack.pop()
            k -= 1
        res = ''.join(stack).lstrip('0')
        return res if res else '0'
      
# 逆向思维，一定需要舍弃k位，那就是需要保留len(num) - k位。这样就不需要对k是否为0进行校验了, 但是在输出的时候，stack还是只能取前remain个数字输出。
class Solution(object):
    def removeKdigits(self, num, k):
        stack = []
        remain = len(num) - k
        for c in num:
            while k and stack and stackresls[-1] > c:
                stack.pop()
                k -= 1
            stack.append(c)
        return ''.join(stack[:remain]).lstrip('0') or '0' # 踩坑：stack[:remain]
       
```

