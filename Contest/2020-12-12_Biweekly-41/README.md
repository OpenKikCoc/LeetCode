## [比赛链接](https://leetcode.cn/contest/biweekly-contest-41/)


### [1684. 统计一致字符串的数目](https://leetcode.cn/problems/count-the-number-of-consistent-strings/)



```c++
class Solution {
public:
    int countConsistentStrings(string allowed, vector<string>& words) {
        unordered_map<char, bool> has;
        for (auto c : allowed) has[c] = true;
        int res = 0;
        for (auto & s : words) {
            bool f = true;
            for (auto c : s)
                if (!has[c]) f = false;
            res += f;
        }
        return res;
    }
};
```


### [5610. 有序数组中差绝对值之和](https://leetcode.cn/problems/sum-of-absolute-differences-in-a-sorted-array/)



```c++
class Solution {
public:
    vector<int> getSumAbsoluteDifferences(vector<int>& nums) {
        int n = nums.size();
        vector<int> s(n + 1);
        for (int i = 1; i <= n; ++ i ) s[i] += s[i - 1] + nums[i - 1];
        vector<int> res(n);
        for (int i = 1; i <= n; ++ i )
            res[i - 1] = nums[i - 1] * (i - 1) - s[i - 1] + s[n] - s[i] - nums[i - 1] * (n - i);
        return res;
    }
};
```

### [1686. 石子游戏 VI](https://leetcode.cn/problems/stone-game-vi/)

直接按和排序而 **无需考虑对于 alice bob 来说和相同时是否需要选择对自己更有利的正确性证明**

```c++
class Solution {
public:
    typedef pair<int, int> PII;
    int stoneGameVI(vector<int>& av, vector<int>& bv) {
        int n = av.size();
        vector<PII> ve;
        for (int i = 0; i < n; ++ i ) ve.push_back({av[i] + bv[i], i});
        sort(ve.begin(), ve.end(), greater<PII>());
        int v1 = 0, v2 = 0;
        for (int i = 0; i < n; ++ i ) {
            //cout << "i = " << i << " val = " << ve[i].first << " idx = " << ve[i].second;
            int idx = ve[i].second;
            if (i & 1) v2 += bv[idx];
            else v1 += av[idx];
        }
            
        //cout << " v1 = " << v1 << "  v2 = " << v2 << endl;
        if (v1 < v2) return -1;
        else if (v1 > v2) return 1;
        return 0;
    }
};
```

### [1687. 从仓库到码头运输箱子](https://leetcode.cn/problems/delivering-boxes-from-storage-to-ports/) [TAG]

单调队列优化dp  注意细节

```c++
class Solution {
public:
    int n;
    vector<int> s;
    
    // (l, r] 有多少个不同段
    int cost(int l, int r) {
        // l + 1 是分界点
        if (s[l] != s[l + 1]) return s[r] - s[l];
        return s[r] - s[l] + 1;
    }
    
    int boxDelivering(vector<vector<int>>& boxes, int portsCount, int maxBoxes, int maxWeight) {
        n = boxes.size();
        s.resize(n + 2);
        for (int i = 1; i <= n; ++ i ) {
            s[i] = s[i - 1];
            // 是分段的起始
            if (i == 1 || boxes[i - 1][0] != boxes[i - 2][0]) ++ s[i] ;
        }
        
        vector<int> f(n + 1);
        deque<int> q;
        q.push_back(0);
        for (int i = 1, j = 1, w = 0; i <= n; ++ i ) {
            w += boxes[i - 1][1];
            while (w > maxWeight || i - j + 1 > maxBoxes) {
                w -= boxes[j - 1][1];
                ++ j ;
            }
            while (q.front() < j - 1)
                q.pop_front();
            
            int k = q.front();
            f[i] = f[k] + cost(k, i) + 1;
            
            // (i, i + 1] 与 (q.back(), i] 无论右区间取哪里都是一样的 所以直接用 i+1
            while (!q.empty() && f[q.back()] >= f[i] + cost(i, i + 1) - cost(q.back(), i + 1))
                q.pop_back();
            q.push_back(i);
        }
        return f[n];
    }
};
```
