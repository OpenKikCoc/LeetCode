#   [744. 寻找比目标字母大的最小字母](https://leetcode.cn/problems/find-smallest-letter-greater-than-target/)

## 题意



## 题解



```c++
class Solution {
public:
    char nextGreatestLetter(vector<char>& letters, char target) {
        for (auto c : letters)
            if (c > target)
                return c;
        return letters[0];
    }
};
```

也可以二分

```c++
class Solution {
public:
    char nextGreatestLetter(vector<char>& letters, char target) {
        int l = 0, r = letters.size() - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if (letters[mid] > target) r = mid;
            else l = mid + 1;
        }
        if (letters[r] > target) return letters[r];
        return letters[0];
    }
};
```



```python3

```

