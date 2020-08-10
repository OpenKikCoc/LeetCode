## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-32/)

### [1539. 第 k 个缺失的正整数](https://leetcode-cn.com/problems/kth-missing-positive-number/)

赛榜做法大多是申请数组并在访问数组过程中标记。

下面这样双指针做需要注意： `v 代表的是即将要比对的数字 所以返回值要 -1`

```c++
    int findKthPositive(vector<int>& arr, int k) {
        int n = arr.size();
        int p = 0, v = 1;
        while(p < n && k) {
            if(v == arr[p]) {
                ++v; ++p;
            } else if(v < arr[p]) {
                --k; ++v;
            } else ++p;
        }
        while(k--) ++v;
        return v-1;
    }
```

### [1540. K 次操作转变字符串](https://leetcode-cn.com/problems/can-convert-string-in-k-moves/)

题意：第 i 次操作会将某一个字母向后转换 i 次。

每次只操作一个数字，每个数字只被操作一次。

需要注意的是：**某个字母可以通过 x+26 次操作达到 x 次操作的等效结果**。

用 `last 数组记录该差值上次用到了多少` 即可。

```c++
    bool canConvertString(string s, string t, int k) {
        int n1 = s.size(), n2 = t.size();
        if(n1 != n2) return false;
        vector<int> last(26);
        for(int i = 0; i < 26; ++i) last[i] = i;
        for(int i = 0; i < n1; ++i) {
            int v = t[i] - s[i];
            if(!v) continue;
            if(v < 0) v += 26;
            if(last[v] > k) return false;
            last[v] += 26;
        }
        return true;
    }
```

### [1541. 平衡括号字符串的最少插入次数](https://leetcode-cn.com/problems/minimum-insertions-to-balance-a-parentheses-string/) [TAG]

某个 `(` 需在连续两个的 `))` 左侧 才可以形成平衡。

模拟一遍即可，注意模拟规则。

```c++
    int minInsertions(string s) {
        int n = s.size(), l = 0, res = 0;
        for(int i = 0; i < n; ++i) {
            if(s[i] == '(') ++l;
            else {
                if(i+1<n && s[i+1] == ')') ++i; // 匹配
                else ++res;                     // 缺少一个 加一个来匹配
                if(l > 0) --l;                  // 匹配
                else ++res;                     // 缺少 (
            }
        }
        res += 2*l;
        return res;
    }
```

有用栈模拟的代码：

> 在检查字符的时候分两种情况：
>
> 1.字符是 '('
> 这个时候只需要把它的位置压进栈里就行
>
> 2.字符是 ')'
> 这个时候，检查它后面的那个字符是不是')'，如果不是')'，说明需要插入一个')'。然后再检查栈是不是空的，如果非空则匹配pop掉；如果栈是空的，说明没有与之匹配的'('，所以需要插入一个'('。直到检查结束，统计到的需要插入的数目。
>
> 字符串遍历完毕
> 当字符串遍历完毕的时候，如果这时候栈不空，那么就把栈里的左括号数目乘以2加到结果上，因为每个左括号需要插入两个右括号去匹配。
>
> 栈的代替
> 由于栈里面只有'('，因此我们可以用一个整形数据代替栈里面左括号的数目，这样可以节省时间。

思路与之前的仍然是一致的，用数值 `l` 代替了栈



### [1542. 找出最长的超赞子字符串](https://leetcode-cn.com/problems/find-longest-awesome-substring/)

定义超赞子字符串：可以通过重排使其回文，也即**出现奇数次的字母个数小于等于1**。

显然状态压缩 记录截止目前位置每个数字的奇偶状态。

100ms:

```c++
    int longestAwesome(string s) {
        int n = s.size(), res = 0;
        // 记录某状态第一次出现的位置 对于1～n 默认-1
        vector<int> m(1024, -1);
        m[0] = 0;
        int st = 0, l;
        
        for(int i = 1; i <= n; ++i) {
            st = st ^ (1 << (s[i-1]-'0'));
            l = m[st];
            // 和出现过的状态相同的情况
            if(l != -1) res = max(res, i-l);
            // 检查只相差 1 位的情况 只差一位得到的状态需是全0或只有一个1
            for(int j = 0; j < 10; ++j) {
                int v = st^(1<<j);
                if(m[v] == -1) continue;
                res = max(res, i-m[v]);
            }
            if(l == -1) m[st] = i;
        }
        return res;
    }
```

用 map 的话使用 `.count` 来计数而非使用 0 表示其是否存在

800ms:

```c++
    unordered_map<int, int> m;
    int longestAwesome(string s) {
        int n = s.size(), res = 0;
        int st = 0;
        m[0] = 0;
        
        for(int i = 1; i <= n; ++i) {
            st = st ^ (1 << (s[i-1]-'0'));
            // 和出现过的状态相同的情况
            if(m.count(st)) res = max(res, i-m[st]);
            //else m[st] = i;
            // 检查只相差 1 位的情况 只差一位得到的状态需是全0或只有一个1
            for(int j = 0; j < 10; ++j) {
                int v = st^(1<<j);
                if(!m.count(v)) continue;
                res = max(res, i-m[v]);
            }
            if(!m.count(st)) m[st] = i;
        }
        return res;
    }
```

