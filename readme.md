# Speed Write Test ⌨️

A minimalist, modern typing-speed test where users can measure their **WPM (words per minute)** and **accuracy** across customizable settings.

🔗 **Live Demo:** [roankraj.github.io/speed-write-test](https://roankraj.github.io/speed-write-test/)

## ✨ Features

- **Customizable Settings** – Choose difficulty (Easy / Medium / Hard), time limit (30s / 60s / 90s / 120s), and language (English / हिन्दी)
- **Live Typing Feedback** – Real-time character highlighting (grey, yellow, green, red) as you type
- **Auto-Scrolling Text** – Smooth scroll keeps the current character in view
- **Results Page** – Displays WPM, accuracy, total keystrokes, correct/wrong counts, with animated stat counters
- **Downloadable Result Card** – Export your results as a PNG image using `html2canvas`
- **Persistent Settings** – Uses `localStorage` to remember your last-used time and stats between pages
- **PWA Ready** – Includes a web manifest and app icons for installability

## 🛠️ Built With

- **HTML5** – Page structure (index & results pages)
- **CSS3** – Minimalist, modern styling
- **Vanilla JavaScript** – Typing logic, timer, WPM/accuracy calculations
- **Ionicons** – Icon library for UI controls and footer links
- **html2canvas** – Converts results to a downloadable image

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/roankraj/speed-write-test.git
   ```
2. Open `index.html` in your browser

## 📂 Project Structure

```
speed-write-test/
├── index.html
├── results.html
├── manifest.webmanifest
├── css/
│   ├── index/
│   │   └── style.css
│   └── result/
│       └── result-style.css
├── js/
│   ├── index/
│   │   └── script.js
│   └── result/
│       └── script-result.js
└── img/
    ├── favicon.png
    └── apple-touch-icon.png
```

## 📊 How It Works

1. Select your difficulty, time, and language from the dropdown menus
2. Start typing — the timer begins on your first keystroke
3. Characters are highlighted live: yellow (current), green (correct), red (incorrect)
4. When time runs out or the text is completed, you're redirected to the results page
5. View your WPM, accuracy, and keystroke breakdown — and download a shareable result card

## 📌 Purpose

This project was built as part of my learning journey in front-end web development, focusing on DOM manipulation, timers, and real-time UI updates.
