export type Language = 'python' | 'java' | 'c' | 'html' | 'sql';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CodeSnippet {
  id: string;
  language: Language;
  difficulty: Difficulty;
  title: string;
  code: string;
}

const snippets: CodeSnippet[] = [
  // Python - Easy
  { id: 'py-e-1', language: 'python', difficulty: 'easy', title: 'Hello World', code: 'print("Hello, World!")' },
  { id: 'py-e-2', language: 'python', difficulty: 'easy', title: 'Variables', code: 'name = "Alice"\nage = 25\nprint(name, age)' },
  { id: 'py-e-3', language: 'python', difficulty: 'easy', title: 'Simple Loop', code: 'for i in range(5):\n    print(i)' },
  { id: 'py-e-4', language: 'python', difficulty: 'easy', title: 'List', code: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits[0])' },

  // Python - Medium
  { id: 'py-m-1', language: 'python', difficulty: 'medium', title: 'Function', code: 'def greet(name):\n    return f"Hello, {name}!"\n\nresult = greet("World")\nprint(result)' },
  { id: 'py-m-2', language: 'python', difficulty: 'medium', title: 'List Comprehension', code: 'squares = [x**2 for x in range(10)]\neven = [x for x in squares if x % 2 == 0]\nprint(even)' },
  { id: 'py-m-3', language: 'python', difficulty: 'medium', title: 'Dictionary', code: 'person = {"name": "Bob", "age": 30}\nfor key, value in person.items():\n    print(f"{key}: {value}")' },

  // Python - Hard
  { id: 'py-h-1', language: 'python', difficulty: 'hard', title: 'Class', code: 'class Stack:\n    def __init__(self):\n        self.items = []\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        return self.items.pop()\n\n    def is_empty(self):\n        return len(self.items) == 0' },
  { id: 'py-h-2', language: 'python', difficulty: 'hard', title: 'Decorator', code: 'def timer(func):\n    import time\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f"Elapsed: {end - start:.4f}s")\n        return result\n    return wrapper' },
  { id: 'py-h-3', language: 'python', difficulty: 'hard', title: 'Generator', code: 'def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfib = fibonacci()\nfor _ in range(10):\n    print(next(fib))' },

  // Java - Easy
  { id: 'java-e-1', language: 'java', difficulty: 'easy', title: 'Hello World', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
  { id: 'java-e-2', language: 'java', difficulty: 'easy', title: 'Variables', code: 'int age = 25;\nString name = "Alice";\nSystem.out.println(name + " is " + age);' },
  { id: 'java-e-3', language: 'java', difficulty: 'easy', title: 'For Loop', code: 'for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}' },

  // Java - Medium
  { id: 'java-m-1', language: 'java', difficulty: 'medium', title: 'Method', code: 'public static int add(int a, int b) {\n    return a + b;\n}\n\npublic static void main(String[] args) {\n    int result = add(3, 4);\n    System.out.println(result);\n}' },
  { id: 'java-m-2', language: 'java', difficulty: 'medium', title: 'Array', code: 'int[] numbers = {1, 2, 3, 4, 5};\nint sum = 0;\nfor (int n : numbers) {\n    sum += n;\n}\nSystem.out.println("Sum: " + sum);' },
  { id: 'java-m-3', language: 'java', difficulty: 'medium', title: 'ArrayList', code: 'import java.util.ArrayList;\nArrayList<String> list = new ArrayList<>();\nlist.add("Java");\nlist.add("Python");\nfor (String lang : list) {\n    System.out.println(lang);\n}' },

  // Java - Hard
  { id: 'java-h-1', language: 'java', difficulty: 'hard', title: 'Interface', code: 'interface Shape {\n    double area();\n    double perimeter();\n}\n\nclass Circle implements Shape {\n    double radius;\n    Circle(double r) { this.radius = r; }\n    public double area() { return Math.PI * radius * radius; }\n    public double perimeter() { return 2 * Math.PI * radius; }\n}' },
  { id: 'java-h-2', language: 'java', difficulty: 'hard', title: 'Generic Class', code: 'public class Pair<T, U> {\n    private T first;\n    private U second;\n    public Pair(T first, U second) {\n        this.first = first;\n        this.second = second;\n    }\n    public T getFirst() { return first; }\n    public U getSecond() { return second; }\n}' },
  { id: 'java-h-3', language: 'java', difficulty: 'hard', title: 'Lambda', code: 'import java.util.*;\nimport java.util.stream.*;\nList<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\nList<Integer> evens = nums.stream()\n    .filter(n -> n % 2 == 0)\n    .collect(Collectors.toList());\nSystem.out.println(evens);' },

  // C - Easy
  { id: 'c-e-1', language: 'c', difficulty: 'easy', title: 'Hello World', code: '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
  { id: 'c-e-2', language: 'c', difficulty: 'easy', title: 'Variables', code: 'int age = 25;\nfloat pi = 3.14;\nchar grade = \'A\';\nprintf("%d %f %c\\n", age, pi, grade);' },
  { id: 'c-e-3', language: 'c', difficulty: 'easy', title: 'While Loop', code: 'int i = 0;\nwhile (i < 5) {\n    printf("%d\\n", i);\n    i++;\n}' },

  // C - Medium
  { id: 'c-m-1', language: 'c', difficulty: 'medium', title: 'Function', code: 'int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf("%d\\n", factorial(5));\n    return 0;\n}' },
  { id: 'c-m-2', language: 'c', difficulty: 'medium', title: 'Array', code: 'int arr[] = {5, 3, 8, 1, 9};\nint n = 5, temp;\nfor (int i = 0; i < n-1; i++)\n    for (int j = 0; j < n-i-1; j++)\n        if (arr[j] > arr[j+1]) {\n            temp = arr[j];\n            arr[j] = arr[j+1];\n            arr[j+1] = temp;\n        }' },
  { id: 'c-m-3', language: 'c', difficulty: 'medium', title: 'Pointer', code: 'int x = 10;\nint *ptr = &x;\nprintf("Value: %d\\n", *ptr);\n*ptr = 20;\nprintf("New value: %d\\n", x);' },

  // C - Hard
  { id: 'c-h-1', language: 'c', difficulty: 'hard', title: 'Struct', code: 'typedef struct {\n    char name[50];\n    int age;\n    float gpa;\n} Student;\n\nvoid printStudent(Student s) {\n    printf("Name: %s, Age: %d, GPA: %.2f\\n",\n           s.name, s.age, s.gpa);\n}' },
  { id: 'c-h-2', language: 'c', difficulty: 'hard', title: 'Linked List', code: 'struct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid insert(struct Node** head, int data) {\n    struct Node* node = malloc(sizeof(struct Node));\n    node->data = data;\n    node->next = *head;\n    *head = node;\n}' },
  { id: 'c-h-3', language: 'c', difficulty: 'hard', title: 'File I/O', code: '#include <stdio.h>\nint main() {\n    FILE *fp = fopen("data.txt", "w");\n    if (fp == NULL) return 1;\n    fprintf(fp, "Hello, File!\\n");\n    fclose(fp);\n    fp = fopen("data.txt", "r");\n    char buf[100];\n    fgets(buf, 100, fp);\n    printf("%s", buf);\n    fclose(fp);\n    return 0;\n}' },

  // HTML/CSS - Easy
  { id: 'html-e-1', language: 'html', difficulty: 'easy', title: 'Basic HTML', code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <p>Welcome!</p>\n</body>\n</html>' },
  { id: 'html-e-2', language: 'html', difficulty: 'easy', title: 'CSS Basics', code: 'body {\n  margin: 0;\n  font-family: sans-serif;\n  background: #f0f0f0;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}' },
  { id: 'html-e-3', language: 'html', difficulty: 'easy', title: 'Links', code: '<nav>\n  <a href="/">Home</a>\n  <a href="/about">About</a>\n  <a href="/contact">Contact</a>\n</nav>' },

  // HTML/CSS - Medium
  { id: 'html-m-1', language: 'html', difficulty: 'medium', title: 'Flexbox', code: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.item {\n  flex: 1;\n  min-width: 200px;\n  padding: 1rem;\n}' },
  { id: 'html-m-2', language: 'html', difficulty: 'medium', title: 'Form', code: '<form action="/submit" method="POST">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email">\n  <button type="submit">Submit</button>\n</form>' },
  { id: 'html-m-3', language: 'html', difficulty: 'medium', title: 'Grid', code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 1rem;\n}\n\n@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}' },

  // HTML/CSS - Hard
  { id: 'html-h-1', language: 'html', difficulty: 'hard', title: 'Animation', code: '@keyframes slideIn {\n  from {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n\n.animated {\n  animation: slideIn 0.5s ease-out forwards;\n}' },
  { id: 'html-h-2', language: 'html', difficulty: 'hard', title: 'Custom Properties', code: ':root {\n  --primary: #3498db;\n  --secondary: #2ecc71;\n  --spacing-sm: 0.5rem;\n  --spacing-md: 1rem;\n  --radius: 8px;\n}\n\n.card {\n  background: var(--primary);\n  padding: var(--spacing-md);\n  border-radius: var(--radius);\n}' },
  { id: 'html-h-3', language: 'html', difficulty: 'hard', title: 'Pseudo-elements', code: '.button {\n  position: relative;\n  overflow: hidden;\n}\n\n.button::before {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 0;\n  height: 0;\n  background: rgba(255,255,255,0.2);\n  border-radius: 50%;\n  transform: translate(-50%, -50%);\n  transition: width 0.6s, height 0.6s;\n}' },

  // SQL - Easy
  { id: 'sql-e-1', language: 'sql', difficulty: 'easy', title: 'SELECT', code: 'SELECT * FROM users\nWHERE active = 1\nORDER BY name ASC;' },
  { id: 'sql-e-2', language: 'sql', difficulty: 'easy', title: 'INSERT', code: 'INSERT INTO products (name, price, stock)\nVALUES ("Widget", 9.99, 100);' },
  { id: 'sql-e-3', language: 'sql', difficulty: 'easy', title: 'UPDATE', code: 'UPDATE employees\nSET salary = salary * 1.1\nWHERE department = "Engineering";' },

  // SQL - Medium
  { id: 'sql-m-1', language: 'sql', difficulty: 'medium', title: 'JOIN', code: 'SELECT o.id, c.name, o.total\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.id\nWHERE o.status = "pending"\nORDER BY o.created_at DESC;' },
  { id: 'sql-m-2', language: 'sql', difficulty: 'medium', title: 'GROUP BY', code: 'SELECT department,\n       COUNT(*) as headcount,\n       AVG(salary) as avg_salary\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 5\nORDER BY avg_salary DESC;' },
  { id: 'sql-m-3', language: 'sql', difficulty: 'medium', title: 'Subquery', code: 'SELECT name, salary\nFROM employees\nWHERE salary > (\n    SELECT AVG(salary)\n    FROM employees\n)\nORDER BY salary DESC;' },

  // SQL - Hard
  { id: 'sql-h-1', language: 'sql', difficulty: 'hard', title: 'CTE', code: 'WITH ranked_sales AS (\n    SELECT\n        salesperson_id,\n        SUM(amount) as total,\n        RANK() OVER (ORDER BY SUM(amount) DESC) as rank\n    FROM sales\n    GROUP BY salesperson_id\n)\nSELECT s.name, r.total, r.rank\nFROM ranked_sales r\nJOIN salespeople s ON r.salesperson_id = s.id\nWHERE r.rank <= 10;' },
  { id: 'sql-h-2', language: 'sql', difficulty: 'hard', title: 'Window Function', code: 'SELECT\n    employee_id,\n    department,\n    salary,\n    AVG(salary) OVER (PARTITION BY department) as dept_avg,\n    salary - AVG(salary) OVER (PARTITION BY department) as diff\nFROM employees\nORDER BY department, salary DESC;' },
  { id: 'sql-h-3', language: 'sql', difficulty: 'hard', title: 'Pivot', code: 'SELECT\n    product_id,\n    SUM(CASE WHEN month = 1 THEN revenue ELSE 0 END) as jan,\n    SUM(CASE WHEN month = 2 THEN revenue ELSE 0 END) as feb,\n    SUM(CASE WHEN month = 3 THEN revenue ELSE 0 END) as mar\nFROM monthly_sales\nGROUP BY product_id;' },
];

export function getSnippets(language: Language, difficulty: Difficulty): CodeSnippet[] {
  return snippets.filter(s => s.language === language && s.difficulty === difficulty);
}

export function getRandomSnippet(language: Language, difficulty: Difficulty): CodeSnippet {
  const filtered = getSnippets(language, difficulty);
  if (filtered.length === 0) return snippets[0];
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  python: 'Python',
  java: 'Java',
  c: 'C',
  html: 'HTML/CSS',
  sql: 'SQL',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};
