## [比赛链接](https://leetcode.cn/contest/espressif-2021/)

基本全是原题

### [录取分数线](https://leetcode.cn/contest/espressif-2021/problems/QXquF0/)

排序即可 略

```c++
class Solution {
public:
    double getAdmissionLine(int k, vector<double>& scores) {
        sort(scores.begin(), scores.end(), greater<double>());
        return scores[k - 1];
    }
};
```


### [调整电平](https://leetcode.cn/contest/espressif-2021/problems/i4tX1E/)

经典数学 `某数有奇数个约数当且仅当其为完全平方数`

统计 `cnt` 以内的完全平方数，返回 `sqrt(cnt)` 即可

```c++
class Solution {
public:
    int adjustLevel(int cnt) {
        return sqrt(cnt);
    }
};
```

### [签到序列](https://leetcode.cn/contest/espressif-2021/problems/fSghVj/)

与 [400. 第 N 位数字](https://leetcode.cn/problems/nth-digit/) 完全相同，赛榜学到新思路

```c++
class Solution {
public:
    using LL = long long;
    int getKthNum(int k) {
        LL n = k;
        for (LL i = 1; ; ++ i )
            if (i * pow(10, i) > n)
                return to_string(n / i)[n % i] - '0';
            else
                n += pow(10, i);
    }
};
```

### [自行车拉力赛](https://leetcode.cn/contest/espressif-2021/problems/z9nHkj/)

贪心，注意实现

每次入堆所有可达点，加上最大的即可

```c++
class Solution {
public:
    int minSupplyTimes(int num, int initWater, vector<vector<int>>& supplyStations) {
        priority_queue<int> heap;
        for (int i = 0, j = 0; ; ++ i ) {
            if (initWater >= num)
                return i;
            
            while (j < supplyStations.size() && supplyStations[j][0] <= initWater)
                heap.push(supplyStations[j ++ ][1]);
            if (heap.empty())
                return -1;
            initWater += heap.top(); heap.pop();
        }
    }
};
```
