## [比赛链接](https://leetcode.cn/contest/weekly-contest-381/)


### [3014. 输入单词需要的最少按键次数 I](https://leetcode.cn/problems/minimum-number-of-pushes-to-type-word-i/)

同 3

```c++
// 略
```


### [3015. 按距离统计房屋对数目 I](https://leetcode.cn/problems/count-the-number-of-houses-at-a-certain-distance-i/)

同 4

```c++
// 略
```

### [3016. 输入单词需要的最少按键次数 II](https://leetcode.cn/problems/minimum-number-of-pushes-to-type-word-ii/)

模拟 按次数分配位置即可

小技巧是 实际上不需要知道分配的是哪个字符 直接 forr-loop 即可

```c++
class Solution {
public:
    int minimumPushes(string word) {
        unordered_map<int, int> h;
        for (auto c : word)
            h[c - 'a'] ++ ;
        vector<int> xs;
        for (auto [_, v] : h)
            xs.push_back(-v);
        sort(xs.begin(), xs.end());
        
        // 每个字母都会分配一个具体的位置
        int res = 0;
        int used[8] = {0, 0, 0, 0, 0, 0, 0, 0};
        for (auto x : xs) {
            // 枚举次数 当前次数的某个字母要映射为某个位置
            int p = -1;
            for (int i = 0; i < 8; ++ i )
                if (p == -1 || used[p] > used[i])
                    p = i;
            
            // 需要映射为 p 位置的第 used[p] 个
            used[p] ++ ;
            res += used[p] * -x;
        }
        
        return res;
    }
};
```

### [3017. 按距离统计房屋对数目 II](https://leetcode.cn/problems/count-the-number-of-houses-at-a-certain-distance-ii/) [TAG]

非常考验思维的分情况讨论

容易想到枚举思路，重点在于 case by case 的区间计算细节

```c++
class Solution {
public:
    // 考虑
    // - 如果是自环边 (或是相邻的二者的边) 相当于只有一个线性关系
    // - 如果是非自环边且非相邻二者 则 进一步考虑其造成的影响
    //      分三个部分，左[1, x], 中[x, y], 右边[y, n]
    //          各自内部均无影响
    //          左->中 左->右 均会由于新增边的存在 而距离缩短【相当于 <x 的部分整体向内部偏移】
    //                                                => 维护时 更适合用前缀和
    // 进一步 考虑枚举右端点 只计算左侧 最终结果*2即可

    using LL = long long;

    const static int N = 1e5 + 10;

    LL d[N];

    void update(int l, int r) {
        if (l > r)
            return;
        d[l] += 1, d[r + 1] -= 1;
    }

    vector<LL> get(int n) {
        vector<LL> res(n);
        for (int i = 1; i <= n; ++ i ) {
            d[i] += d[i - 1];
            res[i - 1] = d[i] * 2;
        }
        return res;
    }
    
    vector<long long> countOfPairs(int n, int x, int y) {
        memset(d, 0, sizeof d);
        if (x == y) {
            for (int i = 1; i <= n; ++ i )
                update(1, i - 1);
            return get(n);
        }
        if (x > y)
            swap(x, y);

        for (int i = 1; i <= n; ++ i ) {
            if (i <= x) {
                update(1, i - 1);
            } else if (i <= y) {
                if (2 * i <= x + y + 1)
                    update(1, i - 1);
                else {
                    // 最左端
                    update(2 + (y - i), x + (y - i)); // 不包含 x 位置本身  而是放到下面算

                    // 对于 [x, y] 内部的部分，不用想的太复杂
                    // 实际上这是个环，所以无论在哪个位置，总的距离和都是固定的
                    //      总共 y-x+1 个点
                    // ATTENTION 需要去除后续会重复的一小部分 (y-i)

                    int v = y - x;
                    update(1, v / 2), update(1 + (y - i) /*ATTENTION WA 因为i右边的不能计算 会重复*/, (v + 1) / 2);
                }
            } else {
                // 最左端
                update(2 + (i - y), x + (i - y));

                // [x,y) 中间的部分
                int v = y - x;
                update(1 + (i - y), v / 2 + (i - y)), update(1 + (i - y), (v + 1) / 2 + (i - y));

                // 右端 包含y
                update(1, i - y);
            }
        }
        
        return get(n);
    }
};
```
