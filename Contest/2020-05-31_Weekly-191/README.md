## [比赛链接](https://leetcode.cn/contest/weekly-contest-191/)


### [1464. 数组中两元素的最大乘积](https://leetcode.cn/problems/maximum-product-of-two-elements-in-an-array/)

暴力即可

```c++
    int maxProduct(vector<int>& nums) {
        int n = nums.size(), res = INT_MIN;
        for(int i = 0; i < n; ++i) {
            for(int j = i+1; j < n; ++j) {
                res = max(res, (nums[i]-1)*(nums[j]-1));
            }
        }
        return res;
    }
```


### [1465. 切割后面积最大的蛋糕](https://leetcode.cn/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/)

排序遍历即可

```c++
    int mod = 1e9+7;
    int maxArea(int h, int w, vector<int>& horizontalCuts, vector<int>& verticalCuts) {
        sort(horizontalCuts.begin(), horizontalCuts.end());
        sort(verticalCuts.begin(), verticalCuts.end());
        int n1 = horizontalCuts.size(), n2 = verticalCuts.size();
        int mxh = horizontalCuts[0], mxw = verticalCuts[0];
        for(int i = 1; i < n1; ++i) mxh = max(mxh, horizontalCuts[i] - horizontalCuts[i-1]);
        mxh = max(mxh, h - horizontalCuts[n1-1]);
        for(int i = 1; i < n2; ++i) mxw = max(mxw, verticalCuts[i] - verticalCuts[i-1]);
        mxw = max(mxw, w - verticalCuts[n2-1]);
        return ((long long)mxh%mod) * ((long long)mxw%mod) % mod;
    }
```

这样做起来更快些

```c++
    int maxArea(int h, int w, vector<int>& sh, vector<int>& sv) {
        sh.push_back(0);
        sh.push_back(h);
        sv.push_back(0);
        sv.push_back(w);
        sort(sh.begin(), sh.end());
        sort(sv.begin(), sv.end());
        int m1 = 0, m2 = 0;
        for (int i = 1; i < sh.size(); i++) {
            m1 = max(m1, sh[i] - sh[i - 1]);
        }
        for (int i = 1; i < sv.size(); i++) {
            m2 = max(m2, sv[i] - sv[i - 1]);
        }
        return (long long)m1 * m2 % 1000000007;
    }
```



### [1466. 重新规划路线](https://leetcode.cn/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/) 

单源最短路 如果 connections 的起点比终点距离近说明需要反向

```c++
    int minReorder(int n, vector<vector<int>>& connections) {
        vector<vector<int>> G(n);
        for(auto e : connections) {
            G[e[0]].push_back(e[1]);
            G[e[1]].push_back(e[0]);
        }
        vector<int> d(n, -1);
        d[0] = 0;
        queue<int> q;
        q.push(0);
        while(!q.empty()) {
            int u = q.front();
            q.pop();
            for(int v : G[u]) if(d[v] == -1) {
                d[v] = d[u] + 1;
                q.push(v);
            }
        }
        int res = 0;
        for(auto e : connections) res += d[e[0]] < d[e[1]];
        return res;
    }
```

可以直接压入方向 在跑最短路时统计

```c++
    int minReorder(int n, vector<vector<int>>& connections) {
        int ans = 0;
        vector<vector<int>> edges(n), dir(n);
        for (auto& c: connections) {
            edges[c[0]].push_back(c[1]);
            dir[c[0]].push_back(1);
            edges[c[1]].push_back(c[0]);
            dir[c[1]].push_back(0);
        }
        
        queue<int> q;
        q.push(0);
        vector<int> seen(n);
        seen[0] = 1;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            for (int i = 0; i < edges[u].size(); ++i) {
                int v = edges[u][i], d = dir[u][i];
                if (!seen[v]) {
                    q.push(v);
                    seen[v] = 1;
                    ans += d;
                }
            }
        }
        return ans;
    }
```

以及并查集解法 略

### [1467. 两个盒子中球的颜色数相同的概率](https://leetcode.cn/problems/probability-of-a-two-boxes-having-the-same-number-of-distinct-balls/) [TAG]

dp+组合数

重复做 todo

```c++
class Solution {
public:
    double getProbability(vector<int>& balls) {
        // 颜色数和球的数量
        const int k = balls.size();
        const int n = accumulate(balls.begin(),balls.end(),0)/2;
        // 预处理阶乘
        vector<double> fact;
        fact.push_back(1.0);
        for(int i=1;i<=2*n;++i){
            fact.push_back(fact[i-1] * i);
        }
        // 总的排列方法数
        double total = fact[2*n];
        for(auto ball:balls){ total /= fact[ball]; }
        // 动态规划
        vector<vector<double>> dp(2*n+1,vector<double>(2*k+1,0.0));
        dp[0][k] = 1.0;
        int num = 0;
        for(int i=0;i<k;++i) {
            vector<vector<double>> next(2*n+1,vector<double>(2*k+1,0.0));
            for(int j=0;j<=balls[i];++j){
                int trans = 0;
                trans = j==0?-1:trans;
                trans = j==balls[i]?1:trans;
                for(int front = 0; front <= 2*n; ++front)
                for(int color = 0; color <= 2*k; ++color){
                    if(dp[front][color] == 0) continue;
                    double ways = dp[front][color];
                    ways *= fact[front+j] / (fact[front] * fact[j]);
                    ways *= fact[num-front+balls[i]-j] / (fact[num-front] * fact[balls[i]-j]);
                    next[front+j][color+trans] += ways;
                }
            }
            swap(dp,next);
            num += balls[i];
        }
        return dp[n][k]/total;
    }
};

// mskadr
```
