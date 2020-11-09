#  [45. 跳跃游戏 II](https://leetcode-cn.com/problems/jump-game-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size(), res = 0, mx = 0, end = 0;
        for(int i = 0; i < n-1; ++i) {
            mx = max(mx, i+nums[i]);
            if(end == i) {
                ++res;
                end = mx;
            }
        }
        return res;
    }
};

class Solution {
public:
    int jump(vector<int>& nums) {
        int len = nums.size();
        int res = 0;
        int end = 0;
        int maxPos = 0;
        for (int i = 0; i < len - 1; ++i) {
            maxPos = max(maxPos, i + nums[i]);
            if (i == end) {
                end = maxPos;
                res++;
                if (end == len - 1) break;
            }
        }
        return res;
    }
};
```



```python3

```

