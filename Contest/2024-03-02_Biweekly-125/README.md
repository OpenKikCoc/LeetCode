## [比赛链接](https://leetcode.cn/contest/biweekly-contest-125/)


### [3065. 超过阈值的最少操作数 I](https://leetcode.cn/problems/minimum-operations-to-exceed-threshold-value-i/)



```c++
class Solution {
public:
    int minOperations(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int idx = lower_bound(nums.begin(), nums.end(), k) - nums.begin();
        return idx;
    }
};
```


### [3066. 超过阈值的最少操作数 II](https://leetcode.cn/problems/minimum-operations-to-exceed-threshold-value-ii/)

模拟即可

```c++
class Solution {
public:
    using LL = long long;
    
    // 题目确保答案一定存在
    int minOperations(vector<int>& nums, int k) {
        priority_queue<LL, vector<LL>, greater<LL>> heap;
        for (auto x : nums)
            heap.push(x);
        
        int res = 0;
        while (heap.size() >= 2 && heap.top() < k) {
            LL a = heap.top(); heap.pop();
            LL b = heap.top(); heap.pop();
            heap.push(min(a, b) * 2 + max(a, b));
            res ++ ;
        }
        return res;
    }
};
```

### [3067. 在带权树网络中统计可连接服务器对数目 ](https://leetcode.cn/problems/count-pairs-of-connectable-servers-in-a-weighted-tree-network/) [TAG]

题目数据范围接受 n^2 暴力

边维护边统计

```c++
class Solution {
public:
    // 显然不能枚举两个端点，这样复杂度爆炸...因为需要遍历所有中间点来统计答案
    // 考虑枚举每个点作为中间点 可以有多少个数对 => 需要知道每个点到其他点的距离汇总信息
    // ... 又因为 题目要求的本质是两个不同子树的信息统计，之前的代码只适用于同一节点的固定两侧 无法细拆
    //
    // 考虑直接暴力
    
    const static int N = 1010, M = 2010;
    
    int h[N], e[M], w[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int ss;
    
    // 求某个节点
    int dfs(int u, int pa, int sum) {
        int cnt = sum % ss == 0;        // 当前节点自己 如果符合要求则+1
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i], c = w[i];
            if (j == pa)
                continue;
            
            cnt += dfs(j, u, sum + c);  // 往子树延伸 统计总数
        }
        return cnt;
    }
    
    
    vector<int> countPairsOfConnectableServers(vector<vector<int>>& edges, int signalSpeed) {
        init();
        for (auto & e : edges)
            add(e[0], e[1], e[2]), add(e[1], e[0], e[2]);
        
        this->ss = signalSpeed;
        
        vector<int> res;
        for (int i = 0; i < edges.size() + 1; ++ i ) {
            int sum = 0, tot = 0;       // 边遍历边统计 不需要/2
            for (int j = h[i]; ~j; j = ne[j]) {
                int v = e[j], c = w[j];
                // cnt 为该独立子树下的、到当前节点的距离为 ss 倍数的节点总数...
                int cnt = dfs(v, i, c);
                tot += cnt * sum;   // ATTENTION 本颗子树的数量和 * 前面所有子树的数量和
                sum += cnt;         // 维护
            }
            res.push_back(tot);
        }
        
        return res;
    }
};
```

### [3068. 最大节点价值之和](https://leetcode.cn/problems/find-the-maximum-sum-of-node-values/) [TAG]

思维 trick

TODO: dp 思维

```c++
class Solution {
public:
    // 由题意推导可知 本质上任意距离的两个节点间都可以执行一次操作 (操作链间接实现)
    // 操作后每个数字都会发生变化
    // => 则 根据变化量 每次选择增加最多的数字进行操作即可【需要成对】
    
    using LL = long long;
    
    long long maximumValueSum(vector<int>& nums, int k, vector<vector<int>>& edges) {
        LL res = 0;
        priority_queue<int> heap;
        for (auto x : nums) {
            res += x;
            int diff = (x ^ k) - x;
            heap.push(diff);    // ATTENTION 即便是负数也要加进去，因为最后可能 +/- 组合成一对
        }
        
        while (heap.size() >= 2) {
            int a = heap.top(); heap.pop();
            int b = heap.top(); heap.pop();
            if (a + b > 0)
                res += a + b;
            else
                break;
        }
        return res;
    }
};
```
