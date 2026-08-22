import type { Language } from '../types';

/**
 * Universal Auto-Translation & Skill Matching Vocabulary Engine.
 * Provides rich multilingual coverage for trade skills, certifications, tools,
 * soft skills, matching terms, and locations across English, Tamil, Hindi, and Telugu.
 */

// Comprehensive English-to-Tamil vocabulary dictionary
const TA_VOCAB: Record<string, string> = {
  // Action & Matching Terms
  'needed': 'தேவைப்படுகிறது',
  'need': 'தேவை',
  'required': 'தேவைப்படுகிறது',
  'urgent': 'அவசர',
  'immediate': 'உடனடி',
  'looking for': 'தேடுகிறோம்',
  'wanted': 'தேவை',
  'available': 'கிடைக்கும்',
  'helper': 'உதவியாளர்',
  'assistant': 'உதவியாளர்',
  'worker': 'பணியாளர்',
  'hand': 'உதவியாளர்',
  'boy': 'ஊழியர்',
  'girl': 'ஊழியர்',
  'staff': 'ஊழியர்கள்',
  'person': 'நபர்',
  'skill match': 'திறன் பொருத்தம்',
  'match score': 'பொருத்த மதிப்பெண்',
  'matching skills': 'பொருந்திய திறன்கள்',
  'missing skills': 'தேவைப்படும் திறன்கள்',
  'skill gap': 'திறன் இடைவெளி',
  'recommended': 'பரிந்துரைக்கப்பட்டது',
  'recommendation': 'பரிந்துரை',
  'high demand': 'அதிக தேவை',
  'verified': 'சரிபார்க்கப்பட்டது',
  'claim': 'ஏற்றுக்கொள்',
  'claimed': 'ஏற்றுக்கொள்ளப்பட்டது',

  // Driving & Logistics
  'driving': 'ஓட்டுநர் பணி',
  'driver': 'ஓட்டுநர்',
  'delivery': 'டெலிவரி',
  'rider': 'ரைடர்',
  'bike rider': 'பைக் ரைடர்',
  'auto driving': 'ஆட்டோ ஓட்டுநர்',
  'car driving': 'கார் ஓட்டுநர்',
  'van driver': 'வேன் ஓட்டுநர்',
  'truck driver': 'லாரி ஓட்டுநர்',
  'courier delivery': 'கூரியர் டெலிவரி',
  'food delivery': 'உணவு டெலிவரி',
  'grocery delivery': 'மளிகை டெலிவரி',
  'route knowledge': 'வழி அறிவு',
  'driving license': 'ஓட்டுநர் உரிமம்',
  'loading & unloading': 'சரக்கு ஏற்றுதல் மற்றும் இறக்குதல்',
  'loading': 'சரக்கு ஏற்றுதல்',
  'unloading': 'சரக்கு இறக்குதல்',
  'parcel sorter': 'பார்சல் வரிசைப்படுத்துபவர்',
  'parcel': 'பார்சல்',
  'dispatcher': 'ஏற்று அனுப்புபவர்',
  'warehouse': 'கிடங்கு',
  'pallet handling': 'பொருட்கள் கையாளுதல்',
  'heavy lifting': 'பளு தூக்குதல்',

  // Retail, Store & Billing
  'store helper': 'கடை உதவியாளர்',
  'store': 'கடை',
  'shop': 'கடை',
  'retail': 'சில்லறை விற்பனை',
  'supermarket': 'சூப்பர் மார்க்கெட்',
  'billing': 'பில்லிங்',
  'cashier & billing': 'பணப்பரிவர்த்தனை & பில்லிங்',
  'cashier': 'பணப்பரிவர்த்தனையாளர்',
  'inventory': 'சரக்கு மேலாண்மை',
  'stock management': 'சரக்கு மேலாண்மை',
  'barcode scanning': 'பார்கோடு ஸ்கேனிங்',
  'shelf restocking': 'அலமாரி அடுக்குதல்',
  'restocking': 'அடுக்குதல்',
  'packing & restocking': 'பேக்கிங் மற்றும் அடுக்குதல்',
  'packing': 'பேக்கிங்',
  'packaging': 'பொட்டலமிடுதல்',
  'counter sales': 'விற்பனை கவுண்டர்',
  'weighing & labeling': 'எடை மற்றும் லேபிளிடுதல்',
  'customer service': 'வாடிக்கையாளர் சேவை',
  'customer handling': 'வாடிக்கையாளர் மேலாண்மை',

  // Office & Digital Skills
  'data entry': 'தரவு உள்ளீடு',
  'computer basics': 'கணினி அடிப்படைகள்',
  'basic accounts': 'அடிப்படை கணக்குகள்',
  'computer': 'கணினி',
  'typing': 'தட்டச்சு',
  'ms excel': 'எம்.எஸ் எக்செல்',
  'smartphone proficient': 'ஸ்மார்ட்போன் பயன்பாடு',
  'internet browsing': 'இணைய பயன்பாடு',
  'tally erp': 'டேலி ஈஆர்பி',
  'invoice generation': 'ரசீது தயாரித்தல்',
  'document filing': 'ஆவணக் கோப்பு',
  'office assistant': 'அலுவலக உதவியாளர்',
  'office': 'அலுவலகம்',

  // Trades, Maintenance & Construction
  'electrician basics': 'மின்சார பணி அடிப்படைகள்',
  'electrician': 'மின்சார பணியாளர்',
  'electrical': 'மின்சார பணி',
  'wiring & switchboard': 'வயரிங் மற்றும் சுவிட்ச்போர்டு',
  'wiring': 'வயரிங்',
  'plumbing': 'பிளம்பிங்',
  'plumber': 'பிளம்பர்',
  'pipe fitting': 'குழாய் பொருத்துதல்',
  'carpentry': 'தச்சு பணி',
  'carpenter': 'தச்சர்',
  'woodwork': 'மர வேலை',
  'ac maintenance': 'ஏசி பராமரிப்பு',
  'ac repair': 'ஏசி பழுதுபார்ப்பு',
  'refrigerator repair': 'பிரிட்ஜ் பழுதுபார்ப்பு',
  'appliance servicing': 'சாதன பழுதுபார்ப்பு',
  'welding': 'வெல்டிங்',
  'welder': 'வெல்டர்',
  'painting & whitewashing': 'வர்ணம் பூசுதல்',
  'painting': 'வர்ணம் பூசுதல்',
  'painter': 'வர்ணம் பூசுபவர்',
  'masonry': 'கொத்தனார் பணி',
  'construction': 'கட்டுமான பணி',
  'tile laying': 'டைல்ஸ் பதித்தல்',
  'cctv installation': 'சிசிடிவி பொருத்துதல்',
  'mobile repair': 'மொபைல் பழுதுபார்ப்பு',
  'tailoring': 'தையல் கலை',
  'tailor': 'தையல்காரர்',

  // Food, Kitchen & Hospitality
  'cooking / catering': 'சமையல் மற்றும் கேட்டரிங்',
  'cooking': 'சமையல் பணி',
  'catering': 'கேட்டரிங்',
  'cook': 'சமையல்காரர்',
  'kitchen helper': 'சமையலறை உதவியாளர்',
  'kitchen': 'சமையலறை',
  'food serving': 'உணவு பரிமாறுதல்',
  'server': 'உணவு பரிமாறுபவர்',
  'food': 'உணவு',
  'vegetable cutting': 'காய்கறி நறுக்குதல்',
  'dishwashing': 'பாத்திரம் கழுவுதல்',
  'tea & coffee maker': 'டீ & காபி தயாரிப்பாளர்',
  'bakery assistant': 'பேக்கரி உதவியாளர்',
  'fast food cook': 'துரித உணவு சமையல்காரர்',

  // Healthcare & Caregiving
  'patient helper': 'நோயாளி உதவியாளர்',
  'patient': 'நோயாளி',
  'hospital ward assistant': 'மருத்துவமனை வார்டு உதவியாளர்',
  'hospital': 'மருத்துவமனை',
  'opd guide': 'புறநோயாளி வழிகாட்டி',
  'opd': 'புறநோயாளி பகுதி',
  'guide': 'வழிகாட்டி',
  'queue coordinator': 'வரிசை ஒருங்கிணைப்பாளர்',
  'queue': 'வரிசை',
  'elderly care': 'முதியோர் பராமரிப்பு',
  'childcare': 'குழந்தை பராமரிப்பு',
  'wheelchair assistance': 'வீல்சேர் உதவி',
  'first aid': 'முதலுதவி',
  'medicine delivery': 'மருந்து டெலிவரி',

  // Cleaning, Facilities & Security
  'cleaning & housekeeping': 'சுத்தம் செய்தல் மற்றும் வீட்டுப் பராமரிப்பு',
  'cleaning': 'சுத்தம் செய்தல்',
  'housekeeping': 'வீட்டுப் பராமரிப்பு',
  'floor mopping': 'தரை துடைத்தல்',
  'restroom sanitation': 'கழிவறை சுத்தம்',
  'waste segregation': 'குப்பை பிரித்தல்',
  'gardening': 'தோட்டக்கலை',
  'gardener': 'தோட்டக்காரர்',
  'security guard': 'பாதுகாப்பு காவலர்',
  'security': 'பாதுகாப்பு',
  'guard': 'காவலர்',
  'night watchman': 'இரவு காவலாளி',
  'gatekeeper': 'வாயில் காப்பாளர்',

  // Events, Media & Arts
  'event setup': 'நிகழ்வு அமைப்பு',
  'event': 'நிகழ்வு',
  'setup': 'அமைப்பு',
  'pamphlet distribution': 'துண்டுப் பிரசுரம் விநியோகம்',
  'stage decoration': 'மேடை அலங்காரம்',
  'stage': 'மேடை',
  'sound & audio': 'ஒலி அமைப்பு',
  'sound': 'ஒலி அமைப்பு',
  'lighting assistant': 'ஒளி அமைப்பு உதவியாளர்',
  'music': 'இசை',
  'musician': 'இசைக்கலைஞர்',
  'crowd management': 'கூட்ட நெரிசல் மேலாண்மை',
  'stall helper': 'அரங்கு உதவியாளர்',
  'stall': 'அரங்கு',
  'exhibition': 'கண்காட்சி',
  'tutoring': 'பயிற்றுவிப்பு',
  'tutor': 'ஆசிரியர்',
  'teacher': 'ஆசிரியர்',

  // Soft Skills & Languages
  'tamil speaking': 'தமிழ் பேசுதல்',
  'english speaking': 'ஆங்கிலம் பேசுதல்',
  'hindi speaking': 'ஹிந்தி பேசுதல்',
  'telugu speaking': 'தெலுங்கு பேசுதல்',
  'physically active': 'உடல் தகுதி & சுறுசுறுப்பு',
  'punctual': 'நேரம் தவறாமை',
  'hardworking': 'கடின உழைப்பு',
  'fast learner': 'விரைவாகக் கற்றுக்கொள்பவர்',
  'reliable': 'நம்பகமான',
  'polite': 'கண்ணியமான',
  'team worker': 'குழுப் பணியாளர்',

  // Times, Locations & General
  'morning': 'காலை',
  'early morning': 'அதிகாலை',
  'afternoon': 'மதியம்',
  'evening': 'மாலை',
  'night': 'இரவு',
  'weekend': 'வார இறுதி',
  'daily': 'தினசரி',
  'shift': 'ஷிஃப்ட்',
  'task': 'பணி',
  'work': 'பணி',
  'job': 'வேலை',
  'hours': 'மணிநேரம்',
  'hour': 'மணி',
  'day': 'நாள்',
  'vellore': 'வேலூர்',
  'katpadi': 'காட்பாடி',
  'gandhi nagar': 'காந்தி நகர்',
  'sathuvachari': 'சத்துவாச்சாரி',
  'bagayam': 'பாகாயம்',
  'thorapadi': 'தோரப்பாடி',
  'sripuram': 'ஸ்ரீபுரம்',
  'thottapalayam': 'தோட்டப்பாளையம்',
  'green circle': 'கிரீன் சர்க்கிள்',
  'new bus stand': 'புதிய பேருந்து நிலையம்',
  'old bus stand': 'பழைய பேருந்து நிலையம்',
  'chelliamman nagar': 'செல்லியம்மன் நகர்',
  'south vellore': 'தெற்கு வேலூர்',
  'otteri': 'ஓட்டேரி',
  'vit': 'விஐடி',
  'cmc': 'சிஎம்சி',
  'station': 'ரயில் நிலையம்',
  'junction': 'சந்திப்பு',
  'near': 'அருகில்',
  'for': 'க்கான',
  'in': 'இல்',
  'at': 'இல்',
  'and': '&',
  'with': 'உடன்'
};

// Comprehensive English-to-Hindi vocabulary dictionary
const HI_VOCAB: Record<string, string> = {
  // Action & Matching Terms
  'needed': 'की आवश्यकता है',
  'need': 'आवश्यकता है',
  'required': 'की आवश्यकता है',
  'urgent': 'तत्काल',
  'immediate': 'तत्काल',
  'looking for': 'तलाश है',
  'wanted': 'चाहिए',
  'available': 'उपलब्ध',
  'helper': 'सहायक',
  'assistant': 'सहायक',
  'worker': 'कर्मचारी',
  'staff': 'कर्मचारी',
  'skill match': 'कौशल मिलान',
  'match score': 'मिलान स्कोर',
  'matching skills': 'मिलते-जुलते कौशल',
  'missing skills': 'अपेक्षित कौशल',
  'skill gap': 'कौशल अंतर',
  'recommended': 'अनुशंसित',
  'recommendation': 'सिफारिश',
  'high demand': 'उच्च मांग',
  'verified': 'सत्यापित',
  'claim': 'स्वीकार करें',
  'claimed': 'स्वीकृत',

  // Driving & Logistics
  'driving': 'ड्राइविंग',
  'driver': 'ड्राइवर',
  'delivery': 'डिलीवरी',
  'rider': 'राइडर',
  'bike rider': 'बाइक राइडर',
  'auto driving': 'ऑटो ड्राइविंग',
  'car driving': 'कार ड्राइविंग',
  'courier delivery': 'कूरियर डिलीवरी',
  'food delivery': 'फूड डिलीवरी',
  'grocery delivery': 'किराना डिलीवरी',
  'loading & unloading': 'लोडिंग और अनलोडिंग',
  'loading': 'लोडिंग',
  'unloading': 'अनलोडिंग',
  'parcel sorter': 'पार्सल छंटाई',
  'parcel': 'पार्सल',
  'warehouse': 'गोदाम',
  'heavy lifting': 'वजन उठाना',

  // Retail, Store & Billing
  'store helper': 'दुकान सहायक',
  'store': 'दुकान',
  'shop': 'दुकान',
  'retail': 'खुदरा बिक्री',
  'supermarket': 'सुपरमार्केट',
  'billing': 'बिलिंग',
  'cashier & billing': 'कैशियर और बिलिंग',
  'cashier': 'कैशियर',
  'inventory': 'स्टॉक प्रबंधन',
  'stock management': 'स्टॉक प्रबंधन',
  'barcode scanning': 'बारकोड स्कैनिंग',
  'shelf restocking': 'शेल्फ स्टॉकिंग',
  'packing & restocking': 'पैकिंग और रीस्टॉकिंग',
  'packing': 'पैकिंग',
  'customer service': 'ग्राहक सेवा',

  // Office & Digital Skills
  'data entry': 'डेटा एंट्री',
  'computer basics': 'कंप्यूटर बेसिक',
  'basic accounts': 'बुनियादी लेखा',
  'computer': 'कंप्यूटर',
  'typing': 'टाइपिंग',
  'ms excel': 'एमएस एक्सेल',
  'smartphone proficient': 'स्मार्टफोन में निपुण',
  'tally erp': 'टैली ईआरपी',
  'office assistant': 'कार्यालय सहायक',
  'office': 'कार्यालय',

  // Trades, Maintenance & Construction
  'electrician basics': 'इलेक्ट्रीशियन कार्य',
  'electrician': 'इलेक्ट्रीशियन',
  'electrical': 'इलेक्ट्रिकल',
  'wiring': 'वायरिंग',
  'plumbing': 'प्लंबिंग',
  'plumber': 'प्लंबर',
  'carpentry': 'बढ़ई का काम',
  'carpenter': 'बढ़ई',
  'ac maintenance': 'एसी मरम्मत',
  'ac repair': 'एसी रिपेयर',
  'welding': 'वेल्डिंग',
  'painting': 'पेंटिंग',
  'painter': 'पेंटर',
  'cctv installation': 'सीसीटीवी इंस्टालेशन',
  'tailoring': 'सिलाई',

  // Food, Kitchen & Hospitality
  'cooking / catering': 'खाना बनाना / कैटरिंग',
  'cooking': 'खाना बनाना',
  'catering': 'कैटरिंग',
  'cook': 'रसोइया',
  'kitchen helper': 'रसोई सहायक',
  'kitchen': 'रसोई',
  'food serving': 'खाना परोसना',
  'food': 'भोजन',

  // Healthcare & Caregiving
  'patient helper': 'रोगी सहायक',
  'patient': 'रोगी',
  'hospital': 'अस्पताल',
  'opd guide': 'ओपीडी गाइड',
  'elderly care': 'बुजुर्गों की देखभाल',

  // Cleaning, Facilities & Security
  'cleaning & housekeeping': 'सफाई और हाउसकीपिंग',
  'cleaning': 'सफाई',
  'housekeeping': 'हाउसकीपिंग',
  'gardening': 'बागवानी',
  'security guard': 'सुरक्षा गार्ड',
  'security': 'सुरक्षा',
  'guard': 'गार्ड',

  // Events, Media & Arts
  'event setup': 'इवेंट सेटअप',
  'event': 'इवेंट',
  'pamphlet distribution': 'पंपलेट वितरण',
  'music': 'संगीत',
  'musician': 'संगीतकार',
  'tutoring': 'ट्यूशन',
  'tutor': 'ट्यूटर',
  'teacher': 'शिक्षक',

  // Soft Skills & Languages
  'tamil speaking': 'तमिल बोलना',
  'english speaking': 'अंग्रेज़ी बोलना',
  'hindi speaking': 'हिन्दी बोलना',
  'telugu speaking': 'तेलुगू बोलना',
  'physically active': 'शारीरिक रूप से सक्रिय',
  'punctual': 'समयनिष्ठ',
  'reliable': 'विश्वसनीय',

  // Times, Locations & General
  'morning': 'सुबह',
  'early morning': 'सुबह जल्दी',
  'afternoon': 'दोपहर',
  'evening': 'शाम',
  'night': 'रात',
  'shift': 'शिफ्ट',
  'task': 'कार्य',
  'work': 'कार्य',
  'vellore': 'वेल्लोर',
  'katpadi': 'काटपाडी',
  'green circle': 'ग्रीन सर्कल',
  'new bus stand': 'नया बस स्टैंड',
  'near': 'के पास',
  'and': 'और'
};

// Comprehensive English-to-Telugu vocabulary dictionary
const TE_VOCAB: Record<string, string> = {
  // Action & Matching Terms
  'needed': 'అవసరం',
  'need': 'అవసరం',
  'required': 'అవసరం',
  'urgent': 'అత్యవసరం',
  'immediate': 'తక్షణమే',
  'looking for': 'వెతుకుతున్నాము',
  'wanted': 'కావాలి',
  'available': 'అందుబాటులో ఉంది',
  'helper': 'సహాయకుడు',
  'assistant': 'సహాయకుడు',
  'worker': 'కార్మికుడు',
  'staff': 'సిబ్బంది',
  'skill match': 'నైపుణ్య సరిపోలిక',
  'match score': 'మ్యాచ్ స్కోరు',
  'matching skills': 'సరిపోలిన నైపుణ్యాలు',
  'missing skills': 'అవసరమైన నైపుణ్యాలు',
  'skill gap': 'నైపుణ్య లోపం',
  'recommended': 'సిఫార్సు చేయబడింది',
  'recommendation': 'సిఫార్సు',
  'high demand': 'అధిక డిమాండ్',
  'verified': 'ధృవీకరించబడింది',
  'claim': 'స్వీకరించు',
  'claimed': 'స్వీకరించబడింది',

  // Driving & Logistics
  'driving': 'డ్రైవింగ్',
  'driver': 'డ్రైవర్',
  'delivery': 'డెలివరీ',
  'rider': 'రైడర్',
  'bike rider': 'బైక్ రైడర్',
  'auto driving': 'ఆటో డ్రైవింగ్',
  'car driving': 'కార్ డ్రైవింగ్',
  'courier delivery': 'కొరియర్ డెలివరీ',
  'food delivery': 'ఫుడ్ డెలివరీ',
  'grocery delivery': 'కిరాణా డెలివరీ',
  'loading & unloading': 'లోడింగ్ & అన్‌లోడింగ్',
  'loading': 'లోడింగ్',
  'unloading': 'అన్‌లోడింగ్',
  'parcel sorter': 'పార్సెల్ క్రమబద్ధీకరణ',
  'parcel': 'పార్సెల్',
  'warehouse': 'గిడ్డంగి',
  'heavy lifting': 'బరువులు ఎత్తడం',

  // Retail, Store & Billing
  'store helper': 'షాప్ సహాయకుడు',
  'store': 'స్టోర్',
  'shop': 'షాప్',
  'retail': 'రిటైల్ అమ్మకాలు',
  'supermarket': 'సూపర్‌మార్కెట్',
  'billing': 'బిల్లింగ్',
  'cashier & billing': 'క్యాషియర్ & బిల్లింగ్',
  'cashier': 'క్యాషియర్',
  'inventory': 'స్టాక్ నిర్వహణ',
  'stock management': 'స్టాక్ నిర్వహణ',
  'barcode scanning': 'బార్‌కోడ్ స్కానింగ్',
  'shelf restocking': 'షెల్ఫ్ స్టాకింగ్',
  'packing & restocking': 'ప్యాకింగ్ & రీస్టాకింగ్',
  'packing': 'ప్యాకింగ్',
  'customer service': 'కస్టమర్ సర్వీస్',

  // Office & Digital Skills
  'data entry': 'డేటా ఎంట్రీ',
  'computer basics': 'కంప్యూటర్ బేసిక్స్',
  'basic accounts': 'ప్రాథమిక లెక్కలు',
  'computer': 'కంప్యూటర్',
  'typing': 'టైపింగ్',
  'ms excel': 'ఎంఎస్ ఎక్సెల్',
  'smartphone proficient': 'స్మార్ట్‌ఫోన్ నైపుణ్యం',
  'tally erp': 'ట్యాలీ ఈఆర్‌పీ',
  'office assistant': 'ఆఫీస్ అసిస్టెంట్',
  'office': 'కార్యాలయం',

  // Trades, Maintenance & Construction
  'electrician basics': 'ఎలక్ట్రీషియన్ బేసిక్స్',
  'electrician': 'ఎలక్ట్రీషియన్',
  'electrical': 'ఎలక్ట్రికల్',
  'wiring': 'వైరింగ్',
  'plumbing': 'ప్లంబింగ్',
  'plumber': 'ప్లంబర్',
  'carpentry': 'వడ్రంగి పని',
  'carpenter': 'వడ్రంగి',
  'ac maintenance': 'ఏసీ నిర్వహణ',
  'ac repair': 'ఏసీ రిపేర్',
  'welding': 'వెల్డింగ్',
  'painting': 'పెయింటింగ్',
  'painter': 'పెయింటర్',
  'cctv installation': 'సీసీటీవీ ఇన్‌స్టాలేషన్',
  'tailoring': 'టైలరింగ్',

  // Food, Kitchen & Hospitality
  'cooking / catering': 'వంట / క్యాటరింగ్',
  'cooking': 'వంట పని',
  'catering': 'క్యాటరింగ్',
  'cook': 'వంట మనిషి',
  'kitchen helper': 'కిచెన్ హెల్పర్',
  'kitchen': 'వంటగది',
  'food serving': 'ఆహారం వడ్డించడం',
  'food': 'ఆహారం',

  // Healthcare & Caregiving
  'patient helper': 'రోగి సహాయకుడు',
  'patient': 'రోగి',
  'hospital': 'ఆసుపత్రి',
  'opd guide': 'ఓపీడీ గైడ్',
  'elderly care': 'వృద్ధుల సంరక్షణ',

  // Cleaning, Facilities & Security
  'cleaning & housekeeping': 'శుభ్రపరచడం & ఇంటి నిర్వహణ',
  'cleaning': 'శుభ్రపరచడం',
  'housekeeping': 'ఇంటి నిర్వహణ',
  'gardening': 'తోటపని',
  'security guard': 'సెక్యూరిటీ గార్డ్',
  'security': 'సెక్యూరిటీ',
  'guard': 'గార్డ్',

  // Events, Media & Arts
  'event setup': 'ఈవెంట్ సెటప్',
  'event': 'ఈవెంట్',
  'pamphlet distribution': 'కరపత్రాల పంపిణీ',
  'music': 'సంగీతం',
  'musician': 'సంగీతకారుడు',
  'tutoring': 'ట్యూషన్',
  'tutor': 'ట్యూటర్',
  'teacher': 'ఉపాధ్యాయుడు',

  // Soft Skills & Languages
  'tamil speaking': 'తమిళం మాట్లాడటం',
  'english speaking': 'ఆంగ్లం మాట్లాడటం',
  'hindi speaking': 'హిందీ మాట్లాడటం',
  'telugu speaking': 'తెలుగు మాట్లాడటం',
  'physically active': 'శారీరకంగా చురుకైన',
  'punctual': 'సమయపాలన',
  'reliable': 'నమ్మకమైన',

  // Times, Locations & General
  'morning': 'ఉదయం',
  'early morning': 'తెల్లవారుజామున',
  'afternoon': 'మధ్యాహ్నం',
  'evening': 'సాయంత్రం',
  'night': 'రాత్రి',
  'shift': 'షిఫ్ట్',
  'task': 'పని',
  'work': 'పని',
  'vellore': 'వెల్లూరు',
  'katpadi': 'కాట్పాడి',
  'green circle': 'గ్రీన్ సర్కిల్',
  'new bus stand': 'కొత్త బస్టాండ్',
  'near': 'సమీపంలో',
  'and': '&'
};

// Local storage translation memory cache for dynamic translations
const TRANSLATION_CACHE_KEY = 'skill2work_dynamic_translations_v1';

const getCache = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem(TRANSLATION_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const setCacheEntry = (key: string, value: string) => {
  try {
    const cache = getCache();
    cache[key] = value;
    localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(cache));
  } catch { }
};

/**
 * Dynamically translates any custom user string into target language locally & offline.
 */
export const autoTranslateString = (text: string, targetLang: Language): string => {
  if (!text || !text.trim()) return '';
  if (targetLang === 'en') return text;

  const cacheKey = `${targetLang}:${text.trim().toLowerCase()}`;
  const cache = getCache();
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const vocab = targetLang === 'ta' ? TA_VOCAB : targetLang === 'hi' ? HI_VOCAB : TE_VOCAB;
  let result = text;
  let translatedAny = false;

  // Sort dictionary keys by length descending to match multi-word phrases first
  const sortedKeys = Object.keys(vocab).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    const translation = vocab[key];
    const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapeRegex(key)}\\b`, 'gi');
    if (regex.test(result)) {
      result = result.replace(regex, translation);
      translatedAny = true;
    }
  }

  // If no whole-word match, attempt sub-string replacement
  if (!translatedAny) {
    for (const key of sortedKeys) {
      if (key.length >= 3 && result.toLowerCase().includes(key)) {
        const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapeRegex(key), 'gi');
        result = result.replace(regex, vocab[key]);
        translatedAny = true;
      }
    }
  }

  if (translatedAny) {
    setCacheEntry(cacheKey, result);
  }

  return result;
};

/**
 * Optional Online Instant Auto-Translator (Zero API Key required via Free Web Translate Engine)
 */
export const prefetchDynamicTranslation = async (text: string, targetLang: Language): Promise<string> => {
  if (!text || targetLang === 'en') return text;

  const cacheKey = `${targetLang}:${text.trim().toLowerCase()}`;
  const cache = getCache();
  if (cache[cacheKey]) return cache[cacheKey];

  // Try local dictionary first
  const localResult = autoTranslateString(text, targetLang);
  if (localResult !== text) return localResult;

  // If online, try free instant translation
  if (typeof navigator !== 'undefined' && navigator.onLine) {
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
      );
      const data = await res.json();
      if (data?.responseData?.translatedText) {
        const translated = data.responseData.translatedText;
        setCacheEntry(cacheKey, translated);
        return translated;
      }
    } catch {
      // Fallback silently to offline engine
    }
  }

  return localResult;
};
