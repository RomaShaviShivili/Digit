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
    balance: 1450,
    isBlocked: false,
    reviews: [
      {
        company: "ფრესკო",
        rating: 5.0,
        comment: "საუკეთესო ვებ დეველოპერია, ყველაფერი დროულად გააკეთა!",
        date: "2026-06-20"
      },
      {
        company: "საქართველოს ბანკი",
        rating: 4.8,
        comment: "ძალიან კმაყოფილი ვართ API-ის ინტეგრაციით. რეკომენდაციას ვუწევთ!",
        date: "2026-05-12"
      }
    ]
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
    balance: 890,
    isBlocked: false,
    reviews: [
      {
        company: "ელიტ ელექტრონიქსი",
        rating: 4.8,
        comment: "ქსელი გამართა უმოკლეს დროში, ძალიან კმაყოფილები ვართ.",
        date: "2026-06-18"
      }
    ]
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
    balance: 540,
    isBlocked: false,
    reviews: []
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
    managerNote: "",
    photo: null,
    review: null
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
    managerNote: "გიორგი, გთხოვ სასწრაფოდ შეამოწმო ლოგები და გაასწორო Webhook-ის პასუხი.",
    photo: null,
    review: null
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
    managerNote: "დავითმა სამუშაო შეასრულა უმაღლეს დონეზე, დადასტურებულია.",
    photo: null,
    review: {
      rating: 4.8,
      comment: "ქსელი გამართა უმოკლეს დროში, ძალიან კმაყოფილები ვართ."
    }
  }
];

export const INITIAL_USERS = [
  {
    username: "business",
    password: "password",
    role: "business",
    name: "Business Client",
    executorId: null
  },
  {
    username: "manager",
    password: "password",
    role: "manager",
    name: "Coordinator Manager",
    executorId: null
  },
  {
    username: "giorgi",
    password: "password",
    role: "executor",
    name: "გიორგი ნოზაძე",
    executorId: "exec-1"
  },
  {
    username: "daviti",
    password: "password",
    role: "executor",
    name: "დავით კაპანაძე",
    executorId: "exec-2"
  },
  {
    username: "ani",
    password: "password",
    role: "executor",
    name: "ანი მელიქიძე",
    executorId: "exec-3"
  }
];

export const loadData = () => {
  const tasks = localStorage.getItem("digit_tasks");
  const executors = localStorage.getItem("digit_executors");
  const users = localStorage.getItem("digit_users");
  
  return {
    tasks: tasks ? JSON.parse(tasks) : INITIAL_TASKS,
    executors: executors ? JSON.parse(executors) : INITIAL_EXECUTORS,
    users: users ? JSON.parse(users) : INITIAL_USERS
  };
};

export const saveData = (tasks, executors) => {
  localStorage.setItem("digit_tasks", JSON.stringify(tasks));
  localStorage.setItem("digit_executors", JSON.stringify(executors));
};

export const loadUsers = () => {
  const users = localStorage.getItem("digit_users");
  return users ? JSON.parse(users) : INITIAL_USERS;
};

export const saveUsers = (users) => {
  localStorage.setItem("digit_users", JSON.stringify(users));
};

export const authenticateUser = (username, password) => {
  const users = loadUsers();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
  return user || null;
};

export const registerUser = (username, password, role, name, extraDetails = {}) => {
  const users = loadUsers();
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, message: "მომხმარებელი ამ სახელით უკვე არსებობს" };
  }

  let executorId = null;
  if (role === 'executor') {
    executorId = `exec-${Date.now()}`;
    const executors = JSON.parse(localStorage.getItem("digit_executors") || JSON.stringify(INITIAL_EXECUTORS));
    const newExecutor = {
      id: executorId,
      name: name,
      role: extraDetails.role || "IT Developer",
      rating: 5.0,
      completedTasks: 0,
      skills: extraDetails.skills || ["General IT"],
      avatar: extraDetails.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      status: "აქტიური",
      balance: 0,
      isBlocked: false,
      reviews: []
    };
    executors.push(newExecutor);
    localStorage.setItem("digit_executors", JSON.stringify(executors));
  }

  const newUser = { username, password, role, name, executorId };
  users.push(newUser);
  saveUsers(users);
  return { success: true, user: newUser };
};
