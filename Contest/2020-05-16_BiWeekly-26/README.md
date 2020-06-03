## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-26/)

### [1446. 连续字符](https://leetcode-cn.com/problems/consecutive-characters/)

连续相同的字符最多有多少个

```c++
// 数据范围较小 n^2即可
    int maxPower(string s) {
        int res = 0, n = s.size();
        for(int i = 0; i < n; ++i) {
            int cnt = 0;
            for(int j = i; j >= 0; --j) {
                if(s[j] == s[i]) ++cnt;
                else break;
            }
            res = max(res, cnt);
        }
        return res;
    }
// 双指针
    int maxPower(string s) {
        int n = s.size(), res = 0;
        int l = 0, r = 0;
        while(r < n) {
            if(s[r] != s[l]) {
                res = max(res, r-l);
                l = r;
            }
            ++r;
        }
        return max(r-l, res);
```


### [1447. 最简分数](https://leetcode-cn.com/problems/simplified-fractions/)

给定 n ，返回所有分母小于等于n的最简分数。

其实就是分子分母互质

```c++
    vector<string> simplifiedFractions(int n) {
        vector<string> res;
        for(int i = 2; i <= n; ++i)
            for(int j = 1; j < i; ++j)
                if(__gcd(i, j) == 1) res.push_back(to_string(j)+"/"+to_string(i));
        return res;
    }
```

### [1448. 统计二叉树中好节点的数目](https://leetcode-cn.com/problems/count-good-nodes-in-binary-tree/)

好节点：从根到该节点路径上的所有节点值都不大于该节点本身的值。

遍历树的时候带上节点值即可。

```c++
    int res = 0;
    void helper(TreeNode* n, int maxv) {
        if(!n) return;
        if(n->val >= maxv) ++res;
        helper(n->left, max(maxv, n->val));
        helper(n->right, max(maxv, n->val));
    }
    int goodNodes(TreeNode* root) {
        helper(root, INT_MIN);
        return res;
    }
```

### [1449. 数位成本和为目标值的最大数字](https://leetcode-cn.com/problems/form-largest-integer-with-digits-that-add-up-to-target/)

每一个数字有其消耗，在总消耗为target的情况下选出【最大整数】（其实就是选出的数字个数最多 且这些数字组合起来最大）

完全背包，实现的时候选择数字最多的即可。

```c++
    string largestNumber(vector<int>& cost, int target) {
        int n = cost.size();
        vector<int> dp(target+1, -1);
        vector<int> fa(target+1);
        dp[0] = 0;
        for(int i = 0; i < n; ++i) {
            int w = cost[i];
            for(int j = w; j <= target; ++j) {
                if(dp[j-w] != -1 && dp[j-w]+1 >= dp[j]) {
                    dp[j] = dp[j-w]+1;
                    fa[j] = i;
                }
            }
        }
        if(dp[target] == -1) return "0";
        string s;
        for(int i = target; i; i -= cost[fa[i]]) s += '1' + fa[i];
        sort(s.begin(), s.end(), greater<char>());
        return s;
    }
```
