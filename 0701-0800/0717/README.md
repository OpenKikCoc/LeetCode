#  [717. 1比特与2比特字符](https://leetcode.cn/problems/1-bit-and-2-bit-characters/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isOneBitCharacter(vector<int>& bits) {
        for (int i = 0; i < bits.size(); i ++ ) {
            if (i == bits.size() - 1 && !bits[i]) return true;
            if (bits[i]) i ++ ;
        }
        return false;
    }
};
```



```python3

```

