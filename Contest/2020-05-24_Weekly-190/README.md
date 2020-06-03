## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-190/)


### [1455. 检查单词是否为句中其他单词的前缀](https://leetcode-cn.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/)

`stringstream` 扫一遍即可

```c++
    bool check(vector<string>& s, int x, string searchWord) {
        if(s[x].size() < searchWord.size()) return false;
        int n = searchWord.size();
        for(int i = 0; i < n; ++i) if(searchWord[i] != s[x][i]) return false;
        return true;
    }
    int isPrefixOfWord(string sentence, string searchWord) {
        stringstream ss(sentence);
        vector<string> s;
        string t;
        while(ss >> t) s.push_back(t);
        int n = s.size();
        for(int i = 0; i < n; ++i) {
            if(check(s, i, searchWord)) return i+1;
        }
        return -1;
    }
```


### [1456. 定长子串中元音的最大数目](https://leetcode-cn.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)

简单窗口

```c++
    int maxVowels(string s, int k) {
        set<char> ss;
        ss.insert('a');
        ss.insert('e');
        ss.insert('i');
        ss.insert('o');
        ss.insert('u');
        int ans = 0, cnt = 0;
        for(int i = 0; i < k - 1; i += 1) cnt += ss.count(s[i]);
        for(int i = k - 1; i < (int)s.size(); ++i){
            cnt += ss.count(s[i]);
            ans = max(ans, cnt);
            cnt -= ss.count(s[i - k + 1]);
        }
        return ans;
    }
```

或者

```c++
    int check(char c) {
        if(c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            return 1;
        }
        return 0;
    } 
    int maxVowels(string s, int k) {
        int cnt = 0, anw = 0;
        //移动右端点 i
        for(int i = 0; i < s.size(); i++) {
            cnt += check(s[i]);
            //窗口超过 k 了，
            if(i >= k) {
            //从窗口中移除s[j], j = i-k
                cnt -= check(s[i-k]);
            }
            // 更新下最大值
            anw = max(anw, cnt);
        }
        return anw;
    }
```



#### [1457. 二叉树中的伪回文路径](https://leetcode-cn.com/problems/pseudo-palindromic-paths-in-a-binary-tree/) 

简单搜索

```c++
    int res = 0;
    void helper(TreeNode* n, vector<int>& c) {
        if(!n) return;
        ++c[n->val];
        if(!n->left && !n->right) {
            int x = 0;
            for(int i = 1; i <= 9; ++i) if(c[i]&1) ++x;
            if(x <= 1) ++res;
        }
        helper(n->left, c);
        helper(n->right, c);
        --c[n->val];
    }
    int pseudoPalindromicPaths (TreeNode* root) {
        vector<int> c(10);
        helper(root, c);
        return res;
    }
```

### [1458. 两个子序列的最大点积](https://leetcode-cn.com/problems/max-dot-product-of-two-subsequences/)

dp 定义好状态转移即可

```c++
    int maxDotProduct(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        vector<vector<int>> dp(n1+1, vector<int>(n2+1, INT_MIN/2));
        // dp[i][j] 为【到】i j结尾的最大点积
        for(int i = 1; i <= n1; ++i) {
            for(int j = 1; j <= n2; ++j) {
                dp[i][j]=nums1[i-1]*nums2[j-1];
                dp[i][j]=max(dp[i][j],nums1[i-1]*nums2[j-1]+dp[i-1][j-1]);
                dp[i][j]=max(dp[i][j],dp[i][j-1]);
                dp[i][j]=max(dp[i][j],dp[i-1][j]);
                dp[i][j]=max(dp[i][j],dp[i-1][j-1]);
            }
        }
        return dp[n1][n2];
    }
```
