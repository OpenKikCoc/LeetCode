## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-288/)


### [2231. 按奇偶性交换后的最大数字](https://leetcode-cn.com/problems/largest-number-after-digit-swaps-by-parity/)

模拟 略

```c++
class Solution {
public:
    int largestInteger(int num) {
        vector<int> nums;
        while (num)
            nums.push_back(num % 10), num /= 10;
        
        int n = nums.size();
        vector<int> v1, v2;
        for (int i = 0; i < n; ++ i )
            if (nums[i] & 1)
                v1.push_back(nums[i]);
            else
                v2.push_back(nums[i]);
        sort(v1.begin(), v1.end());
        sort(v2.begin(), v2.end());
        
        string s;
        for (int i = 0, j = 0, k = 0; i < n; ++ i )
            if (nums[i] & 1)
                s.push_back('0' + v1[j ++ ]);
            else
                s.push_back('0' + v2[k ++ ]);
        reverse(s.begin(), s.end());
        return stoi(s);
    }
};
```


### [2232. 向表达式添加括号后的最小结果](https://leetcode-cn.com/problems/minimize-result-by-adding-parentheses-to-expression/)

模拟 字符串处理

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    vector<PII> get(int x) {
        string s = to_string(x);
        int n = s.size();
        vector<PII> ret;
        for (int i = 0, l = 0; i < n; ++ i ) {
            int r = stoi(s);
            ret.push_back({l, r});
            int t = s[0] - '0';
            l = l * 10 + t, s = s.substr(1);
        }
        ret.push_back({x, 0});
        return ret;
    }
    
    string minimizeResult(string expression) {
        int n1, n2;
        sscanf(expression.c_str(), "%d+%d", &n1, &n2);
        auto x1 = get(n1), x2 = get(n2);
        
        int val = 2e9;
        string res;
        for (auto [l1, r1] : x1)
            for (auto [l2, r2] : x2) {
                if (l1 == n1 || r2 == n2)
                    continue;
                
                int t = (l1 ? l1 : 1) * (r1 + l2) * (r2 ? r2 : 1);
                // cout << " t = " << t << endl;
                if (val > t) {
                    val = t;
                    res = (l1 ? to_string(l1) : "") + '(' + to_string(r1) + '+' + to_string(l2) + ')' + (r2 ? to_string(r2) : "");
                    // cout << " val = " << val << " res = " << res << endl;
                }
            }
                
        return res;
    }
};
```

### [2233. K 次增加后的最大乘积](https://leetcode-cn.com/problems/maximum-product-after-k-increments/)

贪心 略

```c++
class Solution {
public:
    using LL = long long;
    const static LL MOD = 1e9 + 7;
    
    int maximumProduct(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> heap;
        for (auto x : nums)
            heap.push(x);
        while (k) {
            auto t = heap.top(); heap.pop();
            t ++ , k -- ;
            heap.push(t);
        }
        
        LL res = 1;
        while (heap.size())
            res = res * (LL)heap.top() % MOD, heap.pop();
        return res;
    }
};
```

### [2234. 花园的最大总美丽值](https://leetcode-cn.com/problems/maximum-total-beauty-of-the-gardens/) [TAG]

较显然的需要先枚举

**重点在于枚举哪一个维度**，加个双指针优化即可

```c++
class Solution {
public:
    // flowers[i] <= 1e5, 可以枚举
    using LL = long long;
    
    long long maximumBeauty(vector<int>& flowers, long long newFlowers, int target, int full, int partial) {
        LL base = 0;
        vector<LL> fs;
        for (auto x : flowers)
            if (x >= target)
                base += full;
            else
                fs.push_back(x);
        fs.push_back(0);   // 0-th is 0
        sort(fs.begin(), fs.end());
        
        int n = fs.size() - 1;
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + fs[i];
        
        // ATTENTION
        // 此时有两种枚举思路：
        // 1. 枚举【某个数值】以下的全部抹相同，剩下的尽可能选一些达到target的
        //      问题：因为full与partial大小关系，处理起来极为复杂
        // 2. 枚举【某个个数】的达到target，【其他的尽可能大，但都不超过target】==> 正确思路
        LL res = base;
        for (int i = 0, j = 0; i <= n; ++ i ) {
            LL cost = (LL)target * (n - i) - (s[n] - s[i]);
            if (cost > newFlowers)
                continue;
            LL left = newFlowers - cost;
            // 找到其他尽可能大的值
            while (j <= i && left >= (LL)fs[j] * j - s[j])
                j ++ ;
            
            LL c = 0;
            {
                // cout << " i = " << i << " cost = " << cost << " left = " << left << endl;
                int t = j - 1;
                if (t <= 0) // 需要做除数，不能为0
                    c = 0;
                else
                    c = min(LL(target - 1), (left + s[t]) / t);
            }
            // cout << " full number = " << n - i << " partial number = " << c << " val = " << (n - i) * full + c * partial << endl;
            
            res = max(res, base + (LL)(n - i) * full + c * partial);
        }
        return res;
    }
};
```
