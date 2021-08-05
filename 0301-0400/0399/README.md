#  [399. 除法求值](https://leetcode-cn.com/problems/evaluate-division/)

## 题意



## 题解



```c++
// 带权并查集
class Solution {
public:
    unordered_map<string, string> p;  //记录祖先节点
    unordered_map<string, double> d;  //到祖先节点的距离

    string find (string x) {
        if (p[x] != x) {
            string t = find(p[x]);
            d[x] *= d[p[x]];  //p[x] / root
            p[x] = t;
        }
        return p[x];
    }

    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        //初始化所有节点
        for (int i = 0; i < equations.size(); i ++ ) {
            string a = equations[i][0], b = equations[i][1];
            p[a] = a, p[b] = b;
            d[a] = 1, d[b] = 1;
        }
        //集合合并
        for (int i = 0; i < equations.size(); i ++ ) {
            string a = equations[i][0], b = equations[i][1];
            // ra -> b
            string ra = find(a); //找到a的祖先节点
            //更新ra节点
            p[ra] = b;
            d[ra] = values[i] / d[a];
        }
        vector<double> res;
        for (auto q : queries) {
            string a = q[0], b = q[1];
            //如果a、b处于同一集合会自动算出d[a]和d[b]
            if (!p.count(a) || !p.count(b) || find(a) != find(b))
                res.push_back(-1.0);
            else
                res.push_back(d[a] / d[b]);
        }
        return res;
    }
};

// floyd 连通性
class Solution {
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        unordered_set<string> vers;
        unordered_map<string, unordered_map<string, double>> d;
        for (int i = 0; i < equations.size(); ++ i ) {
            auto a = equations[i][0], b = equations[i][1];
            auto c = values[i];
            d[a][b] = c, d[b][a] = 1 / c;
            vers.insert(a), vers.insert(b);
        }
        for (auto k : vers)
            for (auto i : vers)
                for (auto j : vers)
                    if (d[i][k] && d[k][j])
                        d[i][j] = d[i][k] * d[k][j];
        vector<double> res;
        for (auto q : queries) {
            auto a = q[0], b = q[1];
            if (d[a][b]) res.push_back(d[a][b]);
            else res.push_back(-1);
        }
        return res;
    }
};

```



```python3

```

