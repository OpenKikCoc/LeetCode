#  [384. 打乱数组](https://leetcode-cn.com/problems/shuffle-an-array/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> a;

    Solution(vector<int>& nums) {
        a = nums;
    }

    /** Resets the array to its original configuration and return it. */
    vector<int> reset() {
        return a;
    }

    /** Returns a random shuffling of the array. */
    vector<int> shuffle() {
        auto b = a;
        int n = a.size();
        for (int i = 0; i < n; i ++ )
            swap(b[i], b[i + rand() % (n - i)]);
        return b;
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(nums);
 * vector<int> param_1 = obj->reset();
 * vector<int> param_2 = obj->shuffle();
 */
```



```python3

```

