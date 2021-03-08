#  [670. 最大交换](https://leetcode-cn.com/problems/maximum-swap/)

## 题意



## 题解



```c++
class Solution {
public:
    int maximumSwap(int num) {
        string s = to_string(num);
        int n = s.size();
        for (int i = 0; i < n; ++ i ) {
            int v = s[i] - '0';
            int p = i;
            for (int j = n; j > i; -- j )
                if (s[j] > s[p])
                    p = j;
            if (p > i) {
                swap(s[i], s[p]);
                break;
            }
        }
        return stoi(s);
    }
};
```



```python3

```

