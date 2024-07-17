## [比赛链接](https://leetcode.cn/contest/weekly-contest-217/)


### [1672. 最富有客户的资产总量](https://leetcode.cn/problems/richest-customer-wealth/)



```c++
class Solution {
public:
    int maximumWealth(vector<vector<int>>& accounts) {
        int res = 0;
        for (auto & ac : accounts) {
            int sum = 0;
            for (auto v : ac) sum += v;
            res = max(res, sum);
        }
        return res;
    }
};
```


### [1673. 找出最具竞争力的子序列](https://leetcode.cn/problems/find-the-most-competitive-subsequence/)



```c++
class Solution {
public:
    vector<int> mostCompetitive(vector<int>& nums, int k) {
        stack<int> st;
        int n = nums.size(), tot = n - k;
        for (auto v : nums) {
            while (!st.empty() && st.top() > v && tot) st.pop(), -- tot;
            st.push(v);
        }
        while (tot -- ) st.pop();
        vector<int> res;
        while (!st.empty()) {
            res.push_back(st.top());
            st.pop();
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

### #### [1674. 使数组互补的最少操作次数](https://leetcode.cn/problems/minimum-moves-to-make-array-complementary/) [TAG]

差分 考虑转化

```c++
class Solution {
public:
    // ATTENTION 重要条件:  nums[i] <= limit 意味着最终的和一定小于等于2*limit
    // 预处理每对数字，利用差分数组的思想，在分界线插入变更值，最后求前缀和就是 [2,2∗limit] 上的答案
    int minMoves(vector<int>& nums, int limit) {
        int n = nums.size();
        vector<int> sum(limit * 2 + 2);
        for (int i = 0, j = n - 1; i < j; ++ i , -- j ) {
            sum[2] += 2;
            sum[min(nums[i], nums[j]) + 1] -= 2;
            sum[min(nums[i], nums[j]) + 1] += 1;
            sum[nums[i] + nums[j]] -= 1;
            sum[nums[i] + nums[j] + 1] += 1;
            sum[max(nums[i], nums[j]) + limit + 1] -= 1;
            sum[max(nums[i], nums[j]) + limit + 1] += 2;
        }
        int res = n;
        for (int i = 2; i <= 2 * limit; ++ i ) {
            sum[i] += sum[i - 1];
            res = min(res, sum[i]);
        }
        return res;
    }
};
```

### [1675. 数组的最小偏移量](https://leetcode.cn/problems/minimize-deviation-in-array/)

堆

显然奇数只能乘 2 后再除 2 两种可能，处理后在堆中只除 2 


```c++
class Solution {
public:
    /*
    较显然的做法：
        第一步:先把所有奇数乘 2 , 这样就等价于只有操作 1
        第二步:操作 1 的只会减少某个数的值,而只有减少最大值结果才可能更优.
        第三步:使用平衡树或堆维护最大值,直到最大值为奇数不能再操作为止.
    考虑优化:
        https://leetcode.cn/problems/minimize-deviation-in-array/solution/yi-chong-fu-za-du-geng-di-de-zuo-fa-by-heltion-2/
    */
    int minimumDeviation(vector<int>& nums) {
        int n = nums.size(), mi = INT_MAX, res = INT_MAX;
        priority_queue<int> q;
        for (auto v : nums) {
            if (v & 1) v *= 2;
            q.push(v);
            mi = min(mi, v);
        }
        while (true) {
            int t = q.top(); q.pop();
            res = min(res, t - mi);
            if (t & 1) break;   // 奇数不能再除2 最大值不可能再变 结果也就不会更小
            t >>= 1;
            mi = min(mi, t);
            q.push(t);
        }
        return res;
    }
};
```
