#  [167. 两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        for (int i = 0, j = numbers.size() - 1; i < j; i ++ ) {
            while (i < j && numbers[i] + numbers[j] > target) j -- ;
            if (i < j && numbers[i] + numbers[j] == target) return {i + 1, j + 1};
        }
        return {};
    }
    
    vector<int> twoSum_2(vector<int>& numbers, int target) {
        int n = numbers.size();
        vector<int> res;
        if (n < 2) return res;
        int l = 0, r = n - 1, v;
        while (l < r) {
            v = numbers[l] + numbers[r];
            if (v == target) {
                res.push_back(l + 1);
                res.push_back(r + 1);
                break;
            } else if (v < target) ++ l ;
            else -- r ;
        }
        return res;
    }
};
```



```python
class Solution:
    def twoSum(self, arr: List[int], target: int) -> List[int]:
        n = len(arr)
        sumn = 0
        l, r = 0, n - 1
        while l < r:
            sumn = arr[l] + arr[r]
            if sumn > target:
                r -= 1
            elif sumn < target:
                l += 1
            else:return [l + 1, r + 1]
        return [-1, -1]
```

