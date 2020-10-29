## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-159/)


### [1232. 缀点成线](https://leetcode-cn.com/problems/check-if-it-is-a-straight-line/)

可以直接使用 line 每个点与第一个点比较就可以过

如果不与第一个点比较 直接使用 line 需删除 `if(cs[i][1] == cs[i-1][1]) return false;`

```c++
    vector<vector<int>> cs;
    int n;
    bool ver() {
        for(int i = 1; i < n; ++i)
            if(cs[i][1] != cs[i-1][1]) return false;
        return true;
    }
    bool line() {
        // dx / dy = dx / dy
        for(int i = 2; i < n; ++i)
            if(cs[i][1] == cs[i-1][1]) return false;
            else if((cs[i][0] - cs[i-1][0]) * (cs[i-1][1] - cs[i-2][1]) != 
                (cs[i-1][0] - cs[i-2][0]) * (cs[i][1] - cs[i-1][1])
            ) return false;
        return true;
    }
    bool checkStraightLine(vector<vector<int>>& coordinates) {
        n = coordinates.size();
        cs = coordinates;
        return (ver() || line());
    }
```

```c++
    vector<vector<int>> cs;
    int n;
    bool line() {
        for(int i = 2; i < n; ++i)
            if((cs[i][0] - cs[i-1][0]) * (cs[i-1][1] - cs[i-2][1]) != 
                (cs[i-1][0] - cs[i-2][0]) * (cs[i][1] - cs[i-1][1])
            ) return false;
        return true;
    }
    bool checkStraightLine(vector<vector<int>>& coordinates) {
        n = coordinates.size();
        cs = coordinates;
        return line();
    }
```

### [1233. 删除子文件夹](https://leetcode-cn.com/problems/remove-sub-folders-from-the-filesystem/)

排序暴力即可

注意判断 `s[pre.length] == '/'` 的技巧

```c++
    bool startWith(string & s, const string & pre) {
        if(s.length() <= pre.length()) return false;
        return s.substr(0, pre.length()) == pre && s[pre.length()] == '/';
    }
    vector<string> removeSubfolders(vector<string>& folder) {
        sort(folder.begin(), folder.end());
        vector<string> res;
        string last = "#";
        for(auto & f : folder) {
            if(startWith(f, last)) continue;
            res.push_back(f);
            last = f;
        }
        return res;
    }
```

### [1234. 替换子串得到平衡字符串](https://leetcode-cn.com/problems/replace-the-substring-for-balanced-string/)



```c++
class Solution {
public:
    int balancedString(string s) {
        int n = s.size();
        vector<int> a(n);
        for(int i = 0; i < n; ++ i) {
            if(s[i] == 'Q') a[i] = 0;
            if(s[i] == 'W') a[i] = 1;
            if(s[i] == 'E') a[i] = 2;
            if(s[i] == 'R') a[i] = 3;
        }
        
        // 前缀和
        vector<vector<int>> b(n+1, vector<int>(4));
        for(int i = 1; i <= n; ++ i) {
            b[i] = b[i-1];
            b[i][a[i-1]] ++;
        }
        
        auto check = [&](int m) {
            for (int i = 1; i+m-1 <= n; ++ i) {
                int j = i+m-1;
                vector<int> c = b[n];
                for (int k = 0; k < 4; ++ k)
                    c[k] -= b[j][k]-b[i-1][k];
                if (max({c[0], c[1], c[2], c[3]}) <= n/4) return true;
            }
            return false;
        };
        
        int L = 0, R = n-1;
        int ret = n;
        while (L < R) {
            int m = (L+R)/2;
            //printf("%d %d %d\n", L, R, m);
            if (check(m)) {
                ret = m;
                R = m;
            }
            else L = m+1;
        }
        return L;
    }
};
```

滑动窗口

```c++
    int balancedString(string s) {
        int cnt[26]{0};
        int n = s.size();
        int m = n / 4;
        int sum = n;
        for(auto c : s) cnt[c-'A']++;  //统计字符数目
        
        if(cnt['Q'-'A'] == m && cnt['W'-'A'] == m && cnt['E'-'A'] == m && cnt['R'-'A'] == m) return 0;

        int l = 0, r = 0;
        while(r < n) {
            --cnt[s[r]-'A'];        //更新窗口外的字符数量
            while(l <= r && cnt['Q'-'A'] <= m && cnt['W'-'A'] <= m && cnt['E'-'A'] <= m && cnt['R'-'A'] <= m) {
                sum=min(sum,r-l+1); //更新最短长度
                ++cnt[s[l]-'A'];    //尝试缩小窗口
                ++l;
            }
            r++;                    //继续扩大窗口
        }
        return sum;
    }
```

### [1235. 规划兼职工作](https://leetcode-cn.com/problems/maximum-profit-in-job-scheduling/) [TAG]

显然要按照结束时间排序

状态 f 有两种定义方式

1. i 表示第几个任务，`f[i]` 表示 i 号之前所有工作能取得的最大收益。则需使用 pre 维护某个任务前面最近结束的任务，计算比较麻烦

2. i 表示时间点，`f[i]` 表示时间点 i 为止的最大收益，随后跑 01 背包 【需要对时间离散化以压缩空间】



```c++
class Solution {
public:
    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {
		vector<int> T({0});
		for(auto t : startTime) T.emplace_back(t);
		for(auto t : endTime) T.emplace_back(t);
		sort(T.begin(), T.end());
		T.erase(unique(T.begin(), T.end()), T.end());
		int n = T.size();	
		vector<int> dp(n, INT_MIN);
		dp[0] = 0; 
		vector<pair<int, int> > a;
		for(int i = 0; i < startTime.size(); ++i)
			a.emplace_back(make_pair(endTime[i], i));
		sort(a.begin(), a.end());

		for (int i = 1, j = 0; i < n; ++i) {
			dp[i] = dp[i - 1];
			while (j < int(a.size()) && a[j].first == T[i]) {
				int idx = a[j].second;
				int k = lower_bound(T.begin(), T.end(), startTime[idx]) - T.begin();	
				int f = profit[idx];	
				dp[i] = max(dp[i], dp[k] + f);	
				++j;
			}
		}
		return dp[n - 1];	
    }
};
```
