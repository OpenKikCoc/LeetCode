#  [306. 累加数](https://leetcode.cn/problems/additive-number/)

## 题意



## 题解



用 `long long / long double`  似乎也可以过 但并非正解

```c++
class Solution {
public:
    // int -> string 防止溢出
    vector<string> ve;
    string add(string x, string y) {
        vector<int> A, B, C;
        for (int i = x.size() - 1; i >= 0; -- i ) A.push_back(x[i] - '0');
        for (int i = y.size() - 1; i >= 0; -- i ) B.push_back(y[i] - '0');
        for (int i = 0, t = 0; i < A.size() || i < B.size() || t; ++ i ) {
            if (i < A.size()) t += A[i];
            if (i < B.size()) t += B[i];
            C.push_back(t % 10);
            t /= 10;
        }
        string z;
        for (int i = C.size() - 1; i >= 0; --i) z.push_back('0' + C[i]);
        return z;
    }
    bool dfs(string & num, int p) {
        if (p == num.size() && ve.size() >= 3) return true;
        int sz = ve.size();
        string tar = sz < 2 ? "" : add(ve[sz - 1], ve[sz - 2]); 
        string v = "";

        for (int i = p; i < num.size(); ++ i ) {
            // 可以为 0 但不能是前导 0  
            if (v.size() && v[0] == '0') return false;
            v.push_back(num[i]);
            // 当前已经较大 直街return （属于优化 不加也可以过）
            // if (tar != "" && bigger(v, tar) return false;
            if (tar == "" || v == tar) {
                ve.push_back(v);
                if (dfs(num, i + 1)) return true;
                ve.pop_back();
            }
        }
        return false;
    }
    bool isAdditiveNumber(string num) {
        // 有个数小于 3 的输入
        if (num.size() < 3) return false;
        return dfs(num, 0);
    }
};
```

另一种思路（更好的写法）：

>   只要固定前两个数，后面的序列（若合法）就都是固定的

```c++
    string add() {
        ...
    }

    bool isAdditiveNumber(string num) {
        for (int i = 0; i < num.size(); i ++ )
            for (int j = i + 1; j + 1 < num.size(); j ++ ) {
                int a = -1, b = i, c = j;
                while (true) {
                    if (b - a > 1 && num[a + 1] == '0' || c - b > 1 && num[b + 1] == '0') break;  // 有前导0
                    auto x = num.substr(a + 1, b - a), y = num.substr(b + 1, c - b);
                    auto z = add(x, y);
                    if (num.substr(c + 1, z.size()) != z) break;  // 下一个数不匹配
                    a = b, b = c, c += z.size();
                    if (c + 1 == num.size()) return true;
                }
            }

        return false;
    }
```



```python
#需要自己处理一个很大的数：用高精度来存这个数。
#就是用一个数组来表示/存这个数
#O(N)=N*N*N
class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        #高精度加法的模板！背下来！
        def add(x,y):
            A=[];B=[];C=[]
            for i in range(len(x)-1,-1,-1): A.append(int(x[i]))
            for i in range(len(y)-1,-1,-1): B.append(int(y[i]))
            t=0;i=0
            while i<len(A) or i<len(B) or t:
                if i<len(A): t+=A[i]
                if i<len(B): t+=B[i]
                C.append(t%10)
                t//=10
                i+=1

            z=""
            for i in range(len(C)-1,-1,-1):
                z+=str(C[i])
            return z

        n=len(num)
        for i in range(n):
            for j in range(i+1,n-1):
                a=-1;b=i;c=j
                while True:
                    #排除前导0
                    if (b-a>1 and num[a+1]=='0') or (c-b>1 and num[b+1]=='0'):
                        break
                    x=num[a+1:b+1];y=num[b+1:c+1]
                    z=add(x,y)
                    if num[c+1:c+1+len(z)]!=z:break
                    a=b;b=c;c+=len(z)
                    if c+1==len(num): return True
        return False     
```

