#  [89. 格雷编码](https://leetcode-cn.com/problems/gray-code/)

## 题意



## 题解



![acwing题解](./acwing-lc-89.jpeg)



```c++
class Solution {
public:
    vector<int> grayCode(int n) {
        int top = pow(2, n);
        vector<int> res;
        res.push_back(0);
        for(int i = 1; i <= n; i++){
            int e = 1 << (i - 1);                       //i - 1位结果前增加一位1
            for(int j = res.size() - 1; j >= 0; j--){   // 镜像排列
                res.push_back(e + res[j]);
            }
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    vector<int> grayCode(int n) {
        vector<int> res(1, 0);
        while (n -- ) {
            for (int i = res.size() - 1; i >= 0; i -- ) {
                res[i] *= 2;
                res.push_back(res[i] + 1);
            }
        }
        return res;
    }
};
```



```python3

```

