#  [659. 分割数组为连续子序列](https://leetcode-cn.com/problems/split-array-into-consecutive-subsequences/)

## 题意



## 题解



```c++
class Solution {
public:
    typedef pair<int, int> PII;
    bool isPossible(vector<int>& nums) {
        int n = nums.size();
        priority_queue<PII, vector<PII>, greater<PII>> pq;
        for (auto v : nums) {
            while (!pq.empty() && pq.top().first < v - 1) {
                if (pq.top().second < 3) return false;
                pq.pop();
            }
            if (pq.empty() || pq.top().first >= v) pq.push({v, 1});
            else pq.push({v, pq.top().second + 1}), pq.pop();
        }
        while (!pq.empty()) {
            if (pq.top().second < 3) return false;
            pq.pop();
        }
        return true;
    }
};
```



yxc:

```c++
class Solution {
public:
    bool isPossible(vector<int>& nums) {
        unordered_map<int, int> cnt1, cnt2;
        for (auto x: nums) cnt1[x] ++ ;
        for (auto x: nums) {
            if (!cnt1[x]) continue;
            if (cnt2[x - 1]) {
                cnt2[x - 1] -- ;
                cnt2[x] ++ ;
                cnt1[x] -- ;
            } else if (cnt1[x + 1] && cnt1[x + 2]) {
                cnt2[x + 2] ++ ;
                cnt1[x] --, cnt1[x + 1] --, cnt1[x + 2] -- ;
            } else return false;
        }
        return true;
    }
};

作者：yxc
链接：https://www.acwing.com/activity/content/code/content/919539/
来源：AcWing
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```





```python3

```

