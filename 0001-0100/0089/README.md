#  [89. 格雷编码](https://leetcode.cn/problems/gray-code/)

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
        for (int i = 1; i <= n; i ++ ){
            int e = 1 << (i - 1);                        //i - 1位结果前增加一位1
            for (int j = res.size() - 1; j >= 0; j -- )  // 镜像排列
                res.push_back(e + res[j]);
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



```python
# 有规律的一道题！
# 第k个格雷编码 是 k-1个格雷编码 进行对称翻转，然后前半部分后面补0，后半部分后面补1

class Solution:
    def grayCode(self, n: int) -> List[int]:
        res = [0]
        while n:
            for i in range(len(res) - 1, -1, -1):
                res[i] *= 2  # 前半部分 补0 
                res.append(res[i] + 1) #后半部分 补1，就是在前半部分的基础上加上1就可
            n -= 1
        return res
```

