## [比赛链接](https://leetcode.cn/contest/weekly-contest-223/)

25min 3 / 4

### [1720. 解码异或后的数组](https://leetcode.cn/problems/decode-xored-array/)

扫以一遍即可

```c++
class Solution {
public:
    vector<int> decode(vector<int>& encoded, int first) {
        vector<int> res;
        res.push_back(first);
        
        for (auto v : encoded)
            res.push_back(res.back() ^ v);
        return res;
    }
};
```


### [1721. 交换链表中的节点](https://leetcode.cn/problems/swapping-nodes-in-a-linked-list/)

模拟即可

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapNodes(ListNode* head, int k) {
        vector<ListNode*> ve;
        while (head)
            ve.push_back(head), head = head->next;
        swap(ve[k - 1]->val, ve[ve.size() - k]->val);
        return ve[0];
    }
};
```

### [1722. 执行交换操作后的最小汉明距离](https://leetcode.cn/problems/minimize-hamming-distance-after-swap-operations/)

与前几天的每日一题类似 [Weekly-155-C](https://github.com/OpenKikCoc/LeetCode/tree/master/Contest/2019-09-22_Weekly-155) 

并查集即可

```c++
class Solution {
public:
    int n;
    
    vector<int> p;
    void init() {
        p = vector<int>(n);
        for (int i = 0; i < n; ++ i ) p[i] = i;
    }
    int find(int x) {
        if (p[x] != x) return p[x] = find(p[x]);
        return p[x];
    }
    
    int minimumHammingDistance(vector<int>& sr, vector<int>& tr, vector<vector<int>>& as) {
        n = sr.size();
        
        init();
        
        for (auto & e : as) 
            p[find(e[0])] = find(e[1]);
        
        vector<vector<int>> v1(n), v2(n);
        for (int i = 0; i < n; ++ i ) {
            v1[find(i)].push_back(sr[i]);
            v2[find(i)].push_back(tr[i]);
        }
        
        int cnt = 0;
        for (int i = 0; i < n; ++ i )
            if (find(i) == i) {
                sort(v1[i].begin(), v1[i].end());
                sort(v2[i].begin(), v2[i].end());
                int sz = v1[i].size();
                for (int j = 0, k = 0; j < sz && k < sz; ) {
                    if (v1[i][j] == v2[i][k]) {
                        ++ cnt;
                        ++ j, ++ k;
                    } else if (v1[i][j] < v2[i][k]) ++ j;
                    else ++ k;
                }
            }
        return n - cnt;
    }
};
```

可以用 STL ：

```c++
class Solution {
public:
    vector<int> p;

    int find(int x) {
        if (p[x] != x) p[x] = find(p[x]);
        return p[x];
    }

    int minimumHammingDistance(vector<int>& a, vector<int>& b, vector<vector<int>>& as) {
        int n = a.size();
        for (int i = 0; i < n; i ++ ) p.push_back(i);
        for (auto& t: as) p[find(t[0])] = find(t[1]);

        vector<unordered_multiset<int>> hash(n);
        for (int i = 0; i < n; i ++ )
            hash[find(i)].insert(a[i]);
        int res = 0;
        for (int i = 0; i < n; i ++ ) {
            auto& h = hash[find(i)];
            if (h.count(b[i])) h.erase(h.find(b[i]));
            else res ++ ;
        }
        return res;
    }
};
```

### [1723. 完成所有工作的最短时间](https://leetcode.cn/problems/find-minimum-time-to-finish-all-jobs/) [TAG]

爆搜优化即可 [斯特林数 TODO](https://www.acwing.com/problem/content/3169/)

```c++
class Solution {
public:
    vector<int> js, sum;
    int n, m, k, cnt, res;
    
    
    void dfs(int p) {
        if (cnt > res) return;
        if (p == n) {
            if (cnt <= k) {
                res = cnt;
            }
            return;
        }
        
        for (int i = 0; i < cnt; ++ i ) {
            if (sum[i] + js[p] <= m) {
                sum[i] += js[p];
                dfs(p + 1);
                sum[i] -= js[p];
            }
        }
        // 写的时候超时 加一行 if cnt < k 就AC
        if (cnt < k) {
            sum[cnt ++ ] = js[p];
            dfs(p + 1);
            sum[ -- cnt] = 0;
        }
        
    }
    
    // 最大工作时间m
    int check() {
        sum = vector<int>(15);
        cnt = 0;
        res = 1e9;
        dfs(0);
        return res <= k;
    }
    
    int minimumTimeRequired(vector<int>& jobs, int k) {
        js = jobs;
        n = js.size();
        this->k = k;
        sort(js.begin(), js.end());
        reverse(js.begin(), js.end());
        
        int l = 0, r = 0;
        for (auto & v : js) r += v, l = max(l, v);
        while (l < r) {
            m = l + r >> 1;
            if (check()) r = m;
            else l = m + 1;
        }
        return l;
    }
};
```

yxc 爆搜：

```c++
class Solution {
public:
    vector<int> s, js;
    int res = 1e9;
    
    // a位置 b使用的工人 c最大值
    void dfs(int a, int b, int c) {
        if (c > res) return;
        if (a == js.size()) {
            res = c;
            return;
        }
        
        for (int i = 0; i < b; ++ i ) {
            s[i] += js[a];
            dfs(a + 1, b, max(c, s[i]));
            s[i] -= js[a];
        }
        
        if (b < s.size()) {
            s[b] = js[a];
            dfs(a + 1, b + 1, max(c, s[b]));
            s[b] = 0;
        }
    }
    
    int minimumTimeRequired(vector<int>& jobs, int k) {
        js = jobs, s.resize(k);
        dfs(0, 0, 0);
        return res;
    }
};
```

赛榜 dp

```c++
class Solution {
public:
    int minimumTimeRequired(vector<int>& jobs, int k) {
        int n = jobs.size();
        // 一个任务子集的总时间
        vector<int> tot(1 << n);
        
        // 写法1
        // 【学习记忆 这种写法更好】
        for (int i = 1; i < (1 << n); ++ i ) {
            // o = 最右侧0的数量
            int o = __builtin_ctz(i & (-i));
            tot[i] = tot[i ^ (i & (-i))] + jobs[o];
        }
        
        /* 写法2
        for (int i = 1; i < (1 << n); ++ i )
            for (int j = 0; j < n; ++ j )
                if ((i & (1 << j))) {
                    int left = i - (1 << j);
                    tot[i] = tot[left] + jobs[j];
                    break;
                }
        */
        
        vector<int> f(1 << n, INT_MAX / 2);
        f[0] = 0;
        for (int j = 1; j <= k; ++ j )
            for (int mask = (1 << n) - 1; mask; -- mask)
                // 枚举子集
                for (int sub = mask; sub; sub = (sub - 1) & mask)
                    f[mask] = min(f[mask], max(f[mask ^ sub], tot[sub]));
        return f[(1 << n) - 1];
    }
};
```

