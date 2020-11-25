#  [539. 最小时间差](https://leetcode-cn.com/problems/minimum-time-difference/)

## 题意



## 题解



```c++
class Solution {
public:
    int findMinDifference(vector<string> & timePoints) {
        int res = INT_MAX;
        vector<int> q;
        for (auto t : timePoints) {
            int h, m;
            sscanf(t.c_str(), "%d:%d", &h, &m);
            q.push_back(h * 60 + m);
        }
        sort(q.begin(), q.end());
        for (int i = 1; i < q.size(); ++ i ) res = min(res, q[i] - q[i - 1]);
        res = min(res, 1440 - q.back() + q[0]);
        return res;
    }
};


class Solution_2 {
public:
    int get(string s) {
        int h, m;
        sscanf(s.c_str(), "%d:%d", &h, &m);
        return h * 60 + m;
    }
    int findMinDifference(vector<string>& timePoints) {
        set<string> S;
        int res = INT_MAX;
        for (auto p : timePoints) {
            if (!S.empty()) {
                auto r = S.lower_bound(p);
                int pv = get(p);
                if (r != S.end()) {
                    int rv = get(*r);
                    int dis = abs(pv - rv);
                    //cout << "pv = " << pv << " rv = " << rv << endl;
                    res = min(res, min(dis, 1440 - dis));
                } else {
                    int rv = get(*S.begin());
                    int dis = abs(pv - rv);
                    //cout << "pv = " << pv << " rv = " << rv << endl;
                    res = min(res, min(dis, 1440 - dis));
                }
                if (r != S.begin()) {
                    int lv = get(*(prev(r)));
                    int dis = abs(pv - lv);
                    //cout << "pv = " << pv << " lv = " << lv << endl;
                    res = min(res, min(dis, 1440 - dis));
                } else {
                    int lv = get(*S.rbegin());
                    int dis = abs(pv - lv);
                    //cout << "pv = " << pv << " lv = " << lv << endl;
                    res = min(res, min(dis, 1440 - dis));
                }

            }
            
            S.insert(p);
        }
        return res;
    }
};
```



```python3

```

