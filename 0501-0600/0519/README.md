#  [519. 随机翻转矩阵](https://leetcode.cn/problems/random-flip-matrix/)

## 题意



## 题解



```c++
class Solution {
public:
    int r, c, k;
    unordered_map<int, int> hash;

    Solution(int n_rows, int n_cols) {
        r = n_rows, c = n_cols, k = r * c;
    }
    
    // 核心思想 选一个元素 然后把最后一个数值覆盖该选中的位置 以维持连续性
    vector<int> flip() {
        int x = rand() % k;
        int y = x;
        // x 里面存的是特殊值 那么就更新为该特殊值
        if (hash.count(x)) y = hash[x];
        // 删掉x上存的值 再把最后一个位置的数(k-1)删掉
        // k-1存的有值 覆盖x
        // 否则说明不存在值 就是k-1本身
        if (hash.count(k - 1)) {
            hash[x] = hash[k - 1];
            hash.erase(k - 1);
        } else hash[x] = k - 1;
        -- k ;
        return {y / c, y % c};
    }
    
    void reset() {
        k = r * c;
        hash.clear();
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(n_rows, n_cols);
 * vector<int> param_1 = obj->flip();
 * obj->reset();
 */
```



```python3

```

