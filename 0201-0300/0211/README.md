#  [211. 添加与搜索单词 - 数据结构设计](https://leetcode.cn/problems/design-add-and-search-words-data-structure/)

## 题意



## 题解



```c++
class WordDictionary {
public:
    struct Node {
        bool is_end;
        Node *son[26];
        Node() {
            is_end = false;
            for (int i = 0; i < 26; i ++ ) son[i] = nullptr;
        }
    }*root;

    /** Initialize your data structure here. */
    WordDictionary() {
        root = new Node();
    }
    
    /** Adds a word into the data structure. */
    void addWord(string word) {
        auto p = root;
        for (auto c : word) {
            int u = c - 'a';
            if (!p->son[u]) p->son[u] = new Node();
            p = p->son[u];
        }
        p->is_end = true;
    }
    
    /** Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. */
    bool search(string word) {
        return dfs(root, word, 0);
    }

    bool dfs(Node * p, string & word, int i) {
        if (i == word.size()) return p->is_end;
        if (word[i] != '.') {
            int u = word[i] - 'a';
            if (!p->son[u]) return false;
            return dfs(p->son[u], word, i + 1);
        }
        for (int j = 0; j < 26; j ++ )
            if (p->son[j] && dfs(p->son[j], word, i + 1)) return true;
        return false;
    }
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary* obj = new WordDictionary();
 * obj->addWord(word);
 * bool param_2 = obj->search(word);
 */
```



```python
#用字典
class WordDictionary:
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.lookup={}


    def addWord(self, word: str) -> None:
        """
        Adds a word into the data structure.
        """
        tree=self.lookup
        for a in word:
            if a not in tree:
                tree[a]={}
            tree=tree[a]
        tree['#']='#'
        #tree['#']=1
        

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
        """
        tree=self.lookup
        
        def dfs(tree,u):
            if u==len(word):
                return "#" in tree
            if word[u]!='.':
                if word[u] not in tree:
                    return False
                tree=tree[word[u]]
                return dfs(tree,u+1)
            else:
                for c in range(ord('a'),ord('z')+1):
                    c=chr(c)
                    if c in tree:
                        n_tree=tree[c]
                        if dfs(n_tree,u+1):
                            return True
                return False
            return Fasle

        return dfs(tree,0)
      
#用结构体/类
class Node:
    def __init__(self):
        self.is_end=False
        self.son=[None for _ in range(26)]

class WordDictionary:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.root=Node()
        

    def addWord(self, word: str) -> None:
        """
        Adds a word into the data structure.
        """
        p=self.root
        for c in word:
            if not p.son[ord(c)-ord('a')]:
                p.son[ord(c)-ord('a')]=Node()
            p=p.son[ord(c)-ord('a')]
        p.is_end=True

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
        """
        def dfs(i,p):
            if i==len(word):
                return p.is_end
            if word[i]=='.':
                for j in range(26):
                    if p.son[j]:
                        if dfs(i+1,p.son[j]):
                            return True
            else:
                j=ord(word[i])-ord('a')
                if p.son[j]:
                    if dfs(i+1,p.son[j]):
                        return True
            return False
        return dfs(0,self.root)

# Your WordDictionary object will be instantiated and called as such:
# obj = WordDictionary()
# obj.addWord(word)
# param_2 = obj.search(word)
```

