#   [765. 情侣牵手](https://leetcode-cn.com/problems/couples-holding-hands/)

## 题意



## 题解



```c++
class Solution {
public:
    // 经典图论模型 环状图 每次交换环中断
    // 目标 把环状图变为若干个自环

    vector<int> p;

    int find(int x) {
        if (p[x] != x)
            p[x] = find(p[x]);
        return p[x];
    }

    int minSwapsCouples(vector<int>& row) {
        int n = row.size() / 2;
        for (int i = 0; i < n; ++ i )
            p.push_back(i);
        
        int cnt = n;
        for (int i = 0; i < n * 2; i += 2 ) {
            int a = row[i] / 2, b = row[i + 1] / 2;
            // 环等价于联通块 找环即找联通块
            if (find(a) != find(b)) {
                p[find(a)] = find(b);
                cnt -- ;
            }
        }
        return n - cnt;
    }
};
```



```python3

```

