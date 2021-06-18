#  [151. 翻转字符串里的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

## 题意



## 题解



```c++
class Solution {
public:
    string reverseWords(string s) {
        stringstream ss(s);
        string str, res;
        stack<string> st;
        while(ss >> str)
            st.push(str);
        while(!st.empty()) {
            res += st.top() + " ";
            st.pop();
        }
        if(res.size()) res.pop_back();
        return res;
    }
};
```



```python
# 1. 去除左右两边的空格
# 2. 倒叙遍历s， 记录单词的左右边界索引i, j . 每确定一个单词的边界，则将其添加至单词列表 res中（记得这里要去除掉单词中间多余的空格）
# 3. 最终，将单词列表拼接为字符串，并返回即可。
class Solution:
    def reverseWords(self, s: str) -> str:
        s = s.strip()
        n = len(s)
        res = ''
        i, j = n - 1, n
        while i > 0:
            if s[i] == ' ':
                res += s[i+1:j] + ' '
                while s[i] == ' ':
                    i -= 1
                j = i + 1
            i -= 1
        return res + s[:j]
      
      
class Solution:
    def reverseWords(self, s: str) -> str:
        s = s.strip() # 删除首尾空格
        i = j = len(s) - 1
        res = []
        while i >= 0:
            while i >= 0 and s[i] != ' ': i -= 1 # 搜索首个空格
            res.append(s[i + 1: j + 1]) # 添加单词
            while s[i] == ' ': i -= 1 # 跳过单词间空格
            j = i # j 指向下个单词的尾字符
        return ' '.join(res) # 拼接并返回

      
# 法2: 1） 先翻转整个数组 2）再翻转单个单词 3）清除多余空格      
```

