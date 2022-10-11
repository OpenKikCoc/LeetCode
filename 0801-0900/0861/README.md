#  [861. 翻转矩阵后的得分](https://leetcode.cn/problems/score-after-flipping-matrix/)

## 题意



## 题解



```c++

```



```python3
class Solution:
    def matrixScore(self, A: List[List[int]]) -> int:
        m = len(A)
        n = len(A[0])
        for i in range(m):
            if A[i][0] == 0:
                for j in range(n):
                    if A[i][j] == 0:
                        A[i][j] = 1
                    else:
                        A[i][j] = 0
        for i in range(1, n):
            count1 = 0
            count0 = 0
            for j in range(m):
                if A[j][i] == 1:
                    count1 += 1
                else:
                    count0 += 1
            if count0 > count1:
                for j in range(m):
                    if A[j][i] == 1:
                        A[j][i] = 0
                    else:
                        A[j][i] = 1
        ans = 0
        for a in range(m):
            temp = A[a][0]
            for b in range(1, n):
                temp = temp*2 + A[a][b]
            ans += temp
        return ans  
```

