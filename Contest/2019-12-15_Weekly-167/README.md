## [比赛链接](https://leetcode.cn/contest/weekly-contest-167/)


### [1290. 二进制链表转整数](https://leetcode.cn/problems/convert-binary-number-in-a-linked-list-to-integer/)

略

```c++
    int getDecimalValue(ListNode* head) {
        int res = 0, b = 0;
        while(head) {
            res *= 2;
            res += head->val;
            head = head->next;
        }
        return res;
    }
```


### [1291. 顺次数](https://leetcode.cn/problems/sequential-digits/)

顺次数不会超出 `123456789` 的所有连续子串的范围 so直接遍历检查就好

```c++
    vector<int> sequentialDigits(int low, int high) {
        vector<int> res;
        string ori = "123456789";
        for(int len = 1; len <= 9; ++len)
            for(int l = 0; l+len-1 < 9; ++l) {
                string s = ori.substr(l, len);
                int v = stoi(s);
                // int v = strtol(s.c_str(), nullptr, 10);
                if(v <= high && v >= low) {
                    //cout << "s="<<s <<" v="<<v<<endl;
                    res.push_back(v);
                }
            }
        sort(res.begin(), res.end());
        return res;
    }
```

### [1292. 元素和小于等于阈值的正方形的最大边长](https://leetcode.cn/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/)

简单二分check

```c++
    int m, n;
    bool check(vector<vector<int>>& sum, int l, int tar) {
        // 遍历右下角坐标
        for(int i = l; i <= m; ++i)
            for(int j = l; j <= n; ++j) {
                int v = sum[i][j] - sum[i-l][j] - sum[i][j-l] + sum[i-l][j-l];
                if(v <= tar) return true;
            }
        return false;
    }
    int maxSideLength(vector<vector<int>>& mat, int threshold) {
        m = mat.size(), n = mat[0].size();
        vector<vector<int>> sum(m+1, vector<int>(n+1));
        for(int i = 1; i <= m; ++i)
            for(int j = 1; j <= n; ++j)
                sum[i][j] = sum[i-1][j] - sum[i-1][j-1] + sum[i][j-1] + mat[i-1][j-1];
        int l = 0, r = min(m, n)+1;
        while(l < r) {
            int mid = l + (r-l)/2;
            if(check(sum, mid, threshold)) l = mid+1;
            else r = mid;
        }
        return l ? l-1 : 0;
    }
```

### [1293. 网格中的最短路径](https://leetcode.cn/problems/shortest-path-in-a-grid-with-obstacles-elimination/) [TAG]

网格最短路 bfs

> **题目类型扩展：**
> 1. 若题目要求求解最小层级搜索（节点间距离固定为1），通过统计层级计数，遇到终止条件终止即可。
> 2. 若节点间有加权值，求解最短路径时可以在Node中增加cost记录，比较获取最佳值
> 3. 若需要求解最短路径，可以逆向根据visited访问记录情况回溯


```c++
class Solution {
public:
    struct node{
        int x, y, k;
        node() {};
        node(int _x, int _y, int _k):x(_x),y(_y),k(_k){};
    };
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    int shortestPath(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<vector<int>>> dis(m+1, vector<vector<int>>(n+1, vector<int>(k+1, -1)));
        dis[0][0][0] = 0;
        queue<node> q;
        q.push({0,0,0});
        while(!q.empty()) {
            auto [x,y,d] = q.front(); q.pop();
            //cout <<"pop: "<< x <<" "<< y << " " << d << " "<<dis[x][y][d]<<endl;
            for(int i = 0; i < 4; ++i) {
                int nx = x+dx[i], ny = y+dy[i];
                //cout <<"for: "<< nx <<" "<< ny << " " << nd << endl;
                if(nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
                int nd = d+grid[nx][ny];
                if(nd > k) continue;
                if(dis[nx][ny][nd] != -1) continue;
                dis[nx][ny][nd] = dis[x][y][d]+1;
                q.push({nx,ny,nd});
            }
        }
        int res = 0x3f3f3f3f;
        for(int i = 0; i <= k; ++i) if(dis[m-1][n-1][i] != -1) res = min(res, dis[m-1][n-1][i]);
        if(res == 0x3f3f3f3f) return -1;
        return res;
    }
};
```
