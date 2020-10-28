## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-161/)


### [1247. 交换字符使得字符串相同](https://leetcode-cn.com/problems/minimum-swaps-to-make-strings-equal/)

规律 统计

```c++
    int minimumSwap(string s1, string s2) {
        if(s1.size() != s2.size()) return false;
        int n = s1.size();
        // 统计有多少 x-y 和 y-x
        int c1 = 0, c2 = 0;
        for(int i = 0; i < n; ++i) {
            if(s1[i] == 'x' && s2[i] == 'y') ++c1;
            else if(s1[i] == 'y' && s2[i] == 'x') ++c2;
        }
        // 对于每一对 x-y,x-y y-x,y-x 一次操作即可
        int res = c1 / 2 + c2 / 2;
        c1 %= 2, c2 %= 2;
        if(c1 + c2 == 1) return -1;
        else if(c1 + c1 == 2) res += 2; // 一对 x-y y-x 需要两次
        return res;
    }
```


### [1248. 统计「优美子数组」](https://leetcode-cn.com/problems/count-number-of-nice-subarrays/)

前缀和统计

```c++
    int numberOfSubarrays(vector<int>& nums, int k) {
        int n = nums.size(), res = 0, odd = 0;
        vector<int> c(n+1);
        c[0] = 1;
        for(int i = 0; i < n; ++i) {
            odd += (nums[i]&1);
            if(odd >= k) res += c[odd-k];
            ++c[odd];
        }
        return res;
    }
```

也可以滑动窗口来做 略

### [1249. 移除无效的括号](https://leetcode-cn.com/problems/minimum-remove-to-make-valid-parentheses/)

栈

```c++
    string minRemoveToMakeValid(string s) {
        int n = s.size();
        stack<int> st;
        vector<bool> vis(n+1);
        for(int i = 0; i < n; ++i) {
            if(s[i] == '(') st.push(i);
            else if(s[i] == ')') {
                if(!st.empty()) {
                    int t = st.top(); st.pop();
                    vis[t] = vis[i] = true; // 合法
                }
            } else vis[i] = true;
        }
        string res;
        for(int i = 0; i < n; ++i)
            if(vis[i]) res.push_back(s[i]);
        return res;
    }
```

### [1250. 检查「好数组」](https://leetcode-cn.com/problems/check-if-it-is-a-good-array/)

略

```c++
    bool isGoodArray(vector<int>& nums) {
        int n = nums.size();
        int res = nums[0];
        for(int i = 1; i < n; ++i) res = __gcd(res, nums[i]);
        return res == 1;
    }
```
