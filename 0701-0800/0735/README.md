#  [735. 行星碰撞](https://leetcode-cn.com/problems/asteroid-collision/)

## 题意



## 题解

显然单调栈 一次AC

```c++
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& a) {
        int n = a.size();
        vector<int> res;
        stack<int> st;
        for (int i = 0; i < n; ++ i )
            if (a[i] < 0) {
                int t = a[i];
                while (st.size() && st.top() < -t)
                    st.pop();
                if (st.size()) {
                    if (st.top() == -t)
                        st.pop();
                } else
                    res.push_back(t);
            } else
                st.push(a[i]);

        vector<int> t;
        while (st.size())
            t.push_back(st.top()), st.pop();
        reverse(t.begin(), t.end());
        for (auto v : t)
            res.push_back(v);
        return res;
    }
};
```

简单写法

```c++
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> res;
        for (auto x : asteroids)
            if (x > 0) res.push_back(x);
            else {
                while (res.size() && res.back() > 0 && res.back() < -x)
                    res.pop_back();
                if (res.size() && res.back() == -x)
                    res.pop_back();
                else if (res.empty() || res.back() < 0)
                    res.push_back(x);
            }
        return res;
    }
};
```





```python3

```

