#  [414. 第三大的数](https://leetcode-cn.com/problems/third-maximum-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int thirdMax(vector<int>& nums) {
        long long INF = 1e10, a = -INF, b = -INF, c = -INF, s = 0;
        for (auto x: nums) {
            if (x > a) s ++, c = b, b = a, a = x;
            else if (x < a && x > b) s ++, c = b, b = x;
            else if (x < b && x > c) s ++, c = x;
        }
        if (s < 3) return a;
        return c;
    }
};
```



```python
"""
模拟遍历：每次保存更新最大值，次大值，第三大值
"""

class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        a=-1e20;b=-1e20;c=-1e20;s=0
        for x in nums:
            if x>a: c=b;b=a;a=x;s+=1
            elif x<a and x>b: c=b;b=x;s+=1
            elif x<b and x>c: c=x;s+=1
        if s<3: return a
        return c
```

