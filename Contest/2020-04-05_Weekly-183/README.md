## [比赛链接](https://leetcode.cn/contest/weekly-contest-183/)


### [1403. 非递增顺序的最小子序列](https://leetcode.cn/problems/minimum-subsequence-in-non-increasing-order/)

子序列和大于剩下的和 获取长度最小且元素和最大的方案 保证唯一

```c++
class Solution {
public:
    vector<int> minSubsequence(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        int sum = 0;
        for(auto v : nums) sum += v;
        vector<int> res;
        int tot = 0;
        for(int i = n-1; n >= 0; --i) {
            res.push_back(nums[i]);
            tot += nums[i];
            if(tot > sum - tot) break;
        }
        return res;
    }
};
```


### [1404. 将二进制表示减到 1 的步骤数](https://leetcode.cn/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one/)

二进制形式表示的数字 s  返回按下述规则将其减少到 1 所需要的步骤数：

> 如果当前数字为偶数，则将其除以 2 。    如果当前数字为奇数，则将其加上 1 。

```c++
class Solution {
public:
    string add(string s) {
        int len = s.size();
        int flag = 1;
        for(int i = len-1; i >= 0; --i) {
            s[i] = s[i] + flag;
            if(s[i] == '2') {
                flag = 1;
                s[i] = '0';
            } else flag = 0;
        }
        if(flag) return "1" + s;
        return s;
    }
    int numSteps(string s) {
        if(s.size() == 1 && s[0] == '1') return 0;
        int res = 0;
        string ns;
        for(;;) {
            if(s[s.size()-1] == '0') {
                ns = s.substr(0, s.size()-1);
            } else ns = add(s);
            ++res;
            //cout <<"res="<<res<<" ns="<<ns<<endl;
            if(ns.size() == 1 && ns[0] == '1') break;
            s = ns;
        }
        return res;
    }
};
```

上面是模拟做法 有更有的计数方法：

> 只有在一开始的时候，我们才需要考虑字符串最低位为0的情况，我们通过若干次操作删去低位的所有0；
>
> 在任意时刻，字符串的最低位均为1。如果有k个1那么我们需要k+1 次操作（1次加一操作和k次除二操作）将所有的1变为0并删除。并且在这 k+1 次操作后，原本最靠近右侧的那个0变为了1。这也解释了为什么我们不需要考虑最低位为0的情况了。

```c++
class Solution {
public:
    int numSteps(string s) {
        int n = s.size();
        int ans = 0;
        // meet1 记录我们有没有遇见过字符 1
        bool meet1 = false;
        // 从后向前遍历字符
        for (int i = n - 1; i >= 0; --i) {
            if (s[i] == '0') {
                // 如果当前字符为 0，分为两种情况
                // (1) 还没有遇见过字符 1，那么这个 0 是字符串低位的 0，需要一次除二操作
                // (2) 遇见过字符 1，那么这个 0 会因为它右侧的某次加一操作变为 1，因此它需要一次加一和一次除二操作
                ans += (meet1 ? 2 : 1);
            } else {
                // 如果当前字符为 1，分为两种情况
                // (1) 还没有遇见过字符 1，那么这个 1 需要一次加一和一次除二操作
                //     这里需要考虑一种特殊情况，就是这个 1 是字符串最左侧的 1，它并不需要任何操作
                // (2) 遇见过字符 1，那么这个 1 会因为它右侧的某次加一操作变为 0，因此它只需要一次除二操作
                if (!meet1) {
                    if (i != 0) {
                        ans += 2;
                    }
                    meet1 = true;
                }
                else {
                    ++ans;
                }
            }
        }
        return ans;
    }
};
```

另一种：

```c++
class Solution {
public:
    int numSteps(string s) {
        int index = s.length() - 1;
        int ans = 0;
        while(index>=0){
            if(s[index] == '0'){
                ++ans;
                --index;
            }else{
                if(index == 0) break;
              	// 计算连续进位
                while((index >= 0)&&(s[index] == '1')){
                    ++ans;
                    --index;
                }
                ++ans;
                if(index>=0){
                    s[index] = '1';
                }
                continue;
            }
        }
        return ans;
    }
};
```



### [1405. 最长快乐字符串](https://leetcode.cn/problems/longest-happy-string/)

生成任意一个尽可能长的快乐字符串(不包含3个连续相同字母) abc各自至多使用入参'a''b''c'次

贪心 选择每次和前面不重复的剩下最多的 依据剩下的数量选择放1/2个

```c++
class Solution {
public:
    string longestDiverseString(int a, int b, int c) {
        string s;
        int last = 0;
        while(a||b||c) {
            int maxv = 0, newlast = 0, mindif = INT_MAX;
            if(last != 1 && maxv < a) {
                maxv = a;
                newlast = 1;
            }
            if(last != 2 && maxv < b) {
                maxv = b;
                newlast = 2;
            }
            if(last != 3 && maxv < c) {
                maxv = c;
                newlast = 3;
            }
          	// 前面选出abc中剩下可选最多的
            if(newlast == 0) break;
            if(newlast == 1) {
                if(maxv > 1 && a >= b+2 && a >= c+2) {
                    s += "aa";
                    a -= 2;
                } else {
                    s += "a";
                    a -= 1;
                }
            } else if(newlast == 2) {
                if(maxv > 1 && b >= a+2 && b >= c+2) {
                    s += "bb";
                    b -= 2;
                } else {
                    s += "b";
                    b -= 1;
                }
            } else if(newlast == 3) {
                if(maxv > 1 && c >= a+2 && c >= b+2) {
                    s += "cc";
                    c -= 2;
                } else {
                    s += "c";
                    c -= 1;
                }
            }
            last = newlast;
            //cout <<s<<endl;
            //cout << a<<" " <<b<<" " <<c<<endl;
            //cout <<newlast<<endl;
        }
        return s;
    }
};
```

### [1406. 石子游戏 III](https://leetcode.cn/problems/stone-game-iii/)

一排石子每个人可以从左取1-3堆 求取完谁分数最大

```c++
class Solution {
public:
    string stoneGameIII(vector<int>& stoneValue) {
        int n = stoneValue.size();
        vector<int> dp(n+1);
        for(int i = n-1; i >= 0; --i) {
            dp[i] = INT_MIN;
            int sum = 0;
            for(int j = i; j < n && j < i+3; ++j) {
                sum += stoneValue[j];
                dp[i] = max(dp[i], sum-dp[j+1]);
            }
        }
        if(dp[0] > 0) return "Alice";
        else if(dp[0] < 0) return "Bob";
        else return "Tie";
    }
};
```
