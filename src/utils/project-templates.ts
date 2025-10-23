import { Project } from '../types';

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: 'framework' | 'library' | 'basic';
  files: Record<string, { content: string; language: string }>;
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'html5-basic',
    name: 'HTML5 Basic',
    description: 'Simple HTML5 template with CSS and JS',
    category: 'basic',
    files: {
      'index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">MySite</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <h1>Welcome to My Project</h1>
            <p>This is a simple HTML5 template to get you started.</p>
            <button class="cta-button" onclick="showAlert()">Click Me</button>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 My Project. Built with ❤️</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>`,
        language: 'html'
      },
      'style.css': {
        content: `/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

/* Navigation */
header {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

.nav-links a:hover {
    opacity: 0.8;
}

/* Hero section */
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    padding: 2rem;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
}

.cta-button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 12px 30px;
    font-size: 1.1rem;
    border-radius: 25px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

/* Footer */
footer {
    background: rgba(0, 0, 0, 0.3);
    color: white;
    text-align: center;
    padding: 2rem;
    backdrop-filter: blur(10px);
}

/* Responsive design */
@media (max-width: 768px) {
    .nav-links {
        gap: 1rem;
    }
    
    .hero h1 {
        font-size: 2rem;
    }
    
    .hero p {
        font-size: 1rem;
    }
}`,
        language: 'css'
      },
      'script.js': {
        content: `// Main JavaScript file
console.log('Hello from your new project! 🚀');

function showAlert() {
    alert('Welcome to your new project! Start coding amazing things!');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive features
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = hero.getBoundingClientRect();
        
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        
        hero.style.transform = \`perspective(1000px) rotateY(\${x * 5}deg) rotateX(\${-y * 5}deg)\`;
    });
    
    hero.addEventListener('mouseleave', () => {
        hero.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
}

// Utility function for making HTTP requests
async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Export functions for use in other modules
window.MyApp = {
    showAlert,
    fetchData
};`,
        language: 'javascript'
      },
      'README.md': {
        content: `# My Project

Welcome to your new project! This is a basic HTML5 template to get you started.

## Features

- Responsive design
- Modern CSS with gradients and effects
- Interactive JavaScript
- Smooth scrolling navigation

## Getting Started

1. Edit the \`index.html\` file to customize your content
2. Modify \`style.css\` to change the appearance
3. Add functionality in \`script.js\`

## Project Structure

\`\`\`
project/
├── index.html      # Main HTML file
├── style.css       # Styles and layout
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
\`\`\`

Happy coding! 🎉`,
        language: 'markdown'
      }
    }
  },
  {
    id: 'react-basic',
    name: 'React Basic',
    description: 'Simple React app with functional components',
    category: 'framework',
    files: {
      'index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            min-height: 100vh;
            padding: 20px;
        }
        #root { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="app.js"></script>
</body>
</html>`,
        language: 'html'
      },
      'app.js': {
        content: `const { useState, useEffect } = React;

// Main App Component
function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Welcome to React!');

  useEffect(() => {
    document.title = \`Count: \${count} | React App\`;
  }, [count]);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
    setMessage('Counter reset! 🎉');
  };

  return React.createElement('div', { 
    style: { 
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'white',
      maxWidth: '500px',
      width: '100%'
    }
  }, [
    React.createElement('h1', { 
      key: 'title',
      style: { marginBottom: '20px', fontSize: '2.5rem' }
    }, 'React Counter App'),
    
    React.createElement('p', {
      key: 'message',
      style: { marginBottom: '30px', fontSize: '1.2rem', opacity: 0.9 }
    }, message),
    
    React.createElement('div', {
      key: 'counter',
      style: { 
        fontSize: '4rem', 
        fontWeight: 'bold',
        marginBottom: '30px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }
    }, count),
    
    React.createElement('div', {
      key: 'buttons',
      style: { display: 'flex', gap: '15px', justifyContent: 'center' }
    }, [
      React.createElement('button', {
        key: 'increment',
        onClick: handleIncrement,
        style: {
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '25px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          transition: 'all 0.3s'
        },
        onMouseOver: (e) => e.target.style.transform = 'scale(1.05)',
        onMouseOut: (e) => e.target.style.transform = 'scale(1)'
      }, 'Increment +'),
      
      React.createElement('button', {
        key: 'reset',
        onClick: handleReset,
        style: {
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '25px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          transition: 'all 0.3s'
        },
        onMouseOver: (e) => e.target.style.transform = 'scale(1.05)',
        onMouseOut: (e) => e.target.style.transform = 'scale(1)'
      }, 'Reset')
    ]),
    
    React.createElement('p', {
      key: 'info',
      style: { 
        marginTop: '30px', 
        fontSize: '0.9rem', 
        opacity: 0.7 
      }
    }, 'Built with React • No build setup required')
  ]);
}

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));`,
        language: 'javascript'
      },
      'README.md': {
        content: `# React App

A simple React application that works without any build setup!

## Features

- React 18 with functional components
- useState and useEffect hooks
- Interactive counter
- Modern glass morphism design
- No build tools required

## How it Works

This app uses:
- React UMD builds (CDN)
- Babel Standalone for JSX transformation
- In-browser transpilation

## Next Steps

1. Add more components in \`app.js\`
2. Enhance the styling
3. Add more interactive features

Happy coding with React! ⚛️`,
        language: 'markdown'
      }
    }
  },
  {
    id: 'vanilla-js',
    name: 'Vanilla JS App',
    description: 'Modern JavaScript with modules and components',
    category: 'basic',
    files: {
      'index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vanilla JS App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app"></div>
    <script type="module" src="app.js"></script>
</body>
</html>`,
        language: 'html'
      },
      'styles.css': {
        content: `/* Modern CSS Reset */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    min-height: 100vh;
    color: #333;
}

@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.app-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    max-width: 600px;
    width: 100%;
    text-align: center;
}

.app-title {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.app-subtitle {
    font-size: 1.1rem;
    margin-bottom: 30px;
    color: #666;
}

.todo-container {
    margin: 30px 0;
}

.todo-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.todo-input input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e1e5e9;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s;
}

.todo-input input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.todo-input button {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
}

.todo-input button:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
}

.todo-list {
    list-style: none;
}

.todo-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    background: white;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
}

.todo-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
    opacity: 0.6;
    text-decoration: line-through;
}

.todo-checkbox {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #ddd;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.todo-checkbox.checked {
    background: #4CAF50;
    border-color: #4CAF50;
    color: white;
}

.todo-text {
    flex: 1;
    text-align: left;
}

.todo-delete {
    background: #ff6b6b;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.todo-delete:hover {
    background: #ff5252;
    transform: scale(1.1);
}

.stats {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    font-size: 0.9rem;
    color: #666;
}

@media (max-width: 768px) {
    .app-container {
        margin: 20px;
        padding: 30px 20px;
    }
    
    .app-title {
        font-size: 2rem;
    }
}`,
        language: 'css'
      },
      'app.js': {
        content: `// Modern Vanilla JavaScript App with ES6 Modules

class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    bindEvents() {
        // Add todo form
        document.getElementById('addTodoForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // Clear completed
        document.getElementById('clearCompleted')?.addEventListener('click', () => {
            this.clearCompleted();
        });
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (text) {
            const todo = {
                id: Date.now(),
                text,
                completed: false,
                createdAt: new Date().toISOString()
            };

            this.todos.push(todo);
            this.save();
            this.render();
            input.value = '';
            input.focus();
        }
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.save();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.save();
        this.render();
    }

    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.save();
        this.render();
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const pending = total - completed;

        return { total, completed, pending };
    }

    render() {
        const app = document.getElementById('app');
        const stats = this.getStats();

        app.innerHTML = \`
            <div class="app-container">
                <h1 class="app-title">Todo App</h1>
                <p class="app-subtitle">Modern Vanilla JavaScript • ES6 Modules</p>
                
                <div class="todo-container">
                    <form class="todo-input" id="addTodoForm">
                        <input 
                            type="text" 
                            id="todoInput"
                            placeholder="What needs to be done?"
                            maxlength="100"
                        >
                        <button type="submit">Add Todo</button>
                    </form>

                    <ul class="todo-list" id="todoList">
                        \${this.todos.map(todo => \`
                            <li class="todo-item \${todo.completed ? 'completed' : ''}">
                                <div 
                                    class="todo-checkbox \${todo.completed ? 'checked' : ''}"
                                    onclick="app.toggleTodo(\${todo.id})"
                                >
                                    \${todo.completed ? '✓' : ''}
                                </div>
                                <span class="todo-text">\${this.escapeHtml(todo.text)}</span>
                                <button 
                                    class="todo-delete"
                                    onclick="app.deleteTodo(\${todo.id})"
                                    title="Delete todo"
                                >
                                    ×
                                </button>
                            </li>
                        \`).join('')}
                    </ul>

                    \${this.todos.length > 0 ? \`
                        <div class="stats">
                            <span>Total: \${stats.total}</span>
                            <span>Completed: \${stats.completed}</span>
                            <span>Pending: \${stats.pending}</span>
                            <button 
                                id="clearCompleted"
                                style="background: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;"
                            >
                                Clear Completed
                            </button>
                        </div>
                    \` : \`
                        <p style="color: #666; font-style: italic; margin-top: 20px;">
                            No todos yet. Add one above to get started!
                        </p>
                    \`}
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="font-size: 0.9rem; color: #888;">
                        Built with modern Vanilla JavaScript • LocalStorage persistence
                    </p>
                </div>
            </div>
        \`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
const app = new TodoApp();

// Export for global access (if needed)
window.app = app;

console.log('Vanilla JS Todo App initialized! 🚀');`,
        language: 'javascript'
      }
    }
  }
];

export const getTemplateById = (id: string): ProjectTemplate | undefined => {
  return projectTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): ProjectTemplate[] => {
  return projectTemplates.filter(template => template.category === category);
};
