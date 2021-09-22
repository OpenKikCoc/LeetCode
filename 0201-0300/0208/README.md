#  [208. 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

## 题意



## 题解



```c++
class Trie {
public:
    struct Node {
        bool is_end;
        Node *son[26];
        Node() {
            is_end = false;
            for (int i = 0; i < 26; i ++ )
                son[i] = NULL;
        }
    }*root;

    /** Initialize your data structure here. */
    Trie() {
        root = new Node();
    }

    /** Inserts a word into the trie. */
    void insert(string word) {
        auto p = root;
        for (auto c: word) {
            int u = c - 'a';
            if (!p->son[u]) p->son[u] = new Node();
            p = p->son[u];
        }
        p->is_end = true;
    }

    /** Returns if the word is in the trie. */
    bool search(string word) {
        auto p = root;
        for (auto c: word) {
            int u = c - 'a';
            if (!p->son[u]) return false;
            p = p->son[u];
        }
        return p->is_end;
    }

    /** Returns if there is any word in the trie that starts with the given prefix. */
    bool startsWith(string word) {
        auto p = root;
        for (auto c: word) {
            int u = c - 'a';
            if (!p->son[u]) return false;
            p = p->son[u];
        }
        return true;
    }
};

/**
 * Your Trie object will be instantiated and called as such:
 * Trie* obj = new Trie();
 * obj->insert(word);
 * bool param_2 = obj->search(word);
 * bool param_3 = obj->startsWith(prefix);
 */
```



```python
"""
	1. Trie树，又名字典树or前缀树，是一种有序树。用于保存关联数组，其中的键通常是字符串
	2. 一个节点的所有子孙都有相同的前缀，也就是这个节点对应的字符串，而根节点对应空字符串
	3. 优点：可以快速高效实现插入和查找字符串集合的操作：可以最大限度地减少无谓的字符串的比较（经常被搜索引擎系统用于文本词频统计）
	4. 缺点：trie是用空间换时间
	5. 一般算法题这类题的字符类型都比较单一，比如全部都是小写/大写字母 或者全部都是数字等		
	
	trie树有一个二位数组 son[N ][26] , 表示当前结点的儿子；如果没有的话，就idx++。trie树本质上是一颗多叉树，对于一个字母而言最多有26个子结点；所以这个二位数组包含了两条信息。比如：son[1][0]=2，表示1结点的一个值为a的子结点为结点2；如果son[1][0]=0, 则意味着没有值为a子结点。
"""

class Trie:
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.root = {}
    def insert(self, word: str) -> None:
        """
        Inserts a word into the trie.
        """
        node = self.root
        for s in word:
            if s in node.keys():
                node = node[s]
            else:
                node[s] = {}
                node = node[s]
        node['is_word'] = True

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the trie.
        """
        node = self.root
        for s in word:
            if s in node.keys():
                node = node[s]
            else:
                return False

        if 'is_word' in node.keys():
            return True
        else:
            return False
    def startsWith(self, prefix: str) -> bool:
        """
        Returns if there is any word in the trie that starts with the given prefix.
        """
        node = self.root
        for s in prefix:
            if s in node.keys():
                node = node[s]
            else:
                return False

        return True


# Your Trie object will be instantiated and called as such:
# obj = Trie()
# obj.insert(word)
# param_2 = obj.search(word)
# param_3 = obj.startsWith(prefix)


class Node:
    def __init__(self):
        self.is_end = False
        self.ne = [None for _ in range(26)]

class Trie:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.root = Node()

    def insert(self, word: str) -> None:
        """
        Inserts a word into the trie.
        """
        cur = self.root
        for o in word:
            if not cur.ne[ord(o) - ord("a")]:
                cur.ne[ord(o) - ord("a")] = Node()
            cur = cur.ne[ord(o) - ord("a")]
        cur.is_end = True

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the trie.
        """
        cur = self.root
        for o in word:
            if not cur.ne[ord(o) - ord("a")]:
                return False
            cur = cur.ne[ord(o) - ord("a")]
        return cur.is_end

    def startsWith(self, prefix: str) -> bool:
        """
        Returns if there is any word in the trie that starts with the given prefix.
        """
        cur = self.root
        for o in prefix:
            if not cur.ne[ord(o) - ord("a")]:
                return False
            cur = cur.ne[ord(o) - ord("a")]
        return True

```

