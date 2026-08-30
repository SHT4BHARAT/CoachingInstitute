export interface Batch {
  id: string;
  titleMr: string;
  titleEn: string;
  targetExam: string;
  standard: string;
  price: number;
  originalPrice: number;
  studentsCount: number;
  rating: number;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  teachers: string[];
  featuresMr: string[];
  featuresEn: string[];
  totalLectures: number;
  freeDemoCount: number;
  syllabusCompletion: number;
}

export interface Lecture {
  id: string;
  batchId: string;
  titleMr: string;
  titleEn: string;
  subject: string;
  chapter: string;
  teacherNameMr: string;
  durationMinutes: number;
  isFreeDemo: boolean;
  videoQualities: string[];
  videoUrl: string;
  notesPagesCount: number;
  dppAvailable: boolean;
  uploadDate: string;
  chapters: { time: number; title: string }[];
}

export interface StudyMaterial {
  id: string;
  batchId: string;
  titleMr: string;
  titleEn: string;
  subject: string;
  type: 'CLASS_NOTES' | 'FORMULA_SHEET' | 'DPP' | 'PYQ';
  pages: number;
  author: string;
  contentSnippetMr: string;
  formulaSnippets?: string[];
}

export interface DoubtTicket {
  id: string;
  studentNameMr: string;
  studentPhone: string;
  subject: string;
  standard: string;
  questionMr: string;
  hasVoiceNote?: boolean;
  hasImage?: boolean;
  status: 'AI_RESOLVED' | 'OPEN' | 'ASSIGNED' | 'RESOLVED';
  aiAnswerMr?: string;
  aiBalbharatiRef?: string;
  assignedTeacherMr?: string;
  teacherVoiceAnswerUrl?: string;
  teacherWhiteboardSnapshot?: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: string;
  section: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
  questionMr: string;
  questionEn: string;
  formulaLatex?: string;
  options: { id: string; textMr: string; textEn: string }[];
  correctOptionId: string;
  marksPositive: number;
  marksNegative: number;
  solutionMr: string;
  solutionFormula?: string;
}

export interface Quiz {
  id: string;
  titleMr: string;
  titleEn: string;
  targetExam: string;
  timeLimitMinutes: number;
  totalMarks: number;
  questionsCount: number;
  questions: QuizQuestion[];
}

// 1. Batches Data
export const mockBatches: Batch[] = [
  {
    id: 'batch-cet-2026',
    titleMr: 'MHT-CET २०२६ संकल्प विजय क्रॅश कोर्स (PCM/PCB)',
    titleEn: 'MHT-CET 2026 Target Vijay Crash Course',
    targetExam: 'MHT-CET 2026 (Engineering / Pharmacy)',
    standard: '12th + CET',
    price: 1999,
    originalPrice: 4999,
    studentsCount: 14850,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    thumbnailWidth: 800,
    thumbnailHeight: 450,
    teachers: ['प्रा. अनंत कुलकर्णी (Physics)', 'प्रा. मंदार जोशी (Maths)', 'डॉ. सुहास कदम (Chemistry)'],
    featuresMr: [
      '२००+ तास रेकॉर्डेड व लाईव्ह समस्या निवारण लेक्चर्स',
      '२ मोफत डेमो लेक्चर्स प्रत्येक विषयासाठी',
      'कोकण व ग्रामीण भागासाठी विशेष २४०p लो-डेटा मोड',
      'पूर्ण MHT-CET NTA-पद्धती ऑनलाइन संगणकीय टेस्ट सिरीज (CBT)',
      'कृत्रिम बुद्धिमत्ता (AI) + शिक्षक शंका समाधान कक्ष',
    ],
    featuresEn: [
      '200+ Hours Recorded Theory & Live Problem Solving',
      '2 Free Demo Lectures for Every Subject',
      'Dedicated 240p Konkan Low-Bandwidth Mode',
      'Official MHT-CET CBT Simulator Mock Tests',
      'AI Instant Doubt Solver + 1-Click Teacher Escalation',
    ],
    totalLectures: 140,
    freeDemoCount: 2,
    syllabusCompletion: 68,
  },
  {
    id: 'batch-12th-hsc',
    titleMr: 'इयत्ता १२वी HSC सायन्स संपूर्ण बोर्ड तयारी बॅच २०२६',
    titleEn: 'Class 12th HSC Science Complete Board Batch 2026',
    targetExam: 'Maharashtra State Board HSC 2026',
    standard: '12th Science',
    price: 1499,
    originalPrice: 3999,
    studentsCount: 9240,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    thumbnailWidth: 800,
    thumbnailHeight: 450,
    teachers: ['प्रा. अनंत कुलकर्णी (Physics)', 'डॉ. सुहास कदम (Chemistry)', 'प्रा. मंदार जोशी (Maths)'],
    featuresMr: [
      'बालभारती पाठ्यपुस्तकावर आधारित संपूर्ण मराठी व इंग्रजी विश्लेषण',
      'हस्तलिखित नोट्स व बोर्ड परीक्षा उत्तरपत्रिका लेखन तंत्र',
      'मागील १० वर्षांच्या प्रश्नपत्रिकांचे (PYQ) सविस्तर स्पष्टीकरण',
      'कॅनव्हास-संरक्षित डिजिटल नोट्स (स्क्रीनशॉट बंदी)',
    ],
    featuresEn: [
      'Comprehensive Balbharati Textbook Chapter Breakdown',
      'Handwritten Notes & Board Answer Sheet Writing Strategies',
      '10 Years Previous Year Question Papers (PYQ) Detailed Solutions',
      'Canvas-Sandboxed Digital Notes with DRM Protection',
    ],
    totalLectures: 110,
    freeDemoCount: 2,
    syllabusCompletion: 74,
  },
  {
    id: 'batch-10th-ssc',
    titleMr: 'इयत्ता १०वी SSC बोर्ड टॉपर महा-बॅच २०२६ (मराठी व सेमी-इंग्रजी)',
    titleEn: 'Class 10th SSC Board Topper Master Batch 2026',
    targetExam: 'Maharashtra State Board SSC 2026',
    standard: '10th SSC',
    price: 999,
    originalPrice: 2499,
    studentsCount: 18400,
    rating: 4.95,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    thumbnailWidth: 800,
    thumbnailHeight: 450,
    teachers: ['प्रा. निलेश सावंत (विज्ञान)', 'प्रा. मंदार जोशी (गणित)', 'सौ. अपर्णा गोडबोले (इंग्रजी व भाषा)'],
    featuresMr: [
      'गणित भाग १ व २, विज्ञान भाग १ व २ चे पूर्ण संकल्पना स्पष्टीकरण',
      'प्रमेय, आकृत्या व रासायनिक समीकरणांची विशेष सराव सत्रे',
      'प्रत्येक पाठावर आधारित ऑनलाइन क्विझ व त्वरित गुण',
      'पालकांसाठी मासिक प्रगती अहवाल व उपस्थिती निरीक्षण',
    ],
    featuresEn: [
      'Mathematics Parts 1 & 2, Science Parts 1 & 2 Concept Mastery',
      'Special Geometry Theorems, Circuit Diagrams & Reaction Workshops',
      'Lecture-Wise Quick Quizzes with Instant Scorecard',
      'Monthly Parent Progress Reports & Attendance Tracking',
    ],
    totalLectures: 95,
    freeDemoCount: 2,
    syllabusCompletion: 82,
  },
];

// 2. Lectures Data
export const mockLectures: Lecture[] = [
  {
    id: 'lec-phy-01',
    batchId: 'batch-cet-2026',
    titleMr: 'लेक्चर ०१: परिभ्रमण गती (Rotational Dynamics) - मूलभूत संकल्पना व जडत्वाचे परिबल (Moment of Inertia)',
    titleEn: 'Lecture 01: Rotational Dynamics - Core Concepts & Moment of Inertia',
    subject: 'भौतिकशास्त्र (Physics)',
    chapter: 'प्रकरण १: परिभ्रमण गती (Rotational Dynamics)',
    teacherNameMr: 'प्रा. अनंत कुलकर्णी',
    durationMinutes: 48,
    isFreeDemo: true,
    videoQualities: ['1080p', '720p', '480p', '240p (कोकण मोड)'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    notesPagesCount: 8,
    dppAvailable: true,
    uploadDate: '2026-08-25',
    chapters: [
      { time: 0, title: 'प्रास्ताविक व कोनीय विस्थापन (Angular Displacement)' },
      { time: 620, title: 'अभिकेंद्री बल (Centripetal vs Centrifugal Force)' },
      { time: 1450, title: 'जडत्वाचे परिबल व समांतर अक्षांचा सिद्धांत (Parallel Axis Theorem)' },
      { time: 2200, title: 'MHT-CET मागील वर्षांचे उदाहरणे व शॉर्टकट ट्रिक्स' },
    ],
  },
  {
    id: 'lec-math-01',
    batchId: 'batch-cet-2026',
    titleMr: 'लेक्चर ०२: निश्चित संकलन (Definite Integration) - गुणधर्म व शॉर्टकट युक्त्या',
    titleEn: 'Lecture 02: Definite Integration - Properties & King Property Shortcuts',
    subject: 'गणित (Mathematics)',
    chapter: 'प्रकरण ३: निश्चित संकलन (Definite Integration)',
    teacherNameMr: 'प्रा. मंदार जोशी',
    durationMinutes: 52,
    isFreeDemo: true,
    videoQualities: ['1080p', '720p', '480p', '240p (कोकण मोड)'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    notesPagesCount: 12,
    dppAvailable: true,
    uploadDate: '2026-08-26',
    chapters: [
      { time: 0, title: 'निश्चित संकलनाची मूलभूत व्याख्या' },
      { time: 700, title: 'किंग प्रॉपर्टी (King Property: f(a+b-x))' },
      { time: 1800, title: 'MHT-CET ५-सेकंद उत्तर काढण्याच्या ट्रिक्स' },
    ],
  },
  {
    id: 'lec-chem-01',
    batchId: 'batch-cet-2026',
    titleMr: 'लेक्चर ०३: रासायनिक गतिशास्त्र (Chemical Kinetics) - अभिक्रिया दर व प्रथम कोटी अभिक्रिया',
    titleEn: 'Lecture 03: Chemical Kinetics - Rate of Reaction & First Order Kinetics',
    subject: 'रसायनशास्त्र (Chemistry)',
    chapter: 'प्रकरण ४: रासायनिक गतिशास्त्र',
    teacherNameMr: 'डॉ. सुहास कदम',
    durationMinutes: 45,
    isFreeDemo: false,
    videoQualities: ['1080p', '720p', '480p', '240p (कोकण मोड)'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    notesPagesCount: 10,
    dppAvailable: true,
    uploadDate: '2026-08-28',
    chapters: [
      { time: 0, title: 'अभिक्रिया दर व सरासरी दर' },
      { time: 900, title: 'प्रथम कोटी अभिक्रिया एकात्मिक दर समीकरण (Integrated Rate Law)' },
      { time: 1950, title: 'अर्धायुष्य काळ ($t_{1/2}$) व CET आलेख उदाहरणे' },
    ],
  },
];

// 3. Study Materials
export const mockStudyMaterials: StudyMaterial[] = [
  {
    id: 'mat-01',
    batchId: 'batch-cet-2026',
    titleMr: 'हस्तलिखित नोट्स: परिभ्रमण गती व जडत्वाचे परिबल',
    titleEn: 'Handwritten Notes: Rotational Dynamics & Moment of Inertia',
    subject: 'भौतिकशास्त्र (Physics)',
    type: 'CLASS_NOTES',
    pages: 14,
    author: 'प्रा. अनंत कुलकर्णी',
    contentSnippetMr: '१. कोनीय संवेग $L = I\\omega$. २. फिरणाऱ्या चकतीचे जडत्वाचे परिबल $I = \\frac{1}{2} M R^2$. ३. समांतर अक्षाचा सिद्धांत: $I_0 = I_c + M h^2$.',
    formulaSnippets: ['L = I \\omega', 'I_0 = I_c + M h^2', '\\tau = I \\alpha', 'E_k = \\frac{1}{2} I \\omega^2'],
  },
  {
    id: 'mat-02',
    batchId: 'batch-cet-2026',
    titleMr: 'MHT-CET महा-सूत्रपत्रिका (Formula Cheatsheet): संपूर्ण गणित भाग १ व २',
    titleEn: 'MHT-CET Master Formula Cheatsheet: Complete Mathematics',
    subject: 'गणित (Mathematics)',
    type: 'FORMULA_SHEET',
    pages: 8,
    author: 'प्रा. मंदार जोशी',
    contentSnippetMr: 'त्रिकोणमिती सूत्रे, संकलन सूत्रे, सदिश बीजगणित (Vectors) आणि ३-डी भूमितीची सर्व महत्त्वाची सूत्रे एकाच ठिकाणी.',
    formulaSnippets: ['\\int \\frac{dx}{x^2+a^2} = \\frac{1}{a} \\tan^{-1}\\left(\\frac{x}{a}\\right) + C', '\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}| \\cos \\theta'],
  },
];

// Helper: mask PII for client bundle — production should fetch from secure API.
// Never ship full phone/IP to client; thumbnails declare explicit dimensions to prevent CLS.
export const maskPhone = (p: string) => p.replace(/(\d{2})\d{6}(\d{2})/, '$1****$2');
export const maskIp = (ip: string) => ip.replace(/(\d+\.\d+)\.\d+\.\d+/, '$1.***.**');

// 4. Doubt Tickets — phones are masked in bundle; full PII only via authenticated API.
export const mockDoubts: DoubtTicket[] = [
  {
    id: 'DBT-1042',
    studentNameMr: 'रोहन देसाई',
    studentPhone: '98****10',
    subject: 'भौतिकशास्त्र (Physics)',
    standard: '12th HSC + CET',
    questionMr: 'रोटेशनल मोशनमध्ये जर बाह्य टॉर्क शून्य असेल ($\\tau_{ext} = 0$), तर कोनीय संवेग स्थिर का राहतो? त्याचे गणितीय स्पष्टीकरण काय?',
    status: 'AI_RESOLVED',
    aiAnswerMr: 'न्यूटनच्या दुसऱ्या नियमाच्या कोनीय सममूल्यानुसार, टॉर्क हा कोनीय संवेगाच्या बदलाचा दर असतो: $\\tau = \\frac{dL}{dt}$. जर $\\tau = 0$ असेल, तर $\\frac{dL}{dt} = 0$, म्हणजेच $L = \\text{Constant} (स्थिर)$. यालाच "कोनीय संवेग अक्षय्यतेचा नियम" म्हणतात. संदर्भ: बालभारती १२वी भौतिकशास्त्र, प्रकरण १, पृष्ठ १४.',
    aiBalbharatiRef: 'महाराष्ट्र राज्य पाठ्यपुस्तक (बालभारती) १२वी भौतिकशास्त्र, पान क्र. १४, कलम १.६',
    assignedTeacherMr: 'प्रा. अनंत कुलकर्णी',
    timestamp: '१० मिनिटांपूर्वी',
  },
  {
    id: 'DBT-1043',
    studentNameMr: 'स्नेहा सावंत (सिंधुदुर्ग)',
    studentPhone: '94****21',
    subject: 'गणित (Mathematics)',
    standard: 'MHT-CET',
    questionMr: 'संकलन $\\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx$ याचे उत्तर किंग प्रॉपर्टी वापरून थेट $\\frac{\\pi}{4}$ कसे येते?',
    status: 'RESOLVED',
    hasVoiceNote: true,
    aiAnswerMr: 'किंग प्रॉपर्टी $\\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx$ वापरून दोन्ही समीकरणांची बेरीज केल्यास $2I = \\int_0^{\\pi/2} 1 dx = [x]_0^{\\pi/2} = \\pi/2 \\implies I = \\pi/4$.',
    aiBalbharatiRef: 'बालभारती गणित भाग २, पान क्र. १६२, उदाहरण क्र. ४',
    assignedTeacherMr: 'प्रा. मंदार जोशी',
    teacherVoiceAnswerUrl: 'https://example.com/voice-note-1043.mp3',
    teacherWhiteboardSnapshot: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    timestamp: '४५ मिनिटांपूर्वी',
  },
  {
    id: 'DBT-1044',
    studentNameMr: 'आदित्य पाटील (कोल्हापूर)',
    studentPhone: '98****56',
    subject: 'रसायनशास्त्र (Chemistry)',
    standard: '12th HSC',
    questionMr: 'फेन प्लवन पद्धतीमध्ये (Froth Floatation Process) कलेक्टर (Collector) व फ्रॉथर (Frother) म्हणून कोणते रासायनिक घटक वापरले जातात?',
    status: 'OPEN',
    timestamp: '२ मिनिटांपूर्वी',
  },
];

// 5. Quiz Questions (MHT-CET Full Length Simulation)
export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'Q1',
    section: 'Physics',
    questionMr: 'जर एका फिरणाऱ्या चकतीची त्रिज्या स्थिर ठेवून तिचे वस्तुमान दुप्पट केले, तर तिच्या मध्य अक्षाभोवतीचे जडत्वाचे परिबल (Moment of Inertia) किती पटीने बदलेल?',
    questionEn: 'If the radius of a rotating disc is kept constant and its mass is doubled, by what factor does its Moment of Inertia about the central axis change?',
    formulaLatex: 'I = \\frac{1}{2} M R^2',
    options: [
      { id: 'A', textMr: '२ पटीने वाढेल (Doubles)', textEn: 'Doubles (2x)' },
      { id: 'B', textMr: '४ पटीने वाढेल (Quadruples)', textEn: 'Quadruples (4x)' },
      { id: 'C', textMr: 'अर्धे होईल (Halved)', textEn: 'Halved (0.5x)' },
      { id: 'D', textMr: 'अपरिवर्तित राहील (Remains Same)', textEn: 'Remains Same' },
    ],
    correctOptionId: 'A',
    marksPositive: 1,
    marksNegative: 0,
    solutionMr: 'चकतीच्या जडत्वाच्या परिबलाचे सूत्र $I = \\frac{1}{2} M R^2$ आहे. त्रिज्या $R$ स्थिर असल्याने $I \\propto M$. म्हणून वस्तुमान दुप्पट केल्यास $I$ सुद्धा दुप्पट (२ पटीने) होईल.',
    solutionFormula: 'I_2 = \\frac{1}{2}(2M)R^2 = 2 \\times I_1',
  },
  {
    id: 'Q2',
    section: 'Mathematics',
    questionMr: 'निश्चित संकलनाचे मूल्य शोधा: $\\int_0^{\\pi} \\sin^2(x) dx$',
    questionEn: 'Find the value of the definite integral: \\int_0^{\\pi} \\sin^2(x) dx',
    formulaLatex: '\\int_0^{\\pi} \\sin^2(x) dx',
    options: [
      { id: 'A', textMr: '$\\pi$', textEn: '\\pi' },
      { id: 'B', textMr: '$\\frac{\\pi}{2}$', textEn: '\\frac{\\pi}{2}' },
      { id: 'C', textMr: '$\\frac{\\pi}{4}$', textEn: '\\frac{\\pi}{4}' },
      { id: 'D', textMr: '$0$', textEn: '0' },
    ],
    correctOptionId: 'B',
    marksPositive: 2,
    marksNegative: 0,
    solutionMr: 'त्रिकोणमितीय नित्यसमीकरण $\\sin^2(x) = \\frac{1 - \\cos(2x)}{2}$ वापरून: $\\int_0^{\\pi} \\frac{1 - \\cos(2x)}{2} dx = \\left[ \\frac{x}{2} - \\frac{\\sin(2x)}{4} \\right]_0^{\\pi} = \\frac{\\pi}{2} - 0 = \\frac{\\pi}{2}$. MHT-CET मध्ये गणिताच्या प्रत्येक प्रश्नास २ गुण मिळतात!',
    solutionFormula: 'I = \\left[ \\frac{x}{2} - \\frac{\\sin(2x)}{4} \\right]_0^{\\pi} = \\frac{\\pi}{2}',
  },
  {
    id: 'Q3',
    section: 'Chemistry',
    questionMr: 'प्रथम कोटी अभिक्रियेसाठी (First Order Reaction) अर्धायुष्य काळ ($t_{1/2}$) आणि दर स्थिरांक ($k$) यांच्यातील अचूक संबंध कोणता?',
    questionEn: 'What is the exact relation between half-life (t_{1/2}) and rate constant (k) for a first-order reaction?',
    formulaLatex: 't_{1/2} = \\frac{0.693}{k}',
    options: [
      { id: 'A', textMr: '$t_{1/2} = \\frac{0.693}{k}$', textEn: 't_{1/2} = \\frac{0.693}{k}' },
      { id: 'B', textMr: '$t_{1/2} = \\frac{k}{0.693}$', textEn: 't_{1/2} = \\frac{k}{0.693}' },
      { id: 'C', textMr: '$t_{1/2} = 0.693 \\times k$', textEn: 't_{1/2} = 0.693 \\times k' },
      { id: 'D', textMr: '$t_{1/2} = \\frac{[A]_0}{2k}$', textEn: 't_{1/2} = \\frac{[A]_0}{2k}' },
    ],
    correctOptionId: 'A',
    marksPositive: 1,
    marksNegative: 0,
    solutionMr: 'प्रथम कोटी अभिक्रियेसाठी एकात्मिक दर समीकरण $k = \\frac{2.303}{t} \\log_{10}\\left(\\frac{[A]_0}{[A]}\\right)$ आहे. जेव्हा $t = t_{1/2}$ आणि $[A] = [A]_0 / 2$, तेव्हा $t_{1/2} = \\frac{2.303 \\times \\log_{10}(2)}{k} = \\frac{0.693}{k}$.',
  },
];

export const mockQuiz: Quiz = {
  id: 'quiz-mht-cet-mock-01',
  titleMr: 'MHT-CET २०२६ संपूर्ण मॉक टेस्ट ०१ (PCM)',
  titleEn: 'MHT-CET 2026 Full Length Mock Test 01 (PCM)',
  targetExam: 'MHT-CET 2026',
  timeLimitMinutes: 90,
  totalMarks: 200,
  questionsCount: 50,
  questions: mockQuizQuestions,
};
