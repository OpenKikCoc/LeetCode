#  [460. LFU 缓存](https://leetcode-cn.com/problems/lfu-cache/)

## 题意



## 题解



```c++
// 与lru风格一致的写法
class LFUCache {
public:
    struct Node {
        int k, v, c;
    };

    int cap;
    int min_c;
    unordered_map<int, list<Node>> cache;
    unordered_map<int, list<Node>::iterator> hash;

    Node remove(list<Node>::iterator it) {
        auto [k, v, c] = *it;
        cache[c].erase(it);
        if (cache[c].size() == 0) {
            cache.erase(c);
            if (min_c == c)
                min_c ++ ;
        }
        hash.erase(k);
        return {k, v, c};
    }

    void insert(int k, int v, int c) {
        cache[c].push_front({k, v, c});
        hash[k] = cache[c].begin();
    }

    LFUCache(int capacity) {
        this->cap = capacity;
        this->min_c = 0;
    }
    
    int get(int key) {
        if (hash.find(key) == hash.end())
            return -1;
        auto it = hash[key];
        auto [k, v, c] = remove(it);
        insert(k, v, c + 1);
        return v;
    }
    
    void put(int key, int value) {
        if (cap == 0) return;
        int ori_cnt = 0;
        if (hash.find(key) == hash.end()) {
            if (hash.size() == cap)
                auto _ = remove( -- cache[min_c].end());
        } else {
            auto [_k, _v, _c] = remove(hash[key]);
            ori_cnt = _c;
        }
        if (ori_cnt == 0)
            min_c = 1;
        insert(key, value, ori_cnt + 1);
    }
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * LFUCache* obj = new LFUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```



```c++
// 网络很多做法并不是 O1

class LFUCache {
public:
    struct Node {
        Node *left, *right;
        int key, val;
        Node(int _key, int _val) {
            key = _key, val = _val;
            left = right = NULL;
        }
    };
    struct Block {
        Block *left, *right;
        Node *head, *tail;
        int cnt;
        Block(int _cnt) {
            cnt = _cnt;
            left = right = NULL;
            head = new Node(-1, -1), tail = new Node(-1, -1);
            head->right = tail, tail->left = head;
        }
        ~Block() {
            delete head;
            delete tail;
        }
        void insert(Node* p) {
            p->right = head->right;
            head->right->left = p;
            p->left = head;
            head->right = p;
        }
        void remove(Node* p) {
            p->left->right = p->right;
            p->right->left = p->left;
        }
        bool empty() {
            return head->right == tail;
        }
    }*head, *tail;
    int n;
    unordered_map<int, Block*> hash_block;
    unordered_map<int, Node*> hash_node;

    void insert(Block* p) {  // 在p的右侧插入新块，cnt是p->cnt + 1
        auto cur = new Block(p->cnt + 1);
        cur->right = p->right;
        p->right->left = cur;
        p->right = cur;
        cur->left = p;
    }

    void remove(Block* p) {
        p->left->right = p->right;
        p->right->left = p->left;
        delete p;
    }

    LFUCache(int capacity) {
        n = capacity;
        head = new Block(0), tail = new Block(INT_MAX);
        head->right = tail, tail->left = head;
    }

    int get(int key) {
        if (hash_block.count(key) == 0) return -1;
        auto block = hash_block[key];
        auto node = hash_node[key];
        block->remove(node);
        if (block->right->cnt != block->cnt + 1) insert(block);
        block->right->insert(node);
        hash_block[key] = block->right;
        if (block->empty()) remove(block);
        return node->val;
    }

    void put(int key, int value) {
        if (!n) return;
        if (hash_block.count(key)) {
            hash_node[key]->val = value;
            get(key);
        } else {
            if (hash_block.size() == n) {
                auto p = head->right->tail->left;
                head->right->remove(p);
                if (head->right->empty()) remove(head->right);
                hash_block.erase(p->key);
                hash_node.erase(p->key);
                delete p;
            }
            auto p = new Node(key, value);
            if (head->right->cnt > 1) insert(head);
            head->right->insert(p);
            hash_block[key] = head->right;
            hash_node[key] = p;
        }
    }
};

// ---------------------------------------------------------------
struct Node {
    int cnt, time, key, value;
    Node(int c, int t, int k, int v): cnt(c), time(t), key(k), value(v) {}
    bool operator < (const Node& rhs) const {
        return cnt == rhs.cnt ? time < rhs.time : cnt < rhs.cnt;
    }
};

class LFUCache {
public:
    int cap, time;
    unordered_map<int, Node> m;
    set<Node> s;
    LFUCache(int capacity) {
        cap = capacity;
        time = 0;
    }
    
    int get(int key) {
        if (!cap) return -1;
        auto it = m.find(key);
        if (it == m.end()) return -1;
        auto node = it->second;
        s.erase(node);
        ++ node.cnt, node.time = ++ time;
        s.insert(node);
        it->second = node;
        return node.value;
    }
    
    void put(int key, int value) {
        if (!cap) return;
        auto it = m.find(key);
        if (it == m.end()) {
            if (m.size() == cap) {
                m.erase(s.begin()->key);
                s.erase(s.begin());
            }
            Node node = Node(1, ++ time, key, value);
            m.insert({key, node});
            s.insert(node);
        } else {
            Node node = it->second;
            s.erase(node);
            ++ node.cnt, node.time = ++ time, node.value = value;
            s.insert(node);
            it->second = node;
        }
    }
};
/**
 * Your LFUCache object will be instantiated and called as such:
 * LFUCache* obj = new LFUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```



```python3

```

