## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-160/)


### [1237. 找出给定方程的正整数解](https://leetcode-cn.com/problems/find-positive-integer-solution-for-a-given-equation/) 

暴力 也可以从右上角/左下角扫描

```c++
    vector<vector<int>> findSolution(CustomFunction& customfunction, int z) {
        vector<vector<int>> res;
        for(int x = 1; x <= 1000; ++x)
            for(int y = 1; y <= 1000; ++y)
                if(customfunction.f(x, y) == z) {res.push_back({x, y}); break;}
        return res;
    }
```


### [1238. 循环码排列](https://leetcode-cn.com/problems/circular-permutation-in-binary-representation/) [TAG]

格雷码

>
> 二进制码转格雷码：G = B ^ B >> 1；
>
> 格雷码转二进制码：B = ^(G >> i), i = 0 .. n - 1, n为格雷码二进制位数。
>

```c++
    vector<int> circularPermutation(int n, int start) {
        vector<int> res = {start};
        int b = start;
        while(start >>= 1) b ^= start;
        n = (1 << n)-1;
        for(int i = 1; i <= n; ++i)
            res.push_back(b + i & n ^ (b + i & n) >> 1);
        return res;
    }
```

题解区有先生成 n 位格雷码再旋转数组的操作 也可

### [1239. 串联字符串的最大长度](https://leetcode-cn.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/)

搜索即可 也可状压dp 略

```c++
    int n, res;
    vector<string> ss;
    bool check(string s) {
        static bool v[26];
        memset(v, 0, sizeof v);
        for(auto & c : s)
            if(v[c-'a']) return false;
            else v[c-'a'] = true;
        return true;
    }
    void dfs(int p, string s) {
        if(p == n) {
            res = max(res, int(s.size()));
            return;
        }
        if(check(s + ss[p])) dfs(p + 1, s + ss[p]);
        dfs(p + 1, s);
    }
    int maxLength(vector<string>& arr) {
        n = arr.size();
        ss = arr;
        res = 0;
        dfs(0, "");
        return res;
    }
```

### [1240. 铺瓷砖](https://leetcode-cn.com/problems/tiling-a-rectangle-with-the-fewest-squares/) [TAG]

todo

有 横切、纵切、横纵切中间留方形 的 dp 做法 正确性持疑

打表如下

```c++
    vector<vector<int>> v = {
        {1},
        {2,1},
        {3,3,1},
        {4,2,4,1},
        {5,4,4,5,1},
        {6,3,2,3,5,1},
        {7,5,5,5,5,5,1},
        {8,4,5,2,5,4,7,1},
        {9,6,3,6,6,3,6,7,1},
        {10,5,6,4,2,4,6,5,6,1},
        {11,7,6,6,6,6,6,6,7,6,1},
        {12,6,4,3,6,2,6,3,4,5,7,1},
        {13,8,7,7,6,6,6,6,7,7,6,7,1}
    };

    int tilingRectangle(int n, int m) {
        if(n < m)
            swap(n, m);
        return v[n-1][m-1];
    }
```
