'use client';

import React, { createContext, useContext, useState } from 'react';

export type Language = 'mr' | 'mr-en' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation & Channels
  'brand.name': {
    mr: 'महा-शिक्षा',
    'mr-en': 'MahaShiksha (महा-शिक्षा)',
    en: 'MahaShiksha AI',
  },
  'brand.tagline': {
    mr: 'महाराष्ट्रातील विद्यार्थ्यांसाठी दर्जेदार, सुरक्षित व विश्‍वासार्ह डिजिटल शिक्षण',
    'mr-en': 'Quality & Secure Digital Coaching for Maharashtra & Konkan',
    en: 'Enterprise DRM Digital Coaching for Maharashtra State Board & MHT-CET',
  },
  'nav.home': { mr: 'मुख्य पृष्ठ', 'mr-en': 'Catalog (मुख्य)', en: 'Course Catalog' },
  'nav.student': { mr: 'विद्यार्थी कक्ष', 'mr-en': 'Student (विद्यार्थी)', en: 'Student Portal' },
  'nav.teacher': { mr: 'शिक्षक स्टुडिओ', 'mr-en': 'Faculty (शिक्षक)', en: 'Educator Studio' },
  'nav.admin': { mr: 'प्रशासक केंद्र', 'mr-en': 'Admin (प्रशासक)', en: 'Admin Hub' },
  'nav.dashboard': { mr: 'डॅशबोर्ड', 'mr-en': 'Dashboard (डॅशबोर्ड)', en: 'Dashboard' },
  'nav.lectures': { mr: 'DRM लेक्चर्स', 'mr-en': 'DRM Lectures (लेक्चर्स)', en: 'DRM Classroom' },
  'nav.notes': { mr: 'सुरक्षित नोट्स', 'mr-en': 'Secure Notes (नोट्स)', en: 'Secure Notes' },
  'nav.doubts': { mr: 'AI शंका निवारण', 'mr-en': 'AI Doubt Desk (शंका)', en: 'AI Doubt Desk' },
  'nav.exams': { mr: 'MHT-CET टेस्ट (CBT)', 'mr-en': 'MHT-CET Test (CBT)', en: 'MHT-CET Mock CBT' },
  'nav.upload': { mr: 'लेक्चर अपलोड', 'mr-en': 'Lecture Upload (अपलोड)', en: 'Upload Lecture' },
  'nav.whiteboard': { mr: 'व्हाईटबोर्ड', 'mr-en': 'Whiteboard (व्हाईटबोर्ड)', en: 'Stylus Whiteboard' },
  'nav.assessments': { mr: 'प्रश्नपत्रिका बिल्डर', 'mr-en': 'Question Builder (प्रश्नपत्रिका)', en: 'Assessment Builder' },
  'nav.telemetry': { mr: 'थेट विश्लेषण', 'mr-en': 'Telemetry (थेट विश्लेषण)', en: 'Live Telemetry' },
  'nav.antipiracy': { mr: 'अँटी-पायरसी', 'mr-en': 'Anti-Piracy (अँटी-पायरसी)', en: 'Anti-Piracy Center' },
  'nav.batches_admin': { mr: 'बॅच व GST इनव्हॉइस', 'mr-en': 'Batches & GST (बॅच)', en: 'Batches & Invoicing' },

  // Role Switcher Bar
  'demo.title': { mr: 'महा-शिक्षा इन्व्हेस्टर डेमो', 'mr-en': 'MAHASHIKSHA DEMO CONSOLE', en: 'MAHASHIKSHA INVESTOR DEMO' },
  'demo.single_device_active': { mr: 'सिंगल-डिव्हाइस लॉक', 'mr-en': 'Single-Device Lock', en: 'Single-Device Lock' },
  'demo.simulate_conflict': { mr: 'डिव्हाइस संघर्ष दाखवा', 'mr-en': 'Simulate Device Conflict', en: 'Simulate Concurrent Login' },
  'demo.conflict_title': { mr: 'सुरक्षा इशारा: इतर डिव्हाइसवर लॉगिन आढळले!', 'mr-en': 'Security Alert: Concurrent Login Detected!', en: 'Security Alert: Unauthorized Concurrent Login!' },
  'demo.conflict_msg': {
    mr: 'तुमचे खाते सध्या दुसऱ्या फोन/ब्राउझरवर उघडले गेले आहे. चाचेगिरी (Piracy) रोखण्यासाठी हे सत्र स्थगित केले आहे.',
    'mr-en': 'Your account was accessed from another device (iPhone / Thane IP). This active session has been locked to prevent piracy.',
    en: 'Your account was just accessed on a secondary device. In compliance with Maharashtra Board Anti-Piracy rules, this session has been locked.',
  },
  'demo.conflict_btn': { mr: 'या डिव्हाइसवर पुन्हा सक्रिय करा', 'mr-en': 'Re-activate on this device', en: 'Authorize & Resume Session' },

  // Student Dashboard
  'student.welcome': { mr: 'नमस्कार', 'mr-en': 'Welcome back (नमस्कार)', en: 'Welcome back' },
  'student.streak': { mr: 'अभ्यास सातत्य (Streak)', 'mr-en': 'Study Streak (सातत्य)', en: 'Study Streak' },
  'student.days_continuous': { mr: '१४ दिवस सलग', 'mr-en': '14 Days Streak (१४ दिवस)', en: '14 Days Active' },
  'student.security_status': { mr: 'सुरक्षा स्थिती', 'mr-en': 'Security Status (सुरक्षा)', en: 'Security Status' },
  'student.security_active': { mr: 'DRM सिंगल डिव्हाइस', 'mr-en': 'DRM Single Device (सक्रिय)', en: 'DRM Single Device Active' },
  'student.my_batches': { mr: 'माझ्या नोंदणीकृत बॅचेस', 'mr-en': 'My Enrolled Batches (नोंदणीकृत बॅचेस)', en: 'My Enrolled Batches' },
  'student.active_batches_count': { mr: '२ बॅचेस सक्रिय', 'mr-en': '2 Batches Active (२ बॅचेस)', en: '2 Batches Active' },
  'student.syllabus_progress': { mr: 'अभ्यासक्रम प्रगती (Syllabus Completed):', 'mr-en': 'Syllabus Progress (अभ्यासक्रम प्रगती):', en: 'Syllabus Progress:' },
  'student.btn_continue': { mr: 'अभ्यास सुरू करा', 'mr-en': 'Continue Study (अभ्यास सुरू)', en: 'Continue Learning' },
  'student.today_schedule': { mr: 'आजचे वेळापत्रक', 'mr-en': "Today's Schedule (आजचे वेळापत्रक)", en: "Today's Live Schedule" },
  'student.doubt_tracker': { mr: 'शंका स्थिती (Doubt Ticket Tracker)', 'mr-en': 'Doubt Status (शंका स्थिती)', en: 'Doubt Ticket Tracker' },
  'student.doubt_all_resolved': { mr: 'सर्व शंका सोडवल्या आहेत (० प्रलंबित)', 'mr-en': 'All Doubts Resolved (० प्रलंबित)', en: 'All Doubts Resolved (0 Pending)' },
  'student.ask_new_doubt': { mr: 'नवीन शंका विचारा', 'mr-en': 'Ask New Doubt (नवीन शंका)', en: 'Ask New Question' },

  // Quick Action Cards
  'card.lectures.title': { mr: 'DRM व्हिडिओ लेक्चर्स', 'mr-en': 'DRM Video Lectures (व्हिडिओ)', en: 'Encrypted DRM Lectures' },
  'card.lectures.desc': { mr: '२४०p कोकण मोड, २ मोफत डेमो व चॅप्टर मार्क्स', 'mr-en': '240p Konkan Mode, 2 Free Demos & Timestamps', en: '240p Konkan mode, 2 Free demo trials & chapters' },
  'card.notes.title': { mr: 'कॅनव्हास-संरक्षित नोट्स', 'mr-en': 'Secure Notes Sandbox (नोट्स)', en: 'Sandboxed Notes Viewer' },
  'card.notes.desc': { mr: 'हस्तलिखित नोट्स, सूत्रपत्रिका व DPP', 'mr-en': 'Handwritten Notes, Formula Sheets & DPPs', en: 'Watermarked Handwritten Notes & Formula Sheets' },
  'card.doubts.title': { mr: 'AI शंका निवारण कक्ष', 'mr-en': 'AI Doubt Desk (शंका निरसन)', en: 'Balbharati AI Doubt Desk' },
  'card.doubts.desc': { mr: 'बालभारती संदर्भ + शिक्षक व्हॉईस ट्रान्सफर', 'mr-en': 'Balbharati RAG + 1-Click Teacher Voice Escalation', en: 'Balbharati RAG + 1-Click Faculty Escalation' },
  'card.exams.title': { mr: 'MHT-CET CBT टेस्ट सिरीज', 'mr-en': 'MHT-CET CBT Mock Test (परीक्षा)', en: 'MHT-CET CBT Test Simulator' },
  'card.exams.desc': { mr: 'ऑनलाइन संगणकीय परीक्षा व राज्य रँक', 'mr-en': 'Online Computer Based Test & State Percentile', en: 'Real-time NTA Pattern Exam & State Percentile' },

  // DRM Video Player
  'drm.title_strip': { mr: 'सुरक्षित DRM व्हिडिओ लेक्चर्स', 'mr-en': 'Secure DRM Video Classroom (DRM लेक्चर्स)', en: 'Secure DRM Video Classroom' },
  'drm.subtitle_strip': { mr: 'डायनॅमिक वॉटरमार्क संरक्षण • २४०p कोकण लो-बँडविड्थ मोड • पहिले २ लेक्चर्स मोफत डेमो', 'mr-en': 'Dynamic Watermark DRM • 240p Konkan Mode • 2 Free Demo Lectures', en: 'Dynamic Watermark DRM • 240p Konkan Low-Bandwidth Mode • 2 Free Demos' },
  'drm.konkan_active': { mr: 'कोकण २४०p लो-डेटा मोड चालू (२५० kbps)', 'mr-en': 'Konkan 240p Low-Data Mode ON (२५० kbps)', en: 'Konkan 240p Low-Bandwidth Mode ON (250 kbps)' },
  'drm.free_demo_badge': { mr: 'मोफत डेमो लेक्चर', 'mr-en': 'Free Trial Demo (मोफत डेमो)', en: 'Free Demo Lecture' },
  'drm.chapter_selector': { mr: 'प्रकरणे व वेळ (Chapters & Timestamps)', 'mr-en': 'Chapters & Topics (प्रकरणे)', en: 'Video Chapters & Topics' },
  'drm.all_lectures': { mr: 'सर्व लेक्चर्स यादी', 'mr-en': 'All Lectures Playlist (लेक्चर्स यादी)', en: 'Batch Lecture Playlist' },
  'drm.anti_screen_warning': { mr: '⚠️ स्क्रीन रेकॉर्डिंग किंवा कॅप्चर आढळल्यास खाते तात्काळ कायमस्वरूपी बंद केले जाईल.', 'mr-en': '⚠️ Screen recording or mirror casting is strictly prohibited under Anti-Piracy laws.', en: '⚠️ Screen recording or interception will trigger permanent device-level ban.' },

  // Secure Notes
  'notes.title_strip': { mr: 'कॅनव्हास-संरक्षित डिजिटल नोट्स व सूत्रपत्रिका', 'mr-en': 'Secure Notes Sandbox (कॅनव्हास नोट्स)', en: 'Secure Notes & Formula Sandbox' },
  'notes.subtitle_strip': { mr: 'हस्तलिखित नोट्स व सूत्रपत्रिका • डिजिटल वॉटरमार्क संरक्षित (डाउनलोड व प्रिंट बंदी)', 'mr-en': 'Handwritten Notes & Formula Sheets • Anti-Download & Anti-Print Protected', en: 'Handwritten Notes & Formula Sheets • Anti-Download & Anti-Print Protected' },
  'notes.security_alert': { mr: 'कॅनव्हास सुरक्षा सक्रिय: कॉपी, प्रिंट व सेव्ह करणे प्रतिबंधित आहे.', 'mr-en': 'Canvas Security Active: Copy, Print, and Binary PDF Downloads are Blocked.', en: 'Canvas Security Active: Copy, Print, and Binary PDF Downloads are Blocked.' },
  'notes.page': { mr: 'पान', 'mr-en': 'Page (पान)', en: 'Page' },
  'notes.of': { mr: 'पैकी', 'mr-en': 'of (पैकी)', en: 'of' },

  // AI Doubt Desk
  'doubt.heading': { mr: 'कृत्रिम बुद्धिमत्ता (AI) शंका निरसन कक्ष', 'mr-en': 'AI-First Doubt Resolution Desk (शंका निरसन)', en: 'AI-First Balbharati Doubt Desk' },
  'doubt.subheading': { mr: 'बालभारती पाठ्यपुस्तक व मागील वर्षांच्या प्रश्नांवर आधारित तत्काळ अचूक उत्तरे', 'mr-en': 'Instant verified solutions grounded on Balbharati textbooks & MHT-CET PYQs', en: 'Instant verified solutions grounded on Balbharati textbooks & MHT-CET PYQs' },
  'doubt.input_placeholder': { mr: 'तुमची शंका येथे लिहा (उदा. व्हर्टिकल सर्क्युलर मोशनमध्ये सर्वोच्च बिंदूवर तणाव शून्य का असतो?)...', 'mr-en': 'Type your doubt (e.g. Why is string tension zero at highest point in VCM?)...', en: 'Type your doubt here (e.g. Why is string tension zero at highest point in vertical circular motion?)...' },
  'doubt.record_marathi_voice': { mr: 'मराठी व्हॉईस नोट रेकॉर्ड करा', 'mr-en': 'Record Marathi Voice Note (व्हॉईस नोट)', en: 'Record Marathi Audio Note' },
  'doubt.recording_in_progress': { mr: 'व्हॉईस रेकॉर्डिंग सुरू आहे', 'mr-en': 'Recording Audio Note...', en: 'Recording Audio Note...' },
  'doubt.voice_ready': { mr: '✓ ऑडिओ नोट तयार (३२s)', 'mr-en': '✓ Audio Note Ready (32s)', en: '✓ Audio Note Ready (32s)' },
  'doubt.btn_ask_ai': { mr: 'AI कडून उत्तर मिळवा', 'mr-en': 'Solve with Balbharati AI (AI उत्तर)', en: 'Solve with Balbharati AI' },
  'doubt.recent_tickets': { mr: 'माझ्या शंकांचा इतिहास (Recent Doubt Tickets)', 'mr-en': 'My Doubt Tickets (शंका इतिहास)', en: 'Recent Doubt Tickets' },
  'doubt.verified_by_balbharati': { mr: 'बालभारती पाठ्यपुस्तकाद्वारे सत्यापित उत्तर', 'mr-en': 'Verified by Balbharati Textbook Reference', en: 'Verified by Balbharati Textbook Reference' },
  'doubt.escalate_to_teacher': { mr: 'शिक्षकांना पाठवा (१-क्लिक ट्रान्सफर)', 'mr-en': 'Escalate to Subject Teacher (शिक्षकांना पाठवा)', en: 'Escalate to Subject Teacher' },
  'doubt.escalated_success': { mr: 'शंका प्रा. अनंत कुलकर्णी यांच्या व्हाईटबोर्ड स्टुडिओकडे हस्तांतरित केली आहे!', 'mr-en': 'Doubt successfully escalated to Prof. Kulkarni Whiteboard Queue!', en: 'Doubt successfully escalated to Faculty Whiteboard Studio!' },

  // MHT-CET Exam Simulator
  'exam.mock_title': { mr: 'MHT-CET २०२६ राज्यस्तरीय ऑनलाइन संगणकीय परीक्षा (CBT)', 'mr-en': 'MHT-CET 2026 Online CBT Simulator (परीक्षा)', en: 'MHT-CET 2026 State Mock Test (CBT)' },
  'exam.time_left': { mr: 'उर्वरित वेळ (Time Left):', 'mr-en': 'Time Left (वेळ):', en: 'Time Remaining:' },
  'exam.sec_physics_chem': { mr: 'विभाग १: भौतिकशास्त्र व रसायनशास्त्र (१०० गुण)', 'mr-en': 'Section 1: Physics & Chemistry (100 Marks)', en: 'Section 1: Physics & Chemistry (100 Marks)' },
  'exam.sec_maths': { mr: 'विभाग २: गणित (१०० गुण - प्रत्येक प्रश्नास +२ गुण)', 'mr-en': 'Section 2: Mathematics (100 Marks - +2/Q)', en: 'Section 2: Mathematics (100 Marks - +2/Q)' },
  'exam.btn_save_next': { mr: 'जतन करा व पुढे चला (Save & Next)', 'mr-en': 'Save & Next (जतन करा)', en: 'Save & Next' },
  'exam.btn_mark_review': { mr: 'पुनरावलोकनासाठी ठेवा (Mark for Review)', 'mr-en': 'Mark for Review (पुनरावलोकन)', en: 'Mark for Review' },
  'exam.btn_clear_response': { mr: 'उत्तर पुसा (Clear)', 'mr-en': 'Clear Response (पुसा)', en: 'Clear Selection' },
  'exam.btn_submit_test': { mr: 'परीक्षा पूर्ण करा (Submit Test)', 'mr-en': 'Submit CBT Test (सबमिट)', en: 'Submit Test' },
  'exam.palette_title': { mr: 'प्रश्न फलक (Question Palette)', 'mr-en': 'Question Palette (फलक)', en: 'Question Status Palette' },
  'exam.result_title': { mr: 'MHT-CET परीक्षा निकाल व राज्यस्तरीय रँक विश्लेषण', 'mr-en': 'MHT-CET Result & State Percentile Analysis', en: 'MHT-CET Scorecard & State Percentile' },

  // Teacher Workspace
  'teacher.welcome': { mr: 'वरिष्ठ प्राध्यापक', 'mr-en': 'Senior Faculty (वरिष्ठ प्राध्यापक)', en: 'Senior Faculty Member' },
  'teacher.assigned_batches': { mr: 'माझ्या जबाबदारीतील बॅचेस', 'mr-en': 'Assigned Batches (जबाबदारीतील बॅचेस)', en: 'Assigned Batches' },
  'teacher.pending_doubts_queue': { mr: 'तातडीच्या शंका (Urgent Doubts Queue)', 'mr-en': 'Pending Doubts Queue (प्रलंबित शंका)', en: 'Pending Doubts Queue' },
  'teacher.whiteboard_title': { mr: 'शिक्षक शंका निवारण स्टुडिओ', 'mr-en': 'Teacher Whiteboard Studio (व्हाईटबोर्ड)', en: 'Educator Stylus Whiteboard Studio' },
  'teacher.whiteboard_sub': { mr: 'विद्यार्थ्यांच्या शंकांचे हस्तलिखित कॅनव्हास रेखाटन व मराठी व्हॉईस नोटद्वारे तत्काळ निरसन करा', 'mr-en': 'Resolve student doubts using live canvas stylus blackboard and voice notes', en: 'Resolve student doubts using live stylus blackboard canvas and Marathi voice notes' },
  'teacher.btn_dispatch': { mr: 'विद्यार्थ्याला उत्तर पाठवा (Dispatch)', 'mr-en': 'Dispatch Solution to Student (पाठवा)', en: 'Dispatch Solution to Student' },

  // Admin Hub
  'admin.telemetry_title': { mr: 'थेट शैक्षणिक टेलीमेट्री व विद्यार्थी विश्लेषण केंद्र', 'mr-en': 'Live Educational Telemetry & Concurrency Analytics', en: 'Live Platform Telemetry & Analytics Hub' },
  'admin.active_streams': { mr: 'सक्रिय DRM व्हिडिओ प्रवाह', 'mr-en': 'Live Active DRM Streams (सक्रिय प्रवाह)', en: 'Live Active DRM Streams' },
  'admin.active_students': { mr: 'सक्रिय विद्यार्थी', 'mr-en': 'Active Students Online', en: 'Active Online Students' },
  'admin.antipiracy_title': { mr: 'अँटी-पायरसी सुरक्षा केंद्र व सत्र व्यवस्थापन', 'mr-en': 'Anti-Piracy Command Center & Session Kill-Switch', en: 'Anti-Piracy Command Center & Session Control' },
  'admin.forensic_decoder': { mr: 'फॉरेन्सिक वॉटरमार्क डिकोडर (Forensic Decoder)', 'mr-en': 'Forensic Watermark Decoder Tool', en: 'Forensic Watermark Leak Decoder' },
  'admin.batches_title': { mr: 'बॅच व्यवस्थापन व GST आर्थिक इनव्हॉइस', 'mr-en': 'Batch & Financial Center (GST इनव्हॉइस)', en: 'Batch Management & GST Invoicing' },
  'admin.btn_tax_invoice': { mr: 'GST कर पावती (Tax Invoice)', 'mr-en': 'GST Tax Invoice (कर पावती)', en: 'GST Tax Invoice' },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'mr-en',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mahashiksha_lang') as Language;
      if (saved && ['mr', 'mr-en', 'en'].includes(saved)) {
        return saved;
      }
    }
    return 'mr-en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mahashiksha_lang', newLang);
    }
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    if (translations[key] && translations[key]['mr-en']) {
      return translations[key]['mr-en'];
    }
    if (translations[key] && translations[key]['en']) {
      return translations[key]['en'];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
