#  [11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxArea(vector<int>& height) {
        int n = height.size();
        int l = 0, r = n-1, res = 0;
        while(l < r) {
            res = max(res, min(height[l], height[r]) * (r-l));
            if(height[l] < height[r]) ++l;
            else --r;
        }
        return res;
    }
};
```



```python3

```

