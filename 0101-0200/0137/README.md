#  [137. 只出现一次的数字 II](https://leetcode-cn.com/problems/single-number-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for(int i = 0; i < 32; ++i) {
            int p = 1 << i;
            int c = 0;
            for(auto v : nums) if(v & p) ++c;
            if(c % 3) res |= p;
        }
        return res;
    }
};
```



```python
# 特别注意 负数的情况：Python是动态类型语言，在这种情况下其会将符号位置的1看成了值，而不是当作符号“负数”

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        res = 0 
        for i in range(32):
            p = 1 << i 
            c = 0 
            for x in nums:
                if x & p:
                    c += 1
            if c % 3:
                res |= p
            if i == 31:
                if c % 3 == 0:
                    flag = True 
                else:
                    flag = False
        return res if flag else ~(res ^ 0xffffffff)


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        c = [0] * 32
        for num in nums:
            for j in range(32):
                c[j] += num & 1
                num >>= 1
        res = 0 
        for i in range(32):
            res <<= 1 
            res |= c[31 - i] % 3
        return res if c[31] % 3 == 0 else ~(res ^ 0xffffffff) 
      # 由于 Python 的存储负数的特殊性，需要先将0 - 32位取反（即res ^ 0xffffffff ），再将所有位取反（即 ~ ）; 两个组合操作实质上是将数字 32 以上位取反， 0 - 32 位不变。
```

