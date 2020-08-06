## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-199/)

### [1528. 重新排列字符串](https://leetcode-cn.com/problems/shuffle-string/)

pair排序即可

```c++
    string restoreString(string s, vector<int>& indices) {
        vector<pair<int, char>> pp;
        int n = s.size();
        for(int i = 0; i < n; ++i) {
            pp.push_back({indices[i], s[i]});
        }
        sort(pp.begin(), pp.end());
        string res;
        for(auto p : pp) {
            res.push_back(p.second);
        }
        return res;
    }
```

当然也可以直接申请一个定长string去放

```c++
    string restoreString(string s, vector<int>& indices) {
        string res = s;
        for (int i = 0; i < s.size(); ++i)
            res[indices[i]] = s[i];
        return res;
    }
```



### [1529. 灯泡开关 IV](https://leetcode-cn.com/problems/bulb-switcher-iv/)

显然需要从最左侧考虑 边处理边记录整个右侧的状态 扫一遍即可

```c++
    int minFlips(string target) {
        int n = target.size();
        int now = 0, res = 0;	// now表示整个处理点右侧的状态 res为改动次数
        for(int i = 0; i < n; ++i) {
            if(target[i] == '1' && now&1) continue;
            else if(target[i] == '0' && !(now&1)) continue;
            now ^= 1, ++res;
        }
        return res;
    }
```

赛榜有别的做法 都是从最右侧考虑得到：从左向右扫相邻数值不等则加1

```c++
    int minFlips(string s) {
        s = "0"+s;
        int res = 0;
        for (int i = 1; i < s.size(); ++i)
            if (s[i] != s[i-1]) ++res;
        return res;
    }
```



### [1530. 好叶子节点对的数量](https://leetcode-cn.com/problems/number-of-good-leaf-nodes-pairs/) [TAG]

>   记一下这种写法

```c++
    int countPairs(TreeNode* root, int distance) {
        int res = 0;
        function<vector<int>(TreeNode*)> dfs = [&](TreeNode *p) {
            if(!p->left && !p->right) return vector<int>(1, 0);
            vector<int> ls, rs;
            if(p->left) ls = dfs(p->left);		// 左子树叶子节点距离
            if(p->right) rs = dfs(p->right);	// 右子树叶子节点距离
            for(int &l : ls) ++l;
            for(int &r : rs) ++r;
            for(const int &l : ls) for(const int &r : rs) {
                if(l+r <= distance) ++res;
            }
            ls.insert(ls.end(), rs.begin(), rs.end());
            //for(auto v : rs) ls.push_back(v);
            return ls;
        };
        dfs(root);
        return res;
    }
```

### [1531. 压缩字符串 II](https://leetcode-cn.com/problems/string-compression-ii/) [TAG]

dp 解释参考 [题解](https://leetcode-cn.com/problems/string-compression-ii/solution/dong-tai-gui-hua-shi-jian-on3kong-jian-on2-by-newh/)

```c++
    int calc(int x) {
        return (x <= 1)? x : ((x <= 9)? 2 : ((x <= 99)? 3 : 4));
    }

    int getLengthOfOptimalCompression(string s, int k) {
        int T = s.size() - k;
        vector<vector<int>> dp(s.size() + 1, vector<int>(T + 1, 100000));
        dp[s.size()][T] = 0; // 初始条件
        for(int p = s.size() - 1; p >= 0; --p) {
            for(int cnt = 0; cnt <= T; ++cnt) {
                // 1. 从此开始选择连续的字符
                for(int j = p, same = 0; j < s.size(); ++j) {
                    same += (s[j] == s[p]);
                    if(same + cnt > T)
                        break;
                    dp[p][cnt] = min(dp[p][cnt], calc(same) + dp[j+1][cnt + same]);
                }
                // 2. 跳过该字符
                dp[p][cnt] = min(dp[p][cnt], dp[p+1][cnt]);
            }
        }
        return dp[0][0];
    }
```

以及

```c++
int dp[111][111];
class Solution {
public:
    int getLengthOfOptimalCompression(string s, int k) {
        int n = s.size();
        memset(dp, 0x3f, sizeof(dp));
        dp[0][0] = 0;
        for(int i = 1; i <= n; i++) {
            for(int j = 1; j <= k+1; j++) {
                dp[i][j ] = min(dp[i][j ], dp[i - 1][j-1]);
                int cnt = 0, del = 0;
                for(int l = i; l <= n; l++) {
                    cnt += s[l - 1] == s[i - 1];
                    del += s[l - 1] != s[i - 1];
                    if(j + del-1 <= k) dp[l][j + del-1] = min(dp[l][j + del-1], dp[i - 1][j-1] + 1 + (cnt >= 100 ? 3 : cnt >= 10 ? 2 : cnt >= 2 ? 1: 0));
                }
            }
        }
        return dp[n][k];
    }
};
```
