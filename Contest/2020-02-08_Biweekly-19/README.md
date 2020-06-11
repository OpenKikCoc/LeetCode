## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-19/)


### [1342. 将数字变成 0 的操作次数](https://leetcode-cn.com/problems/number-of-steps-to-reduce-a-number-to-zero/)

模拟即可

```c++
    int numberOfSteps (int num) {
        int res = 0;
        while(num) {
            if(num&1) --num;
            else num /= 2;
            ++res;
        }
        return res;
    }
```


### [1343. 大小为 K 且平均值大于等于阈值的子数组数目](https://leetcode-cn.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/)

区间和

```c++
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        int n = arr.size();
        int sum = 0, target = k*threshold;
        for(int i = 0; i < k; ++i) sum += arr[i];
        int res = sum >= target ? 1 : 0;
        for(int i = k; i < n; ++i) {
            sum += arr[i];
            sum -= arr[i-k];
            if(sum >= target) ++res;
        }
        return res;
    }
```

### [1344. 时钟指针的夹角](https://leetcode-cn.com/problems/angle-between-hands-of-a-clock/)

模拟即可

```c++
    double angleClock(int hour, int minutes) {
        double vm = 6*minutes;
        double vh = 30*(hour%12)+minutes/2.0;
        double dh = abs(vh-vm);
        if(dh+1e-5 >= 180.0) dh = 360 - dh;
        return dh;
    }

    double angleClock(int hour, int minutes) {
        double vm = 6*minutes, vh = 30*hour + minutes/2.0;
        double dh = fabs(vh-vm);
        return min(dh, 360 - dh);
    }
```

### [1345. 跳跃游戏 IV](https://leetcode-cn.com/problems/jump-game-iv/) [TAG]

bfs 需要注意的是使用map记录优化

建图跑最短路也可以 n^2

```c++
    int minJumps(vector<int>& arr) {
        int n = arr.size();
        unordered_map<int, vector<int>> m;
        for(int i = 0; i < n; ++i) m[arr[i]].push_back(i);
        vector<int> dis(n, INT_MAX);
        vector<int> vis(n, false);
        dis[n-1] = 0;
        vis[n-1] = true;
        queue<int> q;
        q.push(n-1);
        while(!q.empty()) {
            int u = q.front();
            q.pop();
            if(u && !vis[u-1] && m.find(arr[u-1]) != m.end()) {
                dis[u-1] = min(dis[u-1], dis[u]+1);
                vis[u-1] = true;
                q.push(u-1);
            }
            if(u+1 < n && !vis[u+1] && m.find(arr[u+1]) != m.end()) {
                dis[u+1] = min(dis[u+1], dis[u]+1);
                vis[u+1] = true;
                q.push(u+1);
            }
            if(m.find(arr[u]) != m.end()) {
                for(auto v : m[arr[u]]) {
                    if(!vis[v]) {
                        vis[v] = true;
                        dis[v] = min(dis[v], dis[u]+1);
                        q.push(v);
                    }
                }
                m.erase(arr[u]);
            }
        }
        return dis[0];
    }
```
