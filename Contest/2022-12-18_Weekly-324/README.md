## [比赛链接](https://leetcode.cn/contest/weekly-contest-324/)

>   virtual rank: 222 / 4167


### [2506. 统计相似字符串对的数目](https://leetcode.cn/problems/count-pairs-of-similar-strings/)



```c++
class Solution {
public:
    int similarPairs(vector<string>& words) {
        for (auto & w : words) {
            sort(w.begin(), w.end());
            w.erase(unique(w.begin(), w.end()), w.end());
        }
        int n = words.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                if (words[i] == words[j])
                    res ++ ;
        return res;
    }
};
```


### [2507. 使用质因数之和替换后可以取到的最小值](https://leetcode.cn/problems/smallest-value-after-replacing-with-sum-of-prime-factors/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int primes[N], cnt;
    bool st[N];
    void init() {
        cnt = 0;
        for (int i = 2; i < N; ++ i ) {
            if (!st[i])
                primes[cnt ++ ] = i;
            for (int j = 0; primes[j] <= (N - 1) / i; ++ j ) {
                st[primes[j] * i] = true;
                if (i % primes[j] == 0)
                    break;
            }
        }
    }
    
    int smallestValue(int n) {
        init();
        
        for (int i = 0; ; ++ i ) {
            int ori = n, next = 0;
            for (int i = 0; i < cnt && primes[i] <= n; ++ i )
                if (n % primes[i] == 0) {
                    int p = primes[i];
                    while (n % p == 0) {
                        // cout << " add " << p << endl;
                        n /= p, next += p;
                    }
                }
            if (n > 1)
                next += n;
            
            // cout << " i = " << i << " ori = " << ori << " next = " << next << endl;
            
            if (next >= ori)
                return ori;
            // cout << " next" << endl;
            n = next;
        }
        return -1;
    }
};
```

### [2508. 添加边使所有节点度数都为偶数](https://leetcode.cn/problems/add-edges-to-make-degrees-of-all-nodes-even/) [TAG]

分情况讨论

速度加快

```c++
class Solution {
public:
    // 思考:
    // +0 => 原图已经都是偶数
    // +1 => 原图恰好两个奇数, 且加完无重边
    // +2 => 4个度数分配 [1, 1, 1, 1] or [1, 1, 2]
    const static int N = 1e5 + 10;
    
    unordered_set<int> es[N];
    int d[N];
    
    bool has_edge(int a, int b) {
        return es[a].find(b) != es[a].end();
    }
    
    bool isPossible(int n, vector<vector<int>>& edges) {
        for (auto & e : edges)
            es[e[0]].insert(e[1]), es[e[1]].insert(e[0]), d[e[0]] ++ , d[e[1]] ++ ;
        
        vector<int> xs;
        for (int i = 1; i <= n; ++ i )
            if (d[i] & 1)
                xs.push_back(i);
        // cout << " xs " << xs.size() << endl;
        
        // +0
        {
            if (xs.empty())
                return true;
        }
        
        // +1
        {
            if (xs.size() == 2) {
                // cout << " xs = " << xs[0] << ' ' << xs[1] << endl;
                // 只要没有重边即可
                if (!has_edge(xs[0], xs[1]))
                    return true;
                // ATTENTION ==> 有重边则只要有个其他偶数边即可
                // 此时 has_edge 一定为 true，则需要让这两个点与其他点相连 且连接的点不应该出现在二者并集中
                for (int i = 1; i <= n; ++ i ) {
                    if (i == xs[0] || i == xs[1])
                        continue;
                    if (has_edge(xs[0], i) || has_edge(xs[1], i))
                        continue;
                    return true;
                }
            }
        }
        
        // +2
        {
            if (xs.size() == 4) {
                /*
                for (int i = 0; i < 4; ++ i )
                    for (int j = i + 1; j < 4; ++ j ) {
                        int a = xs[i], b = xs[j], c = -1, d = -1;
                        for (int k = 0; k < 4; ++ k )
                            if (k != i && k != j) {
                                if (c == -1)
                                    c = xs[k];
                                else
                                    d = xs[k];
                            }
                        
                        if (!has_edge(a, b) && !has_edge(c, d)) {
                            return true;
                        }
                    }
                */
                // 枚举过程可以优化
                int a = xs[0], b = xs[1], c = xs[2], d = xs[3];
                if (!has_edge(a, b) && !has_edge(c, d) ||
                    !has_edge(a, c) && !has_edge(b, d) ||
                    !has_edge(a, d) && !has_edge(b, c))
                    return true;
            }
        }
        
        return false;
    }
};
```

### [2509. 查询树中环的长度](https://leetcode.cn/problems/cycle-length-queries-in-a-tree/)

最初的做法同样需要分情况讨论

```c++
class Solution {
public:
    // n = 30 不可能真的建树
    // 考虑其为满二叉树，且编号具有对应关系，容易找到 lca (最多 30 层)
    
    vector<int> get(int x) {
        vector<int> ret;
        while (x > 1) {
            ret.push_back(x);
            x /= 2;
        }
        ret.push_back(1);
        reverse(ret.begin(), ret.end());
        return ret;
    }
    
    vector<int> cycleLengthQueries(int n, vector<vector<int>>& queries) {
        vector<int> res;
        for (auto & q : queries) {
            int a = q[0], b = q[1];
            auto as = get(a);
            auto bs = get(b);
            // 在相同分支 则环大小为距离差+1
            bool flag = false;
            for (auto & x : as)
                if (x == b)
                    flag = true;
            for (auto & x : bs)
                if (x == a)
                    flag = true;
            
            // cout << " f = " << flag << endl;
            
            int t = 0;
            if (flag) {
                t = as.size() - bs.size();
                if (t < 0)
                    t = -t;
                // cout << "t = " << t << endl;
            } else {
                t = as.size() + bs.size() - 2;
                int p = 0;
                for (int i = 0; i < as.size() && i < bs.size(); ++ i )
                    if (as[i] != bs[i])
                        break;
                    else
                        p = i;
                t -= p * 2;
                
                // cout << " t = " << t << " p = " << p << endl;
            }
            
            res.push_back(t + 1);
        }
        return res;
    }
};
```

实际上有更为简单的做法

【深入理解 LCA】

```c++
class Solution {
public:
    vector<int> cycleLengthQueries(int n, vector<vector<int>>& queries) {
        vector<int> res;
        for (auto & q : queries) {
            int a = q[0], b = q[1];
            int t = 0;
            while (a != b) {    // ATTENTION 判断条件
                if (a > b)
                    a /= 2, t ++ ;
                else
                    b /= 2, t ++ ;
            }
            res.push_back(t + 1);
        }
        return res;
    }
};
```

