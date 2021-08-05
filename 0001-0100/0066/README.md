#  [66. 加一](https://leetcode-cn.com/problems/plus-one/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int n = digits.size();
        if (!n) return vector<int>{1};
        int carry = 1;
        for (int i = n - 1; i >= 0; -- i ) {
            digits[i] += carry;
            if (digits[i] > 9) carry = 1, digits[i] -= 10;
            else {carry = 0; break;}
        }
        vector<int> res;
        if (carry) res.push_back(1);
        for (auto v : digits) res.push_back(v);
        return res;
    }
};
```

```c++
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        reverse(digits.begin(), digits.end());
        int t = 1;
        for (auto & x: digits) {
            t += x;
            x = t % 10;
            t /= 10;
        }
        if (t) digits.push_back(t);

        reverse(digits.begin(), digits.end());

        return digits;
    }
};
```



```python
class Solution:
    def plusOne(self, nums: List[int]) -> List[int]:
        n = len(nums)
        nums[n-1] += 1
        res = [];t = 0;i = n - 1
        while i >= 0 or t:
            if i >= 0:
                t = t + nums[i]
            res.append(t % 10)
            t //= 10 
            i -= 1
        return res[::-1]
```

