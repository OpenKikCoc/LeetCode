#   [767. 重构字符串](https://leetcode-cn.com/problems/reorganize-string/)

## 题意



## 题解



```c++
class Solution {
public:
    string reorganizeString(string S) {
        int n = S.size();
        vector<int> cnt(26);
        for (auto c : S) {
            cnt[c - 'a'] += 100;
            if (cnt[c - 'a'] / 100 > (n + 1) / 2) return "";
        }
        // 加入字符信息
        for (int i = 0; i < 26; ++ i ) cnt[i] += i;
        sort(cnt.begin(), cnt.end());
        // 【先填偶数坑，再填奇数坑l。因为对于某个长度为计数且个数恰好为(len+1)/2的字符 在后面填写的时候会撞】
        int idx = 1;
        string res(n, ' ');
        for (auto v : cnt) {
            int sz = v / 100;
            char c = 'a' + v % 100;
            while (sz -- ) {
                if (idx >= n) idx = 0;
                res[idx] = c;
                idx += 2;
            }
        }
        return res;
    }
};
```



```python3

```

