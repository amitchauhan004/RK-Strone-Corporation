# ⚙️ RK Stone Corporation — Backend API Server

Express.js REST API with MongoDB Atlas, Cloudinary Media CDN, and Vercel Serverless Function support.

For the full project documentation and deployment instructions, see the [Main Project README](../README.md).

---

## 🛠️ Tech Stack
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 4
- **Database**: MongoDB Atlas with Mongoose 8
- **Media CDN**: Cloudinary (`multer-storage-cloudinary`)
- **Authentication**: JWT (`jsonwebtoken`)
- **Email Notifications**: Nodemailer (Gmail SMTP)
- **Deployment**: Vercel Serverless Function (`vercel.json`)

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
   Fill in your MongoDB URI, Cloudinary credentials, and JWT secret.

3. **Start the API Server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

---

## ☁️ Production Deployment (Vercel)
This backend is configured for Vercel Serverless deployment using `vercel.json` and exportable `module.exports = app`.

- Set root directory to `backend`.
- Add all variables from `.env` in the Vercel project environment settings.
- The entry point is `server.js`.
