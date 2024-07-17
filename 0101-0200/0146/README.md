#  [146. LRU缓存机制](https://leetcode.cn/problems/lru-cache/)

## 题意



## 题解

```c++
// 归一后的写法
class LRUCache {
public:
    struct Node {
        int k, v;
    };

    int cap;
    list<Node> cache;
    unordered_map<int, list<Node>::iterator> hash;

    LRUCache(int capacity) {
        this->cap = capacity;
    }
    
    Node remove(list<Node>::iterator it) {
        auto [k, v] = *it;
        cache.erase(it);
        hash.erase(k);
        return {k, v};
    }

    void insert(int k, int v) {
        cache.push_front({k, v});
        hash[k] = cache.begin();
    }

    int get(int key) {
        if (hash.find(key) == hash.end())
            return -1;
        auto it = hash[key];
        auto [k, v] = remove(it);
        insert(k, v);
        return v;
    }
    
    void put(int key, int value) {
        if (hash.find(key) == hash.end()) {
            if (hash.size() == cap) {
                auto _ = remove( -- cache.end());
            }
        } else
            auto _ = remove(hash[key]);
        insert(key, value);
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```



```c++
class LRUCache {
public:
    using PII = pair<int, int>;

    int cap;
    list<PII> cache;
    unordered_map<int, list<PII>::iterator> m;

    LRUCache(int capacity) {
        this->cap = capacity;
    }
    
    int get(int key) {
        if (m.find(key) == m.end())
            return -1;
        auto it = m[key];
        auto kv = *it;
        cache.erase(it);
        cache.push_front(kv);
        m[key] = cache.begin();
        return kv.second;
    }
    
    void put(int key, int value) {
        if (m.find(key) == m.end()) {
            if (cache.size() == cap) {
                auto del = cache.back().first;
                cache.pop_back();
                m.erase(del);
            }
        } else
            cache.erase(m[key]);
        cache.push_front({key, value});
        m[key] = cache.begin();
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```


```c++
// yxc
class LRUCache {
public:
    struct Node {
        int key, val;
        Node *left, *right;
        Node(int _key, int _val): key(_key), val(_val), left(NULL), right(NULL) {}
    }*L, *R;
    unordered_map<int, Node*> hash;
    int n;

    void remove(Node* p) {
        p->right->left = p->left;
        p->left->right = p->right;
    }

    void insert(Node* p) {
        p->right = L->right;
        p->left = L;
        L->right->left = p;
        L->right = p;
    }

    LRUCache(int capacity) {
        n = capacity;
        L = new Node(-1, -1), R = new Node(-1, -1);
        L->right = R, R->left = L;
    }

    int get(int key) {
        if (hash.count(key) == 0) return -1;
        auto p = hash[key];
        remove(p);
        insert(p);
        return p->val;
    }

    void put(int key, int value) {
        if (hash.count(key)) {
            auto p = hash[key];
            p->val = value;
            remove(p);
            insert(p);
        } else {
            if (hash.size() == n) {
                auto p = R->left;
                remove(p);
                hash.erase(p->key);
                delete p;
            }
            auto p = new Node(key, value);
            hash[key] = p;
            insert(p);
        }
    }
};
```

双链表

```c++
class LRUCache {
public:
    struct Node {
        int key, val;
        Node *left, *right;
        Node(int _key, int _val): key(_key), val(_val), left(NULL), right(NULL) {}
    }*L, *R;
    unordered_map<int, Node*> hash;
    int n;

    void remove(Node* p) {
        p->right->left = p->left;
        p->left->right = p->right;
    }

    void insert(Node* p) {
        p->right = L->right;
        p->left = L;
        L->right->left = p;
        L->right = p;
    }

    LRUCache(int capacity) {
        n = capacity;
        L = new Node(-1, -1), R = new Node(-1, -1);
        L->right = R, R->left = L;
    }

    int get(int key) {
        if (hash.count(key) == 0) return -1;
        auto p = hash[key];
        remove(p);
        insert(p);
        return p->val;
    }

    void put(int key, int value) {
        if (hash.count(key)) {
            auto p = hash[key];
            p->val = value;
            remove(p);
            insert(p);
        } else {
            if (hash.size() == n) {
                auto p = R->left;
                remove(p);
                hash.erase(p->key);
                delete p;
            }
            auto p = new Node(key, value);
            hash[key] = p;
            insert(p);
        }
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```





```python
# 这道题面试官就是希望我们实现一个简单的双向链表（删除和插入都是O(1))
# python有一种结合哈希表与双向链表的数据结构OrderedDict，第二种方法里将写一下。


# 法一：双向链表 + 哈希表 O(1)
# 1. k-v的增删改查显然需要一个哈希表来实现，这道题困难之处在于删除时，如果查找删除的元素
# 2. 借用一个双向链表来实现，初始时，链表有两个dummy节点，分别为 L 和 R；新插入一个元素，将其插入到 L 的后面，然后在哈希表中记录新元素的结点地址；
# 3. 遇到要删除的时候， 删除 R 前面的那个节点，同时释放哈希表的内存
# 4. 遇到 get 操作或者 put 操作时，通过哈希表找到节点的地址，然后将其取出，放到 L 的后main，然后修改哈希表。
# 总之，越新越近的元素放在链表头的位置；越老越久的元素放在链表尾的位置，remove出元素的时候，就删除链表尾的元素

class Node:  # 初始化双向链表的数据结构
    def __init__(self, key, val):
        self.key = key
        self.val = val 
        self.left = None    
        self.right = None 

class LRUCache:
    def __init__(self, capacity: int):  # 初始化需要用的哈希表，以及双链表的头尾节点
        self.my_dict = collections.defaultdict(int)  # 哈希表里存的是 node.key -- node!!!
        self.L = Node(-1, -1)
        self.R = Node(-1, -1)
        self.L.right = self.R   # 将头尾节点的左右指针初始化
        self.R.left = self.L 
        self.maxLen = capacity  # 最大容量值获取出来

    def get(self, key: int) -> int:
        if key in self.my_dict:  # 如果key已经在哈希表中了，那就从哈希表中先找到对应的节点
            p = self.my_dict[key]
            self.remove(p)  # 将其删除掉
            self.insert(p)  # 然后再插入到链表中（这个时候会插入到链表头部的位置，代表此刻最新：更新位置）
            return p.val  
        else:
            return -1  
        
    def put(self, key: int, value: int) -> None:  # 放入到缓存中
        if key in self.my_dict:    # 如果key已经在缓存中了，那就先把这个点在双向链表中删除（因为操作了，后续还要insert进来）
            self.remove(self.my_dict[key])  
            del self.my_dict[key]  # 在哈希中也删除
        if len(self.my_dict) == self.maxLen:  # 如果不在缓存中，并且缓存已经满了
            p = self.R.left      # 那么就要删除掉链表中的最后一个节点
            self.remove(p)
            del self.my_dict[p.val]  # 并且把这个值在哈希表中删除
        p = Node(key, value)   # 新的节点 或者是 被删掉后新的节点
        self.my_dict[key] = p  
        self.insert(p)  # 加入到链表中


    def remove(self, p):
        p.right.left = p.left
        p.left.right = p.right


    def insert(self, p):
        p.right = self.L.right 
        p.left = self.L 
        self.L.right.left = p 
        self.L.right = p
        
        
        
# 法二：用python自带的OrderDict
from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity: int):
        self.maxsize = capacity
        self.lrucache = OrderedDict()

    def get(self, key: int) -> int:
        # 说明在缓存中,重新移动字典的尾部
        if key in self.lrucache:
            self.lrucache.move_to_end(key)
        return self.lrucache.get(key, -1)
        
    def put(self, key: int, value: int) -> None:
        # 如果存在,删掉,重新赋值
        if key in self.lrucache:
            del self.lrucache[key]
        # 在字典尾部添加
        self.lrucache[key] = value
        if len(self.lrucache) > self.maxsize:
            # 弹出字典的头部(因为存储空间不够了)
            self.lrucache.popitem(last = False)
```

