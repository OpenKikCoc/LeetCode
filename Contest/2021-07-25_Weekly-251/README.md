## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-251)

>   rank: 709 / 4746


### [5823. 字符串转化后的各位数字之和](https://leetcode-cn.com/problems/sum-of-digits-of-string-after-convert/)

模拟即可 搞错题意WA一发

```c++
class Solution {
public:
    string get(string s) {
        string res;
        for (auto c : s)
            res += to_string(c - 'a' + 1);
        return res;
    }
    
    int f(string s) {
        int sum = 0;
        for (auto c : s)
            sum += c - '0';
        return sum;
    }
    
    int getLucky(string s, int k) {
        s = get(s);
        int sum;
        while (k -- ) {
            sum = f(s);
            s = to_string(sum);
        }
        return sum;
    }
};
```


### [5824. 子字符串突变后可能得到的最大整数](https://leetcode-cn.com/problems/largest-number-after-mutating-substring/)

贪心 从前找一个连续区间即可 略

```c++
class Solution {
public:
    string maximumNumber(string num, vector<int>& change) {
        string res;
        int n = num.size();
        for (int i = 0; i < n; ++ i ) {
            int x = num[i] - '0';
            if (x >= change[x]) {
                res.push_back(num[i]);
            } else {
                int j = i + 1;
                while (j < n && num[j] - '0' <= change[num[j] - '0'])
                    j ++ ;
                for (int k = i; k < j; ++ k )
                    res.push_back(change[num[k] - '0'] + '0');
                for (int k = j; k < n; ++ k )
                    res.push_back(num[k]);
                break;
            }
        }
        
        return res;
    }
};
```

简单些

```c++
class Solution {
public:
    string maximumNumber(string a, vector<int>& b) {
        int n = a.size();
        
        int i = 0;
        for (; i < n && a[i] - '0' >= b[a[i] - '0']; ++i);
        for (; i < n && a[i] - '0' <= b[a[i] - '0']; ++i)
            a[i] = '0' + b[a[i] - '0'];
        return a;
    }
};
```



### [5825. 最大兼容性评分和](https://leetcode-cn.com/problems/maximum-compatibility-score-sum/)

爆搜即可 也可状压DP 略

```c++
class Solution {
public:
    const static int N = 10, M = 260;
    
    int m, n;
    vector<int> st, mt;
    int g[N][N], f[M];
    
    int maxCompatibilitySum(vector<vector<int>>& students, vector<vector<int>>& mentors) {
        this->m = students.size(), this->n = students[0].size();
        st.clear(); mt.clear();
        for (auto & sts : students) {
            int s = 0;
            for (int i = 0; i < n; ++ i )
                if (sts[i] & 1)
                    s ^= 1 << i;
            st.push_back(s);
        }
        for (auto mts : mentors) {
            int s = 0;
            for (int i = 0; i < n; ++ i )
                if (mts[i] & 1)
                    s ^= 1 << i;
            mt.push_back(s);
        }
        
        memset(g, 0, sizeof g);
        for (int i = 0; i < m; ++ i )
            for (int j = 0; j < m; ++ j ) {
                int a = st[i], b = mt[j];
                int s = 0;
                for (int k = 0; k < n; ++ k )
                    if ((a >> k & 1) == (b >> k & 1))
                        s ++ ;
                g[i][j] = s;
            }
        
        memset(f, 0, sizeof f);
        for (int i = 0; i < 1 << m; ++ i ) {
            int sz = __builtin_popcount(i);
            for (int j = 0; j < m; ++ j )
                if (i >> j & 1)
                    f[i] = max(f[i], f[i ^ (1 << j)] + g[j][sz - 1]);
        }
        
        return f[(1 << m) - 1];
    }
};
```

### [5826. 删除系统中的重复文件夹](https://leetcode-cn.com/problems/delete-duplicate-folders-in-system/) [TAG]

显然树Hash 之前题意理解有问题

需要注意题意并没有要求返回的结果必须是输入的子集，所以可以直接回溯构造

```c++
class Solution {
public:
    using ULL = unsigned long long;
    const static ULL P = 131;
    
    // hash
    ULL shash(string & s) {
        ULL ret = 0;
        for (auto c : s)
            ret = ret * P + c;
        return ret;
    }
    
    // Node
    struct Node {
        string name;
        unordered_map<string, Node*> sons;
        ULL hash = 0;
        bool del = false;
        Node(string name) : name(name) {}
    };
    Node * root;
    unordered_map<ULL, vector<Node*>> mp;
    void insert(vector<string> & pth) {
        auto p = root;
        for (auto & x : pth) {
            if (!p->sons.count(x))
                p->sons[x] = new Node(x);
            p = p->sons[x];
        }
        // Nothing
    }
    
    // dfs
    void dfs(Node * p) {
        string s;
        for (auto [name, node] : p->sons) {
            dfs(node);
            // 不加 node->name 就会多删   即加了hash才有区分度
            s += "[" + node->name + to_string(node->hash) + "]";
        }
        p->hash = shash(s);
        // 根据题意解释 必然是非空集合
        if (p->sons.size())
            mp[p->hash].push_back(p);
    }
    vector<string> t;
    vector<vector<string>> res;
    // 直接回溯建立答案列表
    // ATTENTION 题意并没有说输入有漏掉某个可能路径OR输出必须包含于输入 so直接构造所有的可能路径
    void get_res(Node * p) {
        if (p->del)
            return
        if (p->name != "/") {
            t.push_back(p->name);
            res.push_back(t);
        }
        for (auto [name, node] : p->sons)
            get_res(node);
        if (p->name != "/")
            t.pop_back();
    }
    
    vector<vector<string>> deleteDuplicateFolder(vector<vector<string>>& paths) {
        root = new Node("/");
        for (auto & pth : paths)
            insert(pth);
        
        dfs(root);
        for (auto [hash, nodes] : mp)
            if (nodes.size() > 1)
                for (auto node : nodes)
                    node->del = true;
        
        get_res(root);
        return res;
    }
};
```
