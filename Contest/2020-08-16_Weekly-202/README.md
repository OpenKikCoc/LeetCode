## [比赛链接](https://leetcode.cn/contest/weekly-contest-202/)


### [1550. 存在连续三个奇数的数组](https://leetcode.cn/problems/three-consecutive-odds/)



```c++
    bool threeConsecutiveOdds(vector<int>& arr) {
        int cnt = 0;
        for(auto v : arr) {
            if(v&1) {
                ++cnt;
                if(cnt == 3) return true;
            } else cnt = 0;
        }
        return false;
    }
```


### [1551. 使数组中所有元素相等的最小操作数](https://leetcode.cn/problems/minimum-operations-to-make-array-equal/)

易知最后所有元素值为n 考虑 每次只计算比n小的数差了多少即可

```c++
    int minOperations(int n) {
        int res = 0, add = 1;
        while(add < n) {
            res += (n-add);
            add += 2;
        }
        return res;
    }
```

### [1552. 两球之间的磁力](https://leetcode.cn/problems/magnetic-force-between-two-balls/)

二分check

```c++
    int check(vector<int>& pos, int dis) {
        int cnt = 0, l = INT_MIN/2;
        for(auto v : pos) {
            if(v - dis >= l) {
                ++cnt;
                l = v;
            }
        }
        return cnt;
    }
    int maxDistance(vector<int>& position, int m) {
        sort(position.begin(), position.end());
        int n = position.size();
        int minl = INT_MAX, maxl = INT_MIN;
        for(int i = 1; i < n; ++i) {
            minl = min(minl ,position[i] - position[i-1]);
            maxl = max(maxl, position[i] - position[0]);    // not  pos[i]-pos[i-1]
        }
        int l = minl, r = maxl+1, checkv;
        while(l < r) {
            int mid = l + (r-l)/2;
            int checkv = check(position, mid);
            //cout << "mid = "<< mid << " checkv = " << checkv << endl;
            if(checkv >= m) l = mid+1;
            else r = mid;
        }
        //cout << "l="<<l <<" checkv=" << checkv<<endl;
        //if(checkv < m) 不满足条件 此题不存在这种情况
        return l-1;
    }
```

### [1553. 吃掉 N 个橘子的最少天数](https://leetcode.cn/problems/minimum-number-of-days-to-eat-n-oranges/)

记忆化dfs or 记忆化bfs

原先写的bfs加个 map 就过了

```c++
    // f[n] n个橘子可以吃的最小天数
    // f[0] = 0, f[1] = 1;
    // f[x] = v
    //          f[x+1] = min(f[x+1], f[x]+1);
    //          f[x*2] = min(f[x*2], f[x]+1);
    //          f[x*3] = min(f[x*3], f[x]+1);
    // n范围比较大 说明可以找规律
    // ====> 找规律失败 说明考虑记忆化
    // 记忆化的策略由推理可知 尽可能吃2/3
    ///*
    // 12ms
    unordered_map<int, int> m;
    int find(int x) {
        if(m.count(x)) return m[x];
        if(x == 0) return 0;
        else if(x == 1) return 1;
        else if(x == 2) return 2;
        return m[x] = min(find(x/3)+x%3, find(x/2)+x%2) + 1;
    }
    int minDays(int n) {
        return find(n);
    }
```


```c++
    // 广搜
    // 156ms
    int minDays(int n) {
        unordered_map<int, bool> m;
        queue<int> q;
        q.push(n);
        int d = 0;
        while(!q.empty()) {
            int sz = q.size();
            while(sz--) {
                int nv = q.front(); q.pop();
                if(!nv) return d;
                if(nv % 3 == 0 && !m[nv/3]) {q.push(nv/3); m[nv/3]=true;}
                if(nv % 2 == 0 && !m[nv/2]) {q.push(nv/2); m[nv/2]=true;}
                if(!m[nv-1]) {q.push(nv-1); m[nv-1]=true;}
            }
            ++d;
        }
        return d;
    }
```
