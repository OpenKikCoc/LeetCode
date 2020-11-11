#  [93. 复原IP地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> res;
    vector<string> path;
    bool isValid(string& ip) {
        int val = stoi(ip);
        if(val > 255 || (ip.size() >= 2 && ip[0] == '0')) return false;
        return true;
    }
    void dfs(string& s, int step) {
        int maxl = (4-path.size())*3;   // 剩下最多多少位
        if(s.size() - step > maxl) return;
        if(path.size() == 4 && step == s.size()) {
            string ans;
            for(int i = 0; i < 4; ++i) {
                if(i) ans.push_back('.');
                ans += path[i];
            }
            res.push_back(ans);
            return;
        }
        for(int i = step; i < s.size() && i <= step+2; ++i) {
            string ip = s.substr(step, i-step+1);
            if(!isValid(ip)) continue;
            path.push_back(ip);
            dfs(s, i+1);
            path.pop_back();
        }
    }
    vector<string> restoreIpAddresses(string s) {
        int n = s.size();
        if(n < 4) return res;
        dfs(s, 0);
        return res;
    }
};
```



```python3

```

