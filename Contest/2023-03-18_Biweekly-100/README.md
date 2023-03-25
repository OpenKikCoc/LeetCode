## [比赛链接](https://leetcode.cn/contest/biweekly-contest-100/)

>   virtual rank: 293 / 3639 做太慢了
>
>   1:13:40 
>
>   -   0:18:40  1
>   -   0:29:28
>   -   0:35:41  1
>   -   0:53:40  2


### [2591. 将钱分给最多的儿童](https://leetcode.cn/problems/distribute-money-to-maximum-children/)



```c++
class Solution {
public:
    // 
    const static int N = 31, M = 210;
    
    int f[N][M];
    
    int distMoney(int money, int children) {
        memset(f, -1, sizeof f);
        f[0][0] = 0;
        for (int i = 1; i <= children; ++ i ) {
            // tot
            for (int j = 1; j <= money; ++ j )
                // 分配
                for (int k = 1; k <= money && k <= j; ++ k ) {
                    if (k == 4)
                        continue;
                    if (f[i - 1][j - k] == -1)
                        continue;
                    f[i][j] = max(f[i][j], f[i - 1][j - k] + (k == 8));
                }
        }
        
        // for (int i = 1; i <= children; ++ i ) {
        //     for (int j = 1; j <= money; ++ j )
        //         cout << f[i][j] << ' ';
        //     cout << endl;
        // }
        
        return f[children][money];
    }
};
```


### [2592. 最大化数组的伟大值](https://leetcode.cn/problems/maximize-greatness-of-an-array/)



```c++
class Solution {
public:
    int maximizeGreatness(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        
        int n = nums.size();
        for (int i = 0, j = 0; i < n; ++ i ) {
            while (j < n && nums[j] == nums[i])
                j ++ ;
            if (j == n)
                return i;
            j ++ ;  // cost
        }
        return 0;
    }
};
```

### [2593. 标记所有元素后数组的分数](https://leetcode.cn/problems/maximize-greatness-of-an-array/)



```c++
class Solution {
public:
    int maximizeGreatness(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        
        int n = nums.size();
        for (int i = 0, j = 0; i < n; ++ i ) {
            while (j < n && nums[j] == nums[i])
                j ++ ;
            if (j == n)
                return i;
            j ++ ;  // cost
        }
        return 0;
    }
};
```

### [2594. 修车的最少时间](https://leetcode.cn/problems/minimum-time-to-repair-cars/)

显然二分答案

```c++
class Solution {
public:
    // 显然要关注 rank 数据范围：1 <= rank <= 100
    //          在这样的前提下 可以直接根据 rank value 分类计数
    //          计数后 按照每个类的上限去做二分 看能否修够所有车即可
    using LL = long long;
    
    int tot;
    int c[110];
    
    bool check(LL cap) {
        LL cnt = 0;
        for (int i = 1; i <= 100; ++ i ) {
            // 也可以直接 sqrt 不会有精度损失 详见题解区
            LL l = 0, r = 1e7; // ATTENTION: case [100] 1000000 ==> 本质是因为 l 可以取到 1e6, 所以 1e6+1 应该就可以
            while (l < r) {
                LL m = l + (r - l) / 2;
                if ((LL)i * m * m <= cap)
                    l = m + 1;
                else
                    r = m;
            }
            cnt += (LL)(l - 1) * c[i];
        }
        // cout << " cap = " << cap << " tot = " << tot << endl;
        return cnt >= tot;
    }
    
    long long repairCars(vector<int>& ranks, int cars) {
        this->tot = cars;
        for (auto x : ranks)
            c[x] ++ ;
        
        LL l = 0, r = 1e15;
        while (l < r) {
            LL m = l + (r - l) / 2;
            if (check(m))
                r = m;
            else
                l = m + 1;
        }
        return l;   // 最少的可以修车的时间
    }
};
```
