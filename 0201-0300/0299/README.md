#  [299. 猜数字游戏](https://leetcode.cn/problems/bulls-and-cows/)

## 题意



## 题解



```c++
class Solution {
public:
    string getHint(string secret, string guess) {
        int n = secret.size();
        int a = 0, b = 0;
        for (int i = 0; i < n; ++ i )
            if (secret[i] == guess[i])
                a ++ , secret[i] = guess[i] = '.';

        vector<int> cnt(10);
        for (int i = 0; i < n; ++ i )
            if (isdigit(secret[i]))
                cnt[secret[i] - '0'] ++ ;
        for (int i = 0; i < n; ++ i )
            if (isdigit(guess[i]) && cnt[guess[i] - '0'])
                b ++ , cnt[guess[i] - '0'] -- ;
        return to_string(a) + "A" + to_string(b) + "B";
    }
};


// yxc
class Solution {
public:
    string getHint(string secret, string guess) {
        unordered_map<char, int> hash;
        for (auto c: secret) hash[c] ++ ;
        int tot = 0;
        for (auto c: guess)
            if (hash[c]) {
                tot ++ ;
                hash[c] -- ;
            }

        int bulls = 0;
        for (int i = 0; i < secret.size(); i ++ )
            if (secret[i] == guess[i])
                bulls ++ ;

        return to_string(bulls) + "A" + to_string(tot - bulls) + "B";
    }
};
```



```python3

```

