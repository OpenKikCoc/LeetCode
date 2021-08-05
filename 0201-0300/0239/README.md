#  [239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> q;
        vector<int> res;
        for (int i = 0; i < nums.size(); i ++ ) {
            if (q.size() && q.front() < i - k + 1) q.pop_front();
            while (q.size() && nums[i] >= nums[q.back()]) q.pop_back();
            q.push_back(i);
            if (i >= k - 1) res.push_back(nums[q.front()]);
        }
        return res;
    }
};
```



```python
# 单调队列的经典应用
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        from collections import deque
        q = deque()
        res = []
        for r in range(len(nums)):
            if q and q[0] <= r - k:
                q.popleft()
            while q and nums[q[-1]] < nums[r]:
                q.pop()
            q.append(r)
            if r >= k - 1:
                res.append(nums[q[0]])
        return res  
```

