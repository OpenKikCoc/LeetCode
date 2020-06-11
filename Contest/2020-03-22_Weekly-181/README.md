## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-181/)


### [1389. 按既定顺序创建目标数组](https://leetcode-cn.com/problems/create-target-array-in-the-given-order/)

在index[i]插入nums[i]

```c++
class Solution {
public:
    vector<int> createTargetArray(vector<int>& nums, vector<int>& index) {
        int n = nums.size(), has = -1;
        vector<int> res(n);
        for(int i = 0; i < n; ++i) {
            for(int j = has + 1; j > index[i]; --j) {
                res[j] = res[j-1];
            }
            res[index[i]] = nums[i];
            ++has;
        }
        return res;
    }
};
```

或者

```c++
class Solution {
public:
    vector<int> createTargetArray(vector<int>& nums, vector<int>& index) {
        vector<int> res;
        for(int i = 0, n = nums.size(); i < n; i++) {
            res.insert(res.begin() + index[i], nums[i]);
        }
        return res;
    }
};
```



### [1390. 四因数](https://leetcode-cn.com/problems/four-divisors/) 

整数数组 `nums`，返回该数组中恰有四个因数的这些整数的各因数之和。

```c++
class Solution {
public:
    int sumFourDivisors(vector<int>& nums) {
        if(!nums.size()) return 0;
        int res = 0;
        for(auto v : nums) {
            int sqv = sqrt(v), cnt = 0, sum = 0, other;
            for(int i = 1; i <= sqv; ++i) {
                if(v%i == 0) {  // 注意 不能忽略计数这个情况 v%i = i
                    other = v/i;
                    if(other == i) {
                        cnt = 0;
                        break;
                    }
                    ++cnt;
                    
                    sum += i;
                    sum += v/i;
                    if(cnt > 2) break;
                }
            }
            res += cnt==2?sum:0;
        }
        return res;
    }
};
```

也可以用预处理+筛

```c++
class Solution {
public:
    int sumFourDivisors(vector<int>& nums) {
        // C 是数组 nums 元素的上限，C3 是 C 的立方根
        int C = 100000, C3 = 46;
        
        vector<int> isprime(C + 1, 1);
        vector<int> primes;

        // 埃拉托斯特尼筛法
        for (int i = 2; i <= C; ++i) {
            if (isprime[i]) {
                primes.push_back(i);
            }
            for (int j = i + i; j <= C; j += i) {
                isprime[j] = 0;
            }
        }

        // 欧拉筛法
        /*
        for (int i = 2; i <= C; ++i) {
            if (isprime[i]) {
                primes.push_back(i);
            }
            for (int prime: primes) {
                if (i * prime > C) {
                    break;
                }
                isprime[i * prime] = 0;
                if (i % prime == 0) {
                    break;
                }
            }
        }
        */
        
        // 通过质数表构造出所有的四因数
        unordered_map<int, int> factor4;
        for (int prime: primes) {
            if (prime <= C3) {
                factor4[prime * prime * prime] = 1 + prime + prime * prime + prime * prime * prime;
            }
        }
        for (int i = 0; i < primes.size(); ++i) {
            for (int j = i + 1; j < primes.size(); ++j) {
                if (primes[i] <= C / primes[j]) {
                    factor4[primes[i] * primes[j]] = 1 + primes[i] + primes[j] + primes[i] * primes[j];
                }
                else {
                    break;
                }
            }
        }

        int ans = 0;
        for (int num: nums) {
            if (factor4.count(num)) {
                ans += factor4[num];
            }
        }
        return ans;
    }
};
```



### [1391. 检查网格中是否存在有效路径](https://leetcode-cn.com/problems/check-if-there-is-a-valid-path-in-a-grid/)

搜索即可

```c++
class Solution {
public:
    int m, n;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};   // 上 左 右 下
    //  左 右 // 上 下 // 左下 右下 左上 右上
    bool dfs(int x, int y, vector<vector<int>>& grid, vector<vector<bool>>& vis) {
        if(x == m-1 && y == n-1) return true;
        vis[x][y] = true;
        int v = grid[x][y];
        bool flag = false;
        for(int i = 0; i < 4; ++i) {
            if(i==0 && v!=2 && v!=5 && v!=6) continue;
            if(i==1 && v!=1 && v!=3 && v!=5) continue;
            if(i==2 && v!=1 && v!=4 && v!=6) continue;
            if(i==3 && v!=2 && v!=3 && v!=4) continue;
            int nx = x + dx[i], ny = y + dy[i];
            if(nx >= 0 && nx < m && ny >= 0 && ny < n && !vis[nx][ny]) {
                int nv = grid[nx][ny];
                if(i==0 && nv!=2 && nv!=3 && nv!=4) continue;
                if(i==1 && nv!=1 && nv!=4 && nv!=6) continue;
                if(i==2 && nv!=1 && nv!=3 && nv!=5) continue;
                if(i==3 && nv!=2 && nv!=5 && nv!=6) continue;
                flag |= dfs(nx, ny, grid, vis);
                if(flag) return true;
            }
        }
        return false;
    }
    bool hasValidPath(vector<vector<int>>& grid) {
        m = grid.size();
        if(!m) return true;
        n = grid[0].size();
        vector<vector<bool>> vis(m+1,vector<bool>(n+1));
        return dfs(0,0,grid,vis);
    }
};
```

也可以pipe建图 然后走dfs

```c++
class Solution {
    int m,n;
    bool visited[302][302];
    int dx[4]={1,0,-1,0},
        dy[4]={0,1,0,-1};
    int pipe[7][4]={
        {-1,-1,-1,-1},
        {-1,1,-1,3},
        {0,-1,2,-1},
        {-1,0,3,-1},
        {-1,-1,1,0},
        {3,2,-1,-1},
        {1,-1,-1,2}
    };
    bool dfs(int x,int y,int dir,vector<vector<int>>& grid){
        if (x==m-1&&y==n-1)
        {
            return 1;
        }
        visited[x][y]=true;
        //update 
        int xx=x+dx[dir];
        int yy=y+dy[dir];
        // xx yy is or not out of range
        
        if (xx<0||xx>=m||yy<0||yy>=n)return 0;
        //update dir
        int nxtPart=grid[xx][yy];
        
        if(pipe[nxtPart][dir]!=-1&&!visited[xx][yy])return dfs( xx, yy, pipe[nxtPart][dir],grid);
        return 0;
    }
public:
    bool hasValidPath(vector<vector<int>>& grid) {
        m=grid.size();
        n=grid[0].size();
        //初始化visited false
        /*while(m--){
            vector<bool> v(n,false);
            visited.push_back(v);
        }*/
        memset(visited,false,sizeof(visited));

       int start=grid[0][0];
       for (int i = 0; i < 4; ++i)
       {
           if (pipe[start][i]!=-1)
           {
                if(dfs(0,0,pipe[start][i],grid))
                {
                    return 1;
                }
           }          
       }
       return 0;
    }
};
```



### [1392. 最长快乐前缀](https://leetcode-cn.com/problems/longest-happy-prefix/) [TAG]

求字符串的最长快乐前缀(既是前缀也是后缀)

字符串hash 算法竞赛进阶指南-李煜东

```c++
class Solution {
public:
    string longestPrefix(string s) {
        int n = s.size();
        int prefix = 0, suffix = 0;
        int base = 31, mod = 1000000007, mul = 1;
        int happy = 0;
        for (int i = 1; i < n; ++i) {
            prefix = ((long long)prefix * base + (s[i - 1] - 97)) % mod;
            suffix = (suffix + (long long)(s[n - i] - 97) * mul) % mod;
            if (prefix == suffix) {
                happy = i;
            }
            mul = (long long)mul * base % mod;
        }
        return s.substr(0, happy);
    }
};
```
