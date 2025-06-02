
This is the backend (API server) for the Mini CRM Platform.  
It provides RESTful endpoints for authentication, customers, orders, campaigns, communication logs, AI suggestions, and more.

 🚀 Features

- User authentication (Google OAuth + JWT)
- Customer, order, and campaign management
- Dynamic audience segmentation with rule logic
- Campaign delivery simulation with logging
- AI-powered message suggestions (integrated with Gemini API)
- Analytics endpoints
- Secure, rate-limited, and production-ready

 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js (OAuth)
- JWT authentication
- Joi (validation)
- Axios (internal/external API calls)

 ⚙️ Setup

1. Clone the repository:
   git clone https://github.com/yourusername/mini-crm-platform.git
   cd mini-crm-platform/backend

2. Install dependencies:
   npm install


3. Create a `.env` file:
PORT=5000
MONGO_URI=your_mongo_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:5000
INTERNAL_API_KEY=your_internal_api_key

4. Start the server:
   npm start/ run dev
