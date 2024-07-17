## [比赛链接](https://leetcode.cn/contest/weekly-contest-168/)


### [1295. 统计位数为偶数的数字](https://leetcode.cn/problems/find-numbers-with-even-number-of-digits/)

暴力统计即可

```c++
    int get(int v) {
        int cnt = 0;
        while(v) v/=10, ++cnt;
        return cnt;
    }
    int findNumbers(vector<int>& nums) {
        int res = 0;
        for(auto v : nums) {
            res += (get(v)%2 == 0);
        }
        return res;
    }
```


### [1296. 划分数组为连续数字的集合](https://leetcode.cn/problems/divide-array-in-sets-of-k-consecutive-numbers/)

map统计 begin获取当前可用的最小的值

```c++
    bool isPossibleDivide(vector<int>& nums, int k) {
        int n = nums.size();
        if(n % k) return false;
        map<int, int> m;
        for(auto v : nums) ++m[v];
        int tar = n/k;
        for(int t = 0; t < tar; ++t) {
            auto [key, v] = *m.begin();
            for(int i = 0; i < k; ++i) {
                if(m[key+i] <= 0) return false;
                --m[key+i];
                if(m[key+i] == 0) m.erase(key+i);
            }
        }
        return true;
    }
```

### [1297. 子串的最大出现次数](https://leetcode.cn/problems/maximum-number-of-occurrences-of-a-substring/)

易知长度一定是minsize 按此长度统计所有连续子串及其次数即可

也可以字符串hash（滚动hash 来做

```c++
    // 一定是minsize
    // on遍历字符串获取每个子串出现次数 排序输出即可
    int getcnt(string& s) {
        vector<bool> vis(26);
        for(auto& c : s) vis[c-'a'] = true;
        int res = 0;
        for(int i = 0; i < 26; ++i) res += (vis[i] == true);
        return res;
    }
    int maxFreq(string s, int maxLetters, int minSize, int maxSize) {
        int n = s.size();
        string subs;
        unordered_map<string, int> m;
        for(int i = 0; i <= n-minSize; ++i) {
            subs = s.substr(i, minSize);
            int cnt = getcnt(subs);
            if(cnt > maxLetters) continue;
            //cout << subs<<endl;
            ++m[subs];
        }
        vector<pair<int, string>> ve;
        for(auto [k, v] : m) ve.push_back({v, k});
        sort(ve.begin(), ve.end());
        if(ve.size()) return ve.rbegin()->first;
        return 0;
    }
```

### [1298. 你能从盒子里获得的最大糖果数](https://leetcode.cn/problems/maximum-candies-you-can-get-from-boxes/) [TAG]

每次循环校验即可 要敢于暴力

```c++
    int maxCandies(vector<int>& status, vector<int>& candies, vector<vector<int>>& keys, vector<vector<int>>& containedBoxes, vector<int>& initialBoxes) {
        int n = status.size();
        vector<bool> open(n), haskey(n), hasbox(n), used(n);
        int res = 0;
        queue<int> q;
        for(int i = 0; i < n; ++i) open[i] = (status[i] == 1);
        for(auto v : initialBoxes) {
            hasbox[v] = true;
            if(open[v]) {
                q.push(v);
                used[v] = true;
                res += candies[v];
            }
        }
        while(!q.empty()) {
            int b = q.front(); q.pop();
            for(auto k : keys[b]) haskey[k] = true;
            for(auto k : containedBoxes[b]) hasbox[k] = true;
            for(auto k : keys[b]) {
                if(!used[k] && hasbox[k] && (open[k] || haskey[k])) {
                    q.push(k);
                    used[k] = true;
                    res += candies[k];
                }
            }
            for(auto k : containedBoxes[b]) {
                if(!used[k] && hasbox[k] && (open[k] || haskey[k])) {
                    q.push(k);
                    used[k] = true;
                    res += candies[k];
                }
            }
        }
        return res;
    }
```
