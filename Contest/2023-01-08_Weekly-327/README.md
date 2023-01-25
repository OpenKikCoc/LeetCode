## [比赛链接](https://leetcode.cn/contest/weekly-contest-327/)


### [2529. 正整数和负整数的最大计数](https://leetcode.cn/problems/maximum-count-of-positive-integer-and-negative-integer/)



```c++
class Solution {
public:
    int maximumCount(vector<int>& nums) {
        int a = 0, b = 0;
        for (auto x : nums)
            if (x < 0)
                a ++ ;
            else if (x > 0)
                b ++ ;
        return max(a, b);
    }
};
```


### [2530. 执行 K 次操作后的最大分数](https://leetcode.cn/problems/maximal-score-after-applying-k-operations/)



```c++
class Solution {
public:
    using LL = long long;

    long long maxKelements(vector<int>& nums, int k) {
        priority_queue<LL> q;
        for (auto x: nums)
            q.push((LL)x);

        LL res = 0;
        while (k -- ) {
            auto t = q.top(); q.pop();
            res += t;
            q.push(ceil((double)t / 3));
        }
        return res;
    }
};
```

### [2531. 使字符串总不同字符的数目相等](https://leetcode.cn/problems/make-number-of-distinct-characters-equal/)



```c++
class Solution {
public:
    bool isItPossible(string word1, string word2) {
        unordered_map<char, int> h1, h2;
        for (auto c : word1)
            h1[c] ++ ;
        for (auto c : word2)
            h2[c] ++ ;

        // cout << endl;
        int c1 = h1.size(), c2 = h2.size();
        for (auto a = 'a'; a <= 'z'; ++ a )
            for (auto b = 'a'; b <= 'z'; ++ b ) {
                if (h1[a] == 0 || h2[b] == 0)
                    continue;
                if (a == b) {
                    // cout << " ... a = " << a << " b = " << b << " h1 = " << c1 << " h2 = " << c2 << endl;
                    if (c1 == c2)
                        return true;
                } else {
                    int t1 = c1 - (h1[a] == 1) + (h1[b] == 0), t2 = c2 + (h2[a] == 0) - (h2[b] == 1);
                    // cout << " a = " << a <<" b = " << b << " t1 = " << t1 << " t2 = " << t2 << endl;
                    if (t1 == t2)
                        return true;
                }
            }
        return false;
    }
};
```

### [2532. 过桥的时间](https://leetcode.cn/problems/time-to-cross-a-bridge/) [TAG]

工人共有四种状态，每一种状态都存在优先级对比，大致可以分为两类：

1. 在左右对岸等待的工人，优先级根据题目中给定进行计算
2. 在搬起或者放下的工人，优先级根据完成时间来计算

因此，要设置四个优先队列来分别存储他们。**当旧仓库还有货物或者右边还有人时，过程就需要继续**：

- 如果搬起或者放下的工人在此时已经完成，则将他们依次加入左边或者右边的等待队列
- 如果右边有人等待，则取优先级最低的工人过桥，过桥后放入左侧的处于「放下」状态的队列
- 否则，如果旧仓库还有货物，并且左侧有等待的工人，则取优先级最低的工人过桥，过桥后放入右侧处于「搬起」状态的队列，并使得旧仓库待搬运货物数量减一
- 否则，此时没有人需要过桥，时间应该过渡到第一个处于「放下」或者「搬起」状态的工人切换状态的时刻【**相当于时间戳快进**】【思考为什么可以】

```c++
class Solution {
public:
    // 左侧：关注放下箱子后的时间，对于初始化情况都为 0
    // 右侧：关注拿到箱子后的时间，后侧初始化空
    // ==> 尝试推导答案所在的范围：最差情况下 1e4 * 4000 = 4e7
    //
    // 还需要记录桥使用的状态 => last
    // 【ATTENTION】还需要记录已经有足够的人运送 n 个箱子（左侧的不需要再往右走）
    // 如果仅考虑 {time, index} 二维偏序 ==> wrong
    // 【ATTENTION】需要同时考虑效率，在满足时间的前提下找效率最低的（之前没有考虑这一个纬度）

    using PII = pair<int, int>;

    int findCrossingTime(int n, int k, vector<vector<int>>& time) {
        // 大顶堆 按照效率降序
        // {leftToRight + rightToLeft, i}
        priority_queue<PII> idle_l, idle_r;
        // 小顶堆 按时间戳升序
        // {timestamp, i}
        priority_queue<PII, vector<PII>, greater<PII>> l, r;

        // init
        for (int i = 0; i < k; ++ i )
            idle_l.push({time[i][0] + time[i][2], i});

        int t = 0;
        // ATTENTION: 条件
        while (n || r.size() || idle_r.size()) {
            while (l.size() && l.top().first <= t) {
                int i = l.top().second; l.pop();
                idle_l.push({time[i][0] + time[i][2], i});  // 按效率加入
            }
            while (r.size() && r.top().first <= t) {
                int i = r.top().second; r.pop();
                idle_r.push({time[i][0] + time[i][2], i});  // 按效率加入
            }

            if (idle_r.size()) {
                int i = idle_r.top().second; idle_r.pop();
                t += time[i][2];
                l.push({t + time[i][3], i});    // 按时间加入
            } else if (idle_l.size() && n) {
                n -- ;
                int i = idle_l.top().second; idle_l.pop();
                t += time[i][0];
                r.push({t + time[i][1], i});
            } else {
                // ATTENTION 时间戳快进
                t = 1e9;
                if (l.size())
                    t = min(t, l.top().first);
                if (r.size())
                    t = min(t, r.top().first);
            }
        }

        return t;
    }
};
```