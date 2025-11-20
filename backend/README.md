# RK Stone Corporation Contact Form Backend

This is the backend for the contact form. It receives contact form data and sends it to your Gmail using Nodemailer.

## Setup

1. **Clone this repo or move into the `backend` folder.**
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure your Gmail credentials:**
   - Create a `.env` file in this folder with the following:
     ```env
     GMAIL_ID=your_gmail_id@gmail.com
     GMAIL_APP_PASSWORD=your_gmail_app_password
     PORT=5000
     ```
   - Use [Gmail App Passwords](https://support.google.com/accounts/answer/185833) for secure sending.
4. **Start the server:**
   ```sh
   npm start
   ```

## API

- **POST /api/contact**
  - Body: `{ name, email, message }`
  - Example using cURL:
    ```sh
    curl -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","message":"hello"}'
    ```
