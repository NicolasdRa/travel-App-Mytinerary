# Mytinerary - Backend API

A robust RESTful API server for the Mytinerary travel planning application, built with Node.js and Express, featuring comprehensive authentication, data management, and cloud integration.

## 🌟 Features

### Core API Functionality
- **RESTful Architecture**: Well-structured API endpoints following REST principles
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for all entities
- **Data Relationships**: Complex relationships between users, cities, itineraries, and activities
- **Advanced Querying**: Filtering, sorting, pagination, and field limiting
- **File Upload**: Image upload and processing with Cloudinary integration

### Authentication & Security
- **JWT Authentication**: Secure token-based authentication system
- **OAuth Integration**: Google Sign-In with Passport.js
- **Password Security**: Bcrypt hashing and password reset functionality
- **Token Management**: Refresh tokens and blacklist support
- **Role-Based Access**: User roles and permissions system
- **Security Headers**: Comprehensive security middleware

### Data Management
- **MongoDB Integration**: NoSQL database with Mongoose ODM
- **Data Validation**: Schema validation and custom validators
- **Error Handling**: Centralized error handling with custom error classes
- **Logging**: Request logging and error tracking
- **Email Services**: Automated email notifications

### Cloud Services
- **Cloudinary Integration**: Image storage, transformation, and optimization
- **File Processing**: Multer middleware for file uploads
- **Email Delivery**: Email service integration for notifications

## 🚀 Technology Stack

### Backend Framework
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **JavaScript (ES6+)** - Modern JavaScript features

### Database & ODM
- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling for Node.js
- **MongoDB Atlas** - Cloud database service (production)

### Authentication & Security
- **JWT (jsonwebtoken)** - JSON Web Token implementation
- **Passport.js** - Authentication middleware
- **bcryptjs** - Password hashing library
- **helmet** - Security headers middleware
- **cors** - Cross-Origin Resource Sharing
- **express-rate-limit** - Rate limiting middleware

### File Management
- **Multer** - Multipart/form-data handling
- **Cloudinary** - Cloud-based image and video management
- **DataURI** - Data URI scheme handling

### Email & Communication
- **Nodemailer** - Email sending library
- **Pug** - Template engine for email templates
- **SendGrid/Gmail** - Email service providers

### Development Tools
- **Nodemon** - Development server with auto-restart
- **Morgan** - HTTP request logger
- **Dotenv** - Environment variable management
- **ESLint** - Code linting and quality assurance

### Monitoring & Analysis
- **SonarQube** - Code quality and security analysis

## 📁 Project Structure

```
server/
├── controllers/          # Route controllers
│   ├── authController.js      # Authentication logic
│   ├── userController.js      # User management
│   ├── cityController.js      # City data management
│   ├── itineraryController.js # Itinerary operations
│   ├── activityController.js  # Activity management
│   ├── favouriteController.js # Favorites system
│   ├── commentController.js   # Comments functionality
│   ├── errorController.js     # Error handling
│   └── factoryHandler.js      # Common CRUD operations
├── models/               # Database models
│   ├── userModel.js           # User schema
│   ├── cityModel.js           # City schema
│   ├── itineraryModel.js      # Itinerary schema
│   ├── activityModel.js       # Activity schema
│   ├── favouriteModel.js      # Favourite schema
│   ├── commentModel.js        # Comment schema
│   ├── bookingModel.js        # Booking schema
│   └── tokenBlacklistModel.js # Token blacklist
├── routes/               # API routes
│   ├── authRoutes.js          # Authentication endpoints
│   ├── userRoutes.js          # User endpoints
│   ├── cityRoutes.js          # City endpoints
│   ├── itineraryRoutes.js     # Itinerary endpoints
│   ├── activityRoutes.js      # Activity endpoints
│   ├── favouriteRoutes.js     # Favourite endpoints
│   └── commentRoutes.js       # Comment endpoints
├── middleware/           # Custom middleware
│   ├── passport.js            # Passport configuration
│   ├── multer.js              # File upload handling
│   └── cloudinary.js          # Cloudinary configuration
├── utils/                # Utility functions
│   ├── apiFeatures.js         # Query features (filter, sort, paginate)
│   ├── appError.js            # Custom error class
│   ├── asyncErrorCatcher.js   # Async error wrapper
│   ├── dataUri.js             # Data URI utilities
│   ├── email.js               # Email service
│   └── fileReader.js          # File reading utilities
├── views/                # Email templates
│   ├── baseEmail.pug          # Base email template
│   ├── welcome.pug            # Welcome email
│   ├── passwordReset.pug      # Password reset email
│   └── error.pug              # Error page template
├── app.js                # Express application setup
├── server.js             # Server entry point
└── package.json          # Dependencies and scripts
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Cloudinary account (for image uploads)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-App-Mytinerary/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URI=mongodb://localhost:27017/mytinerary
   DATABASE_PASSWORD=your_database_password
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Email
   EMAIL_FROM=noreply@mytinerary.com
   SENDGRID_API_KEY=your_sendgrid_api_key
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Application
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:5000`

## 📜 Available Scripts

### Development
```bash
npm run dev        # Start development server with nodemon
npm start          # Start production server
npm run lint       # Run ESLint
```

### Production
```bash
npm start          # Start production server
```

## 🔗 API Endpoints

### Authentication
```
POST /api/v1/auth/signup         # User registration
POST /api/v1/auth/login          # User login
POST /api/v1/auth/logout         # User logout
POST /api/v1/auth/forgotpassword # Request password reset
PATCH /api/v1/auth/resetpassword # Reset password
GET /api/v1/auth/google          # Google OAuth login
```

### Users
```
GET /api/v1/users                # Get all users (admin)
GET /api/v1/users/me             # Get current user
PATCH /api/v1/users/updateMe     # Update current user
DELETE /api/v1/users/deleteMe    # Delete current user
GET /api/v1/users/:id            # Get user by ID
```

### Cities
```
GET /api/v1/cities               # Get all cities
GET /api/v1/cities/:id           # Get city by ID
GET /api/v1/cities/name/:name    # Get city by name
POST /api/v1/cities              # Create city (admin)
PATCH /api/v1/cities/:id         # Update city (admin)
DELETE /api/v1/cities/:id        # Delete city (admin)
```

### Itineraries
```
GET /api/v1/itineraries          # Get all itineraries
GET /api/v1/itineraries/:id      # Get itinerary by ID
GET /api/v1/itineraries/title/:title # Get itinerary by title
POST /api/v1/itineraries         # Create itinerary
PATCH /api/v1/itineraries/:id    # Update itinerary
DELETE /api/v1/itineraries/:id   # Delete itinerary
```

### Activities
```
GET /api/v1/activities           # Get all activities
GET /api/v1/activities/:id       # Get activity by ID
GET /api/v1/activities/title/:title # Get activity by title
POST /api/v1/activities          # Create activity
PATCH /api/v1/activities/:id     # Update activity
DELETE /api/v1/activities/:id    # Delete activity
```

### Favourites
```
GET /api/v1/favourites           # Get all favourites
GET /api/v1/favourites/:id       # Get favourite by ID
POST /api/v1/favourites          # Add favourite
DELETE /api/v1/favourites/:id    # Remove favourite
```

### Comments
```
GET /api/v1/comments             # Get all comments
GET /api/v1/comments/:id         # Get comment by ID
POST /api/v1/comments            # Create comment
PATCH /api/v1/comments/:id       # Update comment
DELETE /api/v1/comments/:id      # Delete comment
```

## 🏗️ Architecture & Patterns

### MVC Architecture
- **Models**: Data models with Mongoose schemas
- **Views**: Pug templates for email rendering
- **Controllers**: Business logic and request handling

### Middleware Pattern
- **Authentication middleware**: JWT verification
- **Authorization middleware**: Role-based access control
- **Error handling middleware**: Centralized error processing
- **File upload middleware**: Multer configuration

### Factory Pattern
- **Factory handlers**: Common CRUD operations
- **Reusable functions**: Consistent API responses

### Error Handling
- **Custom error classes**: Structured error responses
- **Async error catching**: Wrapper for async functions
- **Global error handler**: Centralized error processing

## 🔧 Configuration

### Database Configuration
- MongoDB connection with Mongoose
- Schema definitions with validation
- Indexes for performance optimization

### Security Configuration
- JWT secret and expiration settings
- CORS configuration for cross-origin requests
- Rate limiting and security headers

### Cloud Services
- Cloudinary configuration for image uploads
- Email service setup for notifications

## 🚀 Deployment

### Environment Setup
```bash
NODE_ENV=production
```

### MongoDB Atlas
Configure production database connection:
```env
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/mytinerary
```

### Cloud Deployment
The application can be deployed to:
- **Heroku** - Easy Node.js deployment
- **AWS EC2** - Virtual private servers
- **DigitalOcean** - Cloud infrastructure
- **Railway** - Modern deployment platform

### Production Considerations
- Environment variables configuration
- Database backup strategies
- Monitoring and logging setup
- SSL certificate installation

## 📊 Database Schema

### Core Entities
- **Users**: Authentication and profile data
- **Cities**: Travel destination information
- **Itineraries**: Travel plans and details
- **Activities**: Individual travel activities
- **Favourites**: User preference tracking
- **Comments**: User interaction and feedback

### Relationships
- Users → Itineraries (One-to-Many)
- Itineraries → Activities (One-to-Many)
- Users → Favourites (Many-to-Many)
- Users → Comments (One-to-Many)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.