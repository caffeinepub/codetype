# Specification

## Summary
**Goal:** Build CodeType, a full-featured coding-focused typing trainer web application with multiple pages, real-time typing feedback, progress tracking, challenges, and customizable settings.

**Planned changes:**

### Navigation & Layout
- Persistent sidebar/topbar with links to: Home, Practice, Learn, Test, Progress/Stats, Challenges, Profile, Settings
- Responsive navigation with hamburger menu on mobile
- Dark-tech / terminal-inspired theme with neon accents (deep charcoal backgrounds, electric green/cyan highlights)
- Light mode variant with off-white/gray backgrounds
- Global theme, font size, font style, and backspace toggle settings persisted in localStorage

### Home Page
- Hero section with headline, description, and "Start Typing" CTA button linking to Practice page; dark terminal-style hero background image
- Features Overview section with icons and short descriptions (at least 4 features)
- Contact/Feedback form with name, email, message fields and submit button

### Practice Page
- Code snippet typing area in monospace font with real-time per-character green/red highlighting
- Live WPM and accuracy metrics
- Language selector: Java, C, HTML/CSS, Python, SQL
- Difficulty selector: Easy, Medium, Hard (affects snippet complexity and length)
- Reset/New Snippet button
- Hardcoded code snippets per language/difficulty combination

### Learn Page
- Typing Tips for Programmers section (at least 5 tips)
- Finger Placement Guide with keyboard diagram illustration showing color-coded finger zones
- Common Coding Mistakes section (at least 5 entries)
- Keyboard Shortcuts reference table (shortcut + description columns, VS Code/terminal)

### Test Page
- Four modes via tabs or cards: Timed Test, Speed Test, Accuracy Test, Custom Test
- Timed Test: countdown options (15s, 30s, 60s, 120s)
- Speed Test: timer starts on first keystroke, stops on completion
- Accuracy Test: enforces minimum accuracy threshold with strict error feedback
- Custom Test: textarea for user's own code snippet
- Results screen after each test showing WPM, accuracy, and time

### Progress/Stats Page
- WPM history line chart over sessions
- Accuracy line/bar chart over sessions
- Daily streak counter and calendar heatmap
- Summary stats: best WPM, average WPM, total tests, average accuracy
- Data read from backend

### Challenges Page
- Daily Challenges section with rotating challenge cards and reset timer
- Weekly Challenges section with reset date
- Level-Based Challenges section (Level 1–10 progression)
- Each card shows title, description, requirements, and "Start Challenge" button

### Profile Page
- Editable display name and avatar placeholder
- Lifetime stats: total tests, best WPM, avg accuracy, current streak
- Recent test history table (last 10 results: date, WPM, accuracy, mode)

### Settings Page/Panel
- Light/Dark mode toggle (persists in localStorage)
- Font size control: small, medium, large, x-large (persists in localStorage)
- Font style dropdown with at least 5 monospace Google Fonts: Fira Code, JetBrains Mono, Source Code Pro, Roboto Mono, Ubuntu Mono (loaded via CSS @import; persists in localStorage)
- Backspace Allowed toggle (persists in localStorage)

### Backend (Motoko — single actor)
- Store test result records: timestamp, WPM, accuracy, test mode, language, difficulty, duration
- `saveResult` update function
- `getResults` query function
- Stable storage for upgrade persistence

### Responsiveness
- Fully responsive at 320px, 768px, and 1280px+ widths
- Charts reflow on mobile, typing area usable on touch devices

**User-visible outcome:** Users can practice typing code snippets in multiple languages and difficulty levels, take timed/speed/accuracy/custom tests, view progress charts and streaks, complete daily/weekly/level-based challenges, customize the app's appearance and behavior via settings, and review their stats on a profile page — all within a cohesive dark-tech terminal-themed interface.
