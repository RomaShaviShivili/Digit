import React, { useState } from 'react';
import { UserCheck, Star, ShieldAlert, Award, FileText, CheckCircle, ArrowRight, UserPlus, Eye, Edit2, Trash2, Lock, Unlock, BarChart2, TrendingUp, X, Check, DollarSign, Briefcase } from 'lucide-react';

export default function ManagerDashboard({ 
  tasks, 
  executors, 
  onAssignTask, 
  onEditTask, 
  onDeleteTask, 
  onBlockExecutor, 
  t 
}) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedExecutorId, setSelectedExecutorId] = useState('');
  const [note, setNote] = useState('');

  // Editing Task Modal states
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [editBudget, setEditBudget] = useState('');
  const [editPhoto, setEditPhoto] = useState(null);

  // Inspector States
  const [inspectedExecutor, setInspectedExecutor] = useState(null);

  // Stats Calculations
  const totalBudget = tasks.reduce((sum, task) => sum + task.budget, 0);
  const activeTasksCount = tasks.filter(t => t.status !== 'დადასტურებული').length;
  const completedTasksCount = tasks.filter(t => t.status === 'შესრულებული' || t.status === 'დადასტურებული').length;
  
  const totalExecutorRating = executors.reduce((sum, e) => sum + e.rating, 0);
  const avgExecutorRating = executors.length > 0 ? (totalExecutorRating / executors.length).toFixed(1) : "0.0";

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!selectedExecutorId) {
      alert(t('errorSelectExec'));
      return;
    }
    
    // Check if selected executor is blocked
    const exec = executors.find(e => e.id === selectedExecutorId);
    if (exec && exec.isBlocked) {
      alert("შეცდომა: არჩეული სპეციალისტი დაბლოკილია და მასზე დავალების მინიჭება შეუძლებელია!");
      return;
    }

    onAssignTask(selectedTask.id, selectedExecutorId, note);
    setSelectedTask(null);
    setSelectedExecutorId('');
    setNote('');
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditCategory(task.category);
    setEditPriority(task.priority);
    setEditBudget(task.budget);
    setEditPhoto(task.photo);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditTask(editingTask.id, {
      title: editTitle,
      description: editDesc,
      category: editCategory,
      priority: editPriority,
      budget: parseFloat(editBudget),
      photo: editPhoto
    });
    setEditingTask(null);
  };

  const handleEditPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = (taskId) => {
    if (window.confirm("ნამდვილად გსურთ ამ განაცხადის წაშლა?")) {
      onDeleteTask(taskId);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'მოლოდინში': return { color: 'var(--status-pending)' };
      case 'დავალებული': return { color: 'var(--status-assigned)' };
      case 'პროცესშია': return { color: 'var(--status-progress)' };
      case 'შესრულებული': return { color: 'var(--status-completed)' };
      case 'დადასტურებული': return { color: 'var(--status-approved)' };
      default: return { color: 'var(--text-main)' };
    }
  };

  const getStatusTranslation = (status) => {
    switch (status) {
      case 'მოლოდინში': return t('statusPending');
      case 'დავალებული': return t('statusAssigned');
      case 'პროცესშია': return t('statusProgress');
      case 'შესრულებული': return t('statusCompleted');
      case 'დადასტურებული': return t('statusApproved');
      default: return status;
    }
  };

  const getExecutorName = (id) => {
    const exec = executors.find(e => e.id === id);
    return exec ? exec.name : 'Unknown';
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t('managerPortal')}
        </span>
        <h2 style={{ fontSize: '2.25rem', marginTop: '0.25rem', fontWeight: 900 }}>{t('assignMonitor')}</h2>
      </div>

      {/* STATISTICS PANEL */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {/* Stat 1: Total Budget */}
        <div className="card glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '8px' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('totalBudget')}</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.15rem' }}>₾{totalBudget}</h3>
          </div>
        </div>

        {/* Stat 2: Active Tasks */}
        <div className="card glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', padding: '0.75rem', borderRadius: '8px' }}>
            <BarChart2 size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('activeTasks')}</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.15rem' }}>{activeTasksCount}</h3>
          </div>
        </div>

        {/* Stat 3: Completed Tasks */}
        <div className="card glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.75rem', borderRadius: '8px' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('completedTasks')}</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.15rem' }}>{completedTasksCount}</h3>
          </div>
        </div>

        {/* Stat 4: Executor Average Rating */}
        <div className="card glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.75rem', borderRadius: '8px' }}>
            <Star size={24} fill="#f59e0b" stroke="#f59e0b" />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('executorRating')}</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.15rem' }}>{avgExecutorRating} / 5.0</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Active Tasks Management */}
        <div className="card glass-card" style={{ flex: '2', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800 }}>
            <FileText size={22} color="var(--primary)" />
            <span>{t('allApplications')}</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {tasks.map((task) => (
              <div key={task.id} style={{
                border: '2px solid var(--border-color)',
                borderRadius: '0',
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.7)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{task.title}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {t('companyName')}: <strong>{task.company}</strong> | {t('budget').split(' ')[0]}: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>₾{task.budget}</span>
                    </span>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, ...getStatusStyle(task.status) }}>
                    • {getStatusTranslation(task.status)}
                  </span>
                </div>

                <p style={{ color: 'var(--text-main)', fontSize: '0.925rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  {task.description}
                </p>

                {/* Display photo if available */}
                {task.photo && (
                  <div style={{ marginBottom: '1.25rem', maxWidth: '300px', border: '2px solid #000' }}>
                    <img 
                      src={task.photo} 
                      alt={task.title} 
                      style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', display: 'block' }} 
                    />
                  </div>
                )}

                {/* Assignment Display */}
                {task.assignedTo && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {t('roleExecutor')}: <strong style={{ color: 'var(--text-main)' }}>{getExecutorName(task.assignedTo)}</strong>
                  </div>
                )}

                {/* Task Operations */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  
                  {/* Left actions: Edit/Delete */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => handleEditClick(task)}
                      className="btn btn-outline"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <Edit2 size={13} />
                      <span>{t('editTask').split(' ')[1] || 'ჩასწორება'}</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(task.id)}
                      className="btn btn-outline"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', borderColor: '#ef4444', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <Trash2 size={13} />
                      <span>{t('deleteTask').split(' ')[1] || 'წაშლა'}</span>
                    </button>
                  </div>

                  {/* Right actions: Assign */}
                  <div>
                    {task.status === 'მოლოდინში' && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => setSelectedTask(task)}
                        style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <UserPlus size={14} />
                        <span>{t('assignToExec')}</span>
                      </button>
                    )}

                    {task.status === 'შესრულებული' && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.8rem',
                        color: 'var(--status-completed)',
                        background: 'rgba(219,39,119,0.06)',
                        padding: '0.4rem 0.8rem',
                        border: '1.5px solid var(--status-completed)',
                        fontWeight: 700
                      }}>
                        <CheckCircle size={13} />
                        <span>შესრულებულია / გადასახდელია</span>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Executors List & Assign Popup */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Assignment Popup Card */}
          {selectedTask && (
            <div className="card glass-card" style={{ 
              border: '3px solid var(--primary)', 
              boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)', fontWeight: 800 }}>
                {t('attachExecutor')}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                {t('taskTitle')}: <strong style={{ color: 'var(--text-main)' }}>{selectedTask.title}</strong>
              </p>

              <form onSubmit={handleAssignSubmit}>
                <div className="form-group">
                  <label>{t('selectITSpec')}</label>
                  <select 
                    className="form-control"
                    value={selectedExecutorId}
                    onChange={(e) => setSelectedExecutorId(e.target.value)}
                    style={{ background: '#ffffff', color: 'var(--text-main)' }}
                  >
                    <option value="">{t('selectPlaceholder')}</option>
                    {executors.map(exec => (
                      <option key={exec.id} value={exec.id} disabled={exec.isBlocked}>
                        {exec.name} ({exec.role}) {exec.isBlocked ? `[${t('blockedStatus')}]` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('instructionsForExec')}</label>
                  <textarea 
                    className="form-control"
                    placeholder={t('instructionsPlaceholder')}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={{ minHeight: '70px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.5rem 1rem', fontWeight: 800 }}>
                    {t('confirm')}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedTask(null)}
                    style={{ padding: '0.5rem 1rem', fontWeight: 800 }}
                  >
                    {t('cancel')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* IT Executors / Developers List */}
          <div className="card glass-card">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800 }}>
              <Award size={22} color="var(--accent)" />
              <span>{t('itSpecialists')}</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {executors.map((exec) => (
                <div key={exec.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderBottom: '2px solid var(--border-color)',
                  paddingBottom: '1.25rem',
                  opacity: exec.isBlocked ? 0.6 : 1
                }}>
                  <img 
                    src={exec.avatar} 
                    alt={exec.name} 
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '0',
                      objectFit: 'cover',
                      border: exec.isBlocked ? '2px solid #ef4444' : '2px solid var(--border-color)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{exec.name}</h4>
                      {exec.isBlocked && (
                        <span style={{ fontSize: '0.65rem', background: '#ef4444', color: '#fff', padding: '0.1rem 0.35rem', fontWeight: 700 }}>
                          {t('blockedStatus').toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0.1rem 0' }}>{exec.role}</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', color: '#fbbf24' }}>
                        <Star size={12} fill="#fbbf24" stroke="#fbbf24" /> {exec.rating}
                      </span>
                      <span style={{ color: '#9ca3af' }}>{exec.completedTasks} {t('casesCount')}</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 800 }}>₾{exec.balance}</span>
                    </div>

                    {/* Inspector and Block controls */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button 
                        onClick={() => setInspectedExecutor(exec)}
                        className="btn btn-outline"
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <Eye size={11} />
                        <span>ნახვა</span>
                      </button>
                      
                      <button 
                        onClick={() => onBlockExecutor(exec.id, !exec.isBlocked)}
                        className="btn btn-outline"
                        style={{ 
                          padding: '0.2rem 0.5rem', 
                          fontSize: '0.7rem', 
                          borderColor: exec.isBlocked ? '#10b981' : '#ef4444', 
                          color: exec.isBlocked ? '#10b981' : '#ef4444',
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.25rem' 
                        }}
                      >
                        {exec.isBlocked ? <Unlock size={11} /> : <Lock size={11} />}
                        <span>{exec.isBlocked ? t('unblockExecutor').split(' ')[1] : t('blockExecutor').split(' ')[1]}</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* EDIT TASK MODAL */}
      {editingTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(8px)',
          padding: '1rem'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '520px',
            background: '#ffffff',
            border: '3px solid #000000',
            boxShadow: '0 20px 0 rgba(0,0,0,0.15)',
            padding: '2rem',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button 
              onClick={() => setEditingTask(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '1.5rem', color: '#000000', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Edit2 size={20} color="var(--primary)" />
              <span>{t('editTask')}</span>
            </h3>

            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>{t('taskTitle')}</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t('taskDescription')}</label>
                <textarea 
                  className="form-control" 
                  rows="4"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  required
                  style={{ minHeight: '100px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>{t('category')}</label>
                  <select 
                    className="form-control" 
                    value={editCategory} 
                    onChange={(e) => setEditCategory(e.target.value)}
                    style={{ background: '#ffffff', color: 'var(--text-main)' }}
                  >
                    <option value="ვებ დეველოპმენტი">{t('catWeb')}</option>
                    <option value="სისტემური ადმინისტრირება">{t('catSys')}</option>
                    <option value="ქსელები და აპარატურა">{t('catNet')}</option>
                    <option value="მონაცემთა ბაზები">{t('catDb')}</option>
                    <option value="IT მხარდაჭერა">{t('catSupport')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('priority')}</label>
                  <select 
                    className="form-control" 
                    value={editPriority} 
                    onChange={(e) => setEditPriority(e.target.value)}
                    style={{ background: '#ffffff', color: 'var(--text-main)' }}
                  >
                    <option value="დაბალი">{t('priLow')}</option>
                    <option value="საშუალო">{t('priMed')}</option>
                    <option value="მაღალი">{t('priHigh')}</option>
                    <option value="კრიტიკული">{t('priCrit')}</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>{t('budget')}</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={editBudget}
                  onChange={(e) => setEditBudget(e.target.value)}
                  required
                />
              </div>

              {/* Photo Edit */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>{t('uploadPhoto')}</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                  <input 
                    type="file" 
                    id="edit-task-photo" 
                    accept="image/*" 
                    onChange={handleEditPhotoChange} 
                    style={{ display: 'none' }} 
                  />
                  <label 
                    htmlFor="edit-task-photo" 
                    style={{
                      padding: '0.6rem 1rem',
                      border: '2px dashed var(--primary)',
                      color: 'var(--primary)',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      background: 'rgba(79, 70, 229, 0.03)'
                    }}
                  >
                    შეცვლა
                  </label>
                  {editPhoto && (
                    <div style={{ position: 'relative', width: '50px', height: '50px', border: '2px solid #000' }}>
                      <img 
                        src={editPhoto} 
                        alt="Preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <button 
                        type="button"
                        onClick={() => setEditPhoto(null)}
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '16px',
                          height: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '0.75rem', fontWeight: 800 }}>
                  <Check size={18} />
                  <span>{t('saveChanges')}</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setEditingTask(null)}
                  style={{ flex: 1, padding: '0.75rem', fontWeight: 800 }}
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXECUTOR INSPECTOR MODAL */}
      {inspectedExecutor && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(8px)',
          padding: '1rem'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '550px',
            background: '#ffffff',
            border: '3px solid #000000',
            boxShadow: '0 20px 0 rgba(0,0,0,0.15)',
            padding: '2rem',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button 
              onClick={() => setInspectedExecutor(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <X size={20} />
            </button>

            {/* Profile Detail Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1.25rem' }}>
              <img 
                src={inspectedExecutor.avatar} 
                alt={inspectedExecutor.name} 
                style={{
                  width: '72px',
                  height: '72px',
                  border: '3px solid #000',
                  objectFit: 'cover'
                }}
              />
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, margin: 0 }}>{inspectedExecutor.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.15rem 0 0.4rem 0' }}>{inspectedExecutor.role}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', color: '#fbbf24', fontWeight: 700 }}>
                    <Star size={13} fill="#fbbf24" stroke="#f59e0b" /> {inspectedExecutor.rating}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>| {inspectedExecutor.completedTasks} საქმე</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>| ₾{inspectedExecutor.balance}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{t('skills')}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {inspectedExecutor.skills.map((skill, i) => (
                  <span key={i} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.2rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews Inspector */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>{t('executorReviews')}</span>
                <span style={{ fontSize: '0.75rem', background: 'var(--primary)', color: '#fff', padding: '0.1rem 0.4rem' }}>
                  {inspectedExecutor.reviews ? inspectedExecutor.reviews.length : 0}
                </span>
              </h4>

              {(!inspectedExecutor.reviews || inspectedExecutor.reviews.length === 0) ? (
                <p style={{ fontStyle: 'italic', color: '#94a3b8', fontSize: '0.85rem' }}>{t('noReviewsYet')}</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                  {inspectedExecutor.reviews.map((rev, i) => (
                    <div key={i} style={{ border: '1.5px solid var(--border-color)', padding: '0.85rem', background: '#fafafa' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{rev.company}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{rev.rating}</span>
                          <Star size={11} fill="#fbbf24" stroke="#f59e0b" />
                        </div>
                      </div>
                      <p style={{ margin: 0, fontStyle: 'italic', fontSize: '0.8rem', color: '#4b5563' }}>
                        "{rev.comment}"
                      </p>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'block', marginTop: '0.35rem', textAlign: 'right' }}>
                        {rev.date}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setInspectedExecutor(null)} style={{ padding: '0.5rem 1.5rem', fontWeight: 800 }}>
                დახურვა
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
