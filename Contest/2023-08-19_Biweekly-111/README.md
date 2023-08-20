## [比赛链接](https://leetcode.cn/contest/biweekly-contest-111/)


### [6954. 统计和小于目标的下标对数目](https://leetcode.cn/problems/count-pairs-whose-sum-is-less-than-target/)



```c++
class Solution {
public:
    int countPairs(vector<int>& nums, int target) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                if (nums[i] + nums[j] < target)
                    res ++ ;
        return res;
    }
};
```


### [8014. 循环增长使字符串子序列等于另一个字符串](https://leetcode.cn/problems/make-string-a-subsequence-using-cyclic-increments/)



```c++
class Solution {
public:
    // 选中若干下标 操作至多一次 => 可以对多个下标进行操作
    char add_one(char x) {
        if (x == 'z')
            return 'a';
        return x + 1;
    }
    
    bool canMakeSubsequence(string str1, string str2) {
        int n1 = str1.size(), n2 = str2.size();
        if (n1 < n2)
            return false;
        
        for (int i = 0, j = 0; i < n1; ++ i ) {
            if (str1[i] == str2[j] || add_one(str1[i]) == str2[j])
                j ++ ;
            if (j == n2)
                return true;
        }
        return false;
    }
};
```

### [6941. 将三个组排序](https://leetcode.cn/problems/sorting-three-groups/)



```c++
class Solution {
public:
    // 本质是把原数组划分成三个部分：1...1 2...2 3...3
    // 数据范围显然可以枚举 2 的左右边界 => 【容易造成代码只考虑了存在 2 的情况】
    //       => 枚举 1,3 的边界
    
    const static int N = 110, M = 4;
    
    int s[M][N], n;
    vector<int> ns;
    
    void init(int s[], int x) {
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + (ns[i - 1] == x);
    }
    
    int get(int s[], int l, int r) {
        r = min(r, n);  // trick
        l = max(l, 0);
        if (l > r)
            return 0;
        return s[r] - s[l - 1];
    }
    
    int minimumOperations(vector<int>& nums) {
        this->ns = nums; this->n = ns.size();
        
        memset(s, 0, sizeof s);
        for (int i = 1; i <= 3; ++ i )
            init(s[i], i);
        
        int res = 1e9;
        
        // 下面的 for-loop 其实只考虑了存在 2 的情况，没有考虑不存在 2 的情况
        //  => 转而枚举 1 的右边界   3 的左边界
        for (int i = 0; i <= n; ++ i )
            for (int j = i + 1; j <= n + 1; ++ j ) {
                int a = get(s[2], 0, i) + get(s[3], 0, i);
                int b = get(s[1], i + 1, j - 1) + get(s[3], i + 1, j - 1);
                int c = get(s[1], j, n) + get(s[2], j, n);
                res = min(res, a + b + c);
            }
        
        return res;
    }
};
```

### [8013. 范围中美丽整数的数目](https://leetcode.cn/problems/number-of-beautiful-integers-in-the-range/)

经典数位 dp

注意数值计算的细节

加快速度

```c++
using LL = long long;
const static int N = 11, M = 21, B = 10;

class Solution {
public:
    // 思考: 较显然的是使用数位 dp, 问题在于如何定义?
    //    剩下长度为 w 的任意数字, 最高位为 i, 当前奇数偶数数目差值为 j, 对 K 取模得到结果为 k 的所有方案
    // 从第 i 个计算前面的 mod 比较难 考虑从前向后递推
    
    // 不会超过 11 位数字
    
    int f[N][N][M][M];  // 避免手动初始化
    
    int K;
    
    void init() {
        memset(f, 0, sizeof f);
        f[0][0][0 + B][0] = 1;
        for (int w = 0; w < N - 1; ++ w ) {
            int pow_v = (LL)pow(10, w) % K;
            for (int i = 0; i < 10; ++ i )
                for (int j = -10; j <= 10; ++ j )
                    for (int k = 0; k < K; ++ k ) {
                        // 枚举下一位数字(左侧的数字)
                        for (int x = 0; x < 10; ++ x ) {
                            int next_j = j + (x & 1 ? 1 : -1);
                            int next_k = (k + x * pow_v) % K;
                            
                            if (next_j + B < 0 || next_j + B >= M)
                                continue;
                            f[w + 1][x][next_j + B][next_k] += f[w][i][j + B][k];
                        }
                    }
        }
    }
    
    int get(int x) {
        if (x == 0)
            return 0;
        
        string s = to_string(x);
        int n = s.size();
        
        int res = 0;
        
        for (int w = 1; w < n; ++ w )
            for (int i = 1; i < 10; ++ i )      // ATTENTION 去除前导 0
                res += f[w][i][0 + B][0];       // ATTENTION 记得+B
        
        int mod = 0, diff = 0;
        for (int i = 0; i < n; ++ i ) {
            int x = s[i] - '0';
            
            for (int y = 0 + (i == 0); y < x; ++ y ) {
                int w = n - i;
                // 计算得到 需要的 j 和 k
                //          need_k + mod*10 % k == K => WRONG
                int j = -diff, k = (K - mod) % K;
                
                // cout << "   inner " << " i = " << i << " mod = " << mod << " diff = " << diff  << " y = " << y << " w = " << w << " j = " << j + B << " k = " << k << " add " << f[w][y][j + B][k] << endl;
                res += f[w][y][j + B][k];
            }
            
            mod = (mod + x * (int)pow(10, n - i - 1) % K) % K;   // ATTENTION 思考计算细节 不要算错了
            if (x & 1)
                diff ++ ;
            else
                diff -- ;
            
            if (i == n - 1) {
                if (diff == 0 && mod == 0)
                    res ++ ;
            }
        }
        return res;
    }
    
    int numberOfBeautifulIntegers(int low, int high, int k) {
        this->K = k;    // 必须在 init 之前
        init();
        return get(high) - get(low - 1);
    }
};
```
