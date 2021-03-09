#  [698. 划分为k个相等的子集](https://leetcode-cn.com/problems/partition-to-k-equal-sum-subsets/)

## 题意



## 题解

1.  先求出数组的总和，如果总和不是 k
     的倍数，则直接返回 false。
2.  求出子集和的目标值，如果数组中有数字大于这个子集和目标值，则返回 false。
3.  将数组 从大到小 排序。贪心地来看，先安排大的数字会更容易先找到答案，这是因为小的数字再后期更加灵活。
4.  我们按照子集去递归填充，即维护一个当前总和 cur，如果当前值等于了目标值，则进行下一个子集的填充。最终，如果只剩下一个子集尚未填充（无需 0 个），则可以直接返回 true。
5.  还需要同时维护一个 start，即表示当前这个子集，需要从数组的哪个位置开始尝试。
6.  这里还有一个非常重要的策略，就是如果当前总和 cur 为 0 时，我们直接指定第一个未被使用的数字作为当前这个子集的第一个数字（最大的数字）。这是防止重复枚举，因为第一个未被使用的数字一定要出现在某个子集中。否则，如果我们最终没有使用这个数字，在尝试下一个集合时，还会重复尝试使用这个数字，造成大量重复计算。

```c++
class Solution {
public:
    int len;
    vector<int> nums;
    vector<bool> st;

    bool dfs(int start, int cur, int k) {
        if (!k) return true;
        if (cur == len) return dfs(0, 0, k - 1);
        for (int i = start; i < nums.size(); ++ i ) {
            if (st[i]) continue;
            if (cur + nums[i] <= len) {
                st[i] = true;
                if (dfs(i + 1, cur + nums[i], k)) return true;
                st[i] = false;
            }
            while (i + 1 < nums.size() && nums[i + 1] == nums[i]) i ++ ;
            // 重要剪枝
            if (!cur || cur + nums[i] == len) return false;
        }
        return false;
    }

    bool canPartitionKSubsets(vector<int>& _nums, int k) {
        nums = _nums;
        st.resize(nums.size());
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % k) return false;
        len = sum / k;
        sort(nums.begin(), nums.end(), greater<int>());
        return dfs(0, 0, k);
    }
};
```



```python3

```

