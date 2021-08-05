#  [189. 旋转数组](https://leetcode-cn.com/problems/rotate-array/)

## 题意



## 题解



```c++
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        if (!k) return;
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
        return;
    }
};
```



```python
# 原地算法：双指针算法
# 1. 把整个翻转一边 2. 两个部分内部再进行翻转一次

class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        def reverse(i, j):
            while i <= j:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
                j -= 1
        n = len(nums)
        k %= n
        reverse(0, n - 1)   # 内置revese()函数 不能传入参数，进行部分翻转
        reverse(0, k - 1)
        reverse(k, n - 1)
```

