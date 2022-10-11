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
class TrieNode:
    def __init__(self):
        self.child = defaultdict(TrieNode)
        self.word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
        
    def insert(self, w: str) -> None:
        cur = self.root
        for c in w:
            cur = cur.child[c]
        cur.word = True

    def search(self, w: str) -> bool:
        cur = self.root
        for c in w:
            if c not in cur.child:
                return False
            cur = cur.child[c]
        if cur.word:
            return True 
        return False

    def startsWith(self, pre: str) -> bool:
        cur = self.root
        for c in pre:
            if c not in cur.child:
                return False
            cur = cur.child[c]
        return True

# Your Trie object will be instantiated and called as such:
# obj = Trie()
# obj.insert(word)
# param_2 = obj.search(word)
# param_3 = obj.startsWith(prefix)


class Node:
    def __init__(self):
        self.word = False
        self.child = [None for _ in range(26)]

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

