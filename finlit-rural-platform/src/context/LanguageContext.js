import React, { createContext, useState, useEffect } from 'react';

// Comprehensive dictionary for English and Hindi
const translations = {
  en: {
    // Navigation & General
    'Home': 'Home',
    'Dashboard': 'Dashboard',
    'Stories': 'Stories',
    'Practice UPI': 'Practice UPI',
    'Budget Tool': 'Budget Tool',
    'Government Schemes': 'Government Schemes',
    'AI Coach': 'AI Coach',
    'Help & Helplines': 'Help & Helplines',
    'Language': 'Language',
    'Voice Read-Aloud': 'Read Aloud',
    'Text Size': 'Text Size',
    'High Contrast': 'High Contrast',
    'Normal': 'Normal',
    'Large': 'Large',
    'Guided Mode': 'Step-by-Step',
    'Stop Audio': 'Stop Audio',
    'Playing Audio': 'Playing...',

    // Welcome Page
    'Namaste!': 'Namaste!',
    'Learn money safely, in your language.': 'Learn money safely, in your language.',
    'NoteKaka Tagline': 'Your friendly village guide to money wisdom. Practice banking, UPI payments, and budgeting without fear or real financial risk.',
    'Start Learning': 'Start Learning',
    'Explore without signing in': 'Explore Without Signing In',
    'No Real Money Reassurance': '100% Free & Safe. All learning activities and simulations use fictional practice money. No real bank accounts or actual money are ever involved.',
    'Made for Everyday People': 'Made for Everyday People',
    'Made for Everyday People Desc': 'Designed specifically for students, farmers, shopkeepers, and first-time smartphone users.',
    'Step-by-Step Stories': 'Step-by-Step Stories',
    'Step-by-Step Stories Desc': 'Real situations like saving from a harvest or managing a shop, with zero judgment.',
    'Safe UPI Sandbox': 'Safe UPI Sandbox',
    'Safe UPI Sandbox Desc': 'Practice scanning QR codes and sending mock payments with zero risk of losing money.',
    'Clear Government Schemes': 'Verified Government Schemes',
    'Clear Government Schemes Desc': 'Official eligibility and document checklists directly linked to government portals.',

    // Setup / Learner Preferences
    'Learner Setup Title': 'Welcome to NoteKaka! Tell us how to help you',
    'Learner Setup Subtitle': 'Just 3 quick questions so we show you the most useful lessons first. You can always change this later.',
    'Skip to Dashboard': 'Skip to Dashboard →',
    'Question 1': 'What best describes you?',
    'Question 2': 'What would you like to learn first?',
    'Question 3': 'How do you prefer to learn?',
    'Role Student': 'Student or Young Adult',
    'Role Student Desc': 'Learning about money, scholarships, and saving early',
    'Role Farmer': 'Farmer / Agricultural Worker',
    'Role Farmer Desc': 'Managing harvest income, crop loans, and weather insurance',
    'Role Shopkeeper': 'Shopkeeper / Small Business',
    'Role Shopkeeper Desc': 'Receiving UPI payments, daily cash flow, and records',
    'Role Homemaker': 'Homemaker / Household Manager',
    'Role Homemaker Desc': 'Managing home expenses, gold savings, and small deposits',
    'Role Worker': 'Daily Earner / Worker',
    'Role Worker Desc': 'Building a daily safety net and avoiding high-interest debt',
    'Topic Saving': 'Daily & Small Savings',
    'Topic UPI': 'UPI & Safe Digital Payments',
    'Topic Banking': 'Opening & Using Bank Accounts',
    'Topic Scams': 'Recognizing Scams & Frauds',
    'Topic Schemes': 'Government Welfare Schemes',
    'Mode Read': 'Reading Simple Text',
    'Mode Listen': 'Listening with Voice Audio',
    'Mode Both': 'Both Reading & Listening',
    'Next': 'Next →',
    'Previous': '← Back',
    'Save & Continue': 'Save & Go to Learning Dashboard →',

    // Dashboard
    'Welcome Learner': 'Welcome, friend!',
    'Continue Learning': 'Continue Your Journey',
    'Resume Lesson': 'Resume Activity →',
    'Explore Topics': 'Choose What to Learn',
    'Daily Wisdom': 'NoteKaka’s Everyday Wisdom',
    'Daily Wisdom Quote': '“Saving even ₹10 daily is like planting a neem tree. At first it looks small, but with time it gives deep shade to the whole family.”',
    'Practice Simulator Banner': 'Interactive Practice Sandboxes',
    'Practice Simulator Banner Desc': 'Try sending simulated payments, scanning QR codes, or creating a household budget. Zero real money involved.',

    // Common Modules
    'Money Basics': '1. Money Basics',
    'Money Basics Desc': 'How money works, coins, notes, and keeping money safe.',
    'Saving Money': '2. Saving Money',
    'Saving Money Desc': 'Simple habits to save ₹10 to ₹50 daily without feeling pinched.',
    'UPI & Digital Payments': '3. UPI & Digital Payments',
    'UPI & Digital Payments Desc': 'Learn how QR codes and phone transfers work step-by-step.',
    'Avoiding Scams': '4. Avoiding Scams & Fraud',
    'Avoiding Scams Desc': 'Never share your UPI PIN or OTP. Spotting fake calls.',
    'Budgeting': '5. Budgeting & Planning',
    'Budgeting Desc': 'Plan monthly expenses and emergency savings with our simple tool.',
    'Government Schemes Card': '6. Government Schemes',
    'Government Schemes Desc': 'Free financial assistance, pensions, and insurance from the government.',

    // Simulation
    'Simulation Notice': 'Practice Sandbox: Educational Simulation Only (No Real Money)',
    'Recipient Verification': 'Recipient Verification',
    'Enter PIN': 'Enter 4-Digit Simulated UPI PIN',
    'PIN Warning': 'Important: In real life, NEVER share your PIN with anyone, even bank staff!',
    'Simulated Payment Success': 'Simulated Payment Successful!',
    'Practice Another': 'Practice Another Payment',

    // Budget Simulator
    'Budget Tool Title': 'Simple Household & Shop Budgeter',
    'Budget Tool Subtitle': 'Enter your monthly earnings and common expenses to see how much you can comfortably set aside.',
    'Monthly Income': 'Monthly Household Earnings',
    'Groceries & Food': 'Food, Rations & Groceries',
    'Farming & Work': 'Work, Tools, Seeds & Travel',
    'Education & Children': 'School, Fees & Children',
    'Health & Emergency': 'Medicines & Health Reserve',
    'Personal & Festival': 'Festivals, Clothes & Personal',
    'Total Planned Expenses': 'Total Planned Expenses',
    'Remaining for Savings': 'Remaining for Savings',
    'Reset Values': 'Reset to Defaults',

    // Schemes Page
    'Government Schemes Title': 'Government Schemes for You & Your Family',
    'Government Schemes Subtitle': 'Verified welfare programs directly from official portals. NoteKaka never asks for fees or private credentials.',
    'Category All': 'All Schemes',
    'Category Farmers': 'For Farmers',
    'Category Students': 'For Students',
    'Category Women': 'For Women & Children',
    'Category Senior': 'For Elders & Pensioners',
    'Category Business': 'For Small Businesses',
    'Eligibility': 'Eligibility (Who Can Apply)',
    'Documents Needed': 'Documents Needed',
    'Official Portal': 'Visit Official Portal',
    'Next Step': 'Simple Next Step',

    // Help & Helplines
    'Help Page Title': 'Helplines, Support & Financial Dictionary',
    'Help Page Subtitle': 'Verified official national helplines and simple explanations for confusing banking words.',
    'National Helplines': 'Verified Official National Helplines (Toll-Free)',
    'Cyber Crime Helpline': 'National Cyber Crime Helpline',
    'RBI Banking Ombudsman': 'RBI Banking Ombudsman & Fraud',
    'Consumer Helpline': 'National Consumer Helpline',
    'Aadhaar Helpline': 'UIDAI (Aadhaar) Helpline',
    'Kisan Call Center': 'Kisan Call Center (Agriculture)',
    'Financial Dictionary': 'Plain Language Financial Dictionary',
    'Bank Mitra Help': 'Need In-Person Help in Your Village?',
    'Bank Mitra Help Desc': 'Look for your local Bank Mitra (Business Correspondent) at the Panchayat Bhavan or CSC (Common Service Center). They are authorized to help with basic passbooks and deposits.',

    // Auth & Account
    'Login': 'Login',
    'Sign Up': 'Sign Up',
    'Log Out': 'Log Out',
    'Create Account': 'Create Account',
    'Welcome Back': 'Welcome Back!',
    'Login Subtitle': 'Enter your username/mobile and password to continue learning.',
    'Signup Title': 'Join NoteKaka - Free & Safe',
    'Signup Subtitle': 'Create your account to save your learning progress on this device.',
    'Full Name': 'Full Name',
    'Full Name Placeholder': 'Enter your name (e.g., Ramesh Kumar)',
    'Mobile or Username': 'Mobile Number or Username',
    'Mobile or Username Placeholder': 'Enter 10-digit mobile or username',
    'Password': 'Password',
    'Password Placeholder': 'Enter password (min 4 characters)',
    'Confirm Password': 'Confirm Password',
    'Confirm Password Placeholder': 'Enter same password again',
    'Your Work / Role': 'What best describes your work?',
    'Preferred Learning Mode': 'How do you prefer to learn?',
    'Already have an account?': 'Already have an account?',
    'Don\'t have an account?': 'Don\'t have an account?',
    'Login Now': 'Log In Now',
    'Sign Up Now': 'Create Account',
    'Try Demo Account': '💡 Try Demo Account (One Click)',
    'Demo Credentials Info': 'Test with Demo: ramesh / password123',
    'Saved in LocalStorage Notice': 'All accounts & progress are stored safely in your browser (LocalStorage). No internet database required.',
    'Show Password': 'Show password',
    'Hide Password': 'Hide password',
    'Logged In As': 'Logged in as',
    'Switch Account': 'Switch Account / Logout',
    'Go to Dashboard': 'Go to Learning Dashboard →'
  },
  hi: {
    // Navigation & General
    'Home': 'होम (मुख्य पृष्ठ)',
    'Dashboard': 'डैशबोर्ड',
    'Stories': 'कहानियाँ',
    'Practice UPI': 'UPI अभ्यास',
    'Budget Tool': 'बजट टूल',
    'Government Schemes': 'सरकारी योजनाएं',
    'AI Coach': 'काका से पूछें',
    'Help & Helplines': 'मदद व हेल्पलाइन',
    'Language': 'भाषा',
    'Voice Read-Aloud': 'बोलकर सुनाएं',
    'Text Size': 'अक्षर का आकार',
    'High Contrast': 'हाई कंट्रास्ट',
    'Normal': 'सामान्य',
    'Large': 'बड़ा आकार',
    'Guided Mode': 'कदम-दर-कदम',
    'Stop Audio': 'आवाज रोकें',
    'Playing Audio': 'सुना रहे हैं...',

    // Welcome Page
    'Namaste!': 'नमस्ते!',
    'Learn money safely, in your language.': 'पैसे की समझ सीखें, बिना डर और अपनी भाषा में।',
    'NoteKaka Tagline': 'गाँव-कस्बों के लिए आपका भरोसेमंद साथी। बिना किसी वास्तविक पैसे के जोखिम के, बैंकिंग, UPI भुगतान और बचत की सही समझ हासिल करें।',
    'Start Learning': 'सीखना शुरू करें',
    'Explore without signing in': 'बिना लॉगिन देखे-समझें',
    'No Real Money Reassurance': '100% सुरक्षित एवं मुफ़्त। सभी अभ्यास और सिमुलेशन में केवल सीखने के लिए काल्पनिक पैसे का उपयोग होता है। किसी भी असली बैंक खाते या पैसे का लेन-देन नहीं होता।',
    'Made for Everyday People': 'आम लोगों की ज़रूरतों के अनुसार',
    'Made for Everyday People Desc': 'विद्यार्थियों, किसानों, छोटे दुकानदारों और पहली बार स्मार्टफ़ोन इस्तेमाल करने वालों के लिए सहज डिज़ाइन।',
    'Step-by-Step Stories': 'कदम-दर-कदम कहानियाँ',
    'Step-by-Step Stories Desc': 'फसल की बचत या दुकानदारी जैसी असली स्थितियों के माध्यम से, बिना किसी दबाव या आलोचना के सीखें।',
    'Safe UPI Sandbox': 'सुरक्षित UPI अभ्यास कक्ष',
    'Safe UPI Sandbox Desc': 'बिना किसी पैसे के नुकसान के डर के QR कोड स्कैन करना और सुरक्षित भुगतान करना सीखें।',
    'Clear Government Schemes': 'सत्यापित सरकारी योजनाएं',
    'Clear Government Schemes Desc': 'आधिकारिक पात्रता, ज़रूरी कागज़ात और सीधे सरकारी पोर्टल के पते की सही जानकारी।',

    // Setup / Learner Preferences
    'Learner Setup Title': 'नोटकाका में आपका स्वागत है! अपनी पसंद बताएं',
    'Learner Setup Subtitle': 'बस 3 आसान सवाल ताकि हम आपको सबसे उपयोगी विषय पहले दिखा सकें। आप इसे बाद में कभी भी बदल सकते हैं।',
    'Skip to Dashboard': 'सीधे डैशबोर्ड पर जाएं →',
    'Question 1': 'आप क्या करते हैं?',
    'Question 2': 'आप सबसे पहले क्या सीखना चाहते हैं?',
    'Question 3': 'आप कैसे सीखना पसंद करेंगे?',
    'Role Student': 'विद्यार्थी या युवा',
    'Role Student Desc': 'पैसे की बुनियादी समझ, छात्रवृत्ति और शुरुआती बचत',
    'Role Farmer': 'किसान / खेतिहर साथी',
    'Role Farmer Desc': 'फसल की आमदनी, खाद-बीज का खर्च और फसल बीमा',
    'Role Shopkeeper': 'दुकानदार / छोटा व्यापारी',
    'Role Shopkeeper Desc': 'UPI से भुगतान लेना, दैनिक हिसाब और बहीखाता',
    'Role Homemaker': 'गृहिणी / घर संचालक',
    'Role Homemaker Desc': 'घर का खर्च संभालना, डाकघर बचत और सुरक्षित गुल्लक',
    'Role Worker': 'मेहनतकश / दैनिक वेतनभोगी',
    'Role Worker Desc': 'रोज़मर्रा की बचत और कर्ज़ के चक्रव्यूह से बचना',
    'Topic Saving': 'दैनिक व छोटी बचत के तरीके',
    'Topic UPI': 'UPI और सुरक्षित मोबाइल भुगतान',
    'Topic Banking': 'बैंक खाता खोलना और संभालना',
    'Topic Scams': 'धोखाधड़ी व फ़र्ज़ी फोन से बचाव',
    'Topic Schemes': 'सरकारी कल्याणकारी योजनाएं',
    'Mode Read': 'सरल अक्षरों में पढ़कर',
    'Mode Listen': 'आवाज़ में बोलकर सुनकर',
    'Mode Both': 'पढ़ना और सुनना दोनों',
    'Next': 'आगे बढ़ें →',
    'Previous': '← पीछे जाएं',
    'Save & Continue': 'पसंद सहेजें और सीखना शुरू करें →',

    // Dashboard
    'Welcome Learner': 'नमस्ते साथी!',
    'Continue Learning': 'अपनी सीख जारी रखें',
    'Resume Lesson': 'अभ्यास शुरू करें →',
    'Explore Topics': 'सीखने के मुख्य विषय',
    'Daily Wisdom': 'नोटकाका की आज की सीख',
    'Daily Wisdom Quote': '“रोज़ के ₹10 की बचत भी नीम के पौधे जैसी होती है। शुरुआत में छोटी दिखती है, पर वक्त आने पर पूरे परिवार को सहारा देती है।”',
    'Practice Simulator Banner': 'इंटरएक्टिव अभ्यास कक्ष',
    'Practice Simulator Banner Desc': 'बिना असली पैसे के UPI भुगतान का अभ्यास करें, QR कोड समझें या घर का मासिक बजट बनाकर देखें।',

    // Common Modules
    'Money Basics': '1. पैसे की बुनियादी बातें',
    'Money Basics Desc': 'पैसा कैसे काम करता है, बैंक खाते का महत्व और नकदी की सुरक्षा।',
    'Saving Money': '2. बचत करने के तरीके',
    'Saving Money Desc': 'बिना तंगी महसूस किए रोज़ ₹10 से ₹50 बचाने की आसान आदतें।',
    'UPI & Digital Payments': '3. UPI और मोबाइल भुगतान',
    'UPI & Digital Payments Desc': 'QR कोड और मोबाइल नंबर से सुरक्षित भुगतान का सरल अभ्यास।',
    'Avoiding Scams': '4. धोखाधड़ी व ठगी से बचाव',
    'Avoiding Scams Desc': 'अपना UPI पिन या OTP कभी किसी को न बताएं। फ़र्ज़ी कॉल पहचानें।',
    'Budgeting': '5. मासिक बजट व योजना',
    'Budgeting Desc': 'आमदनी और खर्च का संतुलन बनाने का सरल घरेलू टूल।',
    'Government Schemes Card': '6. सरकारी कल्याणकारी योजनाएं',
    'Government Schemes Desc': 'किसानों, विद्यार्थियों और महिलाओं के लिए मुफ़्त सरकारी सहायता।',

    // Simulation
    'Simulation Notice': 'अभ्यास कक्ष: केवल सीखने के लिए (कोई वास्तविक पैसा शामिल नहीं है)',
    'Recipient Verification': 'भुगतान पाने वाले का नाम जांचें',
    'Enter PIN': '4 अंकों का काल्पनिक UPI पिन दर्ज करें',
    'PIN Warning': 'सावधानी: असल ज़िंदगी में अपना UPI पिन या OTP कभी किसी को न बताएं, बैंक कर्मचारी को भी नहीं!',
    'Simulated Payment Success': 'अभ्यास भुगतान सफल रहा!',
    'Practice Another': 'एक और भुगतान का अभ्यास करें',

    // Budget Simulator
    'Budget Tool Title': 'घर और दुकान का सरल बजट टूल',
    'Budget Tool Subtitle': 'अपनी मासिक आमदनी और रोज़मर्रा के खर्च दर्ज करें और देखें कि हर महीने कितनी बचत संभव है।',
    'Monthly Income': 'मासिक घरेलू आमदनी (रुपये में)',
    'Groceries & Food': 'राशन, अनाज व भोजन खर्च',
    'Farming & Work': 'खेती, बीज, औज़ार या दुकान खर्च',
    'Education & Children': 'बच्चों की पढ़ाई व स्कूल फीस',
    'Health & Emergency': 'दवा, इलाज व आपातकालीन सुरक्षित राशि',
    'Personal & Festival': 'त्यौहार, कपड़े व अन्य निजी खर्च',
    'Total Planned Expenses': 'कुल अनुमानित मासिक खर्च',
    'Remaining for Savings': 'बचत के लिए शेष राशि',
    'Reset Values': 'शुरुआती मान पर रीसेट करें',

    // Schemes Page
    'Government Schemes Title': 'आपके और आपके परिवार के लिए सरकारी योजनाएं',
    'Government Schemes Subtitle': 'सीधे सरकारी पोर्टलों से सत्यापित जानकारी। नोटकाका कभी कोई शुल्क या निजी पासवर्ड नहीं मांगता।',
    'Category All': 'सभी योजनाएं',
    'Category Farmers': 'किसानों के लिए',
    'Category Students': 'विद्यार्थियों के लिए',
    'Category Women': 'महिलाओं व बच्चों के लिए',
    'Category Senior': 'बुज़ुर्गों व पेंशन के लिए',
    'Category Business': 'छोटे व्यवसायियों के लिए',
    'Eligibility': 'पात्रता (कौन आवेदन कर सकता है)',
    'Documents Needed': 'ज़रूरी कागज़ात',
    'Official Portal': 'आधिकारिक वेबसाइट पर जाएं',
    'Next Step': 'अगला सरल कदम',

    // Help & Helplines
    'Help Page Title': 'मदद, सरकारी हेल्पलाइन व वित्तीय शब्दकोश',
    'Help Page Subtitle': 'सत्यापित राष्ट्रीय टोल-फ्री हेल्पलाइन और उलझन भरे वित्तीय शब्दों के सरल अर्थ।',
    'National Helplines': 'सत्यापित राष्ट्रीय आधिकारिक हेल्पलाइन (टोल-फ्री)',
    'Cyber Crime Helpline': 'राष्ट्रीय साइबर अपराध हेल्पलाइन (ठगी की शिकायत)',
    'RBI Banking Ombudsman': 'आरबीआई बैंकिंग लोकपाल व बैंक शिकायत',
    'Consumer Helpline': 'राष्ट्रीय उपभोक्ता हेल्पलाइन',
    'Aadhaar Helpline': 'यूआईडीएआई (आधार) हेल्पलाइन',
    'Kisan Call Center': 'किसान कॉल सेंटर (कृषि सलाह व योजनाएं)',
    'Financial Dictionary': 'सरल वित्तीय शब्दकोश (कठिन शब्दों का आसान मतलब)',
    'Bank Mitra Help': 'गाँव में किसी से आमने-सामने मदद चाहिए?',
    'Bank Mitra Help Desc': 'अपनी ग्राम पंचायत या CSC (कॉमन सर्विस सेंटर) पर "बैंक मित्र" से मिलें। वे खाता खोलने और पासबुक एंट्री में आपकी आधिकारिक सहायता के लिए तैनात होते हैं।',

    // Auth & Account
    'Login': 'लॉगिन',
    'Sign Up': 'साइन अप',
    'Log Out': 'लॉगआउट',
    'Create Account': 'खाता बनाएं',
    'Welcome Back': 'वापसी पर स्वागत है!',
    'Login Subtitle': 'सीखने की यात्रा जारी रखने के लिए यूज़रनेम/मोबाइल और पासवर्ड दर्ज करें।',
    'Signup Title': 'नोटकाका से जुड़ें - सुरक्षित व मुफ़्त',
    'Signup Subtitle': 'इस डिवाइस पर अपनी सीखने की प्रगति सहेजने के लिए अपना खाता बनाएं।',
    'Full Name': 'पूरा नाम',
    'Full Name Placeholder': 'अपना नाम लिखें (जैसे: रामेश्वर कुमार)',
    'Mobile or Username': 'मोबाइल नंबर या यूज़रनेम',
    'Mobile or Username Placeholder': '10 अंकों का मोबाइल या यूज़रनेम',
    'Password': 'पासवर्ड',
    'Password Placeholder': 'पासवर्ड दर्ज करें (कम से कम 4 अक्षर)',
    'Confirm Password': 'पासवर्ड की दोबारा पुष्टि करें',
    'Confirm Password Placeholder': 'वही पासवर्ड दोबारा लिखें',
    'Your Work / Role': 'आप क्या काम करते हैं?',
    'Preferred Learning Mode': 'सीखने का पसंदीदा माध्यम',
    'Already have an account?': 'क्या पहले से खाता बना हुआ है?',
    'Don\'t have an account?': 'क्या नया खाता बनाना चाहते हैं?',
    'Login Now': 'लॉगिन करें',
    'Sign Up Now': 'नया खाता बनाएं',
    'Try Demo Account': '💡 डेमो खाता भरें (1-क्लिक)',
    'Demo Credentials Info': 'जाँचने के लिए डेमो खाता: ramesh / password123',
    'Saved in LocalStorage Notice': 'सभी खाते और प्रगति आपके ब्राउज़र (Local Storage) में सुरक्षित रहते हैं। किसी बाहरी सर्वर की ज़रूरत नहीं।',
    'Show Password': 'पासवर्ड देखें',
    'Hide Password': 'पासवर्ड छुपाएं',
    'Logged In As': 'लॉगिन खाता:',
    'Switch Account': 'दूसरा खाता खोलें / लॉगआउट',
    'Go to Dashboard': 'डैशबोर्ड पर जाएं →'
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('notekaka_preferred_language') || 'en';
  });

  const availableLanguages = [
    { code: 'en', name: 'English', nativeName: 'English', status: 'ready' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', status: 'ready' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', status: 'coming_soon' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', status: 'coming_soon' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', status: 'coming_soon' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', status: 'coming_soon' }
  ];

  const translate = (key) => {
    if (!key) return '';
    if (currentLanguage === 'hi') {
      return translations.hi[key] || translations.en[key] || key;
    }
    return translations.en[key] || key;
  };

  const changeLanguage = (langCode) => {
    if (langCode === 'en' || langCode === 'hi') {
      setCurrentLanguage(langCode);
      localStorage.setItem('notekaka_preferred_language', langCode);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('notekaka_preferred_language');
    if (saved && (saved === 'en' || saved === 'hi')) {
      setCurrentLanguage(saved);
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        availableLanguages,
        translate,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};