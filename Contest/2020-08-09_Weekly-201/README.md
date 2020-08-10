## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-201/)

#### [1544. 整理字符串](https://leetcode-cn.com/problems/make-the-string-great/)

模拟

```c++
    string makeGood(string s) {
        while(s.size()) {
            bool change = false;
            string ns;
            int sz = s.size();
            int i;
            for(i = 0; i < sz-1; ++i) {
                if(islower(s[i]) && isupper(s[i+1]) && s[i]-'a' == s[i+1]-'A') {++i, change = true; continue;}
                else if(isupper(s[i]) && islower(s[i+1]) && s[i]-'A' == s[i+1]-'a') {++i, change = true; continue;}
                ns.push_back(s[i]);
            }
            if(i==sz-1) ns.push_back(s[sz-1]);
            if(!change) break;
            s = ns;
        }
        return s;
    }
```

stl

```c++
    string makeGood(string s) {
        for(;;) {
            bool flag = false;
            int n = s.size();
            for(int i = 0; i + 1 < n; i++) {
                if(s[i] == s[i + 1] - 32 || s[i] == s[i + 1] + 32) {
                    s.erase(s.begin() + i);
                    s.erase(s.begin() + i);
                    flag = true;
                    break;
                }
            }
            if(flag == false) return s;
        }
    }
```



#### [1545. 找出第 N 个二进制字符串中的第 K 位](https://leetcode-cn.com/problems/find-kth-bit-in-nth-binary-string/)

模拟

```c++
    char findKthBit(int n, int k) {
        string s = "0";
        while(--n) {
            string ns = s;
            ns.push_back('1');
            int sz = s.size();
            for(int i = sz-1; i >= 0; --i) {
                if(s[i] == '1') ns.push_back('0');
                else ns.push_back('1');
            }
            s = ns;
        }
        return s[k-1];
    }
```



#### [1546. 和为目标值的最大数目不重叠非空子数组数目](https://leetcode-cn.com/problems/maximum-number-of-non-overlapping-subarrays-with-sum-equals-target/)

统计区间 随后排序贪心即可

```c++
    // 某一个前缀和数值出现的下标 要求数量最多 即长度最短 显然可以随时更新
    unordered_map<int, int> m;
    int maxNonOverlapping(vector<int>& nums, int target) {
        int n = nums.size();
        vector<int> sum(n+1);
        vector<pair<int, int>> ps;
        m[0] = 0;
        for(int i = 1; i <= n; ++i) {
            sum[i] = sum[i-1] + nums[i-1];
            //int l = m[sum[i]-target];
            //cout <<"sum="<<sum[i]<<" l="<<l<<" sum[i]-target="<<sum[i]-target<<endl;
            if(m.count(sum[i]-target)) ps.push_back({i, m[sum[i]-target]+1});
            m[sum[i]] = i;
        }
        // 按结束时间排序
        sort(ps.begin(), ps.end());
        int mx = 0, res = 0;
        for(auto [r, l] : ps) {
            //cout <<"l="<<l<<" r="<<r<<endl;
            if(l <= mx) continue;
            else {
                //cout <<"got l="<<l<<" r="<<r<<endl;
                ++res, mx = r;
            }
        }
        //cout <<endl;
        return res;
    }
```



#### [1547. 切棍子的最小成本](https://leetcode-cn.com/problems/minimum-cost-to-cut-a-stick/)

区间dp 转化为石子合并问题

```c++
    // 石子合并问题
    int minCost(int n, vector<int>& cuts) {
        sort(cuts.begin(), cuts.end());
        int m = cuts.size()+1;  // 总共m堆石子 前m堆共n个
        cuts.push_back(n);
        vector<vector<int>> f(m, vector<int>(m, 1e9));
        for(int len = 1; len <= m; ++len)
            for(int l = 0; l+len-1 < m; ++l) {
                int r = l+len-1;
                if(len == 1) f[l][r] = 0;
                else {
                    for(int k = l; k < r; ++k) f[l][r] = min(f[l][r], f[l][k]+f[k+1][r]);
                    f[l][r] += cuts[r];
                    if(l) f[l][r] -= cuts[l-1];
                }
            }
        return f[0][m-1];
    }
```

使用下标1～m，以及单独初始化的写法：

```c++
    // 石子合并问题
    int minCost(int n, vector<int>& cuts) {
        sort(cuts.begin(), cuts.end());
        int m = cuts.size()+1;
        cuts.push_back(n);
        vector<vector<int>> f(m+1, vector<int>(m+1, 1e9));
        for(int i = 1; i <= m; ++i) f[i][i] = 0;
        for(int len = 2; len <= m; ++len)
            for(int l = 1; l+len-1 <= m; ++l) {
                int r = l+len-1;
                for(int k = l; k < r; ++k) f[l][r] = min(f[l][r], f[l][k]+f[k+1][r]);
                f[l][r] += cuts[r-1];
                if(l>1) f[l][r] -= cuts[l-2];
            }
        return f[1][m];
    }
```

