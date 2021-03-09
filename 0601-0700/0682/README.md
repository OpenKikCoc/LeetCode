#  [682. 棒球比赛](https://leetcode-cn.com/problems/baseball-game/)

## 题意



## 题解



```c++
class Solution {
public:
    int calPoints(vector<string>& ops) {
        vector<int> stk;
        for (auto & s : ops) {
            int top = stk.size() - 1;
            if (s == "+")
                stk.push_back(stk[top - 1] + stk[top]);
            else if (s == "D")
                stk.push_back(stk[top] * 2);
            else if (s == "C")
                stk.pop_back();
            else
                stk.push_back(stoi(s));
        }
        return accumulate(stk.begin(), stk.end(), 0);
    }
};
```



```python3

```

