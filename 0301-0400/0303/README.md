#  [303. 区域和检索 - 数组不可变](https://leetcode.cn/problems/range-sum-query-immutable/)

## 题意



## 题解



```c++
class NumArray {
public:
    vector<int> sum;
    NumArray(vector<int>& nums) {
        sum.push_back(0);
        for (int i = 1; i <= nums.size(); ++ i )
            sum.push_back(sum[i - 1] + nums[i - 1]);
    }
    
    int sumRange(int i, int j) {
        return sum[j + 1] - sum[i];
    }
};

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray* obj = new NumArray(nums);
 * int param_1 = obj->sumRange(i,j);
 */
```

```c++
class NumArray {
public:
    vector<int> s;

    NumArray(vector<int>& nums) {
        s.resize(nums.size() + 1);
        for (int i = 1; i <= nums.size(); i ++ ) s[i] = s[i - 1] + nums[i - 1];
    }

    int sumRange(int i, int j) {
        ++i, ++j;
        return s[j] - s[i - 1];
    }
};
```


```python3

```

