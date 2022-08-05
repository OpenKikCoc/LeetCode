## [比赛链接](https://leetcode.cn/contest/biweekly-contest-82/)


### [2331. 计算布尔二叉树的值](https://leetcode.cn/problems/evaluate-boolean-binary-tree/)



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool evaluateTree(TreeNode* root) {
        if (!root)
            return true;
        if (root->val == 0)
            return false;
        else if (root->val == 1)
            return true;
        else if (root->val == 2) {
            return evaluateTree(root->left) || evaluateTree(root->right);
        } else if (root->val == 3) {
            return evaluateTree(root->left) && evaluateTree(root->right);
        }
        return true;  // useless
    }
};
```


### [2332. 坐上公交的最晚时间](https://leetcode.cn/problems/the-latest-time-to-catch-a-bus/) [TAG]

非常有意思的模拟

**优雅的双指针实现**

```c++
class Solution {
public:
    int latestTimeCatchTheBus(vector<int>& b, vector<int>& p, int cap) {
        sort(b.begin(), b.end()); sort(p.begin(), p.end());
        int n = b.size(), m = p.size();
        
        int j = 0, c = 0;   // ATTENTION: 置于外部的细节
        for (int i = 0; i < n; ++ i ) {
            c = cap;        // ATTENTION: 使用外部变量
            while (j < m && p[j] <= b[i] && c)
                j ++ , c -- ;
        }
        j -- ;
        
        int res;
        if (c)  // 车装不满所有人 则可以直接从最后一个车的发车时间开始往前
            res = b.back();
        else    // 否则在最后一个可以上车的人的时间往前
            res = p[j];     // 注意这里直接赋值 p[j] 而不是 p[j]-1 是为了后面 while 好写
        
        while (j >= 0 && p[j] == res)
            res -- , j -- ;
        
        return res;
    }
};
```

### [2333. 最小差值平方和](https://leetcode.cn/problems/minimum-sum-of-squared-difference/) [TAG]

二分找阈值

```c++
class Solution {
public:
    using LL = long long;
    
    long long minSumSquareDiff(vector<int>& nums1, vector<int>& nums2, int k1, int k2) {
        int n = nums1.size(), k = k1 + k2;
        vector<LL> d(n);
        for (int i = 0; i < n; ++ i )
            d[i] = abs(nums1[i] - nums2[i]);
        
        int l = 0, r = 1e9; // ATTENTION r
        while (l < r) {
            int mid = l + (r - l) / 2;
            LL s = 0;
            for (auto x : d)
                if (x >= mid)
                    s += x - mid;
            if (s > k)
                l = mid + 1;
            else
                r = mid;
        }
        
        // 当前的 l 能够实现不超过 k 的消耗
        if (!l)
            return 0;   // needed
        
        LL res = 0, tot = k;
        for (auto x : d)
            if (x >= l)
                tot -= x - l;
        // tot 为剩余
        
        for (auto x : d)
            if (x >= l) {
                // 较大的部分看能减多少
                LL t = l - min(1ll, max(0ll, tot -- )); // ATTENTION: trick 写法
                res += t * t; 
            } else
                // 较小的部分直接加
                res += x * x;
        
        return res;
    }
};
```

贪心 细节计算

```c++
class Solution {
public:
    using LL = long long;
    
    long long minSumSquareDiff(vector<int>& nums1, vector<int>& nums2, int k1, int k2) {
        int n = nums1.size(), k = k1 + k2;
        vector<LL> d(n);
        for (int i = 0; i < n; ++ i )
            d[i] = abs(nums1[i] - nums2[i]);
        
        LL res = 0, sum = 0;
        for (int i = 0; i < n; ++ i )
            sum += d[i], res += d[i] * d[i];
        
        d.push_back(0); // 哨兵
        sort(d.begin(), d.end(), greater<int>());   // 从大到小排序
        
        if (sum <= k)
            return 0;   // needed 否则后面 for-loop 会越界
        
        // 从前往后削峰，看能削多少
        for (int i = 0; ; ++ i ) {
            LL x = d[i], cost = (d[i] - d[i + 1]) * (i + 1);
            res -= x * x;
            if (cost <= k) {
                k -= cost;
                continue;
            }
            x -= k / (i + 1); // 大一的数值
            // ATTENTION: 细节计算
            LL a = k % (i + 1), b = i + 1 - a;
            res += a * (x - 1) * (x - 1) + b * x * x;
            break;
        }
        
        return res;
    }
};
```



### [2334. 元素值大于变化阈值的子数组](https://leetcode.cn/problems/subarray-with-elements-greater-than-varying-threshold/) [TAG]

较显然的有单调栈做法

```c++
class Solution {
public:
    int validSubarraySize(vector<int>& nums, int threshold) {
        int n = nums.size();
        vector<int> l(n, -1), r(n, n);
        stack<int> st;
        // 考虑某一个区间，受该区间内最小的值影响
        // 那么去找某个位置作为最小的值可以延伸的左右边界
        {
            for (int i = n - 1; i >= 0; -- i ) {
                while (st.size() && nums[st.top()] > nums[i]) {
                    l[st.top()] = i;
                    st.pop();
                }
                st.push(i);
            }
            while (st.size())
                st.pop();
        }
        {
            for (int i = 0; i < n; ++ i ) {
                while (st.size() && nums[st.top()] > nums[i]) {
                    r[st.top()] = i;
                    st.pop();
                }
                st.push(i);
            }
            while (st.size())
                st.pop();
        }
        
        for (int i = 0; i < n; ++ i ) {
            int lx = l[i], rx = r[i];
            int k = rx - lx - 1;
            if (nums[i] > threshold / k)
                return k;
        }
        return -1;
    }
};
```

**另有并查集思录**

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    int fa[N], sz[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            fa[i] = i, sz[i] = 1;
    }
    int find(int x) {
        if (fa[x] != x)
            fa[x] = find(fa[x]);
        return fa[x];
    }
    
    int validSubarraySize(vector<int>& nums, int threshold) {
        init();
        
        vector<PII> xs;
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            xs.push_back({nums[i], i});
        
        sort(xs.begin(), xs.end());
        // ATTENTION: 思维 从大到小去逐个合并
        for (int i = n - 1; i >= 0; -- i ) {
            int pi = xs[i].second, pj = find(pi + 1);   // ATTENTION 细节
            fa[pi] = pj;
            sz[pj] += sz[pi];
            if (xs[i].first > threshold / (sz[pj] - 1)) // -1 cause we link n-th when i=n-1
                return sz[pj] - 1;
        }
        return -1;
    }
};
```

