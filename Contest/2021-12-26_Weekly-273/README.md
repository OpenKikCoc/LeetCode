## [比赛链接](https://leetcode.cn/contest/weekly-contest-273/)


### [2119. 反转两次的数字](https://leetcode.cn/problems/a-number-after-a-double-reversal/)

略

```c++
class Solution {
public:
    bool isSameAfterReversals(int num) {
        if (num == 0)
            return true;
        return num % 10;
    }
};
```


### [2120. 执行所有后缀指令](https://leetcode.cn/problems/execution-of-all-suffix-instructions-staying-in-a-grid/)

模拟即可 略

```c++
class Solution {
public:
    int dx[4] = {0, 0, -1, 1}, dy[4] = {-1, 1, 0, 0};
    unordered_map<char, int> ps;
    
    vector<int> executeInstructions(int n, vector<int>& startPos, string s) {
        ps['L'] = 0, ps['R'] = 1, ps['U'] = 2, ps['D'] = 3;
        
        int m = s.size();
        vector<int> res;
        for (int i = 0; i < m; ++ i ) {
            int x = startPos[0], y = startPos[1];
            int j = i;
            while (j < m) {
                int p = ps[s[j]];
                int nx = x + dx[p], ny = y + dy[p];
                if (nx < 0 || nx >= n || ny < 0 || ny >= n)
                    break;
                x = nx, y = ny, j ++ ;
            }
            res.push_back(j - i);
        }
        return res;
    }
};
```

### [2121. 相同元素的间隔之和](https://leetcode.cn/problems/intervals-between-identical-elements/)

略

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    vector<int> g[N];
    vector<LL> res;
    
    void func(vector<int> & nums) {
        if (nums.empty())
            return;
        int n = nums.size();
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + nums[i - 1];
        for (int i = 1; i <= n; ++ i ) {
            LL p = nums[i - 1];
            //          prefix              suffix
            LL ret = p * i - s[i] + (s[n] - s[i] - p * (n - i));
            res[p] = ret;
        }
    }
    
    vector<long long> getDistances(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n; ++ i ) {
            int x = arr[i];
            g[x].push_back(i);
        }
        
        res.resize(n);
        for (int i = 1; i < N; ++ i )
            func(g[i]);
        
        return res;
    }
};
```

### [2122. 还原原数组](https://leetcode.cn/problems/recover-the-original-array/) [TAG]

原以为枚举会比较麻烦，实际上使用 STL 可以很便捷...

反复练习

```c++
class Solution {
public:
    vector<int> recoverArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        // nums[0] 必为 lower 的第一个元素，接下来枚举 higher 的第一个元素
        for (int i = 1; i < nums.size(); ++ i ) {
            int k = nums[i] - nums[0];
            if (k == 0 || k % 2)
                continue;
            
            // STL 大幅简化以下模拟过程
            multiset<int> H(nums.begin(), nums.end());
            vector<int> res;
            while (H.size()) {
                // x: lower 的下一个元素
                int x = *H.begin(); H.erase(H.begin());
                // x + k: higher 的下一个元素
                auto it = H.find(x + k);
                if (it == H.end())
                    break;
                H.erase(it);
                res.push_back(x + k / 2);
            }
            if (res.size() == nums.size() / 2)
                return res;
        }
        
        return {};
    }
};
```
