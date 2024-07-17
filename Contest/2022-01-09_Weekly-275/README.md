## [比赛链接](https://leetcode.cn/contest/weekly-contest-275/)


### [2133. 检查是否每一行每一列都包含全部整数](https://leetcode.cn/problems/check-if-every-row-and-column-contains-all-numbers/)

略

```c++
class Solution {
public:
    bool checkValid(vector<vector<int>>& g) {
        int n = g.size(), m = g[0].size();
        for (int i = 0; i < n; ++ i ) {
            unordered_set<int> S;
            for (int j = 0; j < m; ++ j )
                S.insert(g[i][j]);
            if (S.size() < n)
                return false;
        }
        for (int j = 0; j < m; ++ j ) {
            unordered_set<int> S;
            for (int i = 0; i < n; ++ i )
                S.insert(g[i][j]);
            if (S.size() < n)
                return false;
        }
        return true;
    }
};
```


### [2134. 最少交换次数来组合所有的 1 II](https://leetcode.cn/problems/minimum-swaps-to-group-all-1s-together-ii/)

滑窗即可

```c++
class Solution {
public:
    int minSwaps(vector<int>& nums) {
        int n = nums.size();
        vector<int> s(n + n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + nums[i - 1];
        for (int i = 1; i <= n; ++ i )
            s[i + n] = s[i - 1 + n] + nums[i - 1];
        int tot = s[n], res = INT_MAX;
        for (int i = 1; i <= n; ++ i ) {
            int j = i + tot - 1;
            int have = s[j] - s[i - 1];
            res = min(res, tot - have);
        }
        return res;
    }
};
```

### [2135. 统计追加字母可以获得的单词数](https://leetcode.cn/problems/count-words-obtained-after-adding-a-letter/)

状态压缩下就可 略

```c++
class Solution {
public:
    int get(string & s) {
        int x = 0;
        for (auto c : s)
            x += 1 << (c - 'a');
        return x;
    }
    
    int wordCount(vector<string>& startWords, vector<string>& targetWords) {
        int n = startWords.size();
        unordered_set<int> S;
        for (int i = 0; i < n; ++ i )
            S.insert(get(startWords[i]));
        
        int res = 0;
        for (auto & w : targetWords) {
            int x = get(w);
            bool flag = false;
            for (int i = 0; i < 26; ++ i )
                if ((x >> i & 1) && S.count(x ^ (1 << i))) {
                    flag = true;
                    break;
                }
            if (flag)
                res ++ ;
        }
        return res;
    }
};
```

### [2136. 全部开花的最早一天](https://leetcode.cn/problems/earliest-possible-day-of-full-bloom/) [TAG]

贪心策略

```c++
class Solution {
public:
    using PII = pair<int, int>;
    int earliestFullBloom(vector<int>& pt, vector<int>& gt) {
        int n = pt.size();
        vector<PII> ve;
        for (int i = 0; i < n; ++ i )
            ve.push_back({gt[i], pt[i]});
        sort(ve.begin(), ve.end());
        reverse(ve.begin(), ve.end());  // 按 gt 降序排序
        int res = 0;
        for (int i = 0, s = 0; i < n; ++ i ) {
            s += ve[i].second;
            res = max(res, s + ve[i].first);
        }
        return res;
    }
};
```
