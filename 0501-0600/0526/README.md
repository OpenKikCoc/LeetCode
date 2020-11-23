#  [526. 优美的排列](https://leetcode-cn.com/problems/beautiful-arrangement/)

## 题意



## 题解



```c++
class Solution {
public:
    int countArrangement(int N) {
        vector<int> f(1 << N);
        f[0] = 1;
        for (int i = 0; i < 1 << N; ++ i ) {
            // 共有 k 个数
            int k = 0;
            for (int j = 0; j < N; ++ j )
                if (i >> j & 1) ++ k ;
            // 加上第 j 个数
            for (int j = 0; j < N; ++ j )
                if (!(i >> j & 1))
                    if ((k + 1) % (j + 1) == 0 || (j + 1) % (k + 1) == 0)
                        f[i | (1 << j)] += f[i];
        }
        return f[(1 << N) - 1];
    }
};


// 远古代码
class Solution {
public:
    int n, tot, res;
    map<pair<int, int>, int> m;
    void dfs(int state, int sum, int pos) {
        if(sum >= tot) {    // if(pos >= n)
            ++res;
            return;
        }
        for(int i = 1; i <= n; ++i) {
            if(((state&(1<<i)) == 0) && (i%pos == 0 || pos%i == 0)) {
                dfs(state | 1<<i, sum + i, pos+1);
            }
        }
    }
    int countArrangement(int N) {
        n = N, tot = (1+n)*n/2, res = 0;
        for(int i = 1; i <= n; ++i) {
            // if((i % 1) == 0 || (1 % i) == 0) // 隐含条件
            dfs(1 << i, i, 2);
        }
        return res;
    }
};
```



```python3

```

