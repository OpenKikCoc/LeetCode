#  [166. 分数到小数](https://leetcode.cn/problems/fraction-to-recurring-decimal/)

## 题意



## 题解



```c++
class Solution {
public:
    typedef long long LL;
    string fractionToDecimal(int numerator, int denominator) {
        LL x = numerator, y = denominator;
        if (x % y == 0) return to_string(x / y);
        
        string res;
        if ((x < 0) ^ (y < 0)) res += '-';
        x = abs(x), y = abs(y);
        res += to_string(x / y) + '.', x %= y;

        unordered_map<LL, int> hash;    // 记录下标
        while (x) {
            hash[x] = res.size();
            x *= 10;
            res += to_string(x / y);
            x %= y;
            if(hash.count(x)) {
                res = res.substr(0, hash[x]) + '(' + res.substr(hash[x]) + ')';
                break;
            }
        }
        return res;
    }
};
```



```python
"""
为了方便处理，我们先将所有负数运算转化为正数运算。
然后再算出分数的整数部分，再将精力集中在小数部分。

计算小数部分的难点在于如何判断是否是循环小数，以及找出循环节的位置。
回忆手工计算除法的过程，每次将余数乘10再除以除数，当同一个余数出现两次时，我们就找到了循环节。
所以我们可以用一个哈希表 unordered_map<int,int> 记录所有余数所对应的商在小数点后第几位，当计算到相同的余数时，上一次余数的位置和当前位置之间的数，就是该小数的循环节。

时间复杂度分析：计算量与结果长度成正比，是线性的。所以时间复杂度是 O(n)。

"""
class Solution:
    def fractionToDecimal(self, x: int, y: int) -> str:
        res = ''
        if x % y == 0:
            return str(x // y)
        if (x < 0) ^ (y < 0): # 异号
            x, y = abs(x), abs(y)
            res += '-'
        res += str(x // y) + '.'
        x = x % y

        seen_dict = {}
        while x:
            seen_dict[x] = len(res)
            x *= 10
            res += str(x // y)
            x = x % y
            if x in seen_dict:
                res = res[:seen_dict[x]] + '(' +  res[seen_dict[x]:] + ')'
                break
        return res
```

