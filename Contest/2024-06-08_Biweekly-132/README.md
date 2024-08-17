## [比赛链接](https://leetcode.cn/contest/biweekly-contest-132/)


### [3174. 清除数字](https://leetcode.cn/problems/clear-digits/)



```c++
class Solution {
public:
    string clearDigits(string s) {
        int n = s.size();
        string res;
        for (int i = 0; i < n; ++ i )
            if (isdigit(s[i]))
                res.pop_back();
            else
                res.push_back(s[i]);
        return res;
    }
};
```


### [3175. 找到连续赢 K 场比赛的第一位玩家](https://leetcode.cn/problems/find-the-first-player-to-win-k-games-in-a-row/)



```c++
class Solution {
public:
    // 某一个值 作为winer是有时效的 具体的实效 发生在当前位置进入以及后面第一个
    const static int N = 1e5 + 10;
    
    int ws[N];
    
    int findWinningPlayer(vector<int>& skills, int k) {
        int n = skills.size();
        memset(ws, -1, sizeof ws);
        int last = 0;    // ATTENTION ws[0] = -1
        for (int i = 1; i < n; ++ i ) {
            if (skills[i] > skills[last])
                last = i;
            ws[i] = last;
        }
        
        for (int i = 0; i < n; ++ i ) {
            if (ws[i] == -1)
                continue;
            int j = i;
            while (j < n && ws[j] == ws[i])
                j ++ ;
            if (j - i >= k)
                return ws[i];
            i = j - 1;
        }
        
        return last;
    }
};
```

### [3176. 求出最长好子序列 I](https://leetcode.cn/problems/find-the-maximum-length-of-a-good-subsequence-i/)

同4

```c++
// 暴力版
const static int N = 500 + 10, M = 55;

int f[2][N][M];

class Solution {
public:
    
    vector<int> xs;
    
    int get(int x) {
        return lower_bound(xs.begin(), xs.end(), x) - xs.begin();
    }
    
    int maximumLength(vector<int>& nums, int k) {
        xs.clear();
        for (auto x : nums)
            xs.push_back(x);
        sort(xs.begin(), xs.end());
        xs.erase(unique(xs.begin(), xs.end()), xs.end());
 
        int n = nums.size();
        memset(f, 0, sizeof f);
        f[1 & 1][get(nums[0])][0] = 1;
        for (int i = 2; i <= n; ++ i ) {
            int t = get(nums[i - 1]);
            for (int j = 0; j < N; ++ j )
                for (int k = 0; k < M; ++ k )
                    // 第i个本身不取
                    f[i & 1][j][k] = max(f[i & 1][j][k], f[(i - 1) & 1][j][k]);
            
            for (int j = 0; j < N; ++ j )
                for (int k = 0; k < M; ++ k ) {
                    if (t != j) {
                        if (k)
                            f[i & 1][t][k] = max(f[i & 1][t][k], f[(i - 1) & 1][j][k - 1] + 1);
                    } else
                        f[i & 1][t][k] = max(f[i & 1][t][k], f[(i - 1) & 1][j][k] + 1);
                }
        }
        
        int res = 0;
        for (int i = 0; i < N; ++ i )
            for (int j = 0; j <= k; ++ j )
                res = max(res, f[n & 1][i][j]);
        return res;
    }
};
```

### [3177. 求出最长好子序列 II](https://leetcode.cn/problems/find-the-maximum-length-of-a-good-subsequence-ii/)

第一步 将前述代码压掉一个维度 形式转化 (仍然 TLE)

```c++
const static int N = 5e3 + 10, M = 55;

// int f[2][N][M];
// 考虑优化 f[i][j][k] = max(f[i - 1][j][k])
//        f[i][t][k] = max(f[i][t][k], f[i - 1][j][k - (j != t)] + 1)
//        本质和上一轮的 j 没有关系...考虑直接维护每轮的 [最大值+次大值]?
//        f[i][t][k] = max(f[i][t][k], max[i-1][k-1] 排除 f[i-1][t][k-1] 加回 f[i-1][t][k] + 1)
//  =>    g = max(f[t][k], sum[i-1][k-1] - f[t][k-1] + f[t][k] + 1)

int f[N][M];

class Solution {
public:
    
    vector<int> xs;
    
    int get(int x) {
        return lower_bound(xs.begin(), xs.end(), x) - xs.begin();
    }
    
    int maximumLength(vector<int>& nums, int k) {
        xs.clear();
        for (auto x : nums)
            xs.push_back(x);
        sort(xs.begin(), xs.end());
        xs.erase(unique(xs.begin(), xs.end()), xs.end());
 
        int n = nums.size();
        memset(f, 0, sizeof f);
        f[get(nums[0])][0] = 1;
        for (int i = 2; i <= n; ++ i ) {
            int t = get(nums[i - 1]);
            
            for (int k = M - 1; k >= 0; -- k ) {
                int nxt = f[t][k];
                for (int j = 0; j < N; ++ j ) {
                    if (j != t) {
                        if (k)
                            nxt = max(nxt, f[j][k - 1] + 1);
                    } else {
                        nxt = max(nxt, f[j][k] + 1);
                    }
                }
                f[t][k] = nxt;
            }
        }
        
        int res = 0;
        for (int i = 0; i < N; ++ i )
            for (int j = 0; j <= k; ++ j )
                res = max(res, f[i][j]);
        return res;
    }
};
```

本质上是需要关心上一个轮次的 [最值] 借助额外数据结构维护即可

=> 进阶推导: 只需要维护最大值，对结果正确性不会有影响

预处理优化 DP

```c++
const static int N = 5e3 + 10, M = 55;

// int f[2][N][M];
// 考虑优化 f[i][j][k] = max(f[i - 1][j][k])
//        f[i][t][k] = max(f[i][t][k], f[i - 1][j][k - (j != t)] + 1)
//        本质和上一轮的 j 没有关系...考虑直接维护每轮的 [最大值+次大值]?
//        f[i][t][k] = max(f[i][t][k], max[i-1][k-1] 排除 f[i-1][t][k-1] 加回 f[i-1][t][k] + 1)
//  =>    g = max(f[t][k], sum[i-1][k-1] - f[t][k-1] + f[t][k] + 1)

int f[N][M];

class Solution {
public:
    
    vector<int> xs;
    
    int get(int x) {
        return lower_bound(xs.begin(), xs.end(), x) - xs.begin();
    }

    struct Node {
        int mx1, p1, mx2, p2;
        Node() {
            mx1 = mx2 = p1 = p2 = -1;
        }
        void update(int mx, int p) {
            // ATTENTION 实际上不需要维护多个
            // 因为即便最大的值和当前 p 相同，由于 f[x][k] >= f[x][k-1] (思考)
            // 取用后者实际上并不会影响结果正确性
            if (mx > mx1) {
                mx1 = mx, p1 = p;
                return;
            }

            // 优先特判 p 相同的情况，可以整体简化逻辑
            if (p1 == p) {
                mx1 = max(mx1, mx);
            } else if (p2 == p) {
                mx2 = max(mx2, mx);
                if (mx1 < mx2)
                    swap(mx1, mx2), swap(p1, p2);
            } else if (mx1 < mx) {
                mx2 = mx1;
                p2 = p1;
                mx1 = mx;
                p1 = p;
            } else if (mx2 < mx) {
                mx2 = mx;
                p2 = p;
            }
        }

        int get(int t) {
            if (t != p1)
                return mx1;
            return mx2;
        }
    };

    Node hk[M];
    
    int maximumLength(vector<int>& nums, int k) {
        xs.clear();
        for (auto x : nums)
            xs.push_back(x);
        sort(xs.begin(), xs.end());
        xs.erase(unique(xs.begin(), xs.end()), xs.end());
 
        int n = nums.size();
        memset(f, 0, sizeof f);
        f[get(nums[0])][0] = 1;
        hk[0].update(1, get(nums[0]));  // ATTENTION k=0, t=get(nums[0]) 顺序不能错

        for (int i = 2; i <= n; ++ i ) {
            int t = get(nums[i - 1]);
            
            for (int k = M - 1; k >= 0; -- k ) {
                // 不选 以及选和之前一样的
                int nxt = max(f[t][k], f[t][k] + 1);
                // 选 需要在之前的里面挑一个最大的  挑的时候有限制
                // => 假设按照 k 维护每个轮次，对于当前 k 只需要使用 k-1 轮次
                if (k)
                    nxt = max(nxt, hk[k - 1].get(t) + 1);
                // for (int j = 0; j < N; ++ j )
                //     if (j != t) {
                //         if (k)
                //             nxt = max(nxt, f[j][k - 1] + 1);
                //     }

                f[t][k] = nxt;
                hk[k].update(nxt, t);
            }
        }
        
        int res = 0;
        // for (int i = 0; i < N; ++ i )
        //     for (int j = 0; j <= k; ++ j )
        //         res = max(res, f[i][j]);
        for (int j = 0; j <= k; ++ j )
            res = max(res, hk[j].get(-1));
        return res;
    }
};
```

