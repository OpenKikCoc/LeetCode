## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-164/)


### [1266. 访问所有点的最小时间](https://leetcode-cn.com/problems/minimum-time-visiting-all-points/)

注意题目要求按顺序走 而非全局最优 所以就很简单了

```c++
    // 两个点的距离是横纵坐标的最大差值 
    int minTimeToVisitAllPoints(vector<vector<int>>& points) {
        int res = 0, n = points.size();
        for(int i = 1; i < n; ++i)
            res += max(abs(points[i][0]-points[i-1][0]), abs(points[i][1]-points[i-1][1]));
        return res;
    }
```


### [1267. 统计参与通信的服务器](https://leetcode-cn.com/problems/count-servers-that-communicate/)

扫两边统计即可

```c++
    int countServers(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> cm(m), cn(n);
        int total = 0;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) if(grid[i][j]) ++cm[i], ++cn[j], ++total;
        int single = 0;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j)
                if(grid[i][j] && cm[i] == 1 && cn[j] == 1) ++single;
        return total - single;
    }
```

### [1268. 搜索推荐系统](https://leetcode-cn.com/problems/search-suggestions-system/)

模拟题， Trie 标准解法，暴力略加优化也可以过。

```c++
    bool check(string sub, string pro) {
        if(sub.size() > pro.size()) return false;
        for(int i = 0; i < sub.size(); ++i) if(sub[i] != pro[i]) return false;
        return true;
    }
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
        sort(products.begin(), products.end());
        int n = searchWord.size(), tot = products.size();
        vector<vector<string>> res;
        string sub;
        // 记录上次扫描开始的位置 每次扫描结束后更新
        int latest = 0;
        for(int i = 0; i < n; ++i) {
            sub.push_back(searchWord[i]);
            vector<string> t;
            int first = -1;
            for(int j = latest; j < tot; ++j) if(check(sub, products[j])) {
                t.push_back(products[j]);
                if(first == -1) first = j;
                if(t.size() == 3) break;
            }
            // -1 说明不存在当前子串 连带后面的全部返回空数组
            if(first == -1) {
                for(int j = i; j < n; ++j) res.push_back({});
                return res;
            }
            latest = first;
            res.push_back(t);
        }
        return res;
    }
```

TAG 记一下官方的 Trie 模板

```c++
struct Trie {
    unordered_map<char, Trie*> child;
    priority_queue<string> words;
};

class Solution {
private:
    void addWord(Trie* root, const string& word) {
        Trie* cur = root;
        for (const char& ch: word) {
            if (!cur->child.count(ch)) {
                cur->child[ch] = new Trie();
            }
            cur = cur->child[ch];
            cur->words.push(word);
            if (cur->words.size() > 3) {
                cur->words.pop();
            }
        }
    }
    
public:
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
        Trie* root = new Trie();
        for (const string& word: products) {
            addWord(root, word);
        }
        
        vector<vector<string>> ans;
        Trie* cur = root;
        bool flag = false;
        for (const char& ch: searchWord) {
            if (flag || !cur->child.count(ch)) {
                ans.emplace_back();
                flag = true;
            }
            else {
                cur = cur->child[ch];
                vector<string> selects;
                while (!cur->words.empty()) {
                    selects.push_back(cur->words.top());
                    cur->words.pop();
                }
                reverse(selects.begin(), selects.end());
                ans.push_back(move(selects));
            }
        }
        
        return ans;
    }
};
```

以及还有 `二分查找` 、 `multi_set` 的思路。

以及赛榜有边扫描边维护的做法：

```c++
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
        int n = products.size();
        int len = searchWord.size();
        vector<vector<string>> ret(len);
        vector<string> &a = products;
        for (int i = 0; i < len; ++i) {
            for (auto &s : a)
                if (s.length() > i && s[i] == searchWord[i]) {
                    ret[i].push_back(s);
                }
            a = ret[i];
        }
        for (int i = 0; i < len; ++i) {
            sort(ret[i].begin(), ret[i].end());
            if (ret[i].size() > 3) ret[i].erase(ret[i].begin() + 3, ret[i].end());
        }
        return ret;
    }
```

再就是有个别聚聚，和我之前思路相似：
> 
> 排序后随着需匹配的字符串长度增加，可匹配的区间一定是从左右两端向中间不断收缩的
> 
```c++
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
        sort(begin(products), end(products));
        int ptr = 0;
        int left = 0;
        int right = products.size();
        vector<vector<string>> answer;
        for (char c : searchWord) {
            while (left < right && products[left][ptr] < c)left += 1;
            while (left < right && products[right - 1][ptr] > c)right -= 1;
            vector<string> current;
            for (int i = left; i < left + 3 && i < right; ++i)
                current.push_back(products[i]);
            answer.push_back(current);
            ptr += 1;
        }
        return answer;
    }
```

### [1269. 停在原地的方案数](https://leetcode-cn.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/) [TAG]

组合数 其中左右边界限制约束组合数计算 ? 

直接dp

```c++
    const int mod = 1e9+7;
    int numWays(int steps, int arrLen) {
        vector<long long> f(steps+1);
        f[0] = 1;
        for(int s = 1; s <= steps; ++s) {
            long long tmp = 0;
            for(int i = 0; i < min(min(arrLen, s+1), steps-s+1); ++i) {
                swap(f[i], tmp);
                f[i] = (tmp+f[i]+f[i+1])%mod;
            }
        }
        return f[0];
    }
```
