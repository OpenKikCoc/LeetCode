#  [11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxArea(vector<int>& height) {
        int n = height.size();
        int l = 0, r = n - 1, res = 0;
        while (l < r) {
            res = max(res, min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) ++l;
            else --r;
        }
        return res;
    }
};
```



```python
# 这道题不适合用单调栈来做(比较复杂），和接雨水的题做对比

# 思维具有跳跃性，脑筋急转弯类型的题目。（需要记住思路）
# 做法：用两个指针 l, r 分别指向首尾，如果 al > ar，则 r−−，因为更长的柱子 以后更可能会被用到；否则 l++，直到 l == r为止，每次迭代更新最大值。

class Solution:
    def maxArea(self, h: List[int]) -> int:
        n = len(h)
        l, r = 0, n - 1
        res = float('-inf')
        while l < r:
            if h[l] < h[r]:
                res = max(res, h[l] * (r - l))
                l += 1 
            else:
                res = max(res, h[r] * (r - l))
                r -= 1
        return res
```

