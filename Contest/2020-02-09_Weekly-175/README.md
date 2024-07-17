## [比赛链接](https://leetcode.cn/contest/weekly-contest-175/)


### [1346. 检查整数及其两倍数是否存在](https://leetcode.cn/problems/check-if-n-and-its-double-exist/)

记录遍历即可

```c++
class Solution {
public:
    bool checkIfExist(vector<int>& arr) {
        int n = arr.size();
        unordered_map<int, bool> m;
        for(auto v : arr) {
            if(m[v*2] || (v%2==0 && m[v/2])) return true;
            m[v] = true;
        }
        return false;
    }
};
```


### [1347. 制造字母异位词的最小步骤数](https://leetcode.cn/problems/minimum-number-of-steps-to-make-two-strings-anagram/)

返回 [长度 - min相同字母个数] 

```c++
class Solution {
public:
    int minSteps(string s, string t) {
        int n = s.size();
        vector<int> cnts(27), cntt(27);
        for(int i = 0; i < n; ++i) {
            ++cnts[s[i]-'a'];
            ++cntt[t[i]-'a'];
        }
        int same = 0;
        for(int i = 0; i < 26; ++i) {
            same += min(cnts[i], cntt[i]);
        }
        return n-same;
    }
};
```

### [1348. 推文计数](https://leetcode.cn/problems/tweet-counts-per-frequency/)

stl 比赛的时候没有直接申请指定数量的res数组长度 导致实现复杂很多

```c++
class TweetCounts {
public:
    map<string,vector<int>> mp;
    TweetCounts() {
    }
    
    void recordTweet(string n, int time) {
        mp[n].push_back(time);
    }
    
    vector<int> getTweetCountsPerFrequency(string freq, string name, int s, int t) {
        int d;
        if(freq[0] == 'm') d = 60;
        if(freq[0] == 'h') d = 3600;
        if(freq[0] == 'd') d = 24 * 3600;
        int n = (t-s)/d+1;
        vector<int> ret(n);
        for(int i : mp[name]) {
            if(s <= i && i <= t) {
                ret[(i-s)/d]++;
            }
        }
        return ret;
    }
};
```

### [1349. 参加考试的最大学生数](https://leetcode.cn/problems/maximum-students-taking-exam/) [TAG]

搜索 8*8矩阵 直接搜超时

```c++
// 超时
class Solution {
public:
    int m, n, res;
    void dfs(vector<vector<char>>& seats, int c, int v) {
        int x = c/n, y = c%n;
        if(x == m-1 && y == n-1) {
            if(can(seats, x, y)) res = max(res, v+1);
            else res = max(res, v);
            return;
        }
        // 不放和不能放
        dfs(seats, c+1, v);
        if(seats[x][y] == '.' && can(seats, x, y)) {
            seats[x][y] = ',';
            dfs(seats, c+1, v+1);
            seats[x][y] = '.';
        }
    }
    bool can(vector<vector<char>>& seats, int x, int y) {
        if(seats[x][y] == '#' || seats[x][y] == ',') return false;
        if(x && y && seats[x-1][y-1] == ',') return false;
        if(x && y < n-1 && seats[x-1][y+1] == ',') return false;
        if(y && seats[x][y-1] == ',') return false;
        if(y < n-1 && seats[x][y+1] == ',') return false;
        return true;
    }
    int maxStudents(vector<vector<char>>& seats) {
        m = seats.size(), n = seats[0].size(), res = 0;
        dfs(seats, 0, 0);
        return res;
    }
};
```

显然放了和没放的可以转化为状态 每一行2^8 = 256

状压dp

$dp[row][state]=max(dp[row−1][last]+state.count())$

以及检查合法性 最后结果为 $max(dp[m][state])$

```c++
class Solution {
public:
    int n, m;
    int mat[8];
    int dp[8][1 << 8];
    int sum(int x){	// 计算该行有多少个1 即多少个人
        int s = 0;
        while(x > 0) s += 1 & x, x >>= 1;
        return s;
    }
    bool judge(int s1, int s2){
        return (s1 & (s2 << 1)) || (s1 & (s2 >> 1));
    }
    int maxStudents(vector<vector<char>>& seats) {
        m = seats.size(), n = seats[0].size();
        for(int i = 0; i < m; i++){
            int s = 0;
            for(int j = 0; j < n; j++){
                if(seats[i][j] == '#') s |= 1 << j;
            }
            mat[i] = s;
        }

        memset(dp, 0, sizeof(dp));
      	// 第0行
        for(int s = 0; s < 1 << n; s++){
          	if(!(s & mat[0] || s & (s >> 1))) dp[0][s] = sum(s);
            //if(!(s & mat[0] || s & (s >> 1) || s & (s << 1))) dp[0][s] = sum(s);
        }
        for(int i = 1 ; i < m; i++){
            for(int s1 = 0; s1 < 1 << n; s1++){
              	// 判断状态是否合法【i 有人或右边有人 -> 不合法 continue】
                if(s1 & mat[i] || (s1 & (s1 >> 1))) continue;
              	//if(s1 & mat[i] || (s1 & (s1 >> 1)) || (s1 & (s1 << 1))) continue;
                for(int s2 = 0; s2 < 1 << n; s2++){
                  	// 如果合法 更新dp[i][s1]; 其初值自然是0
                    if(!judge(s1, s2)) dp[i][s1] = max(dp[i][s1], dp[i - 1][s2]);
                }
              	// 加上本行的人数 经过判断 这里的s1必定不包含落在#上的情况
                dp[i][s1] += sum(s1);
            }
        }
        return *max_element(dp[m-1], dp[m-1]+(1 << n));
    }
};
```

O(n^3) 解法 网络流

> 首先我们只关心可以坐人的座位，我们把作为按照列下标的奇偶建二分图，S向奇数下标的座位连边，偶数下标的座位向T连边，有冲突的座位奇数座位向偶数座位连边。图中所有边流量都是1。直接跑二分图最大点独立集就行，即可以坐人的座位数-最大流。
> 时间复杂度：O(n^3) 空间复杂度：O(n^2)
>
> 作者：LighTcml

```c++
class Solution {
    const int INF=1<<29;
    int tot,head[110];
    struct Edge {int to,net,v;}E[10010];
    void addedge(int x,int y,int v) {
        E[++tot].to=y;E[tot].net=head[x];head[x]=tot;E[tot].v=v;
        E[++tot].to=x;E[tot].net=head[y];head[y]=tot;E[tot].v=0;
    }
    int n,m,S,T,Q[110],depth[110];
    int getp(int x,int y) {
        return x*m+y+1;
    }
    bool bfs() {
        for (int i=S;i<=T;++i) depth[i]=-1;
        int L=0,R=1;
        Q[1]=S;
        depth[S]=0;
        while (L<R) {
            int x=Q[++L];
            for (int i=head[x];i;i=E[i].net)
                if (E[i].v>0 && depth[E[i].to]==-1) {
                    depth[E[i].to]=depth[x]+1;
                    Q[++R]=E[i].to;
                }
        }
        return depth[T]!=-1;
    }
    int dfs(int x,int flow) {
        if (x==T || !flow) return flow;
        int w=0;
        for (int i=head[x];i;i=E[i].net)
            if (E[i].v>0 && depth[E[i].to]==depth[x]+1) {
                int v=dfs(E[i].to,min(flow-w,E[i].v));
                E[i].v-=v;E[i^1].v+=v;w+=v;
            }
        if (!w) depth[x]=-1;
        return w;
    }
    int Dinic() {int sum=0;while(bfs()) sum+=dfs(S,INF);return sum;}
public:
    int maxStudents(vector<vector<char>>& seats) {
        tot=1;
        n=seats.size();
        m=seats[0].size();
        S=0;
        T=n*m+1;
        int cnt=0;
        for (int i=0;i<n;++i)
            for (int j=0;j<m;++j)
                if (seats[i][j]=='.') {
                    ++cnt;
                    int x=i*m+j+1;
                    if (j&1) addedge(S,x,1);
                    else addedge(x,T,1);
                    if (j-1>=0 && seats[i][j-1]=='.') {
                        if (j&1) addedge(x,getp(i,j-1),1);
                        else addedge(getp(i,j-1),x,1);
                    }
                    if (j+1<m && seats[i][j+1]=='.') {
                        if (j&1) addedge(x,getp(i,j+1),1);
                        else addedge(getp(i,j+1),x,1);
                    }
                    if (i && j+1<m && seats[i-1][j+1]=='.') {
                        if (j&1) addedge(x,getp(i-1,j+1),1);
                        else addedge(getp(i-1,j+1),x,1);
                    }
                    if (i && j && seats[i-1][j-1]=='.') {
                        if (j&1) addedge(x,getp(i-1,j-1),1);
                        else addedge(getp(i-1,j-1),x,1);
                    }
                }
        return cnt-Dinic();
    }
};
```

