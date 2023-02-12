## [比赛链接](https://leetcode.cn/contest/weekly-contest-330/)


### [2549. 统计桌面上的不同数字](https://leetcode.cn/problems/count-distinct-numbers-on-board/)

脑筋急转弯 显然每次都能把当前次小的放在桌上

```c++
class Solution {
public:
    int distinctIntegers(int n) {
        if (n == 1)
            return 1;
        return n - 1;
    }
};
```


### [2550. 猴子碰撞的方法数](https://leetcode.cn/problems/count-collisions-of-monkeys-on-a-polygon/)

简单容斥

题意理解会有歧义 本质上对于偶数个元素 相邻两两交换（途中相遇）也算碰撞

```c++
class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;
    // 对于每一个固定元素，考虑只往顺时针移动，另一个逆时针移动
    // 则每个元素都有一个方案，在此基础上其他节点任意【如何去重？】
    // 所有的方案 - 不碰撞的方案(2)
    
    LL qpow(LL a, LL b) {
        LL ret = 1;
        while (b) {
            if (b & 1)
                ret = ret * a % MOD;
            a = a * a % MOD;
            b >>= 1;
        }
        return ret;
    }
    
    int monkeyMove(int n) {
        return (qpow(2, n) - 2 + MOD) % MOD;
    }
};
```

### [2551. 将珠子放入背包中](https://leetcode.cn/problems/put-marbles-in-bags/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    // 把原数组拆成 k 段(非空)，每段有其代价(两段点和)
    // 求最大、最小代价差值
    // ==> 转换 对于 [1, n] 
    // 在 [1, n-1] 选择 k-1 个分隔点(左闭)，每个点的收益是 当前分隔点的值+右侧点的值
    // 则放堆里挑个最大的就行 O(n)
    
    int x[N];
    
    long long putMarbles(vector<int>& weights, int k) {
        int n = weights.size();
        if (n == k)
            return 0;
        
        memset(x, 0, sizeof x);
        // 分隔点位置
        for (int i = 1; i < n; ++ i )
            x[i] += weights[i - 1] + weights[i];

        LL maxv = 0, minv = 0;  // or weights[0] + weights[n - 1]
        {
            // 大顶堆
            priority_queue<LL> p;
            for (int i = 1; i < n; ++ i )
                p.push(x[i]);
            for (int i = 0; i < k - 1; ++ i ) {
                maxv += p.top(); p.pop();
            }
        }
        {
            priority_queue<LL, vector<LL>, greater<LL>> p;
            for (int i = 1; i < n; ++ i )
                p.push(x[i]);
            for (int i = 0; i < k - 1; ++ i ) {
                minv += p.top(); p.pop();
            }
        }
        return maxv - minv;
    }
};
```

### [2552. 统计上升四元组](https://leetcode.cn/problems/count-increasing-quadruplets/) [TAG]

二维前缀和解法

```c++
// 二维数组放 class 内部会 stack overflow
using LL = long long;
const static int N = 4010;

// LL l[N][N], r[N][N];    // 左侧较小的 右侧较大的
int l[N][N], r[N][N];    // 【ATTENTION】 int 超时

class Solution {
public:
    long long countQuadruplets(vector<int>& nums) {
        memset(l, 0, sizeof l);
        memset(r, 0, sizeof r);
        int n = nums.size();

        {
            for (int i = 1; i <= n; ++ i ) {
                int x = nums[i - 1];
                memcpy(l[i], l[i - 1], sizeof l[i]);
                for (int j = x + 1; j < N; ++ j )   // ATTENTION j=x+1 细节
                    l[i][j] ++ ;
            }
        }
        {
            for (int i = n; i >= 1; -- i ) {
                int x = nums[i - 1];
                memcpy(r[i], r[i + 1], sizeof r[i]);
                for (int j = x - 1; j >= 0; -- j )
                    r[i][j] ++ ;
            }
        }

        LL res = 0;
        // j
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1];
            // k
            for (int j = i + 1; j <= n; ++ j ) {
                int y = nums[j - 1];
                if (x > y) {
                    // 左侧要比 y 小, 右侧要比 x 大
                    // ATTENTION 细节 【数组下标数值】
                    int left = l[i][y], right = r[j][x];
                    res += (LL)left * right;
                }
            }
        }
        return res;
    }
};
```

BIT 节省空间解法

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 4010;

    int a[N], b[N]; // l, r
    int lowbit(int x) {
        return x & -x;
    }
    void add(int tr[], int x, int c) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += c;
    }
    int sum(int tr[], int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }

    long long countQuadruplets(vector<int>& nums) {
        int n = nums.size();

        // 初始化右侧的都存在
        for (int i = 1; i <= n; ++ i )
            add(b, nums[i - 1], 1);

        LL res = 0;
        // j
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1];
            // 移除当前位置作为右侧的可能
            add(b, x, -1);
            // 拷贝至 c 并在随后的过程动态修改
            static int c[N];
            memcpy(c, b, sizeof c);
            // k
            for (int j = i + 1; j <= n; ++ j ) {
                int y = nums[j - 1];
                add(c, y, -1);
                if (x > y) {
                    // 左侧要比 y 小, 右侧要比 x 大
                    // ATTENTION 细节 【数组下标数值】
                    int left = sum(a, y - 1), right = sum(c, N - 1) - sum(c, x);
                    res += (LL)left * right;
                }
            }
            add(a, x, 1);
        }
        return res;
    }
};
```

BIT 做法也可以通过改变遍历顺序的方式减少一个空间占用与拷贝

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 4010;

    int a[N], b[N]; // l, r
    int lowbit(int x) {
        return x & -x;
    }
    void add(int tr[], int x, int c) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += c;
    }
    int sum(int tr[], int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }

    long long countQuadruplets(vector<int>& nums) {
        int n = nums.size();

        LL res = 0;
        // j
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1];
            // 逆序扫描同时维护 b
            memset(b, 0, sizeof b);
            // k
            for (int j = n; j > i; -- j ) {
                int y = nums[j - 1];
                if (x > y) {
                    // 左侧要比 y 小, 右侧要比 x 大
                    // ATTENTION 细节 【数组下标数值】
                    int left = sum(a, y - 1), right = sum(b, N - 1) - sum(b, x);
                    res += (LL)left * right;
                }
                add(b, y, 1);
            }
            add(a, x, 1);
        }
        return res;
    }
};
```

