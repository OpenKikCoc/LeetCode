## [比赛链接]()


### [1475. 商品折扣后的最终价格](https://leetcode-cn.com/problems/final-prices-with-a-special-discount-in-a-shop/)

找到 当前数后面比当前数小的第一个数 减去其值作为新值即可

```c++
    vector<int> finalPrices(vector<int>& prices) {
        int n = prices.size();
        vector<int> res;
        for(int i = 0; i < n; ++i) {
            int j = i;
            for(j = i+1; j < n; ++j)
                if(prices[j] <= prices[i]) break;
            res.push_back(prices[i]-((j<n)?prices[j]:0));
        }
        return res;
    }
```

可以不开新空间的

```c++
    vector<int> finalPrices(vector<int>& prices) {
        int n = prices.size();
        for(int i = 0; i < n; ++i) {
            for(int j = i+1; j < n; ++j)
                if(prices[j] <= prices[i]) {
                    prices[i] -= prices[j];
                    break;
                }
        }
        return prices;
    }
```

或者单调栈 递增栈 当栈顶比当前值小就弹出并设置 略



### [1476. 子矩形查询](https://leetcode-cn.com/problems/subrectangle-queries/)

数据范围小 暴力模拟即可

```c++
    vector<vector<int>> r;
    SubrectangleQueries(vector<vector<int>>& rectangle) {
        r = rectangle;
        
    }
    
    void updateSubrectangle(int row1, int col1, int row2, int col2, int newValue) {
        for(int i = row1; i <= row2; ++i)
            for(int j = col1; j <= col2; ++j)
                r[i][j] = newValue;
    }
    
    int getValue(int row, int col) {
        return r[row][col];
    }
```

### [1477. 找两个和为目标值且不重叠的子数组](https://leetcode-cn.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/)

自己比赛做法：记录前缀和 及该前缀和对应下标 存储合法区间到 ve 对ve排序后贪心即可 注意贪心条件：

 `(p.second-1 >= t1 || p.second-1+p.first <= s1)`   因为 第二个长度较长的区间 可以在 第一个长度较短区间 下标的前面。

```c++
    // 记录前缀和
    // 前缀和对应一个距离当前最近的下标 记录这个长度和起点 最后排序
    int minSumOfLengths(vector<int>& arr, int target) {
        int n = arr.size(), psum = 0;
        unordered_map<int, int> m;
        m[0] = -1;
        vector<pair<int, int>> ve;
        for(int i = 0; i < n; ++i) {
            psum += arr[i];
            if(m[psum-target]) {
                if(m[psum-target] == -1) m[psum-target] = 0;
                // cout <<i<<" "<<m[psum-target]-1<<endl;
                // 长度 i+1-m[psum-target]+1 起点m[psum-target]
                ve.push_back({i-m[psum-target]+1, m[psum-target]+1});
            }
            m[psum] = i+1;
        }
        sort(ve.begin(), ve.end());
        int s1 = -1, t1 = -1, s2 = -1, t2 = -1;
        for(auto p : ve) {
            //cout <<"start="<<p.second-1<<" len="<<p.first<<endl;
            if(s1 == -1) s1 = p.second-1, t1 = s1+p.first;
            else {
                if(s2 == -1 && (p.second-1 >= t1 || p.second-1+p.first <= s1)) {
                    s2 = p.second-1, t2 = s2+p.first;
                    break;
                }
            }
        }
        //cout <<s1<<" "<<t1<<" "<<s2<<" "<<t2<<endl;
        if(s1 == t1 || s2 == t2) return -1;
        return t1-s1+t2-s2;
    }
```

赛榜代码 dp [TAG]

```c++
    int f[100005];   // 每个以i结尾的 最短满足target的长度
    int minSumOfLengths(vector<int>& arr, int target) {
        int i = 0, j = -1, cursum = 0, n = arr.size();
        int res = 100005;
        
        for(int j = 0; j < n; ++j){
            cursum += arr[j];
            while(cursum > target) cursum -= arr[i++];   // 维护窗口
            int cur = 100005;
            if(cursum == target){
                cur = j-i+1;
                if(i) res = min(f[i-1]+cur,res);  
            }
            int pre = j && f[j-1] <100005 ? f[j-1] : 100005;
            f[j] = min(cur,pre);
        }
        return res<100005 ? res : -1 ;
    }
```



### [1478. 安排邮筒](https://leetcode-cn.com/problems/allocate-mailboxes/) [TAG]

[何逊的题解](https://leetcode-cn.com/problems/allocate-mailboxes/solution/dong-tai-gui-hua-shi-jian-fu-za-du-oknlognkong-jia/)

`f[i][j]` 表示前 i 个建筑用 j 个邮箱的最短距离和 预处理 `dis[i][j]` 为从 i 到 j 使用一个邮箱时的消耗

则 `f[i][j] = min(f[d][j-1] + dis[d+1][i])   [0 < k < i-1] `

意即： 以 d 为最后一段的分界线 最后一段为 d+1~i 的最小消耗

```c++
    long long f[105][105];
    long long dis[105][105];
public:
    int minDistance(vector<int>& houses, int k) {
        int n = houses.size();
        sort(houses.begin(), houses.end());
        for (int i = 1; i <= n; ++i){
            for (int j = i; j <= n; ++j){
                int p = (j - i) >> 1;
                int mid = i + p;
                int pos = houses[mid - 1];
                long long res = 0;
                for (int t = i; t <= j; ++t)
                    res += abs(houses[t - 1] - pos);
                dis[i][j] = res;
            }
        }
        memset(f, 0x3f, sizeof(f));
        f[0][0] = 0;
        for (int i = 1; i <= n; ++i){
            for (int t = 1; t <= i && t <= k; ++t){
                for (int j = i - 1; j >= 0; --j)
                    f[i][t] = min(f[i][t], f[j][t - 1] + dis[j + 1][i]);
            }
        }
        return f[n][k];
    }
// zqy1018
```

整理：

```c++
    int minDistance(vector<int>& houses, int k) {
        int n = houses.size();
        vector<vector<long long>> f(n+1, vector<long long>(k+1, INT_MAX));  // 这里初始化不能0x嗷
        vector<vector<long long>> d(n+1, vector<long long>(n+1));
        sort(houses.begin(), houses.end());
        for(int i = 1; i <= n; ++i) {
            for(int j = i; j <= n; ++j) {
                int mid = i + (j-i)/2;    // mid = i + ((j-i) >> 1);
                int pos = houses[mid-1];
                long long res = 0;
                for(int t = i; t <= j; ++t) res += abs(houses[t-1] - pos);
                d[i][j] = res;
            }
        }
        // f 初始化在前面
        f[0][0] = 0;
        for(int i = 1; i <= n; ++i)
            for(int t = 1; t <= i && t <= k; ++t)
                for(int j = 0; j <= i-1; ++j)
                    f[i][t] = min(f[i][t], f[j][t-1] + d[j+1][i]);
        return f[n][k];
    }
```

