## [比赛链接](https://leetcode.cn/contest/biweekly-contest-68/)

>   virtual rank: 143 / 2854


### [2114. 句子中的最多单词数](https://leetcode.cn/problems/maximum-number-of-words-found-in-sentences/)

略

```c++
class Solution {
public:
    int mostWordsFound(vector<string>& sentences) {
        int res = 0;
        for (auto & s : sentences) {
            stringstream ss(s);
            string t;
            int c = 0;
            while (ss >> t)
                c ++ ;
            res = max(res, c);
        }
        return res;
    }
};
```


### [2115. 从给定原材料中找到所有可以做出的菜](https://leetcode.cn/problems/find-all-possible-recipes-from-given-supplies/) [TAG]

标准

```c++
class Solution {
public:
    // 标程 topo
    using US = unordered_set<string>;
    using USM = unordered_map<string, US>;
    
    USM g;
    unordered_map<string, int> deg;
    
    vector<string> findAllRecipes(vector<string>& recipes, vector<vector<string>>& ingredients, vector<string>& supplies) {
        int n = recipes.size();
        for (int i = 0; i < n; ++ i ) {
            auto & pa = recipes[i];
            auto & sons = ingredients[i];
            for (auto & son : sons)
                g[son].insert(pa), deg[pa] ++ ;
        }
        
        queue<string> q;
        for (auto & s : supplies)
            q.push(s);
        
        vector<string> res;
        while (!q.empty()) {
            auto t = q.front(); q.pop();
            for (auto & pa : g[t])
                if ( -- deg[pa] == 0)
                    q.push(pa), res.push_back(pa);
        }
        return res;
    }
};
```

一个比较复杂的解。。

```c++
class Solution {
public:
    using US = unordered_set<string>;
    using USM = unordered_map<string, US>;
    
    USM g, p;
    US S;
    bool check(string s) {
        auto & sons = g[s];
        for (auto son : sons)
            if (!S.count(son))
                return false;
        return true;
    }
    
    vector<string> findAllRecipes(vector<string>& recipes, vector<vector<string>>& ingredients, vector<string>& supplies) {
        int n = recipes.size();
        for (int i = 0; i < n; ++ i ) {
            auto & pa = recipes[i];
            auto & sons = ingredients[i];
            for (auto & son : sons)
                g[pa].insert(son), p[son].insert(pa);
        }
        
        S.clear();
        for (auto & s : supplies)
            S.insert(s);
        auto t = S;
        while (true) {
            bool changed = false;
            
            US delta;
            for (auto & son : t)
                for (auto & pa : p[son])
                    if (!S.count(pa) && check(pa))
                        delta.insert(pa), changed = true;
            
            for (auto & s : delta)
                S.insert(s);
            t = delta;
            if (!changed)
                break;
        }
        vector<string> res;
        for (auto & pa : recipes)
            if (S.count(pa))
                res.push_back(pa);
        return res;
    }
};
```

### [2116. 判断一个括号字符串是否有效](https://leetcode.cn/problems/check-if-a-parentheses-string-can-be-valid/) [TAG]

经典维护区间

```c++
class Solution {
public:
    bool canBeValid(string s, string locked) {
        int n = s.size();
        for (int i = 0; i < n; ++ i )
            if (locked[i] == '0')
                s[i] = '*';
        
        int low = 0, high = 0;
        for (auto c : s) {
            if (c == '(')
                low ++ , high ++ ;
            else if (c == ')')
                low -- , high -- ;
            else
                low -- , high ++ ;
            low = max(low, 0);
            if (low > high)
                return false;
        }
        return !low && n % 2 == 0;
    }
};
```

### [2117. 一个区间内所有数乘积的缩写](https://leetcode.cn/problems/abbreviating-the-product-of-a-range/) [TAG]

素数筛 + 质因数分解 + 大数 ==> TLE

**正解是直接取模截断**

```c++
class Solution {
public:
    using LL = long long;
    const static LL N = 1e10, M = 1e5;
    
    string abbreviateProduct(int left, int right) {
        LL two = 0, five = 0;
        for (int i = left, j; (j = i) <= right; ++ i ) {
            while (j % 2 == 0)
                j /= 2, two ++ ;
            while (j % 5 == 0)
                j /= 5, five ++ ;
        }
        two = five = min(two, five);
        int zero = min(two, five);
        
        LL flag = 0, last = 1;
        double first = 1;
        for (int i = left; i <= right; ++ i ) {
            {
                last *= i;
                while (last % 2 == 0 && two)
                    last /= 2, two -- ;
                while (last % 5 == 0 && five)
                    last /= 5, five -- ;
                if (last > N)
                    flag = 1, last %= N;
            }
            {
                first *= i;
                while (first > M)
                    first /= 10;
            }
        }
        
        return (flag == 0 ?
                    to_string(last) : 
                    to_string((int)first) + "..." + to_string(last % M + M).substr(1))
                + "e" + to_string(zero);
    }
};
```
