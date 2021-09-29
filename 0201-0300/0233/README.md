#  [233. 数字 1 的个数](https://leetcode-cn.com/problems/number-of-digit-one/)

## 题意



## 题解


```c++
class Solution {
public:
    int countDigitOne(int n) {
        if (n <= 0) return 0;
        vector<int> nums;
        while (n) nums.push_back(n % 10), n /= 10;
        reverse(nums.begin(), nums.end());
        int res = 0;
        for (int i = 0; i < nums.size(); i ++ ) {
            int d = nums[i];
            int left = 0, right = 0, p = 1;
            for (int j = 0; j < i; j ++ ) left = left * 10 + nums[j];
            for (int j = i + 1; j < nums.size(); j ++ ) {
                right = right * 10 + nums[j];
                p = p * 10;
            }
            if (d == 0) res += left * p;
            else if (d == 1) res += left * p + right + 1;
            else res += (left + 1) * p;
        }
        return res;
    }
};
```


```c++
class Solution {
public:
    int countDigitOne(int n) {
        int res = 0;
        long long base = 1;
        while (base <= n) {
            int t = (n / base ) %10;
            if (t == 0) res += n / (base * 10) * base; // front
            else if (t == 1) res += n / (base * 10) * base + n % base + 1;
            else res += (n / (base * 10) + 1) * base;
            base *= 10;
        }
        return res;
    }
};
```

数位dp

```c++
class Solution {
public:
    int countDigitOne(int n) {
        if (n <= 0)
            return 0;

        vector<int> f(10, 0), pow(10, 0);
        f[0] = 0;
        pow[0] = 1;
        for (int i = 1; i <= 9; i ++ ) {
            f[i] = f[i - 1] * 10 + pow[i - 1];
            pow[i] = pow[i - 1] * 10;
        }

        string num = to_string(n);
        reverse(num.begin(), num.end());
        int ans = 0, ones = 0;

        for (int i = num.length() - 1; i >= 0; i -- ) {
            ans += ones * ((num[i] - '0') * pow[i]);
            if (num[i] == '1') {
                ones ++ ;
                ans += f[i];
            }
            else if (num[i] != '0')
                ans += pow[i] + f[i] * (num[i] - '0');
        }

        return ans + ones;
    }
};

class Solution {
public:
    int countDigitOne(int n) {
        if (n <= 0) return 0;
        vector<int> nums;
        while (n) nums.push_back(n % 10), n /= 10;
        reverse(nums.begin(), nums.end());
        int res = 0;
        for (int i = 0; i < nums.size(); i ++ ) {
            int d = nums[i];
            int left = 0, right = 0, p = 1;
            for (int j = 0; j < i; j ++ ) left = left * 10 + nums[j];
            for (int j = i + 1; j < nums.size(); j ++ ) {
                right = right * 10 + nums[j];
                p = p * 10;
            }
            if (d == 0) res += left * p;
            else if (d == 1) res += left * p + right + 1;
            else res += (left + 1) * p;
        }
        return res;
    }
};
```





```python3

```





## 拓展 n以内所有数字 每个数字在各个数位出现多少次

## 拓展 从 a 到 b 的所有数字 每个数字在各个数位出现多少次

[LibreOJ #10169. 「一本通 5.3 练习 4」数字计数](https://loj.ac/p/10169)

[Luogu P2602 [ZJOI2010]数字计数](https://www.luogu.com.cn/problem/P2602)

[AcWing 338 计数问题](https://www.acwing.com/problem/content/340/)

```c++
// yxc
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;
const int N = 10;

/*
100~abc-1, 999
abc
    1. num[i] < x, 0
    2. num[i] == x, 0~efg
    3. num[i] > x, 0~999
*/

int get(vector<int> num, int l, int r) {
    int res = 0;
    for (int i = l; i >= r; i -- ) res = res * 10 + num[i];
    return res;
}

int power10(int x) {
    int res = 1;
    while (x -- ) res *= 10;
    return res;
}

int count(int n, int x) {
    if (!n) return 0;

    vector<int> num;
    while (n) {
        num.push_back(n % 10);
        n /= 10;
    }
    n = num.size();

    int res = 0;
    for (int i = n - 1 - !x; i >= 0; i -- ) {
        if (i < n - 1) {
            res += get(num, n - 1, i + 1) * power10(i);
            if (!x) res -= power10(i);
        }

        if (num[i] == x) res += get(num, i - 1, 0) + 1;
        else if (num[i] > x) res += power10(i);
    }

    return res;
}

int force_count(int n, int x) {
    int res = 0;
    for (int i = 1; i <= n; i ++ )
        for (int j = i; j; j /= 10)
            if (j % 10 == x)
                res ++ ;
    return res;
}

int main() {
    int a, b;
    while (cin >> a >> b , a) {
        if (a > b) swap(a, b);

        for (int i = 0; i <= 9; i ++ )
            cout << count(b, i) - count(a - 1, i) << ' ';
        cout << endl;
    }

    return 0;
}
```

```c++
// 对yxc原版进行修改更好理解(?)
#include <bits/stdc++.h>
using namespace std;

const int N = 10;

int p[N];

void init() {
    p[0] = 1;
    for (int i = 1; i < N; ++ i )
        p[i] = p[i - 1] * 10;
}

int f(int n, int v) {
    if (!n)
        return 0;
    
    vector<int> num;
    {
        int t = n;
        while (t)
            num.push_back(t % 10), t /= 10;
    }
    int d = num.size();
    
    int res = 0;
    // v == 0 则直接从第二位开始枚举 因为第一位必然不能为0
    for (int i = d - 1 - !v; i >= 0; -- i ) {
        int x = num[i];
        int l = n / p[i] / 10, r = n % p[i];
        // 前缀
        // if (i < d - 1) {
            res += l * p[i];
            if (!v)
                res -= p[i];    // (l - 1) * p[i];
        // }
        
        if (x == v)
            res += r + 1;
        else if (x > v)
            res += p[i];
    }
    return res;
}

int main() {
    init();
    
    int a, b;
    while (cin >> a >> b, a) {
        if (a > b)
            swap(a, b);
        
        for (int i = 0; i < N; ++ i )
            cout << f(b, i) - f(a - 1, i) << ' ';
        cout << endl;
    }
    return 0;
}
```

```c++
#include <bits/stdc++.h>
using namespace std;

int count(int n, int x) {
    vector<int> nums;
    while (n)
        nums.push_back(n % 10), n /= 10;
    n = nums.size();

    int res = 0;
    for (int i = n - 1 - !x; i >= 0; -- i ) {
        int l = 0, r = 0, t = 1;
        for (int j = n - 1; j > i; -- j )
            l = l * 10 + nums[j];
        for (int j = i - 1; j >= 0; -- j )
            r = r * 10 + nums[j], t *= 10;
        
        res += l * t;
        if (l && !x)
            res -= t;
        if (nums[i] == x)
            res += r + 1;
        else if (nums[i] > x)
            res += t;
    }
    return res;
}

int main() {
    int a, b;
    while (cin >> a >> b, a && b) {
        if (a > b)
            swap(a, b);
        
        for (int i = 0; i < 10; ++ i )
            cout << count(b, i) - count(a - 1, i) << ' ';
        cout << endl;
    }
    return 0;
}
```


```python
class Solution:
    def countDigitOne(self, n: int) -> int:
        nums = []
        while n:
            nums.append(n % 10)
            n //= 10 
        n = len(nums)
        res = 0

        for i in range(n - 1, -1, -1):
            l, r, t = 0, 0, 1
            for j in range(n - 1, i, -1):
                l = l * 10 + nums[j]
            for j in range(i - 1, -1, -1):
                r = r * 10 + nums[j]
                t *= 10 

        
            res += l * t
            if nums[i] ==  1:
                res += (r + 1)
            elif nums[i] > 1:
                res += t
        return res


```

