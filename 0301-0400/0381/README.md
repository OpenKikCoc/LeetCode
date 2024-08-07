#  [381. O(1) 时间插入、删除和获取随机元素 - 允许重复](https://leetcode.cn/problems/insert-delete-getrandom-o1-duplicates-allowed/)

## 题意



## 题解



```c++
class RandomizedCollection {
public:
    unordered_map<int, unordered_set<int>> hash;
    vector<int> nums;
    /** Initialize your data structure here. */
    RandomizedCollection() {

    }
    
    /** Inserts a value to the collection. Returns true if the collection did not already contain the specified element. */
    bool insert(int val) {
        bool res = hash[val].empty();
        nums.push_back(val);
        hash[val].insert(nums.size() - 1);
        return res;
    }
    
    /** Removes a value from the collection. Returns true if the collection contained the specified element. */
    bool remove(int x) {
        if (hash[x].size()) {
            int px = *hash[x].begin(), py = nums.size() - 1;
            int y = nums.back();
            swap(nums[px], nums[py]);
            hash[x].erase(px), hash[x].insert(py);
            hash[y].erase(py), hash[y].insert(px);
            nums.pop_back();
            hash[x].erase(py);
            return true;
        }
        return false;
    }
    
    /** Get a random element from the collection. */
    int getRandom() {
        return nums[rand() % nums.size()];
    }
};

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * RandomizedCollection* obj = new RandomizedCollection();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */
```



```python3

```

