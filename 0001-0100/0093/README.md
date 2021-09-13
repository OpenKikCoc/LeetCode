#  [93. 复原IP地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

## 题意



## 题解

```c++
class Solution {
public:
    vector<string> ans;
    vector<string> restoreIpAddresses(string s) {
        dfs(s, 0, 0, "");
        return ans;
    }

    void dfs(string& s, int u, int k, string path) {
        if (u == s.size()) {
            if (k == 4) {
                path.pop_back();
                ans.push_back(path);
            }
            return;
        }
        if (k == 4) return;
        for (int i = u, t = 0; i < s.size(); i ++ ) {
            if (i > u && s[u] == '0') break;  // 有前导0
            t = t * 10 + s[i] - '0';
            if (t <= 255) dfs(s, i + 1, k + 1, path + to_string(t) + '.');
            else break;
        }
    }
};
```

以下旧代码

```c++
class Solution {
public:
    vector<string> res;
    vector<string> path;
    bool isValid(string& ip) {
        int val = stoi(ip);
        if (val > 255 || (ip.size() >= 2 && ip[0] == '0')) return false;
        return true;
    }
    void dfs(string& s, int step) {
        int maxl = (4 - path.size()) * 3;   // 剩下最多多少位
        if (s.size() - step > maxl) return;
        if (path.size() == 4 && step == s.size()) {
            string ans;
            for (int i = 0; i < 4; ++ i ) {
                if (i) ans.push_back('.');
                ans += path[i];
            }
            res.push_back(ans);
            return;
        }
        for (int i = step; i < s.size() && i <= step + 2; ++ i ) {
            string ip = s.substr(step, i - step + 1);
            if (!isValid(ip)) continue;
            path.push_back(ip);
            dfs(s, i + 1);
            path.pop_back();
        }
    }
    vector<string> restoreIpAddresses(string s) {
        int n = s.size();
        if (n < 4) return res;
        dfs(s, 0);
        return res;
    }
};
```



```python
"""
直接暴力搜索出所有合法方案。合法的IP地址由四个0到255的整数组成。
我们直接枚举四个整数的位数，然后判断每个数的范围是否在0到255。

1. 要求在0 - 255之间；2. 不能有前导0 
搜索顺序：先搜第一个数，然后 第二个， 再三个，最后一个。

时间复杂度分析：一共 nn 个数字，n−1 个数字间隔，相当于从 n−1个数字间隔中挑3个断点，所以计算量是 O(C (3/ n-1)。
"""

class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res = list()
        path = list()

        def dfs(u, k, s):
            if u == len(s):
                if k == 4:
                    ans = str(path[0])
                    for i in range(1, 4):
                        ans += '.' + str(path[i])
                    res.append(ans)

            if k > 4:
                return

            t = 0
            for i in range(u, len(s)):
                t = t * 10 + int(s[i])
                if t >= 0 and t < 256:
                    path.append(t)
                    dfs(i + 1, k + 1, s)
                    path.pop()
                if not t:
                    break

        dfs(0, 0, s)
        return res
```

