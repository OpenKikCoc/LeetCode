#  [164. 最大间距](https://leetcode-cn.com/problems/maximum-gap/)

## 题意



## 题解


```c++
// yxc
class Solution {
public:
    struct Range {
        int min, max;
        bool used;
        Range() : min(INT_MAX), max(INT_MIN), used(false){}
    };

    int maximumGap(vector<int>& nums) {
        int n = nums.size();
        int Min = INT_MAX, Max = INT_MIN;
        for (auto x: nums) {
            Min = min(Min, x);
            Max = max(Max, x);
        }
        if (n < 2 || Min == Max) return 0;
        vector<Range> r(n - 1);
        int len = (Max - Min + n - 2) / (n - 1);
        for (auto x: nums) {
            if (x == Min) continue;
            int k = (x - Min - 1) / len;
            r[k].used = true;
            r[k].min = min(r[k].min, x);
            r[k].max = max(r[k].max, x);
        }
        int res = 0;
        for (int i = 0, last = Min; i < n - 1; i ++ )
            if (r[i].used) {
                res = max(res, r[i].min - last);
                last = r[i].max;
            }
        return res;
    }
};
```


```c++

class Solution {
public:
    class Bucket {
    public:
        bool used = false;
        int minval = numeric_limits<int>::max();        // same as INT_MAX
        int maxval = numeric_limits<int>::min();        // same as INT_MIN
    };

    int maximumGap(vector<int>& nums) {
        if (nums.empty() || nums.size() < 2)
            return 0;

        int mini = *min_element(nums.begin(), nums.end()),
            maxi = *max_element(nums.begin(), nums.end());

        int bucketSize = max(1, (maxi - mini) / ((int)nums.size() - 1));        // bucket size or capacity
        int bucketNum = (maxi - mini) / bucketSize + 1;                         // number of buckets
        vector<Bucket> buckets(bucketNum);

        for (auto&& num : nums) {
            int bucketIdx = (num - mini) / bucketSize;                          // locating correct bucket
            buckets[bucketIdx].used = true;
            buckets[bucketIdx].minval = min(num, buckets[bucketIdx].minval);
            buckets[bucketIdx].maxval = max(num, buckets[bucketIdx].maxval);
        }

        int prevBucketMax = mini, maxGap = 0;
        for (auto&& bucket : buckets) {
            if (!bucket.used)
                continue;

            maxGap = max(maxGap, bucket.minval - prevBucketMax);
            prevBucketMax = bucket.maxval;
        }

        return maxGap;
    }
};
```



```python3

```

