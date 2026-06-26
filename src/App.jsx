import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import BusinessDashboard from './components/BusinessDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import ExecutorDashboard from './components/ExecutorDashboard';
import { loadData, saveData } from './data/mockData';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [executors, setExecutors] = useState([]);
  const [activeView, setActiveView] = useState('landing');
  const [activeExecutorId, setActiveExecutorId] = useState('exec-1');

  // Load initial data
  useEffect(() => {
    const { tasks: loadedTasks, executors: loadedExecutors } = loadData();
    setTasks(loadedTasks);
    setExecutors(loadedExecutors);
  }, []);

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

  // 2. Assign Task to Executor (called by Manager)
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

  // 3. Update Task Status (called by Executor e.g. Start Work or Mark Completed)
  const handleUpdateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    updateStateAndSave(updatedTasks, executors);
  };

  // 4. Approve & Release Payment (called by Business)
  const handleApproveTask = (taskId) => {
    let taskBudget = 0;
    let assignedExecId = null;

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        taskBudget = task.budget;
        assignedExecId = task.assignedTo;
        return { ...task, status: 'დადასტურებული' };
      }
      return task;
    });

    const updatedExecutors = executors.map(exec => {
      if (exec.id === assignedExecId) {
        return {
          ...exec,
          balance: exec.balance + taskBudget,
          completedTasks: exec.completedTasks + 1,
          status: 'აქტიური'
        };
      }
      return exec;
    });

    updateStateAndSave(updatedTasks, updatedExecutors);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      <main style={{ flex: 1 }}>
        {activeView === 'landing' && <LandingPage setActiveView={setActiveView} />}
        {activeView === 'business' && (
          <BusinessDashboard 
            tasks={tasks} 
            onAddTask={handleAddTask} 
            onApproveTask={handleApproveTask} 
          />
        )}
        {activeView === 'manager' && (
          <ManagerDashboard 
            tasks={tasks} 
            executors={executors} 
            onAssignTask={handleAssignTask} 
          />
        )}
        {activeView === 'executor' && (
          <ExecutorDashboard 
            tasks={tasks} 
            executors={executors} 
            onUpdateTaskStatus={handleUpdateTaskStatus} 
            activeExecutorId={activeExecutorId}
            setActiveExecutorId={setActiveExecutorId}
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
          <p style={{ marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase' }}>© 2026 DIGIT Platform. ყველა უფლება დაცულია.</p>
          <p style={{ fontSize: '0.75rem' }}>
            შექმნილია თანამედროვე ტექნოლოგიური კოლაბორაციისთვის
          </p>
        </div>
      </footer>
    </div>
  );
}
