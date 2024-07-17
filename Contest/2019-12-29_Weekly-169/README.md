## [比赛链接](https://leetcode.cn/contest/weekly-contest-169/)


### [1304. 和为零的N个唯一整数](https://leetcode.cn/problems/find-n-unique-integers-sum-up-to-zero/)

构造一个数列和为 0 ，简单构造即可

```c++
    vector<int> sumZero(int n) {
        vector<int> res;
        if(n&1) {
            res.push_back(0);
            --n;
        }
        for(int i = 1; i * 2 <= n; ++i) {
            res.push_back(-i);
            res.push_back(i);
        }
        return res;
    }
```

当然也可以直接构造 n-1 个负数/正数 然后加一个 正数/负数 即可

```c++
    vector<int> sumZero(int n) {
        vector <int> ret;
        int sum = 0;
        for (int i = 1; i < n; i++) {
            ret.push_back(i);
            sum += i;
        }
        ret.push_back(-sum);
        return ret;
    }
```



### [1305. 两棵二叉搜索树中的所有元素](https://leetcode.cn/problems/all-elements-in-two-binary-search-trees/) 

搜索排序即可

```c++
    void dfs(TreeNode* root, vector<int>& res) {
        if(!root) return;
        dfs(root->left, res);
        res.push_back(root->val);
        dfs(root->right, res);
    }
    vector<int> getAllElements(TreeNode* root1, TreeNode* root2) {
        vector<int> res;
        dfs(root1, res);
        dfs(root2, res);
        sort(res.begin(), res.end());
        return res;
    }
```

### [1306. 跳跃游戏 III](https://leetcode.cn/problems/jump-game-iii/)

每个位置上可以左右跳 arr[i] 个距离

裸搜索

```c++
    int n;
    bool dfs(vector<int>& arr, vector<bool>& vis, int s) {
        if(arr[s] == 0) return true;
        vis[s] = true;
        bool l = false, r = false;
        if(s-arr[s] >= 0 && !vis[s-arr[s]]) l = dfs(arr, vis, s-arr[s]);
        if(s+arr[s] < n && !vis[s+arr[s]]) r = dfs(arr, vis, s+arr[s]);
        return l || r;
    }
    bool canReach(vector<int>& arr, int start) {
        this->n = arr.size();
        bool nofind = true;
        for(int i = 0; i < n; ++i) if(!arr[i]) {nofind = false; break;}
        if(nofind) return false;
        vector<bool> vis(n);
        return dfs(arr, vis, start);
    }
```

### [1307. 口算难题](https://leetcode.cn/problems/verbal-arithmetic-puzzle/) [TAG]

初步考虑深搜回溯：

>    在遍历 words 中每个字符代表对数字之后，需要再在此基础上遍历 result 串。

本质考察剪枝【后来加强过代码，很多人的略暴力的解法都过不了】。

**考虑：**

1.  统计每个字符在数位上的贡献

```c++
unordered_map<char, int> m;

    for(auto w : words) {
        int sz = w.size(), v = 1;
        for(int i = sz-1; i >= 0; --i) {
            m[w[i]] += v;
            v *= 10;
        }
        front[w[0]] = true; // 标记首位字符非零
    }
```

2.  记录前导 0 以在搜索中跳过

```c++
unordered_map<char, bool> front;

    // front[w[0]] = true;
    front[result[0]] = true;
```

3.  标记某个字符是否已有意义 以及意义为何数值；相应的 记录某个数值是否已被某字符代表

```c++
unordered_map<char, int> vis;
vector<bool> use;

    // dfs
```

然后这样会超时。。。

**一个 800ms的代码：**

```c++
class Solution {
public:
    int fac[100005], ss[100005];
    int use[16];

    set <char> all;
    vector <char> v;
    bool dfs(int pos, long long sum) {
        if (pos == v.size()) {
            return sum == 0;
        }
        
        char cur = v[pos];
        int st = 0;
        if (ss[cur] == 1) {
            st = 1;
        }
        for (int i = st; i < 10; i++) {
            if (!use[i]) {
                use[i] = 1;
                if (dfs(pos + 1, sum + (long long)fac[cur] * i)) {
                    return true;
                }
                use[i] = 0;
            }
        }
        return false;
    }
    
    bool isSolvable(vector<string>& words, string r) {
        for (char c = 'A'; c <= 'Z'; c++) {
            fac[c] = 0;
            ss[c] = 0;
        }
        for (int i = 0; i <= 10; i++) {
            use[i] = 0;
        }
        for (string w : words) {
            int cur = 1;
            for (int i = w.size() - 1; i >= 0; i--) {
                fac[w[i]] += cur;
                all.insert(w[i]);
                cur *= 10;
            }
            if (w.size() > 1) {
                ss[w[0]] = 1;
            }
        }
        int cur = 1;
        for (int i = r.size() - 1; i >= 0; i--) {
            fac[r[i]] -= cur;
            all.insert(r[i]);
            cur *= 10;
        }
        if (r.size() > 1) {
            ss[r[0]] = 1;
        }
        v.clear();
        for (char c : all) {
            v.push_back(c);
        }
        
        return dfs(0, 0);
    }
};
```

**一个4ms的代码：**

```c++
using PCI = pair<char, int>;

class Solution {
private:
    vector<PCI> weight;
    vector<int> suffix_sum_min, suffix_sum_max;
    vector<int> lead_zero;
    bool used[10];

public:
    int pow10(int x) {
        int ret = 1;
        for (int i = 0; i < x; ++i) {
            ret *= 10;
        }
        return ret;
    }

    bool dfs(int pos, int total) {
        if (pos == weight.size()) {
            return total == 0;
        }
        if (!(total + suffix_sum_min[pos] <= 0 && 0 <= total + suffix_sum_max[pos])) {
            return false;
        }
        for (int i = lead_zero[pos]; i < 10; ++i) {
            if (!used[i]) {
                used[i] = true;
                bool check = dfs(pos + 1, total + weight[pos].second * i);
                used[i] = false;
                if (check) {
                    return true;
                }
            }
        }
        return false;
    }

    bool isSolvable(vector<string>& words, string result) {
        unordered_map<char, int> _weight;
        unordered_set<char> _lead_zero;
        for (const string& word: words) {
            for (int i = 0; i < word.size(); ++i) {
                _weight[word[i]] += pow10(word.size() - i - 1);
            }
            if (word.size() > 1) {
                _lead_zero.insert(word[0]);
            }
        }
        for (int i = 0; i < result.size(); ++i) {
            _weight[result[i]] -= pow10(result.size() - i - 1);
        }
        if (result.size() > 1) {
            _lead_zero.insert(result[0]);
        }

        weight = vector<PCI>(_weight.begin(), _weight.end());
        sort(weight.begin(), weight.end(), [](const PCI& u, const PCI& v) {
            return abs(u.second) > abs(v.second);
        });
        int n = weight.size();
        suffix_sum_min.resize(n);
        suffix_sum_max.resize(n);
        for (int i = 0; i < n; ++i) {
            vector<int> suffix_pos, suffix_neg;
            for (int j = i; j < n; ++j) {
                if (weight[j].second > 0) {
                    suffix_pos.push_back(weight[j].second);
                }
                else if (weight[j].second < 0) {
                    suffix_neg.push_back(weight[j].second);
                }
                sort(suffix_pos.begin(), suffix_pos.end());
                sort(suffix_neg.begin(), suffix_neg.end());
            }
            for (int j = 0; j < suffix_pos.size(); ++j) {
                suffix_sum_min[i] += (suffix_pos.size() - 1 - j) * suffix_pos[j];
                suffix_sum_max[i] += (10 - suffix_pos.size() + j) * suffix_pos[j];
            }
            for (int j = 0; j < suffix_neg.size(); ++j) {
                suffix_sum_min[i] += (9 - j) * suffix_neg[j];
                suffix_sum_max[i] += j * suffix_neg[j];
            }
        }

        lead_zero.resize(n);
        for (int i = 0; i < n; ++i) {
            lead_zero[i] = (_lead_zero.count(weight[i].first) ? 1 : 0);
        }
        
        memset(used, false, sizeof(used));
        return dfs(0, 0);
    }
};
```

