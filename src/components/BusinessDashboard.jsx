import React, { useState, useEffect } from 'react';
import { PlusCircle, AlertCircle, Calendar, Tag, Briefcase, FileText, Camera, Star, Trash2, X, Check } from 'lucide-react';

export default function BusinessDashboard({ tasks, onAddTask, onApproveTask, t, currentUser }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(currentUser ? currentUser.name : '');
  const [category, setCategory] = useState('IT მხარდაჭერა');
  const [priority, setPriority] = useState('საშუალო');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null); // Base64 representation of the image
  const [notification, setNotification] = useState('');

  // Rating Modal States
  const [reviewTaskId, setReviewTaskId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (currentUser) {
      setCompany(currentUser.name);
    }
  }, [currentUser]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("ფოტოს ზომა არ უნდა აღემატებოდეს 2MB-ს!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Base64 String
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !company || !budget || !description) {
      alert(t('errorFillAll'));
      return;
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title,
      company,
      category,
      priority,
      budget: parseFloat(budget),
      description,
      date: new Date().toISOString().split('T')[0],
      status: 'მოლოდინში', 
      assignedTo: null,
      managerNote: '',
      photo: photo, // Save Base64 Photo
      review: null
    };

    onAddTask(newTask);
    
    // Reset Form
    setTitle('');
    setBudget('');
    setDescription('');
    setPhoto(null);

    // Notification
    setNotification(t('successShare'));
    setTimeout(() => setNotification(''), 4000);
  };

  const handleApproveClick = (taskId) => {
    setReviewTaskId(taskId);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    onApproveTask(reviewTaskId, rating, comment);
    setReviewTaskId(null);
    setRating(5);
    setComment('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'მოლოდინში': return <span className="badge badge-pending">{t('statusPending')}</span>;
      case 'დავალებული': return <span className="badge badge-assigned">{t('statusAssigned')}</span>;
      case 'პროცესშია': return <span className="badge badge-progress">{t('statusProgress')}</span>;
      case 'შესრულებული': return <span className="badge badge-completed">{t('statusCompleted')}</span>;
      case 'დადასტურებული': return <span className="badge badge-approved">{t('statusApproved')}</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const getPriorityStyle = (pri) => {
    switch (pri) {
      case 'კრიტიკული': return { color: '#ef4444', fontWeight: 'bold' };
      case 'მაღალი': return { color: '#f97316', fontWeight: '600' };
      case 'საშუალო': return { color: '#eab308' };
      default: return { color: '#a8a29e' };
    }
  };

  const getPriorityTranslation = (pri) => {
    switch (pri) {
      case 'დაბალი': return t('priLow');
      case 'საშუალო': return t('priMed');
      case 'მაღალი': return t('priHigh');
      case 'კრიტიკული': return t('priCrit');
      default: return pri;
    }
  };

  const getCategoryTranslation = (cat) => {
    switch (cat) {
      case 'ვებ დეველოპმენტი': return t('catWeb');
      case 'სისტემური ადმინისტრირება': return t('catSys');
      case 'ქსელები და აპარატურა': return t('catNet');
      case 'მონაცემთა ბაზები': return t('catDb');
      case 'IT მხარდაჭერა': return t('catSupport');
      default: return cat;
    }
  };

  const businessTasks = tasks.filter(task => task.company.toLowerCase() === company.toLowerCase() || !currentUser);

  return (
    <div className="container" style={{ padding: '2rem 0', position: 'relative' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t('businessPortal')}
        </span>
        <h2 style={{ fontSize: '2.25rem', marginTop: '0.25rem', fontWeight: 900 }}>{t('shareProblem')}</h2>
      </div>

      {notification && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid var(--status-approved)',
          color: 'var(--status-approved)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '2.0rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backdropFilter: 'blur(10px)'
        }}>
          <AlertCircle size={20} />
          <span style={{ fontWeight: 700 }}>{notification}</span>
        </div>
      )}

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Submit Problem Form */}
        <div className="card glass-card animate-fade-in" style={{ height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800 }}>
            <PlusCircle size={22} color="var(--accent)" />
            <span>{t('createTask')}</span>
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('companyName')}</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder={t('companyPlaceholder')} 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={!!currentUser} 
              />
            </div>

            <div className="form-group">
              <label>{t('taskTitle')}</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder={t('taskTitlePlaceholder')} 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>{t('category')}</label>
                <select 
                  className="form-control" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ background: 'var(--bg-base)', color: 'var(--text-main)', border: '1px solid var(--border-glass-strong)' }}
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
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  style={{ background: 'var(--bg-base)', color: 'var(--text-main)', border: '1px solid var(--border-glass-strong)' }}
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
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder={t('budgetPlaceholder')} 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{ paddingLeft: '2rem' }}
                />
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontWeight: 700 }}>₾</span>
              </div>
            </div>

            <div className="form-group">
              <label>{t('taskDescription')}</label>
              <textarea 
                className="form-control" 
                placeholder={t('descriptionPlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ minHeight: '110px' }}
              ></textarea>
            </div>

            {/* Photo Upload Container */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Camera size={16} />
                <span>{t('uploadPhoto')}</span>
              </label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                <input 
                  type="file" 
                  id="task-photo" 
                  accept="image/*" 
                  onChange={handlePhotoChange} 
                  style={{ display: 'none' }} 
                />
                <label 
                  htmlFor="task-photo" 
                  style={{
                    padding: '0.75rem 1.25rem',
                    border: '2px dashed var(--accent)',
                    color: 'var(--accent)',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--accent-soft)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Camera size={16} />
                  <span>ატვირთვა</span>
                </label>
                {photo && (
                  <div style={{ position: 'relative', width: '60px', height: '60px', border: '1px solid var(--border-glass-strong)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                    <img 
                      src={photo} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <button 
                      type="button"
                      onClick={() => setPhoto(null)}
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
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

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}>
              {t('submitBtn')}
            </button>
          </form>
        </div>

        {/* Existing Problems Status List */}
        <div className="card glass-card" style={{ flex: '2' }}>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800 }}>
            <FileText size={22} color="var(--accent)" />
            <span>{t('taskStatusTitle')}</span>
          </h3>

          {businessTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9ca3af' }}>
              <FileText size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p style={{ fontSize: '1rem', fontWeight: 600 }}>{t('noTasksYet')}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {businessTasks.map((task) => (
                <div key={task.id} className="task-item-container" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{task.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem' }}>
                        <Briefcase size={14} /> {task.company}
                      </span>
                    </div>
                    {getStatusBadge(task.status)}
                  </div>

                  <p style={{ color: 'var(--text-main)', fontSize: '0.925rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                    {task.description}
                  </p>

                  {/* Task Photo Display */}
                  {task.photo && (
                    <div style={{ marginBottom: '1.25rem', maxWidth: '350px', border: '1px solid var(--border-glass-strong)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                      <img 
                        src={task.photo} 
                        alt={task.title} 
                        style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }} 
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(0, 0, 0, 0.04)', padding: '0.25rem 0.6rem', color: 'var(--text-sub)', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
                        <Tag size={13} /> {getCategoryTranslation(task.category)}
                      </span>
                      <span style={{ padding: '0.25rem 0.1rem' }}>
                        {t('priority')}: <span style={getPriorityStyle(task.priority)}>{getPriorityTranslation(task.priority)}</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.1rem' }}>
                        <Calendar size={13} /> {task.date}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.2rem', background: 'var(--accent-soft)', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.8rem', border: '1px solid var(--accent)' }}>
                        ₾{task.budget}
                      </span>

                      {/* Pay/Approve Action triggers rating modal */}
                      {task.status === 'შესრულებული' && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleApproveClick(task.id)}
                          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 800 }}
                        >
                          {t('approvePay')}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Rating / Review Display if approved & rated */}
                  {task.status === 'დადასტურებული' && task.review && (
                    <div style={{
                      background: 'rgba(251, 191, 36, 0.03)',
                      border: '1px solid #f59e0b',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1rem',
                      marginTop: '1.25rem',
                      fontSize: '0.85rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontWeight: 800, color: '#f59e0b' }}>{t('reviewDetails')}:</span>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < task.review.rating ? "#f59e0b" : "none"} 
                              stroke="#f59e0b" 
                            />
                          ))}
                        </div>
                        <span style={{ fontWeight: 700 }}>({task.review.rating})</span>
                      </div>
                      <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-sub)' }}>
                        "{task.review.comment || 'კომენტარის გარეშე'}"
                      </p>
                    </div>
                  )}

                  {task.managerNote && (
                    <div style={{
                      background: 'rgba(0,0,0,0.02)',
                      borderLeft: '4px solid var(--accent)',
                      borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                      padding: '0.75rem 1rem',
                      marginTop: '1rem',
                      fontSize: '0.85rem'
                    }}>
                      <strong>{t('managerComment')}</strong> {task.managerNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RATING REVIEW MODAL */}
      {reviewTaskId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(8px)',
          padding: '1rem'
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: '100%',
            maxWidth: '460px',
            border: '1px solid var(--border-glass-strong)',
            boxShadow: 'var(--shadow-hover)',
            padding: '2rem',
            position: 'relative'
          }}>
            <button 
              onClick={() => setReviewTaskId(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--text-main)' }}>
              {t('writeReview')}
            </h3>

            <form onSubmit={handleReviewSubmit}>
              {/* Star Rating selector */}
              <div className="form-group" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700 }}>ვარსკვლავები</label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        transition: 'transform 0.1s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Star 
                        size={32} 
                        fill={star <= rating ? "#fbbf24" : "none"} 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                      />
                    </button>
                  ))}
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.5rem', display: 'block' }}>
                  {rating} / 5
                </span>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>{t('commentRecommendation')}</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="მაგ: დავალება შესრულდა ძალიან სწრაფად და ხარისხიანად..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  style={{ minHeight: '100px' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '0.75rem', fontWeight: 800 }}>
                  <Check size={18} />
                  <span>{t('submitReview')}</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setReviewTaskId(null)}
                  style={{ flex: 1, padding: '0.75rem', fontWeight: 800 }}
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
