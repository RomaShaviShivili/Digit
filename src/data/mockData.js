export const INITIAL_EXECUTORS = [
  {
    id: "exec-1",
    name: "გიორგი ნოზაძე",
    role: "Senior Full-Stack დეველოპერი",
    rating: 4.9,
    completedTasks: 42,
    skills: ["React", "Node.js", "PostgreSQL", "API ინტეგრაცია"],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    status: "აქტიური",
    balance: 1450
  },
  {
    id: "exec-2",
    name: "დავით კაპანაძე",
    role: "ქსელებისა და სისტემური ადმინისტრატორი",
    rating: 4.8,
    completedTasks: 35,
    skills: ["Cisco", "Linux Server", "VPN კონფიგურაცია", "Cybersecurity"],
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
    status: "აქტიური",
    balance: 890
  },
  {
    id: "exec-3",
    name: "ანი მელიქიძე",
    role: "IT მხარდაჭერის სპეციალისტი",
    rating: 4.7,
    completedTasks: 28,
    skills: ["Windows Troubleshooting", "აპარატურის შეკეთება", "Office 365"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    status: "აქტიური",
    balance: 540
  }
];

export const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "სერვერის მიგრაცია Cloud-ზე",
    description: "კომპანიის შიდა ფაილური სერვერის გადატანა AWS/Google Cloud გარემოში უსაფრთხოების ნორმების დაცვით.",
    category: "სისტემური ადმინისტრირება",
    priority: "მაღალი",
    budget: 800,
    company: "თეგეტა მოტორსი",
    date: "2026-06-19",
    status: "მოლოდინში", // "მოლოდინში", "დავალებული", "პროცესშია", "შესრულებული", "დადასტურებული"
    assignedTo: null,
    managerNote: ""
  },
  {
    id: "task-2",
    title: "ონლაინ მაღაზიის API ხარვეზი",
    description: "საგადახდო სისტემის API ინტეგრაციას აქვს დაყოვნება და ზოგიერთი ტრანზაქცია არ აისახება ბაზაში.",
    category: "ვებ დეველოპმენტი",
    priority: "კრიტიკული",
    budget: 1200,
    company: "ფრესკო",
    date: "2026-06-20",
    status: "პროცესშია",
    assignedTo: "exec-1",
    managerNote: "გიორგი, გთხოვ სასწრაფოდ შეამოწმო ლოგები და გაასწორო Webhook-ის პასუხი."
  },
  {
    id: "task-3",
    title: "ოფისის ლოკალური ქსელის გამართვა",
    description: "ახალ ფილიალში 15 სამუშაო ადგილზე ინტერნეტის ქსელის გაყვანა და როუტერების კონფიგურაცია.",
    category: "ქსელები და აპარატურა",
    priority: "საშუალო",
    budget: 450,
    company: "ელიტ ელექტრონიქსი",
    date: "2026-06-18",
    status: "დადასტურებული",
    assignedTo: "exec-2",
    managerNote: "დავითმა სამუშაო შეასრულა უმაღლეს დონეზე, დადასტურებულია."
  }
];

// Helper functions for LocalStorage management
export const loadData = () => {
  const tasks = localStorage.getItem("digit_tasks");
  const executors = localStorage.getItem("digit_executors");
  
  return {
    tasks: tasks ? JSON.parse(tasks) : INITIAL_TASKS,
    executors: executors ? JSON.parse(executors) : INITIAL_EXECUTORS
  };
};

export const saveData = (tasks, executors) => {
  localStorage.setItem("digit_tasks", JSON.stringify(tasks));
  localStorage.setItem("digit_executors", JSON.stringify(executors));
};
