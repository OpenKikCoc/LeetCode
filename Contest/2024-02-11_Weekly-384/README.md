## [比赛链接](https://leetcode.cn/contest/weekly-contest-384/)


### [3033. 修改矩阵](https://leetcode.cn/problems/modify-the-matrix/)



```c++
class Solution {
public:
    vector<vector<int>> modifiedMatrix(vector<vector<int>>& matrix) {
        int n = matrix.size(), m = matrix[0].size();
        vector<vector<int>> res(n, vector<int>(m));
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (matrix[i][j] != -1)
                    res[i][j] = matrix[i][j];
                else {
                    int maxv = -1;
                    for (int k = 0; k < n; ++ k )
                        maxv = max(maxv, matrix[k][j]);
                    res[i][j] = maxv;
                }
        return res;
    }
};
```


### [3034. 匹配模式数组的子数组数目 I](https://leetcode.cn/problems/number-of-subarrays-that-match-a-pattern-i/)

同 4

```c++

```

### [3035. 回文字符串的最大数量](https://leetcode.cn/problems/maximum-palindromes-after-operations/) [TAG]

很巧妙的思维题 重在理清思路

```c++
class Solution {
public:
    // 题目本质就是 在长度不变的情况下，所有字符串的字符可以任意swap
    // 则 只与所有字符的计数 以及字符串长度有关

    int maxPalindromesAfterOperations(vector<string>& words) {
        // 考虑 先把左右的字母填了 最后在往正中间填入字母
        int tot = 0, mask = 0;
        for (auto & w : words) {
            tot += w.size();
            for (auto c : w)
                mask ^= 1 << (c - 'a');
        }
        // 总字符长度为tot 奇数有even位
        int even = __builtin_popcount(mask);
        // ATTENTION 先把奇数位都单独拎出来 剩下都是偶数个数【重要的细节推理 => 这个一定是和字符串长度一一匹配的】
        tot -= even;
        
        // 实际只会用到长度 [从短到长逐个填充]
        sort(words.begin(), words.end(), [](const string & a, const string & b) {
            return a.size() < b.size();
        });
        
        int res = 0;
        for (auto & w : words) {
            tot -= (w.size() / 2) * 2;  // 对于奇数来说 会消除掉1
            // ATTENTION 由于是从短到长 如果当前位置无法填充 后面的也没有填充可能 => 填充思想trick
            if (tot < 0)
                break;
            res ++ ;
        }
        
        return res;
    }
};
```

### [3036. 匹配模式数组的子数组数目 II](https://leetcode.cn/problems/number-of-subarrays-that-match-a-pattern-ii/)

经典 KMP 应用

```c++
class Solution {
public:
    // 与 https://codeforces.com/problemset/problem/471/D 思想一致
    const static int N = 1e6 + 10;
    
    int ns[N];
    
    vector<int> kmp(vector<int> & p, int m) {
        vector<int> f(m + 1);
        for (int i = 2, j = 0; i <= m; ++ i ) {
            while (j && p[i] != p[j + 1])
                j = f[j];
            if (p[i] == p[j + 1])
                j ++ ;
            f[i] = j;
        }
        return f;
    }
    
    int countMatchingSubarrays(vector<int>& nums, vector<int>& pattern) {
        int n = nums.size(), m = pattern.size();
        
        for (int i = 1; i < n; ++ i )
            if (nums[i] > nums[i - 1])
                ns[i] = 1;
            else if (nums[i] < nums[i - 1])
                ns[i] = -1;
            else
                ns[i] = 0;
        
        pattern.insert(pattern.begin(), 0); // ATTENTION
        auto f = kmp(pattern, m);
        
        int res = 0;
        for (int i = 1, j = 0; i < n; ++ i ) {
            while (j && ns[i] != pattern[j + 1])
                j = f[j];
            if (ns[i] == pattern[j + 1])
                j ++ ;
            if (j == m) {
                res ++ ;
                j = f[j];
            }
        }
        return res;
    }
};
```
