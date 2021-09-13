#  [137. 只出现一次的数字 II](https://leetcode-cn.com/problems/single-number-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (int i = 0; i < 32; ++i) {
            int p = 1 << i;
            int c = 0;
            for (auto v : nums)
                if (v & p)
                    ++ c ;
            if (c % 3)
                res |= p;
        }
        return res;
    }
};
```

非常 trick 的做法

```c++
// 希望看到 1 的个数是模三余几
//
// 状态机模型
// https://www.acwing.com/video/2853/
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int two = 0, one = 0;
        for (auto x: nums) {
            one = (one ^ x) & ~two;
            two = (two ^ x) & ~one;
        }
        return one;
    }
};
```



```python
# 特别注意 负数的情况：Python是动态类型语言，在这种情况下其会将符号位置的1看成了值，而不是当作符号“负数”
# 【只有一个元素出现一次，其他元素都出现三次。】
# 【位运算】
# 方法比较跳跃性，需要多思考回顾
# 1. 建立一个长度为 32 的数组counts ，记录所有数字的各二进制位的 11 的出现次数。
# 2. 将 counts各元素对 33 求余，则结果为 “只出现一次的数字” 的各二进制位。
# 3. 利用 左移操作 和 或运算 ，可将 counts数组中各二进位的值恢复到数字 res 上，最后返回 res
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

