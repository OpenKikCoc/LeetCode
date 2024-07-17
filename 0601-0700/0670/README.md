#  [670. 最大交换](https://leetcode.cn/problems/maximum-swap/)

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


```c++
// yxc
class Solution {
public:
    int maximumSwap(int num) {
        string str = to_string(num);
        for (int i = 0; i + 1 < str.size(); i ++ ) {
            if (str[i] < str[i + 1]) {
                int k = i + 1;
                for (int j = k; j < str.size(); j ++ )
                    if (str[j] >= str[k])
                        k = j;
                for (int j = 0; ; j ++ )
                    if (str[j] < str[k]) {
                        swap(str[j], str[k]);
                        return stoi(str);
                    }
            }
        }
        return num;
    }
};
```



```python3

```

