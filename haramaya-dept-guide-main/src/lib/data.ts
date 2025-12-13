// Types
export interface Student {
  id: string;
  username: string;
  password: string;
  fullName: string;
  year: number;
  department: string | null;
  departmentPending?: boolean;
  entranceResult: number;
  fatherName: string;
  motherName: string;
  dob: string;
  address: {
    region: string;
    zone: string;
    woreda: string;
    kebele: string;
  };
  phone: string;
  email: string;
  profilePic?: string;
}

export interface Course {
  code: string;
  name: string;
  credits: number;
  prereqs?: string[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  courses: {
    [yearKey: string]: {
      sem1: Course[];
      sem2: Course[];
    };
  };
}

export interface FreshmanCourses {
  sem1: Course[];
  sem2: Course[];
}

export interface Admin {
  id: string;
  username: string;
  password: string;
  fullName: string;
}

// Seed Data
export const DEPARTMENTS_SEED: Department[] = [
  {
    id: "CSE",
    name: "Computer Science & Engineering",
    description: "The Department of Computer Science & Engineering prepares students for careers in software development, systems analysis, and technological innovation. Our curriculum combines theoretical foundations with practical programming skills.",
    icon: "💻",
    courses: {
      year2: {
        sem1: [
          { code: "CSE201", name: "Data Structures", credits: 4, prereqs: ["FRESH102"] },
          { code: "CSE203", name: "Discrete Mathematics", credits: 3 },
          { code: "CSE205", name: "Object-Oriented Programming", credits: 4, prereqs: ["FRESH102"] },
          { code: "CSE207", name: "Computer Organization", credits: 3 },
        ],
        sem2: [
          { code: "CSE202", name: "Algorithms", credits: 4, prereqs: ["CSE201"] },
          { code: "CSE204", name: "Digital Logic Design", credits: 3 },
          { code: "CSE206", name: "Database Systems", credits: 4 },
          { code: "CSE208", name: "Web Development", credits: 3 },
        ],
      },
      year3: {
        sem1: [
          { code: "CSE301", name: "Operating Systems", credits: 4 },
          { code: "CSE303", name: "Computer Networks", credits: 4 },
          { code: "CSE305", name: "Software Engineering", credits: 3 },
          { code: "CSE307", name: "Theory of Computation", credits: 3 },
        ],
        sem2: [
          { code: "CSE302", name: "Artificial Intelligence", credits: 4 },
          { code: "CSE304", name: "Computer Graphics", credits: 3 },
          { code: "CSE306", name: "Information Security", credits: 3 },
          { code: "CSE308", name: "Mobile Application Development", credits: 3 },
        ],
      },
    },
  },
  {
    id: "CIV",
    name: "Civil Engineering",
    description: "The Civil Engineering Department equips students with knowledge in structural design, construction management, and infrastructure development. Graduates contribute to building Ethiopia's future.",
    icon: "🏗️",
    courses: {
      year2: {
        sem1: [
          { code: "CIV201", name: "Strength of Materials", credits: 4 },
          { code: "CIV203", name: "Surveying I", credits: 4 },
          { code: "CIV205", name: "Engineering Mechanics", credits: 3 },
          { code: "CIV207", name: "Building Materials", credits: 3 },
        ],
        sem2: [
          { code: "CIV202", name: "Structural Analysis I", credits: 4, prereqs: ["CIV201"] },
          { code: "CIV204", name: "Hydraulics", credits: 4 },
          { code: "CIV206", name: "Surveying II", credits: 3, prereqs: ["CIV203"] },
          { code: "CIV208", name: "Soil Mechanics", credits: 3 },
        ],
      },
      year3: {
        sem1: [
          { code: "CIV301", name: "Structural Analysis II", credits: 4 },
          { code: "CIV303", name: "Highway Engineering", credits: 4 },
          { code: "CIV305", name: "Hydrology", credits: 3 },
          { code: "CIV307", name: "Construction Management", credits: 3 },
        ],
        sem2: [
          { code: "CIV302", name: "Reinforced Concrete Design", credits: 4 },
          { code: "CIV304", name: "Foundation Engineering", credits: 4 },
          { code: "CIV306", name: "Environmental Engineering", credits: 3 },
          { code: "CIV308", name: "Quantity Surveying", credits: 3 },
        ],
      },
    },
  },
  {
    id: "BEC",
    name: "Business & Economics",
    description: "The Business & Economics Department develops future leaders in commerce, finance, and economic policy. Students gain skills in analysis, management, and entrepreneurship.",
    icon: "📊",
    courses: {
      year2: {
        sem1: [
          { code: "BEC201", name: "Microeconomics", credits: 3 },
          { code: "BEC203", name: "Financial Accounting I", credits: 4 },
          { code: "BEC205", name: "Business Statistics", credits: 3 },
          { code: "BEC207", name: "Organizational Behavior", credits: 3 },
        ],
        sem2: [
          { code: "BEC202", name: "Macroeconomics", credits: 3 },
          { code: "BEC204", name: "Management Principles", credits: 3 },
          { code: "BEC206", name: "Financial Accounting II", credits: 4, prereqs: ["BEC203"] },
          { code: "BEC208", name: "Business Law", credits: 3 },
        ],
      },
      year3: {
        sem1: [
          { code: "BEC301", name: "Marketing Management", credits: 3 },
          { code: "BEC303", name: "Cost Accounting", credits: 4 },
          { code: "BEC305", name: "Operations Management", credits: 3 },
          { code: "BEC307", name: "International Trade", credits: 3 },
        ],
        sem2: [
          { code: "BEC302", name: "Financial Management", credits: 4 },
          { code: "BEC304", name: "Human Resource Management", credits: 3 },
          { code: "BEC306", name: "Entrepreneurship", credits: 3 },
          { code: "BEC308", name: "Research Methods", credits: 3 },
        ],
      },
    },
  },
  {
    id: "AGR",
    name: "Agriculture & Environmental Sciences",
    description: "The Agriculture Department is central to Haramaya University's mission. Students learn modern farming techniques, sustainable agriculture, and food security strategies for Ethiopia's development.",
    icon: "🌾",
    courses: {
      year2: {
        sem1: [
          { code: "AGR201", name: "Crop Science", credits: 4 },
          { code: "AGR203", name: "Soil Science", credits: 4 },
          { code: "AGR205", name: "Agricultural Botany", credits: 3 },
          { code: "AGR207", name: "Farm Mechanics", credits: 3 },
        ],
        sem2: [
          { code: "AGR202", name: "Agronomy Lab", credits: 3, prereqs: ["AGR201"] },
          { code: "AGR204", name: "Animal Husbandry", credits: 4 },
          { code: "AGR206", name: "Agricultural Economics", credits: 3 },
          { code: "AGR208", name: "Irrigation Engineering", credits: 3 },
        ],
      },
      year3: {
        sem1: [
          { code: "AGR301", name: "Plant Pathology", credits: 4 },
          { code: "AGR303", name: "Livestock Production", credits: 4 },
          { code: "AGR305", name: "Horticulture", credits: 3 },
          { code: "AGR307", name: "Agricultural Extension", credits: 3 },
        ],
        sem2: [
          { code: "AGR302", name: "Post-Harvest Technology", credits: 3 },
          { code: "AGR304", name: "Sustainable Agriculture", credits: 3 },
          { code: "AGR306", name: "Agroforestry", credits: 3 },
          { code: "AGR308", name: "Research Project", credits: 4 },
        ],
      },
    },
  },
  {
    id: "MED",
    name: "Health & Medical Sciences",
    description: "The Health Sciences Department trains future healthcare professionals to serve Ethiopian communities. Our programs emphasize both clinical skills and public health approaches.",
    icon: "⚕️",
    courses: {
      year2: {
        sem1: [
          { code: "MED201", name: "Human Anatomy I", credits: 4 },
          { code: "MED203", name: "Biochemistry", credits: 4 },
          { code: "MED205", name: "Medical Ethics", credits: 2 },
          { code: "MED207", name: "Health Psychology", credits: 3 },
        ],
        sem2: [
          { code: "MED202", name: "Human Anatomy II", credits: 4, prereqs: ["MED201"] },
          { code: "MED204", name: "Physiology", credits: 4 },
          { code: "MED206", name: "Microbiology", credits: 4 },
          { code: "MED208", name: "Public Health Basics", credits: 3 },
        ],
      },
      year3: {
        sem1: [
          { code: "MED301", name: "Pathology", credits: 4 },
          { code: "MED303", name: "Pharmacology", credits: 4 },
          { code: "MED305", name: "Community Health", credits: 3 },
          { code: "MED307", name: "Clinical Skills I", credits: 3 },
        ],
        sem2: [
          { code: "MED302", name: "Internal Medicine", credits: 4 },
          { code: "MED304", name: "Clinical Skills II", credits: 4 },
          { code: "MED306", name: "Epidemiology", credits: 3 },
          { code: "MED308", name: "Health Systems", credits: 3 },
        ],
      },
    },
  },
  {
    id: "LAW",
    name: "Law & Legal Studies",
    description: "The Law School prepares students for careers in legal practice, public service, and justice administration. Our curriculum covers Ethiopian law, international law, and legal reasoning.",
    icon: "⚖️",
    courses: {
      year2: {
        sem1: [
          { code: "LAW201", name: "Constitutional Law", credits: 4 },
          { code: "LAW203", name: "Criminal Law I", credits: 4 },
          { code: "LAW205", name: "Legal Research & Writing", credits: 3 },
          { code: "LAW207", name: "Law of Contracts", credits: 3 },
        ],
        sem2: [
          { code: "LAW202", name: "Administrative Law", credits: 3 },
          { code: "LAW204", name: "Criminal Law II", credits: 4, prereqs: ["LAW203"] },
          { code: "LAW206", name: "Property Law", credits: 4 },
          { code: "LAW208", name: "Family Law", credits: 3 },
        ],
      },
      year3: {
        sem1: [
          { code: "LAW301", name: "Law of Torts", credits: 4 },
          { code: "LAW303", name: "Commercial Law", credits: 4 },
          { code: "LAW305", name: "International Law", credits: 3 },
          { code: "LAW307", name: "Legal Practice I", credits: 3 },
        ],
        sem2: [
          { code: "LAW302", name: "Evidence Law", credits: 4 },
          { code: "LAW304", name: "Labor Law", credits: 3 },
          { code: "LAW306", name: "Environmental Law", credits: 3 },
          { code: "LAW308", name: "Legal Practice II", credits: 4 },
        ],
      },
    },
  },
];

export const FRESHMAN_COURSES_SEED: FreshmanCourses = {
  sem1: [
    { code: "FRESH101", name: "Communicative English Skills I", credits: 3 },
    { code: "FRESH102", name: "Introduction to Computing", credits: 3 },
    { code: "FRESH103", name: "Mathematics for Natural Sciences I", credits: 4 },
    { code: "FRESH104", name: "General Psychology", credits: 3 },
    { code: "FRESH105", name: "Logic and Critical Thinking", credits: 3 },
    { code: "FRESH106", name: "Physical Fitness", credits: 1 },
  ],
  sem2: [
    { code: "FRESH201", name: "Communicative English Skills II", credits: 3, prereqs: ["FRESH101"] },
    { code: "FRESH202", name: "Mathematics for Natural Sciences II", credits: 4, prereqs: ["FRESH103"] },
    { code: "FRESH203", name: "General Physics", credits: 4 },
    { code: "FRESH204", name: "Geography of Ethiopia & the Horn", credits: 3 },
    { code: "FRESH205", name: "Civics and Ethics", credits: 3 },
    { code: "FRESH206", name: "Entrepreneurship", credits: 2 },
  ],
};

export const ADMINS_SEED: Admin[] = [
  {
    id: "ADMIN001",
    username: "admin",
    password: "admin123",
    fullName: "System Administrator",
  },
];

// Storage keys
export const STORAGE_KEYS = {
  STUDENTS: "hu_students",
  DEPARTMENTS: "hu_departments",
  FRESHMAN_COURSES: "hu_freshmanCourses",
  ADMINS: "hu_admins",
  SESSION: "hu_session",
};

// Seed data if empty
export function seedDataIfEmpty(): void {
  if (!localStorage.getItem(STORAGE_KEYS.DEPARTMENTS)) {
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(DEPARTMENTS_SEED));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FRESHMAN_COURSES)) {
    localStorage.setItem(STORAGE_KEYS.FRESHMAN_COURSES, JSON.stringify(FRESHMAN_COURSES_SEED));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMINS)) {
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(ADMINS_SEED));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify([]));
  }
}

// Data access functions
export function getStudents(): Student[] {
  const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  return data ? JSON.parse(data) : [];
}

export function saveStudents(students: Student[]): void {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
}

export function getDepartments(): Department[] {
  const data = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
  return data ? JSON.parse(data) : [];
}

export function getDepartmentById(deptId: string): Department | undefined {
  const departments = getDepartments();
  return departments.find((d) => d.id === deptId);
}

export function getFreshmanCourses(): FreshmanCourses {
  const data = localStorage.getItem(STORAGE_KEYS.FRESHMAN_COURSES);
  return data ? JSON.parse(data) : { sem1: [], sem2: [] };
}

export function getAdmins(): Admin[] {
  const data = localStorage.getItem(STORAGE_KEYS.ADMINS);
  return data ? JSON.parse(data) : [];
}

// Session management
export function setSession(studentId: string): void {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ studentId }));
}

export function getSession(): { studentId: string } | null {
  const data = localStorage.getItem(STORAGE_KEYS.SESSION);
  return data ? JSON.parse(data) : null;
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

export function getCurrentStudent(): Student | null {
  const session = getSession();
  if (!session) return null;
  const students = getStudents();
  return students.find((s) => s.id === session.studentId) || null;
}

export function updateStudent(updatedStudent: Student): void {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === updatedStudent.id);
  if (index !== -1) {
    students[index] = updatedStudent;
    saveStudents(students);
  }
}

// Generate student ID
export function generateStudentId(year: number): string {
  const students = getStudents();
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const count = students.length + 1;
  return `HU${currentYear}STU${count.toString().padStart(4, "0")}`;
}

// Validation helpers
export function isUsernameTaken(username: string): boolean {
  const students = getStudents();
  return students.some((s) => s.username.toLowerCase() === username.toLowerCase());
}

export function isEmailTaken(email: string): boolean {
  const students = getStudents();
  return students.some((s) => s.email.toLowerCase() === email.toLowerCase());
}
