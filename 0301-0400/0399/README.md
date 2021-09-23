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



```python
"""
题解：建立有向图 + BFS。我们可以按照给定的关系去建立一个有向图，如果当前a / b = 2.0，那么w[a][b] = 2.0,w[b][a] = 0.5，询问假设为x / y，如果我们能从x出发通过BFS到达y，那么路径上的乘积就是我们需要的答案。如果待查询的字符串没有遇到过或者无法遍历到，就返回-1。

"""

class Solution(object):
    def calcEquation(self, equations, values, queries):
        """
        :type equations: List[List[str]]
        :type values: List[float]
        :type queries: List[List[str]]
        :rtype: List[float]
        """
        vertex = set()
        path = collections.defaultdict(dict)
        for (a, b), v in zip(equations, values):
            path[a][b] = v
            path[b][a] = 1/v
            # 把记录过的点加入到vertex里去
            vertex.add(a)
            vertex.add(b)

        # 把所有的点之间的距离都求出来，后面遍历就行了
        for k in vertex:
            for i in vertex:
                for j in vertex:
                    # i/k * j/k = i/k, 得到i ~ k的距离
                    if k in path[i].keys() and j in path[k].keys():
                        path[i][j] = path[i][k] * path[k][j]

        res = []
        for q in queries:
            up = q[0]
            down = q[1]
            # up/down 存在，返回结果
            if down in path[up].keys():
                res.append(path[up][down])
            else:
                res.append(-1)

        return res
```

