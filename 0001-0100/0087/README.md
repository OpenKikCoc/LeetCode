#  [87. 扰乱字符串](https://leetcode.cn/problems/scramble-string/)

## 题意



## 题解



递归（后来加样例会 TLE ）

```c++
class Solution {
public:
    bool isScramble(string s1, string s2) {
        if (s1 == s2) return true;
        string bs1 = s1, bs2 = s2;
        sort(bs1.begin(), bs1.end()), sort(bs2.begin(), bs2.end());
        if (bs1 != bs2) return false;

        int n = s1.size();
        for (int i = 1; i <= n - 1; i ++ ) {
            if (isScramble(s1.substr(0, i), s2.substr(0, i)) &&
                isScramble(s1.substr(i), s2.substr(i))) return true;
            if (isScramble(s1.substr(0, i), s2.substr(n - i)) &&
                isScramble(s1.substr(i), s2.substr(0, n - i))) return true;
        }

        return false;
    }
};
```



```c++
class Solution {
public:
    bool isScramble(string s1, string s2) {
        int l1 = s1.size(), l2 = s2.size();
        if (l1 != l2) return false;
        if (!l1) return true;
        vector<vector<vector<bool>>> dp(l1 + 1, vector<vector<bool>>(l1, vector<bool>(l1, false)));
        for (int i = 0; i < l1; ++ i )
            for (int j = 0; j < l1; ++ j )
                dp[1][i][j] = s1[i] == s2[j];
              
        for (int len = 2; len <= l1; ++ len ) {
            for (int i = 0; i < l1 && i + len - 1 < l1; ++ i ) {
                for (int j = 0; j < l1 && j + len - 1 < l1; ++ j ) {
                    for (int k = 1; k < len; ++ k ) {
                        if(dp[k][i][j] && dp[len - k][i + k][j + k]) {
                            dp[len][i][j] = true;
                            break;
                        }
                        if(dp[k][i][j + len - k] && dp[len - k][i + k][j]) {
                            dp[len][i][j] = true;
                            break;
                        }
                    }
                }
            }
        }
        return dp[l1][0][0];
    }
};
```

```c++
class Solution {
public:
    bool isScramble(string s1, string s2) {
        int n = s1.size();
        vector<vector<vector<bool>>> f(n, vector<vector<bool>>(n, vector<bool>(n + 1)));
        for (int k = 1; k <= n; k ++ )
            for (int i = 0; i + k - 1 < n; i ++ )
                for (int j = 0; j + k - 1 < n; j ++ ) {
                    if (k == 1) {
                        if (s1[i] == s2[j]) f[i][j][k] = true;
                    } else {
                        for (int u = 1; u < k; u ++ ) {
                            if (f[i][j][u] && f[i + u][j + u][k - u] || f[i][j + k - u][u] && f[i + u][j][k - u]) {
                                f[i][j][k] = true;
                                break;
                            }
                        }
                    }
                }
        return f[0][0][n];
    }
};
```



```python
# 枚举所有情况，看看s2是不是s1干扰产生的字符串
# 做法：递归；如何判断呢？先去枚举s1 第一次分割的情况： （左边：i, 右边：n - i)
# 1. 如果s1的根节点不翻转，并且左子树有i个，右子树有n-i个节点：
# 如果s2可以有s1得到的话，那s2的右边(n - i)个字符 可以通过 s1的右边(n-i)个字符干扰得到；s2的左边i个字符可以 通过s1的左边i个字符干扰得到，
# 2. 如果s1的根节点翻转，就是最后一步 需要s1进行翻转：
# 如果s2可以有s1得到的话，意味着s2的右边i个字符 可以通过 s1的左边的i个字符干扰得到; s2的左边的(n - i)个字符 可以通过s1的右边(n - i)个字符干扰得到。

import functools
class Solution:
    @functools.lru_cache(None)
    def isScramble(self, s1: str, s2: str) -> bool:
        if s1 == s2:return True
        # a1, b1 = s1, s2  # 后续改变了a, b的值，但对原字符串不影响
        # if sorted(a1) != sorted(b1): # 剪枝：如果s1和s2排序后 不相等 意味着两个字符串 有字符数量不相等，那肯定不能干扰得到。
        #     return False
        if sorted(s1) != sorted(s2):
            return False
        for i in range(1, len(s1)):
            if self.isScramble(s1[:i], s2[:i]) and self.isScramble(s1[i:], s2[i:]):
                return True
            if self.isScramble(s1[:i], s2[-i:]) and self.isScramble(s1[i:], s2[:-i]):
                return True
        return False
      
      
"""
状态表示：f[i, j, k]
1.1 集合：s1[i ~ i + k - 1]与s2[j, j + k - 1]所有匹配方案的集合
1.2 属性：集合是否非空
状态计算
将f[i, j, k]表示的集合按s1第一段的长度划分划分成k - 1类。
设s1第一段的长度为u。则s1[i ~ i + k - 1]与s2[j, j + k - 1]有两种匹配方案，分别判断即可：
(1) f[i][j][u] && f[i + u][j + u][k - u]
(2) f[i][j + k - u][u] && f[i + u][j][k - u]
时间复杂度分析：状态数 O(n3)，状态转移计算量为 O(n)，所以总时间复杂度为 O(n4)。

"""

```

