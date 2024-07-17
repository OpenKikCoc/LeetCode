#  [68. 文本左右对齐](https://leetcode.cn/problems/text-justification/)

## 题意



## 题解

(模拟) O(n)

一行一行处理，每次先求出这一行最多可以放多少个单词，然后分三种情况处理：

如果是最后一行，则只实现左对齐：每个单词之间插入一个空格，行尾插入若干空格，使这一行的总长度是 maxWidth；
如果这一行只有一个单词，则直接在行尾补上空格；
其他情况，则需计算总共要填补多少空格，然后按题意均分在单词之间；
时间复杂度分析：每个单词只会遍历一遍，所以总时间复杂度是 O(n)

```c++
class Solution {
public:
    string space(int x) {
        string res;
        while (x -- ) res += ' ';
        return res;
    }

    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> res;
        for (int i = 0; i < words.size();) {
            int j = i + 1, s = words[i].size(), rs = words[i].size();
            while (j < words.size() && s + 1 + words[j].size() <= maxWidth) {
                s += 1 + words[j].size();
                rs += words[j].size();
                j ++ ;
            }
            rs = maxWidth - rs;
            string line = words[i];
            if (j == words.size()) {
                for (i ++; i < j; i ++ )
                    line += ' ' + words[i];
                while (line.size() < maxWidth) line += ' ';
            } else if (j - i == 1) line += space(rs);
            else {
                int base = rs / (j - i - 1);
                int rem = rs % (j - i - 1);
                i ++ ;
                for (int k = 0; i < j; i ++, k ++ )
                    line += space(base + (k < rem)) + words[i];
            }
            i = j;
            res.push_back(line);
        }
        return res;
    }
};
```



```python3

```

