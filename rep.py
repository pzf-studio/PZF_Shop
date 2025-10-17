import os

def simple_tree(root_dir=".", max_depth=3):
    """
    Простой генератор дерева с ограничением глубины
    """
    exclude = ['.git', '__pycache__', '.DS_Store', '.vscode', '.idea']
    
    def build_tree(current_dir, prefix="", depth=0):
        if depth >= max_depth:
            return
            
        try:
            items = sorted([item for item in os.listdir(current_dir) if item not in exclude])
        except:
            return
            
        for i, item in enumerate(items):
            is_last = i == len(items) - 1
            print(f"{prefix}{'└── ' if is_last else '├── '}{item}")
            
            item_path = os.path.join(current_dir, item)
            if os.path.isdir(item_path):
                extension = "    " if is_last else "│   "
                build_tree(item_path, prefix + extension, depth + 1)
    
    print("project/")
    build_tree(root_dir)

# Использование
simple_tree()  # Для текущей директории
# simple_tree("/path/to/project", max_depth=2)  # С кастомным путем и глубиной