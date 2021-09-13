#  [49. 字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string,vector<string>> ma;
        vector<vector<string>> res;
        for (auto str : strs){
            string tmp = str;
            sort(tmp.begin(),tmp.end());
            ma[tmp].push_back(str);
        }
        for (const auto & m:ma)
            res.push_back(m.second);
        return res;
    }
};
```



```python
# python
"""
这道题其实是在求：给定一组字符串，将所有字母顺序颠倒的字符串归为一组。
1. 定义从string 映射到 list 的哈希表：deafultdict(list) --- {key:[val1, val2,val3...]}
2. 将每个字符串的所有字符从小到大排序，将排好序的字符串作为key，然后将原字符串插入key对应的list中
3. 最后返回dict 的 values即可
"""



class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        my_dict = collections.defaultdict(list)
        for s in strs:
            a = "".join(sorted(s))
            my_dict[a].append(s)
            # 踩坑：不能这么写，因为a这样处理后是list类型，list，set, dict类型不能作为字典的key【list没有克__hash__方法】list定义：__hash__ == None
            a = sorted(s)
            print(type(a), a)
            my_dict[a].append(s)
        
        return [v for v in my_dict.values()]
        # 这样更麻烦一点
        # res = []
        # for k,v in my_dict.items():
        #     res.append(v)
        # return res
```

