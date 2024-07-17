## [比赛链接](https://leetcode.cn/contest/weekly-contest-188/)


### [1441. 用栈操作构建数组](https://leetcode.cn/problems/build-an-array-with-stack-operations/)

根据操作完成后剩下的序列构造操作数组 起始就是遍历数字 然后没有的就Push再Pop有的直接Push

```c++
class Solution {
public:
    vector<string> buildArray(vector<int>& target, int n) {
        vector<string> res;
        int sz = target.size();
        // if(!sz) return res;
        int p = 1;
        for(int i = 0; i < sz; ++i) {
            while(p < target[i]) {
                res.push_back("Push");
                res.push_back("Pop");
                ++p;
            }
            res.push_back("Push");
            ++p;
        }
        return res;
    }
};
```


### [5405. 形成两个异或相等数组的三元组数目](https://leetcode.cn/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/)

前缀异或数组 然后遍历即可

```c++
class Solution {
public:
    int countTriplets(vector<int>& arr) {
        int n = arr.size();
        if(!n) return 0;
        vector<int> xorv(n+1);
        //xorv[0] = arr[0];
        for(int i = 1; i <= n; ++i) xorv[i] = xorv[i-1]^arr[i-1];
        int res = 0;
        for(int i = 1; i < n; ++i) {
            for(int j = i+1; j <= n; ++j) {
                for(int k = j; k <= n; ++k) {
                    if((xorv[j-1]^xorv[i-1]) == (xorv[k]^xorv[j-1])) ++res;
                }
            }
        }
        return res;
    }
};
```

评论区有O(n^2)解法 本质是只要固定了左右两端 则这段内部如何划分k都是一样的

> a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1],
>
> b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k],
>
> 那么根据位运算的规则， a^b=arr[i]^ arr[i + 1] ^ ... ^ arr[k]，即i到k。
> 此外，根据位运算，如果a^b==0,那么a==b，这是逆否命题，即反推也成立。

```c++
class Solution {
public:
    int countTriplets(vector<int>& arr) {
        int n = arr.size(),res = 0;
        for(int i = 0; i < n; ++i){
            int t = arr[i];
            for(int j = i+1; j < n; ++j){
                t ^= arr[j];
                if(t == 0){
                    res += j-i;
                }
            }
        }
        return res;
    }
};
```

### [5406. 收集树上所有苹果的最少时间](https://leetcode.cn/problems/minimum-time-to-collect-all-apples-in-a-tree/)

最少步数遍历树上所有指定点

自己做法是 从所有指定点向上遍历同时记录步数消耗 O(n)即可

```c++
class Solution {
public:
    int minTime(int n, vector<vector<int>>& edges, vector<bool>& hasApple) {
        vector<vector<int>> es(n);
        vector<int> fa(n), rank(n);
        for(auto e : edges) {
            es[e[0]].push_back(e[1]);
            fa[e[1]] = e[0];
        }
      	/* 
      			比赛时这里多写了个bfs求rank 实际上是没有必要的
      	*/
        vector<bool> vis(n);
        int v, res = 0;
        vis[0] = true;
        for(int i = 0; i < n; ++i) {
            if(hasApple[i] && !vis[i] && i) {
                v = i;
              	/*
                  if(!vis[fa[v]]) {
                      while(!vis[fa[v]]) {
                          res += 2;
                          vis[fa[v]] = true;
                          v = fa[v];
                      }
                      res += 2;
                  } else {
                      res += 2;
                  }
                */
                while(!vis[fa[v]]) {
                    res += 2;
                    vis[fa[v]] = true;
                    v = fa[v];
                }
                res += 2;
                vis[i] = true;
            }
        }
        return res;
    }
};
```

赛榜做法：

第一次dfs记录该节点的下面是否有必须访问到的节点 是的话标记

第二次dfs遍历节点记录更新res

```c++
class Solution {
private:
    vector<vector<int>> edges;
    vector<bool> has;
    int ans;
        
public:
    void dfs1(int u, int fa) {
        // cout << "dfs1" << u << " " << fa << "\n";
        for (int v: edges[u]) {
            if (v != fa) {
                dfs1(v, u);
                has[u] = has[u] | has[v];
            }
        }
    }
    
    void dfs2(int u, int fa) {
        // cout << "dfs1" << u << " " << fa << "\n";
        for (int v: edges[u]) {
            if (v != fa && has[v]) {
                ++ans;
                dfs2(v, u);
                ++ans;
            }
        }
    }
    
    int minTime(int n, vector<vector<int>>& _edges, vector<bool>& hasApple) {
        edges.resize(n);
        has = hasApple;
        for (const auto& e: _edges) {
            edges[e[0]].push_back(e[1]);
            edges[e[1]].push_back(e[0]);
        }
        dfs1(0, -1);
        
        ans = 0;
        dfs2(0, -1);
        return ans;
    }
};
// zerotrac2
```



### [5407. 切披萨的方案数](https://leetcode.cn/problems/number-of-ways-of-cutting-a-pizza/)

rows * cols的矩阵 某些坐标有Apple 每次可以沿 【垂直/水平】 切一刀（【左/上】至少包含1个apple）然后将【左/上】拿出去 剩下的自问题 总共切 k-1 次分成 k 个都有苹果的块

因为使用全局变量 但是for初始化0的时候没有处理好边界导致wa好几次

```c++
int dp[55][55][15]; // 以 [i,j]为左上角 *再切* k刀的方案数
int s[55][55];      // 以 [i,j]为左上角 包含苹果个数
const int MOD = 1e9+7;

class Solution {
public:
    int ways(vector<string>& pizza, int k) {
        int m = pizza.size(), n = pizza[0].size();
        for(int i = 0; i < 55; ++i) {
            for(int j = 0; j < 55; ++j) {
                s[i][j] = 0;
                for(int t = 0; t < 15; ++t) {
                    dp[i][j][t] = 0;
                }
            }
        }
        for(int i = m; i > 0; --i) {
            for(int j = n; j > 0; --j) {
                s[i][j] = s[i+1][j] + s[i][j+1] - s[i+1][j+1] + (pizza[i-1][j-1] == 'A');
            }
        }
        
        for(int i = m; i > 0; --i) {
            for(int j = n; j > 0; --j) {
                if(s[i][j] == 0) continue;
                // 剩下
                //if(s[i][j]) 
                dp[i][j][0] = 1;
                // t < k
                for(int t = 1; t < k; ++t) {
                    for(int x = i+1; x <= m; ++x) {
                        if(s[i][j] - s[x][j]) dp[i][j][t] = (dp[i][j][t] + dp[x][j][t-1]) % MOD;
                    }
                    for(int y = j+1; y <= n; ++y) {
                        if(s[i][j] - s[i][y]) dp[i][j][t] = (dp[i][j][t] + dp[i][y][t-1]) % MOD;
                    }
                }
            }
        }
        return dp[1][1][k-1];
    }
};
```

lc也可以声明局部数组 避免前面初始化不完整的情况

```c++
class Solution {
public:
    int dp[55][55][15]; // 以 [i,j]为左上角 *再切* k刀的方案数
    int s[55][55];      // 以 [i,j]为左上角 包含苹果个数
    const int MOD = 1e9+7;
    int ways(vector<string>& pizza, int k) {
        int m = pizza.size(), n = pizza[0].size();
        for(int i = m; i > 0; --i)
            for(int j = n; j > 0; --j)
                s[i][j] = s[i+1][j] + s[i][j+1] - s[i+1][j+1] + (pizza[i-1][j-1] == 'A');
        
        for(int i = m; i > 0; --i)
            for(int j = n; j > 0; --j) {
                if(s[i][j] == 0) continue;
                dp[i][j][0] = 1;
                for(int t = 1; t < k; ++t) {
                    for(int x = i+1; x <= m; ++x)
                        if(s[i][j] - s[x][j]) dp[i][j][t] = (dp[i][j][t] + dp[x][j][t-1]) % MOD;
                    for(int y = j+1; y <= n; ++y)
                        if(s[i][j] - s[i][y]) dp[i][j][t] = (dp[i][j][t] + dp[i][y][t-1]) % MOD;
                }
            }
        return dp[1][1][k-1];
    }
};
```

