import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import BusinessDashboard from './components/BusinessDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import ExecutorDashboard from './components/ExecutorDashboard';
import Auth from './components/Auth';
import { loadData, saveData } from './data/mockData';
import { translations } from './data/translations';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [executors, setExecutors] = useState([]);
  const [activeView, setActiveView] = useState('landing');
  const [activeExecutorId, setActiveExecutorId] = useState('exec-1');

  // User auth state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("digit_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Language state
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("digit_language") || "ka";
  });

  // Translation helper function
  const t = (key) => {
    if (translations[language] && translations[language][key] !== undefined) {
      return translations[language][key];
    }
    // Fallback to English
    if (translations['en'] && translations['en'][key] !== undefined) {
      return translations['en'][key];
    }
    return key;
  };

  // Load initial data
  useEffect(() => {
    const { tasks: loadedTasks, executors: loadedExecutors } = loadData();
    setTasks(loadedTasks);
    setExecutors(loadedExecutors);
    
    // If logged-in user is an executor, lock activeExecutorId to their profile
    if (currentUser && currentUser.role === 'executor' && currentUser.executorId) {
      setActiveExecutorId(currentUser.executorId);
    }
  }, [currentUser]);

  // Adjust page direction based on language (Arabic and Hebrew are RTL)
  useEffect(() => {
    const dir = (language === 'ar' || language === 'he') ? 'rtl' : 'ltr';
    document.body.dir = dir;
    document.documentElement.dir = dir;
    localStorage.setItem("digit_language", language);
  }, [language]);

  // Restrict access based on user role
  useEffect(() => {
    if (!currentUser) {
      // Allowed views for anonymous users
      if (activeView !== 'landing' && activeView !== 'auth') {
        setActiveView('landing');
      }
    } else {
      // Prevent logged-in users from seeing the Auth form
      if (activeView === 'auth') {
        if (currentUser.role === 'business') setActiveView('business');
        if (currentUser.role === 'manager') setActiveView('manager');
        if (currentUser.role === 'executor') setActiveView('executor');
      }
      // Dashboard access checks
      if (activeView === 'business' && currentUser.role !== 'business') {
        setActiveView('landing');
      }
      if (activeView === 'manager' && currentUser.role !== 'manager') {
        setActiveView('landing');
      }
      if (activeView === 'executor' && currentUser.role !== 'executor') {
        setActiveView('landing');
      }
    }
  }, [activeView, currentUser]);

  // Sync data to localStorage on changes
  const updateStateAndSave = (newTasks, newExecutors) => {
    setTasks(newTasks);
    setExecutors(newExecutors);
    saveData(newTasks, newExecutors);
  };

  // 1. Add Task (called by Business)
  const handleAddTask = (newTask) => {
    const updatedTasks = [newTask, ...tasks];
    updateStateAndSave(updatedTasks, executors);
  };

  // 2. Edit Task (called by Manager)
  const handleEditTask = (taskId, updatedFields) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, ...updatedFields };
      }
      return task;
    });
    updateStateAndSave(updatedTasks, executors);
  };

  // 3. Delete Task (called by Manager)
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    updateStateAndSave(updatedTasks, executors);
  };

  // 4. Block/Unblock Executor (called by Manager)
  const handleBlockExecutor = (executorId, isBlocked) => {
    const updatedExecutors = executors.map(exec => {
      if (exec.id === executorId) {
        return { ...exec, isBlocked };
      }
      return exec;
    });
    updateStateAndSave(tasks, updatedExecutors);
  };

  // 5. Assign Task to Executor (called by Manager)
  const handleAssignTask = (taskId, executorId, note) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: 'დავალებული',
          assignedTo: executorId,
          managerNote: note
        };
      }
      return task;
    });

    const updatedExecutors = executors.map(exec => {
      if (exec.id === executorId) {
        return { ...exec, status: 'დაკავებული' };
      }
      return exec;
    });

    updateStateAndSave(updatedTasks, updatedExecutors);
  };

  // 6. Update Task Status (called by Executor e.g. Start Work or Mark Completed)
  const handleUpdateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    updateStateAndSave(updatedTasks, executors);
  };

  // 7. Approve & Release Payment & Post Review (called by Business)
  const handleApproveTask = (taskId, rating = null, comment = "") => {
    let taskBudget = 0;
    let assignedExecId = null;

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        taskBudget = task.budget;
        assignedExecId = task.assignedTo;
        return { 
          ...task, 
          status: 'დადასტურებული',
          review: rating ? { rating, comment } : null
        };
      }
      return task;
    });

    const updatedExecutors = executors.map(exec => {
      if (exec.id === assignedExecId) {
        const newReviews = exec.reviews ? [...exec.reviews] : [];
        if (rating) {
          newReviews.push({
            company: currentUser ? currentUser.name : "კლიენტი",
            rating,
            comment,
            date: new Date().toISOString().split('T')[0]
          });
        }

        const avgRating = newReviews.length > 0
          ? parseFloat((newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length).toFixed(1))
          : exec.rating;

        return {
          ...exec,
          balance: exec.balance + taskBudget,
          completedTasks: exec.completedTasks + 1,
          status: 'აქტიური',
          reviews: newReviews,
          rating: avgRating
        };
      }
      return exec;
    });

    updateStateAndSave(updatedTasks, updatedExecutors);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem("digit_current_user", JSON.stringify(user));
    
    // Redirect based on role
    if (user.role === 'business') {
      setActiveView('business');
    } else if (user.role === 'manager') {
      setActiveView('manager');
    } else if (user.role === 'executor') {
      setActiveView('executor');
      if (user.executorId) {
        setActiveExecutorId(user.executorId);
      }
    }
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("digit_current_user");
    setActiveView('landing');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', direction: (language === 'ar' || language === 'he') ? 'rtl' : 'ltr' }}>
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        currentUser={currentUser}
        onLogOut={handleLogOut}
        language={language}
        onLanguageChange={setLanguage}
        t={t}
      />

      <main style={{ flex: 1 }}>
        {activeView === 'landing' && <LandingPage setActiveView={setActiveView} t={t} />}
        
        {activeView === 'auth' && (
          <Auth 
            onLoginSuccess={handleLoginSuccess} 
            language={language} 
            t={t} 
          />
        )}

        {activeView === 'business' && (
          <BusinessDashboard 
            tasks={tasks} 
            onAddTask={handleAddTask} 
            onApproveTask={handleApproveTask} 
            t={t}
            currentUser={currentUser}
          />
        )}
        
        {activeView === 'manager' && (
          <ManagerDashboard 
            tasks={tasks} 
            executors={executors} 
            onAssignTask={handleAssignTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onBlockExecutor={handleBlockExecutor}
            t={t}
          />
        )}
        
        {activeView === 'executor' && (
          <ExecutorDashboard 
            tasks={tasks} 
            executors={executors} 
            onUpdateTaskStatus={handleUpdateTaskStatus} 
            activeExecutorId={activeExecutorId}
            setActiveExecutorId={setActiveExecutorId}
            t={t}
            currentUser={currentUser}
          />
        )}
      </main>

      <footer style={{
        background: '#ffffff',
        borderTop: '2px solid #000000',
        padding: '3rem 0',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        marginTop: '4rem'
      }}>
        <div className="container">
          <p style={{ marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase' }}>
            {t('rightsReserved')}
          </p>
          <p style={{ fontSize: '0.75rem' }}>
            {t('createdForCollab')}
          </p>
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ef4444',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '1.25rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-block'
            }}
          >
            [ მონაცემების განულება / Reset Data ]
          </button>
        </div>
      </footer>
    </div>
  );
}
