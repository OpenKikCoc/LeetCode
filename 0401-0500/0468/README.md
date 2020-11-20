#  [468. 验证IP地址](https://leetcode-cn.com/problems/validate-ip-address/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> split(string ip, char t) {
        vector<string> items;
        for (int i = 0; i < ip.size(); i ++ ) {
            int j = i;
            string item;
            while (ip[j] != t) item += ip[j ++ ];
            i = j;
            items.push_back(item);
        }
        return items;
    }

    string check_ipv4(string ip) {
        auto items = split(ip + '.', '.');
        if (items.size() != 4) return "Neither";
        for (auto item: items) {
            if (item.empty() || item.size() > 3) return "Neither";
            if (item.size() > 1 && item[0] == '0') return "Neither";
            for (auto c: item)
                if (c < '0' || c > '9') return "Neither";
            int t = stoi(item);
            if (t > 255) return "Neither";
        }
        return "IPv4";
    }

    bool check(char c) {
        if (c >= '0' && c <= '9') return true;
        if (c >= 'a' && c <= 'f') return true;
        if (c >= 'A' && c <= 'F') return true;
        return false;
    }

    string check_ipv6(string ip) {
        auto items = split(ip + ':', ':');
        if (items.size() != 8) return "Neither";
        for (auto item: items) {
            if (item.empty() || item.size() > 4) return "Neither";
            for (auto c: item)
                if (!check(c)) return "Neither";
        }
        return "IPv6";
    }

    string validIPAddress(string ip) {
        if (ip.find('.') != -1 && ip.find(':') != -1) return "Neither";
        if (ip.find('.') != -1) return check_ipv4(ip);
        if (ip.find(':') != -1) return check_ipv6(ip);
        return "Neither";
    }
};
```



```python3

```

