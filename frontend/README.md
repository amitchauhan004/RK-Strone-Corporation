# 🎨 RK Stone Corporation — Frontend Client Web Application

High-performance architectural showcase and commissioning portal built with React 18, Vite, TypeScript, and Tailwind CSS.

For the full project documentation, architecture, and deployment instructions, see the [Main Project README](../README.md).

---

## 🛠️ Tech Stack
- **Framework**: React 18 with Vite 7
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3 with custom stone & heritage gold palettes
- **Animation**: Framer Motion & Lucide Icons
- **Primitives**: Radix UI, Sonner Toasts, React Helmet Async
- **State & Data Fetching**: TanStack React Query

---

## 🚀 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Set `VITE_API_URL=http://localhost:5000` (or your deployed Vercel backend URL).

3. **Start the Dev Server**:
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:8080`.

---

## ☁️ Production Deployment (Netlify)
This frontend is pre-configured for Netlify with SPA rewrite handling:
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variable**: `VITE_API_URL`
- **SPA Routing**: Handled via `netlify.toml` and `public/_redirects`.
