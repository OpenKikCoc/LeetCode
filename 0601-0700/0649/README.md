#  [649. Dota2 参议院](https://leetcode.cn/problems/dota2-senate/)

## 题意



## 题解



```c++
class Solution {
public:
    string predictPartyVictory(string senate) {
        int n = senate.size();
        queue<int> r, d;
        for (int i = 0; i < n; ++ i )
            if (senate[i] == 'R') r.push(i);
            else d.push(i);

        while (r.size() && d.size()) {
            if (r.front() < d.front()) r.push(r.front() + n);
            else d.push(d.front() + n);
            // 思想
            r.pop(), d.pop();
        }
        return r.size() ? "Radiant" : "Dire";
    }

    string predictPartyVictory_1(string senate) {
        set<int> R, D, A;
        int n = senate.size();
        for (int i = 0; i < n; ++ i ) {
            if (senate[i] == 'R') R.insert(i);
            else D.insert(i);
            A.insert(i);
        }
            
        for (;;) {
            for (auto i : A)
                if (senate[i] == 'R') {
                    if (D.empty()) return "Radiant";
                    else {
                        auto t = D.lower_bound(i);
                        if (t == D.end()) t = D.begin();
                        A.erase(*t);
                        D.erase(*t);
                    }
                } else {
                    if (R.empty()) return "Dire";
                    else {
                        auto t = R.lower_bound(i);
                        if (t == R.end()) t = R.begin();
                        A.erase(*t);
                        R.erase(*t);
                    }
                }
        }
        return "";
    }
};
```



```python3

```

