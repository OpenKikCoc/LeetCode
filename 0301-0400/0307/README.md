#  [307. 区域和检索 - 数组可修改](https://leetcode.cn/problems/range-sum-query-mutable/)

## 题意



## 题解

1.  树状数组模板题，树状数组是特殊的前缀和数组，可以维护原数组每次变化的增量。
2.  树状数组在每次修改时，并不总是修改 i 之后的所有点，而是根据 lowbit 操作依次向后修改影响到的点。
3.  同样，在查询时，也是根据 lowbit 序列向前统计前缀和，两次前缀和的差值就是区间和。
4.  注意，树状数组的下标必须从 1 开始。
5.  对于此题，由于题目每次是更新值，并不是更新增量，故需要用原数组记录每次更新后的点的值。
6.  为了节约初始化的时间，仍需要一个普通前缀和数组记录初始数组的每个点的前缀和，树状数组用来维护修改增量的前缀和。

```c++
class NumArray {
public:
    int n;
    vector<int> tr, nums;
    int lowbit(int x) {
        return x & -x;
    }
    int query(int x) {
        int res = 0;
        for (int i = x; i; i -= lowbit(i)) res += tr[i];
        return res;
    }
    void add(int x, int v) {
        for (int i = x; i <= n; i += lowbit(i)) tr[i] += v;
    }

    NumArray(vector<int>& nums) {
        this->nums = nums;
        n = nums.size();
        tr.resize(n + 1);
        for (int i = 1; i <= n; ++i) {
            tr[i] = nums[i - 1];
            for (int j = i - 1; j > i - lowbit(i); j -= lowbit(j))
                tr[i] += tr[j];
        }
    }
    
    void update(int i, int val) {
        add(i + 1, val - nums[i]);
        nums[i] = val;
    }
    
    int sumRange(int i, int j) {
        return query(j + 1) - query(i);
    }
};

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray* obj = new NumArray(nums);
 * obj->update(i,val);
 * int param_2 = obj->sumRange(i,j);
 */
```



```python3

```

