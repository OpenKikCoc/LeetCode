## [比赛链接](https://leetcode.cn/contest/weekly-contest-388/)


### [3074. 重新分装苹果](https://leetcode.cn/problems/apple-redistribution-into-boxes/)



```c++
class Solution {
public:
    int minimumBoxes(vector<int>& apple, vector<int>& capacity) {
        int tot = 0;
        for (auto x : apple)
            tot += x;
        
        sort(capacity.begin(), capacity.end());
        reverse(capacity.begin(), capacity.end());
        for (int i = 0; i < capacity.size(); ++ i ) {
            tot -= capacity[i];
            if (tot <= 0)
                return i + 1;
        }
        return -1;
    }
};
```


### [3075. 幸福值最大化的选择方案](https://leetcode.cn/problems/maximize-happiness-of-selected-children/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long maximumHappinessSum(vector<int>& happiness, int k) {
        int n = happiness.size();
        sort(happiness.begin(), happiness.end());
        reverse(happiness.begin(), happiness.end());
        
        LL sub = 0, res = 0;
        for (int i = 0; i < k; ++ i ) {
            LL x = max(happiness[i] - sub, 0ll);
            res += x, sub ++ ;
        }
        return res;
    }
};
```

### [3076. 数组中的最短非公共子字符串](https://leetcode.cn/problems/shortest-uncommon-substring-in-an-array/)



```c++
class Solution {
public:
    const static int N = 110;
    
    unordered_set<string> S[N];
    
    vector<string> shortestSubstrings(vector<string>& arr) {
        int n = arr.size();
        for (int i = 0; i < n; ++ i ) {
            S[i].clear();
            
            string & s = arr[i];
            int m = s.size();
            for (int j = 0; j < m; ++ j )
                for (int k = j; k < m; ++ k )
                    S[i].insert(s.substr(j, k - j + 1));
        }
        
        vector<string> res(n);
        for (int i = 0; i < n; ++ i ) {
            vector<string> t;
            for (auto x : S[i])
                t.push_back(x);
            sort(t.begin(), t.end(), [](const string & a, const string & b) {
                if (a.size() != b.size())
                    return a.size() < b.size();
                return a < b;
            });
            
            for (auto & s : t) {
                bool found = false;
                for (int j = 0; j < n; ++ j ) {
                    if (j == i)
                        continue;
                    if (S[j].find(s) != S[j].end()) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    res[i] = s;
                    break;
                }
            }
        }
        return res;
    }
};
```

### [3077. K 个不相交子数组的最大能量值 ](https://leetcode.cn/problems/maximum-strength-of-k-disjoint-subarrays/) [TAG]

经典 DP 优化

公式转化 \+ 边遍历边维护

注意细节

```c++
class Solution {
public:
    // [不相交子数组] => 显然是 dp 【线性 划分型DP】
    // ATTENTION: 题意是将原始数组【切分】... 选出来的所有子数组【不】需要覆盖整个数组
    
    using LL = long long;
    const static int N = 1e4 + 10;
    const static LL INF = 1e16;

    int n;
    LL s[N], f[N];
    
    long long maximumStrength(vector<int>& nums, int k) {
        this->n = nums.size();
        {
            s[0] = 0;
            for (int i = 1; i <= n; ++ i )
                s[i] = s[i - 1] + nums[i - 1];
        }
        
        memset(f, 0, sizeof f);
        for (int _k = 1; _k <= k; ++ _k ) {
            static LL pre[N];
            memcpy(pre, f, sizeof f);
            
            // 分情况讨论
            // 1. i 不作为最右侧元素 则为前 i-1 个里选择 _k 个
            //          f[_k][i] = f[_k][i - 1]
            // 2. i 作为最右侧元素 则需要枚举左侧下标 L
            //          f[_k][i] = f[_k - 1][L] + (s[i] - s[L]) * w       其中 [w = (-1)^_k+1 * (k - _k + 1)]
            //  【变形】 f[_k][i] = (f[_k - 1][L] - s[L] * w) + s[i] * w;
            //  其中  f[_k - 1][L] - s[L] * w 可以伴随遍历整体维护
            // 3. 干掉第一维
            
            f[_k - 1] = -INF;   // ATTENTION 必须 否则case3 fail, 写在 for-loop 没用不会执行到

            LL max_v = -INF;
            int w = ((_k & 1) ? 1 : -1) * (k - _k + 1);
            
            for (int i = _k; i <= n - (k - _k)/*ATTENTION 后面需要留k-_k 个数*/; ++ i ) {
                max_v = max(max_v, pre[i - 1] - s[i - 1] * w); // refresh
                f[i] = max(f[i - 1], s[i] * w + max_v);
            }
        }
        
        return f[n];
    }
};
```
