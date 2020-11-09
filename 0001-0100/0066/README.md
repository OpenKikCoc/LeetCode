#  [66. 加一](https://leetcode-cn.com/problems/plus-one/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int n = digits.size();
        if(!n) return vector<int>{1};
        int carry = 1;
        for(int i = n-1; i >= 0; --i) {
            digits[i] += carry;
            if(digits[i] > 9) carry = 1, digits[i] -= 10;
            else {carry = 0; break;}
        }
        vector<int> res;
        if(carry) res.push_back(1);
        for(auto v : digits) res.push_back(v);
        return res;
    }
};
```



```python3

```

