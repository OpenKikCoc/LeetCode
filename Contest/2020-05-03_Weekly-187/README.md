## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-187/)


### [1436. 旅行终点站](https://leetcode-cn.com/problems/destination-city/)

s->t的数组 求最终的t

本质是记录状态 m[i] = 1是作为了起点 2是终点 3是中间点

```c++
class Solution {
public:
    string destCity(vector<vector<string>>& paths) {
        unordered_map<string, int> m;
        for(auto es : paths) {
            m[es[0]] += 1;
            m[es[1]] += 2;
        }
        string res;
        for(auto v : m) {
            if(v.second == 2) res = v.first;
        }
        return res;
    }
};
```


### [1437. 是否所有 1 都至少相隔 k 个元素](https://leetcode-cn.com/problems/check-if-all-1s-are-at-least-length-k-places-away/)

O(n) 扫描 记录

```c++
class Solution {
public:
    bool kLengthApart(vector<int>& nums, int k) {
        int l = -100005;
        int n = nums.size();
        for(int i = 0; i < n; ++i) {
            if(nums[i] == 1) {
                if(i-l-1 < k) return false;
                l = i;
            }
        }
        return true;
    }
};
```

### [1438. 绝对差不超过限制的最长连续子数组](https://leetcode-cn.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/)*

连续子数组的最大最小值之差的绝对值不超过limit

比赛数据比较水 强行加了个check过了 **但是这样的做法并不对**：

```c++
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        int n = nums.size();
        int res = 0, minv = INT_MAX, maxv = INT_MIN;
        for(auto v : nums) {
            if(v > maxv) maxv = v;
            if(v < minv) minv = v;
        }
        //cout <<maxv <<" "<<minv<<endl;
        if(maxv - minv <= limit) return n;
        for(int i = 0; i < n; ++i) {
            minv = maxv = nums[i];
            int j = i+1;
            for(; j < n; ++j) {
                if(nums[j] < minv) minv = nums[j];
                if(nums[j] > maxv) maxv = nums[j];
                if(maxv - minv > limit) break;
            }
            res = max(res, j-i);
        }
        return res;
    }
};
```

滑动窗口：

```c++
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        int n = nums.size(), ans = 0;
        multiset<int> ms;
        for(int L = 0, R = 0; L < n; ++L){
            while(R < n){
                ms.insert(nums[R]);
                if(*ms.rbegin() - *ms.begin() > limit){
                    ms.erase(ms.find(nums[R]));
                    break;
                }
                ++R;
            }
            ans = max(R - L, ans);
            ms.erase(ms.find(nums[L]));
        }
        return ans;
    }
};
```



#### [1439. 有序矩阵中的第 k 个最小数组和](https://leetcode-cn.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/)*

任意一行选一个数 求第k小

解决办法：

1. 二分数组和 求个数 个数比k个大就缩小右边界 并不友好 

2. 维护小顶堆 每次取出一个组合就把这个后面可拓展的组合全部加入堆 使用set对组合去重 （参考算法竞赛进阶指南做法

todo

```c++
struct dwell {
    vector<int> pos;
    int sum;
    dwell(const vector<int>& _pos, int _sum): pos(_pos), sum(_sum) {}
    bool operator< (const dwell& that) const {
        return sum > that.sum;
    }
};

class Solution {
public:
    int kthSmallest(vector<vector<int>>& mat, int k) {
        int m = mat.size(), n = mat[0].size();
        
        auto getsum = [&](const vector<int>& v) {
            int ret = 0;
            for (int i = 0; i < m; ++i) {
                ret += mat[i][v[i]];
            }
            return ret;
        };
        
        set<vector<int>> seen;
        
        vector<int> init(m, 0);
        seen.insert(init);
        priority_queue<dwell> q;
        q.emplace(init, getsum(init));
        for (int _ = 0; _ < k - 1; ++_) {
            auto [pos, sum] = q.top();
            q.pop();
            for (int i = 0; i < m; ++i) {
                if (pos[i] + 1 < n) {
                    ++pos[i];
                    if (!seen.count(pos)) {
                        q.emplace(pos, getsum(pos));
                        seen.insert(pos);
                    }
                    --pos[i];
                }
            }
        }
        
        auto fin = q.top();
        return fin.sum;
    }
};
// zerotrac2  
```
