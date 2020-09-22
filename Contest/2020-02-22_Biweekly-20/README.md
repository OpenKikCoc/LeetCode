## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-20/)


### [1356. 根据数字二进制下 1 的数目排序](https://leetcode-cn.com/problems/sort-integers-by-the-number-of-1-bits/) [TAG]

使用lambda表达式的时候 报了个编译错误

> error: ‘this’ cannot be implicitly captured in this context

原因在于: 在lambda表达式中使用了某个成员变量/方法，但是没有捕获this

把代码

> [](){}

加上this就可以了

> [this] () {}			OR 		[&] () {}

```c++
class Solution {
public:
    int getOne(int x) {
        int cnt = 0;
        while(x) {x = x&(x-1);++cnt;}
        return cnt;
    }
    vector<int> sortByBits(vector<int>& arr) {
        sort(arr.begin(), arr.end(), [this](const int& a,const int& b)->bool{
            int cnta = getOne(a);
            int cntb = getOne(b);
            return cnta == cntb ? a < b : cnta < cntb;
        });
        return arr;
    }
};
```

榜代码

```c++
class Solution {
public:
    vector<int> sortByBits(vector<int>& arr) {
        sort(arr.begin(), arr.end(), [](int l, int r) {
            int ln = __builtin_popcount(l);
            int rn = __builtin_popcount(r);
            return ln == rn ? l < r : ln < rn;
        });
       	return arr;
    }
};
```


### [1357. 每隔 n 个顾客打折](https://leetcode-cn.com/problems/apply-discount-every-n-orders/)

模拟即可

```c++
class Cashier {
public:
    int n, dis;
    unordered_map<int, int> m;
    int num;
  	// 关于Cashier有更好的初始化方式：
    Cashier(int n, int discount, vector<int>& products, vector<int>& prices):n(n), dis(discount), num(0) {
        int sz = products.size();
        for(int i = 0; i < sz; ++i) m[products[i]] = prices[i];
    }
    
    double getBill(vector<int> product, vector<int> amount) {
        int tot = 0, sz = product.size();
        for(int i = 0; i < sz; ++i) {
            tot += m[product[i]]*amount[i];
        }
        ++num;
        if(num%n == 0) {
            return (100.0 - dis) * double(tot) / 100.0; 
        }else return tot;
    }
};
```



### [1358. 包含所有三种字符的子字符串数目](https://leetcode-cn.com/problems/number-of-substrings-containing-all-three-characters/) 

一个字符串 `s` ，它只包含三种字符 a, b 和 c 。返回 a，b 和 c 都 **至少** 出现过一次的子字符串数目。

前缀预处理好处在于快速统计区间内abc的个数

滑动窗口：

```c++
class Solution {
    int cnt[3];
public:
    int numberOfSubstrings(string s) {
        int n=s.size(), res=0;
        cnt[0] = cnt[1] = cnt[2] = 0;
        for (int l=0,r=-1; l<len;){
            while (r<n && !(cnt[0]>=1 && cnt[1]>=1 && cnt[2]>=1)){
                if (++r == n) break;
                cnt[s[r]-'a']++;
            }
            res += n-r;
            cnt[s[l++]-'a']--;
        }
        return ans;
    }
};
```

### [1359. 有效的快递序列数目](https://leetcode-cn.com/problems/count-all-valid-pickup-and-delivery-options/) [TAG]

位置插入

递推

```c++
class Solution {
public:
    const int MOD = 1e9+7;
    int countOrders(int N) {
        long long P = 1;
        for (int n = 2; n <= N; n++) {
            long long a = 2 * (n - 1) + 1;
            long long b = a * (a - 1) / 2 + a;
            P = (b * P) % MOD;
        }
        return P;
    }
};
```
