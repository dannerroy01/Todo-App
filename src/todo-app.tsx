import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

// Main App Component with State-based Routing
const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setShowForgotPassword(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={navigateTo} />;
      case 'onboarding':
        return <OnboardingPage onNavigate={navigateTo} />;
      case 'login':
        return <LoginPage onNavigate={navigateTo} showForgotPassword={showForgotPassword} setShowForgotPassword={setShowForgotPassword} />;
      case 'register':
        return <RegisterPage onNavigate={navigateTo} />;
      case 'dashboard':
        return <TodoDashboard onNavigate={navigateTo} />;
      default:
        return <WelcomePage onNavigate={navigateTo} />;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderPage()}</div>;
};

// Onboarding Pages
const WelcomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to TodoMaster</h1>
        <p className="text-gray-600 mb-8 text-center">Your personal task management solution</p>
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('onboarding')}
            className="block w-full py-3 px-4 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Get Started
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="block w-full py-3 px-4 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            I already have an account
          </button>
        </div>
      </div>
    </div>
  );
};

const OnboardingPage = ({ onNavigate }) => {
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "Create and organize tasks",
      description: "Easily add, edit, and organize your daily tasks"
    },
    {
      title: "Track your progress",
      description: "Monitor your productivity and task completion"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-full mx-1 rounded ${
                index + 1 <= step ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{steps[step - 1].title}</h2>
        <p className="text-gray-600 mb-8">{steps[step - 1].description}</p>
        <div className="flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Back
            </button>
          )}
          {step < steps.length ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Authentication Components
const LoginPage = ({ onNavigate, showForgotPassword, setShowForgotPassword }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </button>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="text-blue-600 hover:text-blue-500"
          >
            Register
          </button>
        </p>
      </div>
      {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-blue-600 hover:text-blue-500"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Reset Password</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center">
            <CheckCircle2 className="mx-auto mb-4 text-green-500" size={48} />
            <p>Reset link sent to your email!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Todo Dashboard
const TodoDashboard = ({ onNavigate }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Tasks</h1>
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <span
                    className={`${
                      todo.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
