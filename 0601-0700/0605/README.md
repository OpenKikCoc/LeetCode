#  [605. 种花问题](https://leetcode.cn/problems/can-place-flowers/)

## 题意



## 题解



```c++
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        //if (!n) return true;
        int res = 0;
        for (int i = 0; i < flowerbed.size(); ++ i ) {
            if (flowerbed[i]) continue;
            int j = i;
            while (j < flowerbed.size() && !flowerbed[j]) ++ j;
            // 连续0的长度
            int k = j - i - 1;
            if (!i) ++ k;
            if (j == flowerbed.size()) ++ k;
            res += k / 2;
            if (res >= n) return true;
            i = j;  // j == f.size() || flowerbed[i] = 1
        }
        return res >= n;
    }
};
```



```python
#一定是在连续若干个0里填入1；找规律：
#思路1：1）如果当前及左右三个位置中存在1，那么跳过；否则就可以种花，种完花n减1；即flowerbed[i]=1;n-=1
#2) 当n==0时，说明已经种完花了，返回True；3）如果最后不满足上述条件，就返回False

class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        if n==0:return True
        m=len(flowerbed)
        for i in range(m):
             # 判断当前及左右位置是否种植了花
            if flowerbed[i]==1:continue
            if i>0 and flowerbed[i-1]==1:continue
            if i+1<m and flowerbed[i+1]==1:continue
            flowerbed[i]=1
            n-=1
            #踩坑：在这里就需要判断n是否为0，因为存在“[0,0,1,0,0]---1” 这一类的case，可以放入的1个数大于题目给的n
            if n==0:
                return True
        return False
```

