# IntelliLearn AI – Intelligent Visual Learning Platform

An AI-powered educational platform designed to make complex concepts easier to understand through visual learning, subject-aware explanations, interactive assessments, and personalized learning experiences.

## 🌟 Overview

Students often struggle to understand complex topics through conventional text-based materials. IntelliLearn AI aims to bridge this gap by combining artificial intelligence with visual and interactive learning.

The platform provides an environment where students can explore concepts, receive AI-assisted explanations, review learning materials, and practice through assessments.

## 🎯 Objectives

- Improve conceptual understanding through visual explanations.
- Organize educational content into logical learning sequences.
- Support self-paced and personalized learning.
- Provide summaries and key learning points for revision.
- Support assessments and feedback to reinforce learning.
- Reduce the effort involved in preparing educational materials.

## ✨ Key Features

- **AI Tutor:** AI-assisted explanations for educational topics.
- **Visual Learning:** A dedicated interface for visual lesson experiences.
- **Learning Materials:** Access to educational materials and lesson content.
- **Assessments:** Practice questions and assessment experiences.
- **Learning Roadmap:** Navigate learning topics and goals.
- **Progress Tracking:** Review learning progress through the application.

*Feature availability may depend on the current implementation and AI configuration.*

## 🛠️ Technology Stack

Based on the project structure:

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express
- **AI Integration:** Google Gemini API
- **Styling:** CSS
- **Version Control:** Git and GitHub

## 🏗️ Project Structure

```text
intellilearn-ai-react/
├── server/
│   └── geminiService.ts
├── src/
│   ├── components/
│   ├── data/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── server.ts
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm, included with Node.js
- [Git](https://git-scm.com/) (optional, for cloning the repository)

### 1. Clone the repository

```bash
git clone https://github.com/kanamatihasmitha79-cloud/intellilearn-ai-react.git
```

### 2. Open the project directory

```bash
cd intellilearn-ai-react
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the environment

Create a local `.env` file using `.env.example` as a reference.

Add your own valid Gemini API key using the exact variable name expected by the application. For example, if the application expects `GEMINI_API_KEY`, configure it as:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Obtain an API key through [Google AI Studio](https://aistudio.google.com/).

**Security:** Never commit your `.env` file or publish your API key.

### 5. Run the application

Check the available commands in `package.json`:

```bash
npm run
```

Use the development command defined by the project. For example, if the `dev` script starts the full application:

```bash
npm run dev
```

Open the local URL shown in the terminal. The current server configuration may use port `3000`.

## 🌐 Live Application

Explore the deployed application:

[IntelliLearn AI – Live Demo](https://intellilearn-ai-intelligent-visual-learning-platf-914020686090.asia-southeast1.run.app)

## 💡 Expected Impact

IntelliLearn AI aims to make learning more engaging, support independent study, simplify revision, and help students approach difficult concepts with greater clarity.

## 🔮 Future Scope

Potential enhancements include:

- Adaptive explanations for different educational levels.
- Multilingual narration and subtitles.
- Accessibility features and adjustable narration speed.
- Interactive questions during lessons.
- Offline learning packages and progress synchronization.
- Teacher editing and customization of generated lessons.

These are future goals unless already implemented in the application.

## 🤝 Contributing

Contributions and suggestions that improve educational accessibility, visual explanations, usability, and learning experiences are welcome.

## 📄 License

A license has not yet been specified. Add an appropriate license before distributing or reusing the project publicly.

---

**IntelliLearn AI – Making Complex Concepts Easier to Understand Through AI-Powered Visual Learning.**
