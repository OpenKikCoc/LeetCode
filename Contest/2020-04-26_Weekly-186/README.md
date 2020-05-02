## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-186/)



### [1422. 分割字符串的最大得分](https://leetcode-cn.com/problems/maximum-score-after-splitting-a-string/)

某个idx 左边多少个0右边多少个1

```c++
class Solution {
public:
    int maxScore(string s) {
        int n = s.size();
        vector<int> zero(n+1), one(n+1);
        for(int i = 0; i < n; ++i) {
            if(s[i] == '0') zero[i+1] = zero[i]+1;
            else zero[i+1] = zero[i];
            if(s[n-i-1] == '1') one[n-i-1] = one[n-i] + 1;
            else one[n-i-1] = one[n-i];
        }
        int res = 0;
        for(int i = 1; i < n; ++i) {
            res = max(res, zero[i]+one[i]);
        }
        return res;
    }
};
```



### [1423. 可获得的最大点数](https://leetcode-cn.com/problems/maximum-points-you-can-obtain-from-cards/)

最后留下连续n-k个

也有解法求前缀后缀和 最后拼k个

```c++
class Solution {
public:
    int res, v, cnt;
    int maxScore(vector<int>& cardPoints, int k) {
        int n = cardPoints.size();
        vector<int> sum(n+1);
        res = 0;
        for(int i = 0; i < n; ++i) {
            sum[i+1] = sum[i]+cardPoints[i];
        }
        res = sum[n];
        if(k >= n) return res;
        // 剩下n-k个连续数 这n-k个最小就可以
        int minv = INT_MAX;
        for(int i = n-k; i <= n; ++i) {
            minv = min(minv, sum[i] - sum[i+k-n]);
        }
        return res - minv;
    }
};
```



### [1424. 对角线遍历 II](https://leetcode-cn.com/problems/diagonal-traverse-ii/)

斜向遍历

写了priority_queue的 时间10% 

```c++
class Solution {
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& nums) {
        vector<int> res;
        priority_queue<pair<int, int>> pq;
        for(int i = 0; i < nums.size(); ++i) {
            for(int j = 0; j < nums[i].size(); ++j) {
                pq.push({i+j, j});
            }
        }
        while(!pq.empty()) {
            auto p = pq.top();
            pq.pop();
            res.push_back(nums[p.first-p.second][p.second]);
        }
        reverse(res.begin(), res.end());
        return res;
    }
};

        /* 这个还是太暴力 遇空跳过O(n^2) T了
        int maxc = 0;
        for(int i = 0; i < nums.size(); ++i) {
            maxc = max(maxc, int(nums[i].size()));
            int p = i, q = 0;
            res.push_back(nums[p][q]);
            while(p > 0) {
                --p;++q;
                if(nums[p].size() > q) res.push_back(nums[p][q]);
            }
        }
        for(int i = 1; i < maxc; ++i) {
            int p = nums.size()-1, q = i;
            if(nums[p].size() > q) res.push_back(nums[p][q]);
            
            while(p > 0) {
                --p;++q;
                if(q >= maxc) break;
                if(nums[p].size() > q) res.push_back(nums[p][q]);
            }
        }
        */
```

但其实还可以优化 直接使用vector 因为从上到下存行 行列之和相同时 扫描顺序从下到上

```c++
class Solution {
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& nums) {
        vector<int> res;
        vector<int> pq[200050];	// max(nums.size()+nums[i].size())
        for(int i = 0; i < nums.size(); ++i) {
            for(int j = 0; j < nums[i].size(); ++j) {
                pq[i+j].push_back(nums[i][j]);
            }
        }
        for(int i = 0; i < 200000; ++i) {
          	if(pq[i].size() == 0) continue;
          	for(int j = pq[i].size()-1; j >= 0; --j) {
              	res.push_back(pq[i][j]);
            }
        }
        return res;
    }
};
```

### [1425. 带限制的子序列和](https://leetcode-cn.com/problems/constrained-subsequence-sum/)

间隔小于等于k的子序列和最大值

暴力O(n*k)超时 可以单调栈维护每个idx前面k个数

下面是借助multiset实现 找到前k个的最大值

```c++
class Solution {
public:
    int n;
    int maxv = INT_MIN, v;
    int constrainedSubsetSum(vector<int>& nums, int k) {
        n = nums.size();
        vector<int> dp(n+1);
        int maxv = INT_MIN;
        multiset<int> s;
        for(int i = 0; i < n; ++i) {
            dp[i] = nums[i];
            if(s.size() > k) s.erase(dp[i-k-1]);
            if(!s.empty()) {
                auto it = --s.end();
                dp[i] = max(dp[i], nums[i] + *it);
            }
            maxv = max(maxv, dp[i]);
            s.insert(dp[i]);
        }
        
        return maxv;
    }
};
```

