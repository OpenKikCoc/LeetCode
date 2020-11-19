#  [414. 第三大的数](https://leetcode-cn.com/problems/third-maximum-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int thirdMax(vector<int>& nums) {
        long long INF = 1e10, a = -INF, b = -INF, c = -INF, s = 0;
        for (auto x: nums) {
            if (x > a) s ++, c = b, b = a, a = x;
            else if (x < a && x > b) s ++, c = b, b = x;
            else if (x < b && x > c) s ++, c = x;
        }
        if (s < 3) return a;
        return c;
    }

    int thirdMax_2(vector<int>& nums) {
        int n = nums.size();
        long long m1 = LONG_MIN, m2 = LONG_MIN, m3 = LONG_MIN;
        for(int i = 0; i < n; ++i) {
            if(nums[i] >= m3) {
                if(nums[i] == m3) continue;
                m1 = m2;
                m2 = m3;
                m3 = nums[i];
            } else if(nums[i] >= m2) {
                if(nums[i] == m2) continue;
                m1 = m2;
                m2 = nums[i];
            } else if(nums[i] >= m1) {
                if(nums[i] == m1) continue;
                m1 = nums[i];
            }
            //cout << m1<<" "<<m2<<" "<<m3<<endl;
        }
        return m1 == LONG_MIN ? m3 : m1;
    }
};
```



```python3

```

