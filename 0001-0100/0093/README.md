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

搜索题：最重要的是 搜索顺序！ 先搜第一个数 再是第二个数...
1. 要求每个数都在0 - 255之间；2. 必须是一个合法的数：就是【不能有前导0】
搜索顺序：先搜第一个数，然后 第二个， 再三个，最后一个。
时间复杂度分析：一共 n 个数字，n−1 个数字间隔，相当于从 n−1个数字间隔中挑3个断点，所以计算量是 O(Cn-1 -- 3)。【一个组合】
"""

# 直接用字符串
class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res = []

        # u表示枚举到的字符串下标，k表示当前截断的IP个数，s表示原字符串
        def dfs(s, u, k, path):
            # 遍历完了所有的字符，且分割为合法的四份
            if u == len(s):
                if k == 4:
                    res.append(path[:-1])
                # return  # 可写 可不写
            # 没遍历完所有字符，就已经有了 4 个合法值，那么不能再分割了
            if k == 4:
                return 
            
            t = 0
            for i in range(u, len(s)):
                if i > u and int(s[u]) == 0:break # 去除前导0
                t = t * 10 + int(s[i])
                # 数值合法，则继续深搜
                if t <= 255:
                    dfs(s, i+1, k+1, path + str(t) + '.')
                else:
                    break
                # 代码中并没有改变 path 的值，不需要恢复现场。

        dfs(s, 0, 0, "")
        return res


# 用数组保存
class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res = []
        path = []

        # u表示枚举到的字符串下标，k表示当前截断的IP个数，s表示原字符串
        def dfs(u, k, s):
          	# 当搜完了所有位，如果当前个数有4个的话，就加入答案
            if u == len(s):
                if k == 4:
                    ans = str(path[0])
                    for i in range(1, 4):
                        ans += '.' + str(path[i])
                    res.append(ans)
						
            # 剪枝：当前已经有四个数了，说明后面还有其他的数 5个甚至更多，所以就直接return 【超过12位的情况】
            if k > 4:
                return

            t = 0
            for i in range(u, len(s)):
                t = t * 10 + int(s[i])
                if t >= 0 and t < 256:
                    path.append(t)
                    dfs(i + 1, k + 1, s)
                    path.pop()
                # 当前数太大，直接 break
                if not t:
                    break
                    
				# 从 0 位开始搜，搜第 0 个数
        dfs(0, 0, s)
        return res
```

