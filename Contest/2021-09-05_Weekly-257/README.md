## [比赛链接](https://leetcode.cn/contest/weekly-contest-257/)


### [1995. 统计特殊四元组](https://leetcode.cn/problems/count-special-quadruplets/)

暴力统计即可

```c++
class Solution {
public:
    int countQuadruplets(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for (int a = 0; a < n; ++ a )
            for (int b = a + 1; b < n; ++ b )
                for (int c = b + 1; c < n; ++ c )
                    for (int d = c + 1; d < n; ++ d )
                        if (nums[a] + nums[b] + nums[c] == nums[d])
                            res ++ ;
        return res;
    }
};
```

### [1996. 游戏中弱角色的数量](https://leetcode.cn/problems/the-number-of-weak-characters-in-the-game/) [TAG]

**重点在于：单纯的按照两个维度 升/降 序排列会遇到无法区分的问题**

**为了达到区分效果 两个维度分别降升序**

> Trick 思维题 利用排序规则

显然可以先按某一维度排序 如 `按第一维度从大到小排序` 

排序后，考虑遍历：

- 如果第二维度以同样规则 `从大到小` 排序，则无法严格区分在 **第一维度上 `大于/等于`** 当前遍历位置的元素

- 考虑第二维度按相反规则 `从小到大` 排序，则可以在遍历时维护第二维度的最大值

  此时：

  - 该最大值一定代表着 **第一维度上 `大于`** 当前遍历位置元素的第二维度值【可以区分 `大于/等于`】
  - 第一维度相等的元素，内部不会对结果造成影响，因为第二维度较小的总是在前面

```c++
class Solution {
public:
    vector<vector<int>> ps;
    
    int numberOfWeakCharacters(vector<vector<int>>& properties) {
        this->ps = properties;
        // ATTENTION [排序trick] 和 [维护规则]
        sort(ps.begin(), ps.end(), [](const vector<int> & a, const vector<int> & b) {
            if (a[0] == b[0])
                return a[1] < b[1];
            return a[0] > b[0];
        });
        int n = ps.size(), maxd = 0, res = 0;
        for (auto & p : ps) {
            if (p[1] < maxd)    // 排序规则注定此时 p[0] 必定不同
                res ++ ;
            else
                maxd = p[1];
        }
        return res;
    }
};
```

### [1997. 访问完所有房间的第一天](https://leetcode.cn/problems/first-day-where-you-have-been-in-all-the-rooms/) [TAG]

分析题意尤为重要

```c++
class Solution {
public:
    // ATTENTION:
    // 0 <= nextVisit[i] <= i
    // 综合题意条件
    // 说明第 i 个房间必定是两次访问第 i−1 个房间后到达的
    const static int MOD = 1e9 + 7;
    
    vector<int> f;
    
    int firstDayBeenInAllRooms(vector<int>& nextVisit) {
        int n = nextVisit.size();
        
        // 定义状态 f[i] 表示首次访问到房间 i 的日期 [房间编号0 - n-1]
        f = vector<int>(n);
        // 第一次到 [第0个房间] 需要0天
        f[0] = 0;
        for (int i = 1; i < n; ++ i ) {
            // 如果是第一次访问房间 i , 则i-1回访时回访到的地址 t 必然已经被经过了偶数次
            
            // i-1会回访房间t
            int t = nextVisit[i - 1];
            
            // 第一次到达第i房间 = 
            //    第一次到i-1 +      第二次到i-1       + 再到i
            f[i] = f[i - 1] + (f[i - 1] - f[t] + 1) + 1;
            f[i] = (f[i] % MOD + MOD) % MOD;
        }
        
        return f[n - 1];
    }
};
```

### [1998. 数组的最大公因数排序](https://leetcode.cn/problems/gcd-sort-of-an-array/)

很好的综合练习题，考验熟练度

```c++
class Solution {
public:
    const static int N = 100010;
    
    // 并查集
    int p[N];
    int find(int x) {
        if (p[x] != x)
            p[x] = find(p[x]);
        return p[x];
    }
    void merge(int a, int b) {
        int pa = find(a), pb = find(b);
        if (pa != pb)
            p[pa] = pb;
    }
    
    // 线性筛
    int primes[N], cnt;
    bool st[N];
    
    void get_primes() {
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
    
    // init
    void init() {
        for (int i = 0; i < N; ++ i )
            p[i] = i;
        
        memset(st, 0, sizeof st);
        cnt = 0;
        get_primes();
    }
    
    bool gcdSort(vector<int>& nums) {
        init();
        
        int n = nums.size();
        auto sorted_nums = nums;
        sort(sorted_nums.begin(), sorted_nums.end());
        
        for (int i = 0; i < n; ++ i ) {
            int x = nums[i];
            for (int j = 0; j < cnt && primes[j] <= x / primes[j]; ++ j ) {
                int y = primes[j];
                if (x % y == 0) {
                    merge(nums[i], y);
                    while (x % y == 0)
                        x /= y;
                }
            }
            if (x > 1)
                merge(nums[i], x);
        }
        
        // trick 直接与排序后的数组比对
        for (int i = 0; i < n; ++ i )
            if (find(nums[i]) != find(sorted_nums[i]))
                return false;
        return true;
    }
};
```
