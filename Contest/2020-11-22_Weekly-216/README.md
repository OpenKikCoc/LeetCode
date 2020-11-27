## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-216/)


### [1662. 检查两个字符串数组是否相等](https://leetcode-cn.com/problems/check-if-two-string-arrays-are-equivalent/)

略

```c++
class Solution {
public:
    bool arrayStringsAreEqual(vector<string>& word1, vector<string>& word2) {
        string s1, s2;
        for (auto s : word1) s1 += s;
        for (auto s : word2) s2 += s;
        return s1 == s2;
    }
};
```


### [1663. 具有给定数值的最小字符串](https://leetcode-cn.com/problems/smallest-string-with-a-given-numeric-value/)

略

```c++
class Solution {
public:
    string getSmallestString(int n, int k) {
        k -= n;
        string s(n, 'a');
        for (int i = n - 1; i >= 0; --i) {
            int d = min(k, 25);
            s[i] += d;
            k -= d;
        }
        return s;
    }
};
```

### [1664. 生成平衡数组的方案数](https://leetcode-cn.com/problems/ways-to-make-a-fair-array/)

正负交替前缀和

```c++
class Solution {
public:
    int waysToMakeFair(vector<int>& nums) {
        int n = nums.size();
        vector<int> s1(n + 1), s2(n + 1);
        for (int i = 1; i <= n; i ++ ) {
            s1[i] = s1[i - 1], s2[i] = s2[i - 1];
            if (i % 2) s1[i] += nums[i - 1];
            else s2[i] += nums[i - 1];
        }
        
        int res = 0;
        for (int i = 1; i <= n; i ++ ) {
            int odd = s1[i - 1] + s2[n] - s2[i];
            int even = s2[i - 1] + s1[n] - s1[i];
            if (odd == even) res ++ ;
        }
        
        return res;
    }
};
```

### [1665. 完成所有任务的最少初始能量](https://leetcode-cn.com/problems/minimum-initial-energy-to-finish-tasks/)



```c++
ass Solution {
public:
    int minimumEffort(vector<vector<int>>& tasks) {
        sort(tasks.begin(), tasks.end(), [](const auto& u, const auto& v) {
            return u[0] - u[1] < v[0] - v[1];
        });
        int p = 0;
        int suma = 0;
        for (const auto& task: tasks) {
            p = max(p, suma + task[1]);
            suma += task[0];
        }
        return p;
    }
};
```
