#  [128. 最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

## 题意



## 题解



```c++
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_map<int, int> tr_l, tr_r;
        int res = 0;
        for(auto & x : nums) {
            int l = tr_r[x - 1], r = tr_l[x + 1];
            tr_l[x - l] = max(tr_l[x - l], l + r + 1);
            tr_r[x + r] = max(tr_r[x + r], l + r + 1);
            res = max(res, l + r + 1);
        }
        return res;
    }

    int longestConsecutive2(vector<int>& nums) {
        int n = nums.size();
        unordered_map<int, bool> m;
        for(auto v : nums) m[v] = true;
        int res = 0;
        for(auto v : nums) {
            if(m[v-1]) continue;
            int cnt = 1;
            while(m[++v]) ++cnt;
            res = max(res, cnt);
        }
        return res;
    }
};
```



```python3

```

