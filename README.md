

# PrepTalk Frontend

PrepTalk is a modern interview preparation tool where users can create, save, and listen to personalized interview questions and answers.

This repository contains the frontend code built with **React**, **Tailwind CSS**, and **TypeScript**.

---

## 🚀 Features

- Email/password authentication (Supabase)
- Add/edit interview questions
- Generate answers using AI (Groq - planned)
- Text-to-speech support (audio generation - planned)
- Public/private question visibility
- Tags and categories for filtering
- Light/dark mode with persistent theme

---

## 🛠 Tech Stack

- **React + TypeScript**
- **Tailwind CSS**
- **Vite** (bundler)
- **Supabase** (auth and backend)
- **Sonner** (for toasts)
- **Lucide** (for icons)

---

## 📦 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/coolshatul/PrepTalk
cd preptalk-frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file with:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🌐 Deployment

You can deploy the frontend easily on:
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)

---

## ✅ Todo (Milestones)

- [x] Authentication setup
- [x] Dark/light mode support
- [x] Add/edit questions UI
- [ ] Integrate backend APIs (Lambda)
- [ ] AI answer generation
- [ ] Audio generation & S3 storage

---

## 👥 Team

This tool is being built by Shatul for learning and real interview preparation.

---

## 📄 License

MIT License