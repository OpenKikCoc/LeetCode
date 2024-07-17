#  [45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/)

## 题意



## 题解


```c++
class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        int res = 0, ed = 0, mx = 0;
        for (int i = 0; i < n - 1; ++ i ) {
            mx = max(mx, i + nums[i]);
            if (i == ed) {
                res ++ ;
                ed = mx;
            }
        }
        return res;
    }
};
```


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



```python
# 普通dp：会超时
"""
【有限集合的最优化问题】，用dp来做：
1. 状态定义 f[i]: 表示跳到点 i 需要的最小步数
2. 状态转移 从第0个点、1个点... j个点跳到 第i个点的步数最小值（前提是：能跳到）
3. 能跳到: j + nums[j] >= i
"""
class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)
        f = [float('inf')] * n
        f[0] = 0
        for i in range(n):
            for j in range(i):
                if j + nums[j] >= i:
                    f[i] = min(f[i], f[j] + 1)
        return f[n-1]
      

# dp + 贪心优化
"""
f[i] 其实具有单调性，也就是f[i+1] >= f[i], 可以用反证法：
1. 如果f[i+1] < f[i], 设k(k<=i)点 跳到 i+1，那么就有k+nums[k] >= i+1,那k+nums[k] 必定也大于i, 此时 f[i+1]=f[i]；
2. 如果nums的每一项都为1，那么f[i+1] > f[i]，综上 与假设矛盾，所以 f[i]具有单调性
3. 有了单调性后，可以用第一个能跳到i的点更新了，因为第一个能跳到，那后面的肯定也可以，但是后面的f[j+1] >= f[j], 所以用第一个就可以了，也就是尽可能的选择靠前的点，这样步数可能会减少，有点贪心的思想。
4. j 就从0 开始，当第一次 j + nums[j] >= f[i]的时候，用f[j]来更新f[i], 也就是 f[i] = f[j] + 1
"""

class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)
        f = [float('inf')] * n
        f[0] = 0
        j = 0
        for i in range(1, n):
            while j + nums[j] < i:
                j += 1
            f[i] = f[j] + 1
        return f[n-1]


# 借助变量来求解
"""

"""


```

