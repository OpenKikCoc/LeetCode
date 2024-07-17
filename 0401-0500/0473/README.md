#  [473. 火柴拼正方形](https://leetcode.cn/problems/matchsticks-to-square/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> nums;
    vector<bool> st;
    // 最多15根火柴 压缩
    bool dfs(int start, int cur, int length, int cnt) {
        if (cnt == 3) return true;
        if (cur == length) return dfs(0, 0, length, cnt + 1);
        for (int i = start; i < nums.size(); ++ i ) {
            if (st[i]) continue;
            if (cur + nums[i] <= length) {
                st[i] = true;
                if (dfs(i + 1, cur + nums[i], length, cnt)) return true;
                st[i] = false;
            }
            // !cur 说明还未使用的最长火柴都不可匹配
            // cur + nums[i] == length 后面的和都会小于 length
            if (!cur || cur + nums[i] == length) return false;
            while (i + 1 < nums.size() && nums[i + 1] == nums[i]) ++ i ;
        }
        return false;
    }

    bool makesquare(vector<int>& nums) {
        this->nums = nums;
        if (nums.empty()) return false;
        int sum = 0, n = nums.size();
        for (auto v : nums) sum += v;
        if (sum % 4) return false;
        
        st.resize(nums.size());
        sum /= 4;
        sort(nums.begin(), nums.end(), greater<int>());
        return dfs(0, 0, sum, 0);
    }
};
```



```python3

```

