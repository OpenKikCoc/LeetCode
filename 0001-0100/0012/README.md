#  [12. 整数转罗马数字](https://leetcode-cn.com/problems/integer-to-roman/)

## 题意



## 题解



```c++
class Solution {
public:
    string intToRoman(int num) {
        string res;
        int nums[]{1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        string romans[]{"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        int p = 0;
        while (p < 13) {
            while (num >= nums[p]) num -= nums[p], res += romans[p];
            ++p;
        }
        return res;
    }
};
```



```python
class Solution:
    def intToRoman(self, num: int) -> str:
        my_dict ={1000: 'M', 900:'CM', 500: 'D', 400: 'CD', 100: 'C', 90: 'XC', 50: 'L', 40: 'XL', 10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I' }  # 使用哈希表，按照从大到小顺序排列
        # dic = OrderedDict({1000: 'M', 900: 'CM', 500: 'D', 400: 'CD', 100: 'C', 90: 'XC', 50: 'L', 40: 'XL', 10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I'})  #用这个也可以！直接排序！
        res = ''
        for key in my_dict:
            if num // key != 0:
                cnt = num // key 
                res += my_dict[key] * cnt 
                # print('res: {0}'.format(res))
                num %= key 
        return res
```

