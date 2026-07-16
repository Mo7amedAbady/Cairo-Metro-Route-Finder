<div dir="rtl" align="right">

# دليل مشروع Cairo Metro Route Finder

> **الإصدار:** 1.0  
> **تاريخ الإنشاء:** يوليو ٢٠٢٦  
> **نوع الوثيقة:** توثيق هندسي داخلي للمطوّر  
> **الجمهور المستهدف:** المطوّر المسؤول عن صيانة المشروع وتطويره

---

## فهرس المحتويات

1. [مقدمة](#1-مقدمة)
2. [هيكل المشروع بالكامل](#2-هيكل-المشروع-بالكامل)
3. [شرح كل ملف](#3-شرح-كل-ملف)
4. [شرح جميع الـ Components](#4-شرح-جميع-الـ-components)
5. [تدفق البيانات داخل المشروع](#5-تدفق-البيانات-داخل-المشروع)
6. [شرح الـ BFS](#6-شرح-الـ-bfs)
7. [شرح البيانات](#7-شرح-البيانات)
8. [إدارة الحالة (State Management)](#8-إدارة-الحالة-state-management)
9. [شرح الـ Context](#9-شرح-الـ-context)
10. [شرح الترجمة](#10-شرح-الترجمة)
11. [تصميم الواجهة](#11-تصميم-الواجهة)
12. [رحلة المستخدم](#12-رحلة-المستخدم)
13. [العلاقات بين الملفات](#13-العلاقات-بين-الملفات)
14. [كيفية إضافة ميزة جديدة](#14-كيفية-إضافة-ميزة-جديدة)
15. [المشاكل المحتملة](#15-المشاكل-المحتملة)
16. [أفكار مستقبلية](#16-أفكار-مستقبلية)
17. [ملخص المشروع](#17-ملخص-المشروع)

---

## 1. مقدمة

### فكرة المشروع

مشروع **Cairo Metro Route Finder** هو تطبيق ويب تفاعلي يساعد مستخدمي مترو القاهرة في العثور على أقصر مسار بين أي محطتين من محطات شبكة المترو. الشبكة تتكون من ثلاثة خطوط رئيسية (الخط الأول، الخط الثاني، الخط الثالث) تتقاطع في محطات تبادلية مركزية.

### الهدف منه

- تقديم طريقة سريعة وبصرية للمستخدم لتخطيط رحلته داخل شبكة مترو القاهرة.
- حساب أقصر مسار بين أي محطتين باستخدام خوارزمية **BFS** (البحث بالعرض أولاً).
- عرض المسار كـ **Timeline** بصري يوضح كل محطة والخط الذي تنتمي إليه ومحطات التحويل.
- دعم **لغتين** (العربية والإنجليزية) مع إمكانية التبديل الفوري وحفظ الاختيار.

### المشكلة التي يحلها

المسافر في مترو القاهرة يحتاج إلى معرفة:
- أقصر مسار بين المحطة التي يقف فيها والمحطة التي يريد الوصول إليها.
- هل يحتاج إلى تغيير خط (Transfer)؟ وفي أي محطة؟
- كم عدد المحطات والوقت المتوقع للرحلة؟

هذا المشروع يحل كل هذه المشاكل في واجهة واحدة سهلة الاستخدام.

### التقنيات المستخدمة

| التقنية | الإصدار | الغرض |
|---------|---------|-------|
| **React** | 19.2.7 | مكتبة بناء واجهات المستخدم التفاعلية |
| **Vite** | 8.1.1 | أداة بناء سريعة (Bundler / Dev Server) |
| **Tailwind CSS** | 4.3.2 | إطار CSS لتنسيق الواجهة بنظام Utility-First |
| **Framer Motion** | 12.42.2 | مكتبة الرسوم المتحركة (Animations) |
| **Lucide React** | 1.23.0 | مكتبة أيقونات SVG |
| **JavaScript (ES Modules)** | — | لغة البرمجة الأساسية |

### لماذا تم اختيار React + Vite؟

- **React**: لأنها تعتمد على مفهوم المكونات (Components) مما يسمح بتقسيم الواجهة إلى أجزاء مستقلة قابلة لإعادة الاستخدام. كما أن نظام الـ State و الـ Hooks يسهّل إدارة البيانات المتغيرة (مثل المحطة المختارة والمسار المحسوب).
- **Vite**: لأنه أسرع بكثير من Webpack في بيئة التطوير. يستخدم **ES Modules** الأصلية في المتصفح أثناء التطوير، مما يعني أن التغييرات تظهر فورياً (Hot Module Replacement). وأثناء البناء للإنتاج يستخدم **Rolldown** لإنشاء حزم مضغوطة وسريعة.

### كيف يعمل المشروع بشكل عام

```
المستخدم يفتح الموقع
        │
        ▼
   يظهر Hero Section (شاشة الترحيب)
        │
        ▼
   يضغط على "ابدأ التخطيط" → ينتقل تلقائياً لقسم البحث
        │
        ▼
   يختار محطة القيام (From) ومحطة الوصول (To) من القوائم المنسدلة
        │
        ▼
   يضغط زر "البحث عن أقصر مسار"
        │
        ▼
   يتم تشغيل خوارزمية BFS على بيانات الـ Graph
        │
        ▼
   النتيجة (مصفوفة من الكائنات {S: اسم_المحطة, L: رمز_الخط})
        │
        ▼
   تُعرض النتيجة على شكل Timeline بصري مع ملخص الرحلة
```

---

## 2. هيكل المشروع بالكامل

```
cairo-metro/
│
├── Data/
│   └── shortest_path.js          ← بيانات المحطات + خوارزمية BFS
│
├── public/
│   ├── favicon.svg               ← أيقونة الموقع
│   └── icons.svg                 ← ملف أيقونات إضافي
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            ← شريط التنقل العلوي
│   │   ├── Hero.jsx              ← قسم الترحيب الرئيسي
│   │   ├── SearchPanal.jsx       ← لوحة اختيار محطتي القيام والوصول
│   │   ├── ChooseStation.jsx     ← قائمة منسدلة لاختيار محطة واحدة
│   │   ├── DisplayStations.jsx   ← عرض المسار كـ Timeline + ملخص الرحلة
│   │   ├── MetroMap.jsx          ← خريطة SVG تفاعلية لشبكة المترو
│   │   └── LanguageToggle.jsx    ← زر تبديل اللغة (AR / EN)
│   │
│   ├── context/
│   │   └── LanguageContext.jsx   ← Context لإدارة حالة اللغة والترجمة
│   │
│   ├── utils/
│   │   └── translations.js      ← قاموس الترجمة (EN ↔ AR) + أسماء المحطات
│   │
│   ├── App.jsx                   ← المكوّن الجذري الذي يجمع كل الأجزاء
│   ├── App.css                   ← أنماط خاصة بالتطبيق (فارغ حالياً)
│   ├── main.jsx                  ← نقطة الدخول (Entry Point) لـ React
│   └── index.css                 ← الأنماط العامة + إعدادات Tailwind
│
├── index.html                    ← صفحة HTML الرئيسية (Shell)
├── vite.config.js                ← إعدادات Vite
├── package.json                  ← تبعيات المشروع وسكريبتات التشغيل
├── package-lock.json             ← قفل إصدارات التبعيات
└── .gitignore                    ← ملفات مستثناة من Git
```

### شرح وظيفة كل مجلد

| المجلد | الوظيفة |
|--------|---------|
| `Data/` | يحتوي على ملف بيانات محطات المترو المُمثّلة كـ Graph (قائمة جوار)، ودالة `BFS` لحساب أقصر مسار. هذا المجلد خارج `src/` وهو مقصود لفصل البيانات والخوارزميات عن طبقة الواجهة. |
| `public/` | الملفات الثابتة التي تُقدّم مباشرة دون معالجة من Vite. يحتوي على أيقونة الموقع `favicon.svg` وملف أيقونات إضافي. |
| `src/components/` | جميع مكونات React المسؤولة عن أجزاء الواجهة. كل ملف `.jsx` يمثل مكوّناً مستقلاً بمسؤولية واحدة محددة. |
| `src/context/` | يحتوي على React Context لإدارة حالة اللغة. يوفّر الـ Provider الذي يلف كل التطبيق ويُتيح لأي مكوّن الوصول للغة الحالية ودوال الترجمة. |
| `src/utils/` | ملفات الأدوات المساعدة. حالياً يحتوي على قاموس الترجمة لكل النصوص الظاهرة في الواجهة وأسماء المحطات. |

---

## 3. شرح كل ملف

### 3.1 `index.html`

| الخاصية | القيمة |
|---------|--------|
| **المكان** | `cairo-metro/index.html` (جذر المشروع) |
| **الوظيفة** | الغلاف الخارجي (Shell) لتطبيق React. يحتوي على عنصر `<div id="root">` الذي يتم تركيب (mount) تطبيق React بداخله. |
| **متى يتم استدعاؤه** | هو أول ملف يُقدّم للمتصفح عند فتح الموقع |
| **ما يحتويه** | تحميل خطوط Google (Plus Jakarta Sans, Inter, Cairo)، عنوان الصفحة، وإعدادات الـ viewport |

**التفاصيل:**
- يحمّل ثلاثة خطوط: `Plus Jakarta Sans` و `Inter` للإنجليزية، و `Cairo` للعربية.
- يضبط `<html lang="en" class="dark">` كحالة ابتدائية (يتم تغييرها ديناميكياً بواسطة LanguageContext).
- يضبط `<body>` بلون خلفية داكن `#0b0f19` وخاصية `antialiased` لتنعيم النصوص.
- يُحمّل `src/main.jsx` كـ ES Module.

### 3.2 `vite.config.js`

| الخاصية | القيمة |
|---------|--------|
| **المكان** | `cairo-metro/vite.config.js` |
| **الوظيفة** | إعدادات أداة البناء Vite |

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

يُفعّل مكوّنين إضافيين:
- `@vitejs/plugin-react`: يدعم JSX و Fast Refresh.
- `@tailwindcss/vite`: يدمج Tailwind CSS v4 مباشرة كـ Vite plugin بدلاً من PostCSS.

### 3.3 `package.json`

| الخاصية | القيمة |
|---------|--------|
| **المكان** | `cairo-metro/package.json` |
| **الوظيفة** | يُعرّف اسم المشروع، الإصدار، التبعيات، وسكريبتات التشغيل |

**السكريبتات المتاحة:**

| الأمر | الوظيفة |
|-------|---------|
| `npm run dev` | تشغيل خادم التطوير المحلي مع Hot Reload |
| `npm run build` | بناء نسخة الإنتاج في مجلد `dist/` |
| `npm run lint` | تشغيل أداة الفحص `oxlint` |
| `npm run preview` | معاينة نسخة الإنتاج محلياً |

**التبعيات الرئيسية:**

| الحزمة | الغرض |
|--------|-------|
| `react` / `react-dom` | مكتبة React الأساسية |
| `tailwindcss` / `@tailwindcss/vite` | إطار CSS |
| `framer-motion` | رسوم متحركة |
| `lucide-react` | أيقونات SVG |
| `prompt-sync` | مكتبة إدخال من الطرفية (مستخدمة في `shortest_path.js` ولكنها لا تؤثر على المتصفح) |

### 3.4 `src/main.jsx`

| الخاصية | القيمة |
|---------|--------|
| **المكان** | `src/main.jsx` |
| **الوظيفة** | نقطة الدخول (Entry Point) لتطبيق React |
| **يستدعي** | `App.jsx`، `index.css` |
| **متى يتم استدعاؤه** | يتم تحميله من `index.html` عبر `<script type="module" src="/src/main.jsx">` |

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**ماذا يفعل:**
1. يستورد `index.css` الذي يُفعّل Tailwind CSS والأنماط المخصصة.
2. يجد العنصر `<div id="root">` في `index.html`.
3. يُنشئ جذر React ويُركّب المكوّن `<App />` بداخله.
4. يلف `<App />` في `<StrictMode>` الذي يُفعّل تحقيقات إضافية أثناء التطوير فقط.

### 3.5 `src/index.css`

| الخاصية | القيمة |
|---------|--------|
| **المكان** | `src/index.css` |
| **الوظيفة** | الأنماط العامة + إعدادات Tailwind CSS v4 |

**المحتويات بالتفصيل:**

1. **استيراد Tailwind**: `@import "tailwindcss"` يُفعّل جميع أنماط Tailwind CSS.

2. **إعدادات الثيم** (داخل `@theme`):
   - `--color-l1: #ef4444` — اللون الأحمر للخط الأول
   - `--color-l2: #3b82f6` — اللون الأزرق للخط الثاني
   - `--color-l3: #10b981` — اللون الأخضر للخط الثالث
   - `--color-ts: #f59e0b` — اللون الذهبي لمحطات التحويل
   - `--font-sans` — سلسلة الخطوط: Plus Jakarta Sans → Inter → Cairo → system-ui

3. **أنماط عامة**:
   - `html`: تمرير سلس `scroll-behavior: smooth`
   - `body`: خلفية متدرجة شعاعية (Radial Gradients) بثلاثة ألوان خافتة تعطي تأثيراً بصرياً راقياً

4. **تخصيص شريط التمرير** (Scrollbar): عرض 8px، لون شفاف مع زوايا مستديرة.

5. **رسوم متحركة مخصصة**:
   - `pulse-glow`: تأثير نبض مع ظل متوهج (للمسارات النشطة)
   - `float`: تأثير طفو عائم (للأيقونات الزخرفية)

6. **أنماط Glassmorphism**:
   - `.glass-panel`: خلفية شبه شفافة مع `backdrop-filter: blur(16px)` مما يعطي تأثير الزجاج المعتم.
   - `.glass-panel-hover`: نسخة تفاعلية مع تغييرات عند التمرير (Hover).

### 3.6 `src/App.css`

| الخاصية | القيمة |
|---------|--------|
| **المكان** | `src/App.css` |
| **الوظيفة** | ملف أنماط مخصصة لـ App (فارغ حالياً) |

يحتوي فقط على تعليق يوضح أنه مُعد لأنماط مخصصة ولكنه فارغ لأن Tailwind CSS يتولى كل التنسيق.

### 3.7 `src/App.jsx`

| الخاصية | القيمة |
|---------|--------|
| **المكان** | `src/App.jsx` |
| **الوظيفة** | المكوّن الجذري الذي يجمع كل أجزاء التطبيق |
| **يستدعي** | `Navbar`, `Hero`, `SearchPanel`, `DisplayStations`, `LanguageProvider` |
| **يصدّر** | `App` (Default Export) |

**البنية المعمارية:**

```
App
 └─ LanguageProvider       ← يلف كل التطبيق بسياق اللغة
     └─ AppContent          ← المكوّن الداخلي الذي يستهلك سياق اللغة
         ├─ Navbar
         ├─ Hero
         └─ main (search-section)
             ├─ h2: "Plan Route" / "تخطيط الرحلة"
             ├─ SearchPanel
             ├─ button: "Find Shortest Route"
             └─ DisplayStations
```

**لماذا يوجد مكوّنان `App` و `AppContent`؟**

لأن `useLanguage()` لا يمكن استدعاؤه إلا داخل مكوّن ملفوف بـ `LanguageProvider`. لذلك:
- `App` يلف كل شيء بـ `<LanguageProvider>`.
- `AppContent` هو المكوّن الفعلي الذي يستهلك `useLanguage()` ويدير حالة المحطات والمسار.

**الحالات (States) في `AppContent`:**

| State | النوع | القيمة الابتدائية | الوظيفة |
|-------|-------|-------------------|---------|
| `FromStation` | `string \| null` | `null` | اسم محطة القيام |
| `ToStation` | `string \| null` | `null` | اسم محطة الوصول |
| `path` | `Array<{S, L}>` | `[{}]` | المسار المحسوب (مصفوفة من الكائنات) |

**الدالة `handleFindRoute`:**
```javascript
const handleFindRoute = () => {
  if (!FromStation || !ToStation) return;
  const result = BFS(FromStation, ToStation);
  setpath(result);
};
```
- تتحقق أن المستخدم اختار كلتا المحطتين.
- تستدعي `BFS(FromStation, ToStation)` من ملف `Data/shortest_path.js`.
- تحفظ النتيجة في حالة `path`.
- عند تغيّر `path`، يُعاد تصيير `DisplayStations` تلقائياً لأنها تستقبل `path` كـ Prop.

### 3.8 `Data/shortest_path.js`

| الخاصية | القيمة |
|---------|--------|
| **المكان** | `Data/shortest_path.js` (خارج `src/`) |
| **الوظيفة** | تعريف بيانات الـ Graph (المحطات والجوار) + دالة BFS |
| **يصدّر** | `Stations` (Default) و `BFS` (Named Export) |
| **من يستدعيه** | `App.jsx` (يستدعي `BFS`)، `ChooseStation.jsx` (يستدعي `Stations`) |

(شرح تفصيلي لهذا الملف في القسم 6 و 7)

### 3.9 `src/utils/translations.js`

| الخاصية | القيمة |
|---------|--------|
| **المكان** | `src/utils/translations.js` |
| **الوظيفة** | قاموس الترجمة لجميع النصوص + أسماء المحطات |
| **يصدّر** | `stationTranslations` و `translations` (كلاهما Named Export) |
| **من يستدعيه** | `LanguageContext.jsx` |

يحتوي على:
1. **`stationTranslations`**: كائن يربط اسم كل محطة بالإنجليزية مع ترجمتها العربية. يحتوي على **٩٠ محطة** مقسمة حسب الخطوط الثلاثة ومحطات التحويل.
2. **`translations`**: كائن بمفتاحين `en` و `ar`، كل منهما يحتوي على مفاتيح ترجمة لكل النصوص الثابتة في الواجهة (حوالي ٤٠ مفتاح).

(شرح تفصيلي في القسم 10)

### 3.10 `src/context/LanguageContext.jsx`

| الخاصية | القيمة |
|---------|--------|
| **المكان** | `src/context/LanguageContext.jsx` |
| **الوظيفة** | إدارة حالة اللغة وتوفير دوال الترجمة لكل المكونات |
| **يصدّر** | `LanguageProvider` (Named), `useLanguage` (Named), `LanguageContext` (Default) |
| **من يستدعيه** | `App.jsx` يستخدم `LanguageProvider`، جميع المكونات الأخرى تستخدم `useLanguage` |

(شرح تفصيلي في القسم 9)

---

## 4. شرح جميع الـ Components

### 4.1 `Navbar`

| الخاصية | القيمة |
|---------|--------|
| **الملف** | `src/components/Navbar.jsx` |
| **الغرض** | شريط التنقل العلوي الثابت |
| **Props** | لا يستقبل أي Props |
| **State** | لا يدير أي State داخلي (يستهلك Context فقط) |
| **Hooks** | `useLanguage()` |

**طريقة العمل:**
- يعرض شعار التطبيق (أيقونة `Activity` + اسم التطبيق المترجم + شارة الإصدار `v1.0`).
- يعرض زر `LanguageToggle` لتبديل اللغة.
- يعرض رابط GitHub (أيقونة SVG مرسومة يدوياً).
- يستخدم تأثير `glass-panel` (زجاج معتم) وثبات في أعلى الصفحة (`sticky top-0`).
- يستخدم `ms-1.5` (margin-inline-start) بدلاً من `ml-1.5` لدعم RTL.

**العلاقات:**
- يحتوي على `LanguageToggle` كمكوّن ابن.
- لا يتواصل مع أي مكوّن آخر مباشرة.
- يستهلك `t()` من `LanguageContext` لترجمة اسم التطبيق وعنوان GitHub.

### 4.2 `Hero`

| الخاصية | القيمة |
|---------|--------|
| **الملف** | `src/components/Hero.jsx` |
| **الغرض** | قسم الترحيب الرئيسي (Landing Section) |
| **Props** | لا يستقبل أي Props |
| **State** | لا يدير أي State داخلي |
| **Hooks** | `useLanguage()` |

**طريقة العمل:**
1. يعرض شارة صغيرة "Cairo Transit Hub" مع أيقونة قطار.
2. يعرض العنوان الرئيسي بخط كبير مع تدرج لوني.
3. يعرض وصفاً نصياً للتطبيق.
4. يعرض زر "ابدأ التخطيط" الذي يتمرر تلقائياً إلى قسم البحث.
5. يعرض ثلاث بطاقات إحصائية (أقصر مسار، محطة تبادلية، تخطيط سهل).

**الرسوم المتحركة (Framer Motion):**
```javascript
const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, staggerChildren: 0.15 }
  }
};
```
- `containerVariants`: يظهر الحاوي الرئيسي مع تأخير متتابع للعناصر الفرعية.
- `itemVariants`: كل عنصر فرعي ينزلق من الأسفل ويظهر تدريجياً.
- `staggerChildren: 0.15`: فارق زمني 150ms بين ظهور كل عنصر.

**دالة `handleScrollToSearch`:**
```javascript
const handleScrollToSearch = () => {
  const searchSection = document.getElementById('search-section');
  if (searchSection) {
    searchSection.scrollIntoView({ behavior: 'smooth' });
  }
};
```
تبحث عن العنصر `#search-section` (موجود في `App.jsx`) وتتمرر إليه بسلاسة.

**تعديلات RTL:**
- `end-1/4` و `start-1/4` بدلاً من `right-1/4` و `left-1/4` لتوجيه التوهجات الزخرفية.
- `rtl:rotate-180` و `rtl:group-hover:-translate-x-1` على أيقونة السهم في الزر.

### 4.3 `SearchPanel`

| الخاصية | القيمة |
|---------|--------|
| **الملف** | `src/components/SearchPanal.jsx` |
| **الغرض** | لوحة اختيار محطتي القيام والوصول + زر التبديل |
| **Props** | `FromStation`, `setFromStation`, `ToStation`, `setToStation` |
| **State** | لا يدير State داخلي |
| **Hooks** | `useLanguage()` |

**Props بالتفصيل:**

| Prop | النوع | القادم من | الوظيفة |
|------|-------|----------|---------|
| `FromStation` | `string \| null` | `AppContent` | المحطة المختارة للقيام |
| `setFromStation` | `function` | `AppContent` | دالة لتغيير محطة القيام |
| `ToStation` | `string \| null` | `AppContent` | المحطة المختارة للوصول |
| `setToStation` | `function` | `AppContent` | دالة لتغيير محطة الوصول |

**طريقة العمل:**
1. يعرض قسم "محطة القيام" مع أيقونة بوصلة خضراء (`Navigation`) و `ChooseStation`.
2. يعرض خط فاصل + زر تبديل (`ArrowUpDown`) يقلب القيمتين.
3. يعرض قسم "محطة الوصول" مع أيقونة دبوس أحمر (`MapPin`) و `ChooseStation`.

**دالة `handleSwap`:**
```javascript
const handleSwap = () => {
  const temp = FromStation;
  setFromStation(ToStation);
  setToStation(temp);
};
```
تقلب قيمتي المحطتين مع بعضهما (يتم ذلك عبر متغير مؤقت `temp`).

**تمرير المفاتيح للمكوّن الابن:**
```jsx
<ChooseStation 
  Station={FromStation} 
  setStation={setFromStation} 
  placeholder="select_starting_point"   // ← مفتاح ترجمة وليس نصاً مباشراً
/>
```
لاحظ أن `placeholder` يُمرّر كمفتاح ترجمة (مثل `"select_starting_point"`) وليس كنص مباشر. `ChooseStation` يترجمه باستخدام `t(placeholder)`.

### 4.4 `ChooseStation`

| الخاصية | القيمة |
|---------|--------|
| **الملف** | `src/components/ChooseStation.jsx` |
| **الغرض** | قائمة منسدلة لاختيار محطة واحدة من جميع محطات الشبكة |
| **Props** | `Station`, `setStation`, `placeholder` |
| **State** | لا يدير State داخلي |
| **Hooks** | `useLanguage()` |

**Props بالتفصيل:**

| Prop | النوع | القيمة الافتراضية | الوظيفة |
|------|-------|-------------------|---------|
| `Station` | `string \| null` | — | المحطة المختارة حالياً |
| `setStation` | `function` | — | دالة لتغيير المحطة المختارة |
| `placeholder` | `string` | `"select_station"` | مفتاح الترجمة للنص الافتراضي |

**طريقة العمل:**
1. يستورد مصفوفة `Stations` من `Data/shortest_path.js`.
2. ينشئ `<select>` مع خيار افتراضي معطّل (`disabled`).
3. يكرر على كل عنصر في `Stations` وينشئ `<option>`:
   - `value={element.station}` — **دائماً بالإنجليزية** (لأن BFS يعمل بالأسماء الإنجليزية).
   - `{tStation(element.station)}` — **النص المعروض** يُترجم حسب اللغة المختارة.
4. يعرض أيقونة سهم مخصصة (`ChevronDown`) فوق القائمة المنسدلة.

**نقطة معمارية مهمة:**
```
القيمة الداخلية (value) = اسم المحطة بالإنجليزية دائماً
النص المعروض للمستخدم = tStation() → يعرض عربي أو إنجليزي حسب اللغة
```
هذا التصميم يضمن أن خوارزمية BFS تستقبل دائماً أسماء إنجليزية بغض النظر عن لغة الواجهة.

**تعديلات RTL:**
- `ps-4 pe-10` بدلاً من `pl-4 pr-10` (padding-inline-start و padding-inline-end).
- `end-3.5` بدلاً من `right-3.5` لموضع أيقونة السهم.
- `text-start` لمحاذاة النص حسب اتجاه الصفحة.

### 4.5 `DisplayStations`

| الخاصية | القيمة |
|---------|--------|
| **الملف** | `src/components/DisplayStations.jsx` |
| **الغرض** | عرض المسار المحسوب كـ Timeline بصري + بطاقة ملخص الرحلة |
| **Props** | `Path` |
| **State** | لا يدير State داخلي |
| **Hooks** | `useLanguage()` |

**Prop `Path`:**

| النوع | القادم من | الشكل |
|-------|----------|-------|
| `Array<{S: string, L: string}>` | `AppContent` | `[{S: "Helwan", L: "L1"}, {S: "Maadi", L: "L1"}, ...]` |

- `S` = اسم المحطة (Station Name) بالإنجليزية.
- `L` = رمز الخط (Line Code): `"L1"`, `"L2"`, `"L3"`.

**طريقة العمل:**

**1. التحقق من صلاحية المسار:**
```javascript
const isValidPath = Path && Path.length > 0 && Path[0].S !== undefined;
```
إذا لم يكن هناك مسار صالح، يعرض **حالة فارغة** (Empty State) برسالة "لم يتم تحديد مسار".

**2. حساب الوقت المتوقع:**
```javascript
const estTimeMinutes = Math.max(Path.length * 2, 2);
```
تقدير تقريبي: دقيقتان لكل محطة، بحد أدنى دقيقتين.

**3. حساب عدد التحويلات:**
```javascript
const transfersCount = Path.filter((station, index) => {
  return ((index) && (index < Path.length) && (Path[index-1].L != Path[index].L));
}).length;
```
يحسب عدد المرات التي يتغير فيها رمز الخط بين محطتين متتاليتين.

**4. دالة `getLineDetails(lineCode)`:**
تُرجع كائناً يحتوي على اسم الخط المترجم، وألوان CSS المناسبة (خلفية، نص، حدود، نقطة).

**5. بطاقة ملخص الرحلة:**
تعرض:
- اسم محطة البداية → اسم محطة النهاية (بسهم يُعكس في RTL).
- عدد المحطات الإجمالي.
- المدة المتوقعة (بالدقائق مع حرف `m` أو `د` حسب اللغة).
- عدد التحويلات.

**6. الـ Timeline البصري:**
لكل محطة في المسار:
- **عمود يسار** (أو يمين في RTL): نقطة ملوّنة + شريط عمودي واصل.
  - المحطة الأولى والأخيرة: نقطة كبيرة مع حلقة خارجية.
  - المحطات الوسطى: نقطة صغيرة رمادية.
  - محطات التحويل: حدود ذهبية.
- **عمود يمين** (أو يسار في RTL): اسم المحطة + شارة الخط + ملاحظة التحويل (إن وجدت).

**الرسوم المتحركة:**
- `containerVariants`: تأخير متتابع `staggerChildren: 0.05` (50ms) لكل محطة.
- `itemVariants`: كل محطة تنزلق من الأسفل بتأثير `spring`.

### 4.6 `MetroMap`

| الخاصية | القيمة |
|---------|--------|
| **الملف** | `src/components/MetroMap.jsx` |
| **الغرض** | خريطة SVG تفاعلية لشبكة المترو |
| **Props** | `Path` |
| **State** | لا يدير State داخلي |
| **Hooks** | `useLanguage()`, `useMemo()` |

**ملاحظة:** هذا المكوّن **معلّق حالياً** في `App.jsx` (مُحاط بتعليق). يمكن تفعيله بإزالة التعليق.

**ثوابت `MAP_STATIONS`:**
مصفوفة من ٢٠ محطة مختارة لتمثيل الشبكة على SVG بإحداثيات مُعدّة يدوياً:
```javascript
{ id: 'Helwan', x: 140, y: 350, label: 'Helwan', line: 'L1' }
```

**`useMemo` لتحسين الأداء:**
```javascript
const activeStationNames = useMemo(() => {
  if (!Path || Path.length === 0 || !Path[0].S) return new Set();
  return new Set(Path.map(p => p.S));
}, [Path]);
```
يُنشئ `Set` يحتوي أسماء المحطات الموجودة في المسار. يُعاد حسابه فقط عند تغيّر `Path`.

**طريقة الرسم:**
1. ثلاثة مسارات `<path>` رمادية تمثل المسارات الخلفية (الخطوط الثلاثة).
2. ثلاثة مسارات `<path>` ملوّنة تمثل المسارات النشطة (تظهر فقط عند وجود مسار محسوب).
3. لكل محطة في `MAP_STATIONS`:
   - دائرة خارجية متوهجة (`animate-ping`) إذا كانت المحطة نشطة.
   - دائرة للمحطة ملوّنة حسب الخط.
   - نص يعرض اسم المحطة (مترجم في العربية).
4. لوحة "وضع الاستعداد" تظهر عندما لا يوجد مسار محسوب.

### 4.7 `LanguageToggle`

| الخاصية | القيمة |
|---------|--------|
| **الملف** | `src/components/LanguageToggle.jsx` |
| **الغرض** | زر تبديل اللغة بين العربية والإنجليزية |
| **Props** | لا يستقبل أي Props |
| **State** | لا يدير State داخلي (يستهلك Context فقط) |
| **Hooks** | `useLanguage()` |

**طريقة العمل:**
```javascript
const { language, toggleLanguage } = useLanguage();
```
- يستخرج اللغة الحالية (`language`) ودالة التبديل (`toggleLanguage`).
- يعرض أيقونة كرة أرضية (`Globe`) + نص:
  - `"AR"` عندما اللغة الحالية إنجليزية (أي: "اضغط للتبديل للعربية").
  - `"EN"` عندما اللغة الحالية عربية.
- عند الضغط يستدعي `toggleLanguage()` الذي يقلب اللغة ويحفظها في `localStorage`.

---

## 5. تدفق البيانات داخل المشروع

### المسار الكامل لاختيار المحطة وحساب المسار

```
┌──────────────────────────────────────────────────────────────────────┐
│                         المستخدم يختار محطة                          │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│  ChooseStation                                                       │
│  ─────────────                                                       │
│  <select onChange={(e) => setStation(e.target.value)}>               │
│                                                                      │
│  القيمة المُختارة = اسم المحطة بالإنجليزية (مثل "Helwan")          │
│  يتم استدعاء setStation("Helwan")                                   │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│  SearchPanel                                                         │
│  ───────────                                                         │
│  يمرر setFromStation أو setToStation إلى ChooseStation              │
│  هذه الدوال تُغيّر State في AppContent                              │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│  AppContent (في App.jsx)                                            │
│  ──────────                                                          │
│  const [FromStation, setFromStation] = useState(null);               │
│  const [ToStation, setToStation] = useState(null);                   │
│                                                                      │
│  FromStation = "Helwan"  ←──── تم تحديثها                           │
│  ToStation   = "Sadat"   ←──── تم تحديثها                           │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│  المستخدم يضغط "البحث عن أقصر مسار"                                │
│  ─────────────────────────────────────                               │
│  handleFindRoute()                                                   │
│    ├─ if (!FromStation || !ToStation) return;                        │
│    ├─ const result = BFS("Helwan", "Sadat");                        │
│    └─ setpath(result);                                               │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│  BFS (في Data/shortest_path.js)                                    │
│  ───                                                                 │
│  المدخلات: start = "Helwan", end = "Sadat"                         │
│  يبحث عن الفهرس في مصفوفة Stations                                 │
│  يُنفّذ BFS على الـ Graph                                           │
│  يُعيد بناء المسار من النهاية إلى البداية                            │
│  يُضيف رمز الخط لكل محطة                                           │
│                                                                      │
│  المخرجات:                                                           │
│  [                                                                   │
│    { S: "Helwan", L: "L1" },                                        │
│    { S: "Ain Helwan", L: "L1" },                                    │
│    ...                                                               │
│    { S: "Sadat", L: "L1" }                                          │
│  ]                                                                   │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│  path State يتم تحديثها → React يُعيد تصيير المكونات               │
│                                                                      │
│  DisplayStations                                                     │
│  ────────────────                                                    │
│  يستقبل Path ← [{ S: "Helwan", L: "L1" }, ...]                    │
│  يحسب: عدد المحطات، الوقت المتوقع، عدد التحويلات                   │
│  يعرض: بطاقة الملخص + Timeline لكل محطة                            │
│  يترجم: أسماء المحطات عبر tStation()                                │
└──────────────────────────────────────────────────────────────────────┘
```

### مسار تبديل اللغة

```
المستخدم يضغط زر LanguageToggle
        │
        ▼
toggleLanguage() في LanguageContext
        │
        ├─── setLanguage('ar')      ← تتغير حالة language
        │
        ▼
useEffect يُنفَّذ:
        ├─── localStorage.setItem('lang', 'ar')
        ├─── document.documentElement.dir = 'rtl'
        └─── document.documentElement.lang = 'ar'
        │
        ▼
React يُعيد تصيير كل المكونات التي تستهلك useLanguage()
        │
        ├─── Navbar:        t('logo_name') → 'مترو القاهرة'
        ├─── Hero:          t('hero_title_1') → 'مترو القاهرة'
        ├─── SearchPanel:   t('departure') → 'محطة القيام'
        ├─── ChooseStation:  tStation('Helwan') → 'حلوان'
        ├─── DisplayStations: tStation(station.S) → 'حلوان'
        └─── كل النصوص تتحول للعربية فوراً
```

---

## 6. شرح الـ BFS

### ما هو BFS؟

**BFS (Breadth-First Search)** = البحث بالعرض أولاً. خوارزمية لاستكشاف الـ Graph مستوى بمستوى. تضمن العثور على **أقصر مسار** (بأقل عدد من الأضلاع) في Graph غير موزون (unweighted).

### كيف تم استخدامه في المشروع

الدالة `BFS` موجودة في `Data/shortest_path.js` وتتكون من ثلاث مراحل:

#### المرحلة الأولى: تحويل الأسماء إلى فهارس

```javascript
export function BFS(start, end) {
    let istart = Stations.findIndex(station => station.station === start);
    let iend = Stations.findIndex(station => station.station === end);
    start = istart;    // start أصبح رقم (فهرس)
    end = iend;        // end أصبح رقم (فهرس)
```

- المُدخلات: أسماء المحطات كنصوص (مثلاً `"Helwan"` و `"Sadat"`).
- يبحث عن فهرس كل محطة في مصفوفة `Stations`.
- يُعيد تعيين `start` و `end` كأرقام.

#### المرحلة الثانية: البحث BFS

```javascript
    let queue = [{Node: start, Parent: -1}];
    let visited = new Set([start]);
    let i = 0;

    while (i < queue.length) {
        let node = queue[i++];
        if (node.Node == end) break;

        for (let i = 0; i < Stations[node.Node].neighbors.length; i++) {
            if (!visited.has(Stations[node.Node].neighbors[i])) {
                visited.add(Stations[node.Node].neighbors[i]);
                const x = {Node: Stations[node.Node].neighbors[i], Parent: node.Node};
                queue.push(x);
            }
        }
    }
```

- `queue`: مصفوفة تُستخدم كطابور (FIFO). كل عنصر يحتوي على `Node` (فهرس المحطة) و `Parent` (فهرس المحطة السابقة).
- `visited`: مجموعة `Set` لتتبع المحطات التي تمت زيارتها (لمنع الدوران).
- `i`: مؤشر يتقدم في الطابور (بديل عن `queue.shift()` لأداء أفضل).
- الحلقة تستكشف كل جار لكل محطة. إذا لم يكن الجار مُزاراً، يُضاف للطابور مع تسجيل الأب.
- الحلقة تتوقف عندما تصل إلى محطة الوصول.

#### المرحلة الثالثة: إعادة بناء المسار

```javascript
    let Bulding = [], x = end;
    while (x != start) {
        for (let I of queue) {
            if (I.Node == x) {
                Bulding.push(x);
                x = I.Parent;
                break;
            }
        }
    }
    Bulding.push(start);
    Bulding.reverse();
```

- تبدأ من محطة الوصول (`end`) وترجع للخلف عبر سلسلة الآباء حتى تصل لمحطة القيام (`start`).
- تعكس المصفوفة لتكون من البداية إلى النهاية.

#### المرحلة الرابعة: إضافة معلومات الخط

```javascript
    let F_Bulding = [];
    let end_node;
    for (let i = 0; i < Bulding.length - 1; i++) {
        let line;
        for (let j = 0; j < Stations[Bulding[i]].neighbors.length; j++) {
            if (Stations[Bulding[i]].neighbors[j] == Bulding[i+1]) {
                line = Stations[Bulding[i]].color[j];
                break;
            }
        }
        let x = {S: Stations[Bulding[i]].station, L: line};
        end_node = {S: Stations[Bulding[Bulding.length-1]].station, L: line};
        F_Bulding.push(x);
    }
    F_Bulding.push(end_node);
    return F_Bulding;
```

- لكل محطتين متتاليتين في المسار، يبحث عن رمز الخط (`color`) الذي يربطهما.
- يُنشئ كائنات `{S: اسم_المحطة, L: رمز_الخط}`.
- المحطة الأخيرة تأخذ رمز الخط من الضلع الأخير.

### ما يُرجعه BFS

```javascript
[
  { S: "Helwan",       L: "L1" },
  { S: "Ain Helwan",   L: "L1" },
  { S: "Helwan University", L: "L1" },
  ...
  { S: "Sadat",        L: "L1" }
]
```

### كيف تُستخدم النتيجة

- تُحفظ في `path` State في `AppContent`.
- تُمرّر لـ `DisplayStations` كـ Prop باسم `Path`.
- `DisplayStations` تكرر عليها وتعرض كل محطة في الـ Timeline.

---

## 7. شرح البيانات

### بنية بيانات المحطات

المحطات مُخزّنة كمصفوفة من الكائنات في ثابت `Stations` داخل `Data/shortest_path.js`:

```javascript
const Stations = [
  // فهرس 0
  { station: 'Helwan', neighbors: [1], color: ['L1'] },
  // فهرس 1
  { station: 'Ain Helwan', neighbors: [0, 2], color: ['L1', 'L1'] },
  ...
]
```

| الخاصية | النوع | الوصف |
|---------|-------|-------|
| `station` | `string` | اسم المحطة بالإنجليزية (المعرّف الفريد) |
| `neighbors` | `number[]` | فهارس المحطات المجاورة في المصفوفة |
| `color` | `string[]` | رمز الخط لكل ضلع مقابل (بنفس ترتيب `neighbors`) |

### تمثيل الـ Graph

الشبكة مُمثّلة كـ **Adjacency List** (قائمة جوار):

```
المحطة (فهرس)  →  [الجيران]         [ألوان الأضلاع]
─────────────────────────────────────────────────────
0 (Helwan)      →  [1]               ['L1']
1 (Ain Helwan)  →  [0, 2]            ['L1', 'L1']
...
79 (Al Shohadaa) → [18, 19, 41, 82]  ['L1', 'L1', 'L2', 'L2']
```

### محطات التحويل (Interchange Stations)

المحطات التبادلية هي المحطات التي تتقاطع فيها خطوط مختلفة. تتميز بأن لها جيران من خطوط مختلفة:

| الفهرس | المحطة | الخطوط |
|--------|--------|--------|
| 79 | Al Shohadaa (الشهداء) | L1 + L2 |
| 80 | Sadat (السادات) | L1 + L2 |
| 81 | Nasser (ناصر) | L1 + L3 |
| 82 | Attaba (العتبة) | L2 + L3 |
| 83 | Cairo University (جامعة القاهرة) | L2 + L3 |

### ترميز الخطوط

| الرمز | الاسم | اللون | عدد المحطات |
|-------|-------|-------|-------------|
| `L1` | الخط الأول | أحمر `#ef4444` | الفهارس 0-31 |
| `L2` | الخط الثاني | أزرق `#3b82f6` | الفهارس 32-47 |
| `L3` | الخط الثالث | أخضر `#10b981` | الفهارس 48-78 |

### إجمالي المحطات

المصفوفة تحتوي على **84 عنصر** (الفهارس 0-83)، تتضمن:
- ٣٢ محطة للخط الأول (0-31).
- ١٦ محطة للخط الثاني (32-47).
- ٣١ محطة للخط الثالث (48-78).
- ٥ محطات تبادلية (79-83) تتشارك بين خطين.

---

## 8. إدارة الحالة (State Management)

### جدول شامل لكل الحالات

| الحالة | المكان | القيمة الابتدائية | من يُغيّرها | من يستخدمها |
|--------|--------|-------------------|-------------|-------------|
| `FromStation` | `AppContent` | `null` | `ChooseStation` عبر `setFromStation` | `SearchPanel`, `AppContent` (لـ BFS), الزر (disabled check) |
| `ToStation` | `AppContent` | `null` | `ChooseStation` عبر `setToStation` | `SearchPanel`, `AppContent` (لـ BFS), الزر (disabled check) |
| `path` | `AppContent` | `[{}]` | `handleFindRoute()` بعد حساب BFS | `DisplayStations` |
| `language` | `LanguageContext` | `localStorage.getItem('lang') \|\| 'en'` | `toggleLanguage()` عبر `LanguageToggle` | كل مكوّن يستدعي `useLanguage()` |

### تدفق تغيير الحالة

```
                    AppContent
                   ┌──────────┐
                   │FromStation│ ←── setFromStation ←── ChooseStation (From)
                   │ ToStation │ ←── setToStation  ←── ChooseStation (To)
                   │   path    │ ←── setpath       ←── handleFindRoute()
                   └──────────┘
                        │
            ┌───────────┼────────────┐
            ▼           ▼            ▼
      SearchPanel  DisplayStations  Button
   (يقرأ From/To)  (يقرأ path)   (يقرأ From/To)



                 LanguageContext
                ┌──────────────┐
                │   language    │ ←── toggleLanguage ←── LanguageToggle
                └──────────────┘
                       │
    ┌──────┬───────┬───┴──────┬──────────┬─────────────┐
    ▼      ▼       ▼          ▼          ▼             ▼
 Navbar   Hero  SearchPanel  Choose   Display       MetroMap
                             Station  Stations
```

### ملاحظة حول القيمة الابتدائية لـ `path`

```javascript
const [path, setpath] = useState([{}]);
```

القيمة الابتدائية `[{}]` (مصفوفة بكائن فارغ) وليس `[]`. السبب:
- `DisplayStations` يتحقق: `Path[0].S !== undefined`.
- `[{}]` → `({}).S` = `undefined` → يُظهر الحالة الفارغة.
- `[]` → `[][0]` = `undefined` → خطأ `Cannot read property 'S' of undefined`.

لذلك `[{}]` هو تصميم مقصود لتجنب الأخطاء.

---

## 9. شرح الـ Context

### لماذا تم استخدامه

اللغة المختارة تحتاج للوصول إليها من **كل مكوّن** في التطبيق (Navbar, Hero, SearchPanel, ChooseStation, DisplayStations, MetroMap, App). بدون Context، كان يجب تمرير `language` و `t` و `tStation` عبر Props من `App` إلى كل مكوّن (Prop Drilling)، وهو أمر غير عملي ويُصعّب صيانة الكود.

### كيف يعمل

**LanguageContext.jsx** يتكون من ثلاثة أجزاء:

#### 1. إنشاء الـ Context

```javascript
const LanguageContext = createContext();
```

#### 2. المُزوّد (Provider)

```javascript
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });
```

- يُنشئ حالة `language` بقيمة ابتدائية من `localStorage` (أو `'en'` كافتراضي).
- الدالة التهيئة `() => localStorage.getItem('lang') || 'en'` تُنفَّذ مرة واحدة فقط عند أول تصيير.

```javascript
  useEffect(() => {
    localStorage.setItem('lang', language);
    const root = document.documentElement;
    if (language === 'ar') {
      root.dir = 'rtl';
      root.lang = 'ar';
    } else {
      root.dir = 'ltr';
      root.lang = 'en';
    }
  }, [language]);
```

- عند كل تغيير للغة:
  - يحفظ الاختيار في `localStorage`.
  - يُغيّر خاصية `dir` في `<html>` بين `rtl` و `ltr`.
  - يُغيّر خاصية `lang` في `<html>` بين `ar` و `en`.

**الدوال المتاحة:**

| الدالة | التوقيع | الوصف |
|--------|---------|-------|
| `toggleLanguage()` | `() => void` | تقلب اللغة بين `'en'` و `'ar'` |
| `t(key)` | `(string) => string` | تُرجع الترجمة المقابلة للمفتاح في اللغة الحالية |
| `tStation(name)` | `(string) => string` | تُرجع الاسم العربي للمحطة إذا كانت اللغة عربية، وإلا تُرجع الاسم الإنجليزي كما هو |

**القيم المُمرّرة عبر Provider:**
```javascript
value={{ language, toggleLanguage, t, tStation, isRTL: language === 'ar' }}
```

#### 3. الـ Hook المخصص

```javascript
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
```

يوفّر طريقة آمنة لاستهلاك الـ Context مع رسالة خطأ واضحة إذا تم استدعاؤه خارج `LanguageProvider`.

---

## 10. شرح الترجمة

### هيكل نظام الترجمة

```
translations.js
├── stationTranslations    ← قاموس أسماء المحطات { 'Helwan': 'حلوان', ... }
└── translations           ← قاموس نصوص الواجهة
    ├── en                 ← النسخة الإنجليزية { logo_name: 'CairoMetro', ... }
    └── ar                 ← النسخة العربية { logo_name: 'مترو القاهرة', ... }
```

### كيف تعمل الترجمة

#### ترجمة النصوص الثابتة

```javascript
// في أي مكوّن:
const { t } = useLanguage();

// الاستخدام:
<span>{t('plan_route')}</span>
// إذا language === 'en' → "Plan Route"
// إذا language === 'ar' → "تخطيط الرحلة"
```

**آلية الدالة `t(key)`:**
```javascript
const t = (key) => {
  return translations[language]?.[key] || key;
};
```
- تبحث في `translations['en']` أو `translations['ar']` عن المفتاح.
- إذا لم تجد المفتاح، تُرجعه كما هو (Fallback). هذا يعني أن مفتاحاً غير مُعرَّف سيظهر كنص خام بدلاً من أن يكسر التطبيق.

#### ترجمة أسماء المحطات

```javascript
const { tStation } = useLanguage();

// الاستخدام:
<span>{tStation('Helwan')}</span>
// إذا language === 'en' → "Helwan"
// إذا language === 'ar' → "حلوان"
```

**آلية الدالة `tStation(stationName)`:**
```javascript
const tStation = (stationName) => {
  if (!stationName) return '';
  return stationTranslations[stationName] && language === 'ar'
    ? stationTranslations[stationName]
    : stationName;
};
```
- إذا كانت اللغة عربية **ويوجد** اسم عربي في القاموس → تُرجع العربي.
- وإلا → تُرجع الاسم الإنجليزي كما هو.

### كيف يتم تغيير اللغة

1. المستخدم يضغط زر `LanguageToggle`.
2. يتم استدعاء `toggleLanguage()`.
3. `setLanguage(prev => prev === 'en' ? 'ar' : 'en')`.
4. يتغيّر `language` → React يُعيد تصيير كل المكونات المتأثرة.
5. `useEffect` يُنفَّذ → يحفظ في `localStorage` ويُغيّر `dir` و `lang`.

### كيف يتم حفظ اللغة

```javascript
// عند التحميل الأول:
const [language, setLanguage] = useState(() => {
  return localStorage.getItem('lang') || 'en';
});

// عند كل تغيير:
useEffect(() => {
  localStorage.setItem('lang', language);
  // ...
}, [language]);
```

- المفتاح في `localStorage`: `'lang'`.
- القيم الممكنة: `'en'` أو `'ar'`.
- عند فتح الموقع مجدداً، يقرأ اللغة المحفوظة من `localStorage`.

### كيف يتم تغيير اتجاه الصفحة

```javascript
const root = document.documentElement;  // <html> element
if (language === 'ar') {
  root.dir = 'rtl';     // اتجاه من اليمين لليسار
  root.lang = 'ar';
} else {
  root.dir = 'ltr';     // اتجاه من اليسار لليمين
  root.lang = 'en';
}
```

- `dir="rtl"` يُؤثر تلقائياً على:
  - اتجاه النصوص
  - ترتيب `flex` (يُعكس)
  - الخصائص المنطقية مثل `ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`

- بالإضافة إلى ذلك، بعض المكونات تستخدم `rtl:` modifier في Tailwind:
  - `rtl:rotate-180` لعكس أيقونات الأسهم.
  - `rtl:group-hover:-translate-x-1` لعكس حركة الأسهم عند التمرير.

### جدول مفاتيح الترجمة

| المفتاح | الإنجليزية | العربية | مكان الاستخدام |
|---------|-----------|---------|---------------|
| `logo_name` | CairoMetro | مترو القاهرة | Navbar |
| `cairo_transit_hub` | Cairo Transit Hub | مركز القاهرة لوسائل النقل | Hero |
| `hero_title_1` | Cairo Metro | مترو القاهرة | Hero |
| `hero_title_2` | Route Finder | مخطط الرحلات | Hero |
| `plan_route` | Plan Route | تخطيط الرحلة | App |
| `departure` | DEPARTURE | محطة القيام | SearchPanel |
| `destination` | DESTINATION | محطة الوصول | SearchPanel |
| `find_shortest_route` | Find Shortest Route | البحث عن أقصر مسار | App |
| `no_route_selected` | No Route Selected | لم يتم تحديد مسار | DisplayStations |
| `journey_summary` | Journey Summary | ملخص الرحلة | DisplayStations |
| `line_1` | Line 1 | الخط الأول | DisplayStations, MetroMap |
| `line_2` | Line 2 | الخط الثاني | DisplayStations, MetroMap |
| `line_3` | Line 3 | الخط الثالث | DisplayStations, MetroMap |

---

## 11. تصميم الواجهة

### تقسيم الصفحة

```
┌─────────────────────────────────────────────────┐
│                  Navbar (ثابت)                    │
│  [شعار]                    [تبديل اللغة] [GitHub] │
├─────────────────────────────────────────────────┤
│                                                   │
│                  Hero Section                     │
│              (شاشة كاملة - ترحيب)                │
│                                                   │
│         [شارة] [عنوان] [وصف] [زر]                │
│         [إحصائية 1] [إحصائية 2] [إحصائية 3]       │
│                                                   │
├─────────────────────────────────────────────────┤
│                                                   │
│              Search Section                       │
│         ┌─────────────────────┐                   │
│         │ بطاقة تخطيط الرحلة  │                   │
│         │  [محطة القيام ▼]    │                   │
│         │      [⇅ تبديل]      │                   │
│         │  [محطة الوصول ▼]    │                   │
│         │  [البحث عن أقصر مسار]│                  │
│         └─────────────────────┘                   │
│                                                   │
│         ┌─────────────────────┐                   │
│         │  ملخص الرحلة        │                   │
│         │ [محطات] [مدة] [تحويلات]│                │
│         └─────────────────────┘                   │
│                                                   │
│         ┌─────────────────────┐                   │
│         │  اتجاهات المسار     │                   │
│         │  ● محطة 1           │                   │
│         │  │                  │                   │
│         │  ○ محطة 2           │                   │
│         │  │                  │                   │
│         │  ○ محطة 3           │                   │
│         │  │                  │                   │
│         │  ● محطة N           │                   │
│         └─────────────────────┘                   │
│                                                   │
└─────────────────────────────────────────────────┘
```

### نظام الألوان

| اللون | الكود | الاستخدام |
|-------|-------|-----------|
| خلفية رئيسية | `#0b0f19` | خلفية الموقع (أزرق داكن جداً) |
| نص رئيسي | `#f1f5f9` (slate-100) | النصوص العامة |
| نص ثانوي | `#94a3b8` (slate-400) | العناوين الفرعية والتسميات |
| أزرق أساسي | `#3b82f6` (blue-500) | الأزرار، روابط، الخط الثاني |
| أحمر | `#ef4444` (red-500) | الخط الأول |
| أخضر | `#10b981` (emerald-500) | الخط الثالث |
| ذهبي | `#f59e0b` (amber-500) | محطات التحويل |
| نيلي | `indigo-600` | تدرج الأزرار |

### تأثيرات التصميم

1. **Glassmorphism**: خلفية شبه شفافة مع تمويه (`backdrop-filter: blur`). تُستخدم في Navbar وبطاقة البحث.
2. **Gradients**: تدرجات لونية على الأزرار، العناوين، والشعار.
3. **Radial Glows**: دوائر ملوّنة شفافة تعطي تأثيراً بصرياً في الخلفية.
4. **Micro-animations**: نبض على أيقونات (`animate-pulse`), طفو (`animate-float`), وحركة أسهم عند التمرير.

### الاستجابة (Responsive Design)

يستخدم Tailwind CSS breakpoints:

| النقطة | العرض | التأثير |
|--------|-------|---------|
| افتراضي | `< 768px` | عمود واحد، أحجام نص أصغر |
| `md:` | `≥ 768px` | شبكة من 3 أعمدة للإحصائيات |
| `lg:` | `≥ 1024px` | حشو جانبي أكبر `lg:px-8` |
| `sm:` | `≥ 640px` | `sm:max-w-none` للأسماء الطويلة |

---

## 12. رحلة المستخدم

### الخطوة 1: فتح الموقع

1. المتصفح يُحمّل `index.html`.
2. يُحمّل الخطوط من Google Fonts (Plus Jakarta Sans, Inter, Cairo).
3. يُنفَّذ `main.jsx` → يُركّب `<App />` في `<div id="root">`.
4. `App` يُنشئ `LanguageProvider` الذي:
   - يقرأ `localStorage.getItem('lang')`.
   - إذا وجد `'ar'` → يضبط `dir="rtl"` ويحمّل الواجهة بالعربية.
   - إذا لم يجد أو وجد `'en'` → يحمّل بالإنجليزية (LTR).
5. يظهر `Navbar` في أعلى الصفحة (ثابت).
6. يظهر `Hero` بالرسوم المتحركة (عناصر تظهر تدريجياً).

### الخطوة 2: التنقل لقسم البحث

- المستخدم يضغط "ابدأ التخطيط".
- الصفحة تتمرر بسلاسة إلى `#search-section`.
- أو يتمرر يدوياً لأسفل.

### الخطوة 3: اختيار المحطات

- يرى بطاقة "تخطيط الرحلة".
- يضغط على القائمة المنسدلة الأولى → تظهر كل المحطات (مترجمة حسب اللغة).
- يختار محطة القيام (مثل "حلوان") → القيمة `"Helwan"` تُحفظ في `FromStation`.
- يضغط على القائمة الثانية → يختار محطة الوصول (مثل "السادات") → `"Sadat"` تُحفظ في `ToStation`.
- (اختياري) يضغط زر التبديل `⇅` لقلب المحطتين.

### الخطوة 4: البحث

- زر "البحث عن أقصر مسار" يصبح نشطاً (لأن كلتا المحطتين مختارتان).
- يضغط الزر → `handleFindRoute()` → `BFS("Helwan", "Sadat")`.
- BFS يُرجع مصفوفة المسار.
- `path` State تُحدَّث → React يُعيد تصيير `DisplayStations`.

### الخطوة 5: مشاهدة النتائج

- تظهر بطاقة "ملخص الرحلة" مع عدد المحطات والوقت المتوقع وعدد التحويلات.
- يظهر الـ Timeline مع كل محطة:
  - نقاط ملوّنة تُشير للخط.
  - أسماء المحطات مترجمة.
  - شارات الخط (الخط الأول، الخط الثاني...).
  - ملاحظات التحويل عند تغيير الخط.
  - رسوم متحركة متتابعة (كل محطة تظهر بعد 50ms من السابقة).

### الخطوة 6: تغيير اللغة (اختياري)

- في أي وقت، يضغط زر "AR" (أو "EN").
- كل النصوص تتغير فوراً.
- اتجاه الصفحة ينعكس.
- أسماء المحطات في النتائج تتحول للعربية.
- الاختيار يُحفظ للزيارة القادمة.

---

## 13. العلاقات بين الملفات

### مخطط الاعتمادية

```
                         index.html
                             │
                             ▼
                         main.jsx
                         │      │
                  index.css    App.jsx
                               │    │
               LanguageContext.jsx   App.css
               │
         translations.js
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
     Navbar.jsx          Hero.jsx          main section (App.jsx)
        │                                       │
  LanguageToggle.jsx              ┌──────────────┼──────────────┐
                                  │              │              │
                            SearchPanel.jsx  DisplayStations.jsx  [MetroMap.jsx]
                                  │
                          ChooseStation.jsx
                                  │
                        shortest_path.js (Stations data)
```

### من يستدعي من

| الملف المُستدعي | يستدعي |
|-----------------|--------|
| `main.jsx` | `App.jsx`, `index.css` |
| `App.jsx` | `Navbar`, `Hero`, `SearchPanel`, `DisplayStations`, `LanguageContext`, `BFS` |
| `Navbar.jsx` | `LanguageToggle`, `LanguageContext` |
| `Hero.jsx` | `LanguageContext` |
| `SearchPanel.jsx` | `ChooseStation`, `LanguageContext` |
| `ChooseStation.jsx` | `Stations` (من `shortest_path.js`), `LanguageContext` |
| `DisplayStations.jsx` | `LanguageContext` |
| `MetroMap.jsx` | `LanguageContext` |
| `LanguageToggle.jsx` | `LanguageContext` |
| `LanguageContext.jsx` | `translations.js` |

### من يعتمد على من

| الملف | يعتمد على |
|-------|-----------|
| `translations.js` | لا يعتمد على أي ملف ← **ورقة شجرة** (Leaf) |
| `shortest_path.js` | `prompt-sync` فقط (لا يُستخدم في المتصفح) ← **ورقة شجرة** |
| `LanguageContext.jsx` | `translations.js` |
| `LanguageToggle.jsx` | `LanguageContext.jsx` |
| `ChooseStation.jsx` | `shortest_path.js`, `LanguageContext.jsx` |
| `SearchPanel.jsx` | `ChooseStation.jsx`, `LanguageContext.jsx` |
| `DisplayStations.jsx` | `LanguageContext.jsx` |
| `Hero.jsx` | `LanguageContext.jsx` |
| `MetroMap.jsx` | `LanguageContext.jsx` |
| `Navbar.jsx` | `LanguageToggle.jsx`, `LanguageContext.jsx` |
| `App.jsx` | **كل ما سبق** ← **جذر الشجرة** |

---

## 14. كيفية إضافة ميزة جديدة

### إضافة محطة جديدة

1. **أضف المحطة في `Data/shortest_path.js`:**
```javascript
// أضف في نهاية المصفوفة (أو في الموضع المناسب)
{ station: 'New Station Name', neighbors: [فهرس_الجار_1, فهرس_الجار_2], color: ['L1', 'L1'] },
```

2. **حدّث الجيران:** أضف فهرس المحطة الجديدة في مصفوفة `neighbors` للمحطات المجاورة.

3. **أضف الترجمة في `src/utils/translations.js`:**
```javascript
// في stationTranslations:
'New Station Name': 'اسم المحطة الجديدة',
```

4. **لا حاجة لتغيير أي شيء آخر** — `ChooseStation` يكرر تلقائياً على كل عناصر `Stations`، و BFS يعمل على الـ Graph بشكل ديناميكي.

### إضافة خط مترو جديد

1. **أضف المحطات الجديدة في `Data/shortest_path.js`** مع رمز خط جديد (مثلاً `'L4'`).

2. **أضف لون الخط في `src/index.css`:**
```css
@theme {
  --color-l4: #8b5cf6; /* Purple for Line 4 */
}
```

3. **حدّث `getLineDetails` في `DisplayStations.jsx`:**
```javascript
case 'L4':
  return { name: t('line_4'), bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', dot: 'bg-purple-500' };
```

4. **أضف مفتاح الترجمة في `translations.js`:**
```javascript
// en:
line_4: 'Line 4',
// ar:
line_4: 'الخط الرابع',
```

5. **أضف أسماء المحطات العربية في `stationTranslations`.**

6. **(اختياري) حدّث `MetroMap.jsx`** بإضافة مسار SVG وإحداثيات محطات الخط الجديد.

### إضافة لغة جديدة (مثل الفرنسية)

1. **أضف القاموس في `translations.js`:**
```javascript
export const translations = {
  en: { ... },
  ar: { ... },
  fr: {
    logo_name: 'Métro du Caire',
    // ... كل المفاتيح
  }
};
```

2. **أضف ترجمات المحطات** (إن أردت):
يمكنك إنشاء كائن `stationTranslations_fr` أو تعديل `tStation` لدعم لغات متعددة.

3. **حدّث `LanguageContext.jsx`:**
```javascript
const toggleLanguage = () => {
  setLanguage(prev => {
    if (prev === 'en') return 'ar';
    if (prev === 'ar') return 'fr';
    return 'en';
  });
};
```

4. **حدّث `LanguageToggle.jsx`** لعرض الاختيارات الثلاثة.

5. **حدّث `useEffect` في `LanguageContext`:**
```javascript
if (language === 'ar') {
  root.dir = 'rtl';
} else {
  root.dir = 'ltr'; // الفرنسية LTR مثل الإنجليزية
}
root.lang = language;
```

### إضافة صفحة جديدة

1. **أنشئ مكوّن الصفحة** في `src/components/` أو `src/pages/`.
2. **ثبّت React Router:**
```bash
npm install react-router-dom
```
3. **أضف Router في `App.jsx`:**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ...
<BrowserRouter>
  <Routes>
    <Route path="/" element={<AppContent />} />
    <Route path="/about" element={<AboutPage />} />
  </Routes>
</BrowserRouter>
```

### إضافة Component جديد

1. أنشئ ملف `.jsx` في `src/components/`.
2. إذا احتاج للترجمة: استخدم `useLanguage()` وأضف المفاتيح في `translations.js`.
3. استورده في المكوّن الأب الذي يحتاجه.
4. مرّر له أي Props يحتاجها.

---

## 15. المشاكل المحتملة

### 1. مكتبة `prompt-sync` في المتصفح

**المشكلة:** `shortest_path.js` يستورد `prompt-sync` (مكتبة للطرفية). Vite يُنبّه:
```
Module "fs" has been externalized for browser compatibility
```

**الحل:** هذا تحذير فقط وليس خطأ. المكتبة لا تُستخدم في المتصفح. لإزالة التحذير، يمكنك حذف السطرين:
```javascript
import promptSync from "prompt-sync";
const prompt = promptSync();
```

### 2. اسم الملف `SearchPanal.jsx`

**المشكلة:** الملف مسمّى `SearchPanal.jsx` (خطأ إملائي — الصحيح `SearchPanel`).

**الحل:** يجب إعادة تسمية الملف إلى `SearchPanel.jsx` وتحديث الاستيراد في `App.jsx`:
```javascript
import SearchPanel from './components/SearchPanel'  // بدلاً من SearchPanal
```

### 3. مسار BFS وأسماء محطات مفقودة في القاموس العربي

**المشكلة:** بعض المحطات في `shortest_path.js` لا تملك `station_Ar` (تم حذف هذا الحقل من بعض المحطات في البيانات الأصلية). لكن `stationTranslations` في `translations.js` يغطي **كل المحطات**.

**الحل:** الحالي كافٍ. دالة `tStation` تُرجع الاسم الإنجليزي كـ Fallback إذا لم تجد ترجمة.

### 4. عدم دعم محطتين متماثلتين

**المشكلة:** إذا اختار المستخدم نفس المحطة كبداية ونهاية، BFS قد يتصرف بشكل غير متوقع.

**الحل:** إضافة تحقق في `handleFindRoute`:
```javascript
if (FromStation === ToStation) {
  alert(t('same_station_error'));
  return;
}
```

### 5. الخصائص المنطقية في Tailwind v4

**المشكلة:** بعض الخصائص المنطقية مثل `ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-` قد لا تعمل في إصدارات Tailwind القديمة.

**الحل:** المشروع يستخدم Tailwind v4.3.2 الذي يدعم هذه الخصائص بشكل كامل.

---

## 16. أفكار مستقبلية

### 1. خوارزمية Dijkstra بدلاً من BFS

BFS يجد أقصر مسار **بعدد المحطات**. لكن Dijkstra يمكنه إيجاد أقصر مسار **بالوقت** أو **بالمسافة** إذا أضفنا أوزاناً للأضلاع (مثلاً: المسافة بين محطتين أو الوقت الفعلي).

### 2. وقت الرحلة الحقيقي

بدلاً من التقدير التقريبي (دقيقتان لكل محطة)، يمكن إضافة بيانات المسافات الحقيقية بين المحطات وحساب الوقت بناءً على:
- سرعة المترو (~40 كم/ساعة).
- زمن التوقف في كل محطة (~30 ثانية).
- زمن الانتقال بين الخطوط (~5 دقائق).

### 3. سعر التذكرة

إضافة حساب تلقائي لسعر التذكرة بناءً على عدد المحطات (حسب نظام التسعير الحالي للمترو).

### 4. خريطة تفاعلية كاملة

تفعيل وتطوير `MetroMap.jsx` ليشمل كل المحطات الـ ٨٤ مع إمكانية النقر على محطة لاختيارها كبداية أو نهاية.

### 5. Live Metro (حالة الخطوط المباشرة)

إضافة مؤشرات لحالة كل خط (يعمل / متوقف / متأخر) مع تحديث فوري إن توفرت API.

### 6. وضع عدم الاتصال (PWA)

تحويل التطبيق إلى Progressive Web App ليعمل بدون إنترنت مع Service Worker.

### 7. مسارات متعددة

عرض أكثر من مسار ممكن (مثلاً: أقصر مسار وأقل تحويلات) ليختار المستخدم ما يناسبه.

### 8. المفضلات

حفظ المسارات المفضلة للمستخدم في `localStorage` لاسترجاعها بسرعة.

### 9. دعم الخط الرابع (قيد الإنشاء)

الخط الرابع لمترو القاهرة قيد الإنشاء حالياً. يمكن إضافة محطاته مستقبلاً.

---

## 17. ملخص المشروع

مشروع **Cairo Metro Route Finder** مبني بمعمارية واضحة ومنظمة:

**طبقة البيانات** (`Data/shortest_path.js`) تحتوي على Graph يمثل شبكة المترو كقائمة جوار مع ٨٤ محطة و٣ خطوط و٥ محطات تبادلية، بالإضافة إلى خوارزمية BFS التي تجد أقصر مسار بين أي محطتين وتُرجع مصفوفة من كائنات `{S, L}` تحتوي اسم المحطة ورمز الخط.

**طبقة إدارة الحالة** تعمل على مستويين:
- حالة محلية في `AppContent` (محطتي البداية والنهاية والمسار المحسوب).
- حالة عامة عبر `LanguageContext` (اللغة المختارة مع حفظ في localStorage).

**طبقة الترجمة** (`translations.js` + `LanguageContext`) توفّر نظاماً مبنياً على القواميس (Dictionary-based) مع دالتي ترجمة: `t()` للنصوص الثابتة و `tStation()` لأسماء المحطات. النظام يدعم RTL/LTR ويحفظ اللغة المختارة.

**طبقة العرض** (Components) مقسمة حسب المسؤولية:
- `Navbar`: التنقل والعلامة التجارية وتبديل اللغة.
- `Hero`: الترحيب والتعريف بالتطبيق.
- `SearchPanel` + `ChooseStation`: واجهة اختيار المحطات.
- `DisplayStations`: عرض النتائج كـ Timeline تفاعلي.
- `MetroMap`: خريطة SVG بصرية (معلّقة حالياً).

**تدفق البيانات** أحادي الاتجاه (Top-Down):
```
AppContent (State) → SearchPanel → ChooseStation → (اختيار المستخدم)
                                                        ↓
AppContent (State) ← setFromStation/setToStation ←───────┘
         ↓
handleFindRoute() → BFS() → path State
         ↓
DisplayStations (يقرأ path ويعرضه)
```

كل النصوص في الواجهة قابلة للترجمة. الأسماء الداخلية (القيم في `<option value>`) تبقى بالإنجليزية لضمان عمل BFS بشكل صحيح. التصميم يستخدم Tailwind CSS مع Dark Mode وتأثيرات Glassmorphism ورسوم Framer Motion المتحركة. الخصائص المنطقية في CSS (`ps-`, `pe-`, `start-`, `end-`) تضمن عمل RTL بدون أي تعديلات يدوية إضافية.

</div>
