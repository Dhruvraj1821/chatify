# 💬 Chatify

A modern, real-time chat application built with React and Node.js. Chatify enables users to send messages, share images, and see online status in real-time.

![Chatify](https://img.shields.io/badge/Chatify-Real--time%20Chat-blue)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933)

## ✨ Features

- 🔐 **User Authentication** - Secure signup, login, and logout with JWT
- 💬 **Real-Time Messaging** - Instant message delivery using Socket.io
- 📸 **Image Sharing** - Upload and share images in conversations
- 👤 **Profile Management** - Update profile pictures with Cloudinary integration
- 🟢 **Online Status** - See which users are online in real-time
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔊 **Sound Effects** - Optional keyboard and notification sounds
- 🛡️ **Security** - Rate limiting and bot protection with Arcjet
- ✅ **Form Validation** - Client-side validation for better UX

## 🚀 Tech Stack

### Frontend
- **React 19.2** - UI library
- **Vite** - Build tool
- **Zustand** - State management
- **Socket.io Client** - Real-time communication
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **DaisyUI** - UI components
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **Socket.io** - WebSocket server
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Arcjet** - Security & rate limiting
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** (local or Atlas account)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhruvraj1821/chatify.git
   cd chatify
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Environment Setup

1. **Create a `.env` file in the `backend` directory:**
   ```env
   PORT=3000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173

   # Database
   MONGO_URI=your_mongodb_connection_string

   # JWT Authentication
   JWT_SECRET=your_super_secret_jwt_key

   # Cloudinary (Image Upload)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Arcjet (Security & Rate Limiting)
   ARCJET_KEY=your_arcjet_key
   ARCJET_ENV=development
   ```

2. **Get your API keys:**
   - **MongoDB**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - **Cloudinary**: Sign up at [Cloudinary](https://cloudinary.com/) for image storage
   - **Arcjet**: Get your key from [Arcjet](https://arcjet.com/) (optional for development)

## 🏃 Running the Application

### Development Mode

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   The server will run on `http://localhost:3000`

2. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Production Build

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the production server:**
   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
chatify/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth & security middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── lib/             # Utilities & configs
│   │   └── server.js        # Entry point
│   ├── package.json
│   └── .env                 # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand stores
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/              # Utilities
│   │   └── App.jsx          # Main app component
│   ├── public/               # Static assets
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new account
- `POST /api/auth/login` - Login to account
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update profile picture

### Messages
- `GET /api/messages/contacts` - Get all contacts
- `GET /api/messages/chats` - Get chat partners
- `GET /api/messages/:id` - Get messages with a user
- `POST /api/messages/send/:id` - Send a message

## 🎯 Usage

1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Access your account with your credentials
3. **Update Profile**: Click on your avatar to upload a profile picture
4. **Start Chatting**: 
   - View your chat history in the "Chats" tab
   - Find new contacts in the "Contacts" tab
   - Click on a user to start/continue a conversation
5. **Send Messages**: 
   - Type text messages
   - Click the image icon to share pictures
   - Messages are delivered in real-time

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for password security
- **Rate Limiting** - Arcjet protection against abuse
- **Bot Detection** - Arcjet bot protection
- **CORS** - Configured for secure cross-origin requests
- **HTTP-only Cookies** - Prevents XSS attacks

## 🎨 Customization

### Sound Effects
Sound files are located in `frontend/public/sounds/`:
- `keystroke1-4.mp3` - Typing sounds
- `mouse-click.mp3` - Button click sound
- `notification.mp3` - New message notification

### Images
Default images in `frontend/public/`:
- `avatar.png` - Default user avatar
- `login.png` - Login page illustration
- `signup.png` - Signup page illustration

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct
- Ensure all environment variables are set
- Verify port 3000 is not in use

### Frontend won't connect
- Ensure backend is running on port 3000
- Check `CLIENT_URL` in backend `.env` matches frontend URL
- Verify CORS settings

### Real-time messages not working
- Check Socket.io connection in browser console
- Verify JWT token is being sent correctly
- Ensure both frontend and backend are running

### Images not uploading
- Verify Cloudinary credentials are correct
- Check file size (max 5MB)
- Ensure image format is supported

## 📝 License

ISC

## 👨‍💻 Author

**Dhruvraj**

- GitHub: [@Dhruvraj1821](https://github.com/Dhruvraj1821)

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) for real-time communication
- [Cloudinary](https://cloudinary.com/) for image storage
- [Arcjet](https://arcjet.com/) for security features
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [DaisyUI](https://daisyui.com/) for UI components

---

**Made with ❤️ using React and Node.js**

