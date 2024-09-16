"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// this is a test comment
// uncaught exceptions handling
process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception!!! Shutting down...');
    console.log(error.name, error.message);
    process.exit(1);
});
dotenv_1.default.config({ path: './.env' });
const app = require('./app');
const port = process.env.PORT || 5000;
// Connect to MongoDB
mongoose_1.default.connect(process.env.DB_CONNECT)
    .then(() => console.log('Connection to MongoDB established'))
    .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
// Start server
const server = app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
// Error handling
const handleError = (error, origin) => {
    console.error(`${origin}! Shutting down...`);
    console.error(error.name, error.message);
    if (server.listening) {
        server.close(() => process.exit(1));
    }
    else {
        process.exit(1);
    }
};
process.on('uncaughtException', error => handleError(error, 'Uncaught Exception'));
process.on('unhandledRejection', (reason) => handleError(reason, 'Unhandled Rejection'));
// event listener to close process gracefully upon heroku sigterm signal
process.on('SIGTERM', () => {
    console.log('Sigterm received. Shutting down gracefully');
    server.close(() => {
        console.log('Process terminated!');
        process.exit(0);
    });
});
console.log(app.get('env'));
// unhandled rejections error handler
process.on('unhandledRejection', (error) => {
    console.log('Unhandled rejection!!! Shutting down...');
    console.log(error, error.name, error.message);
    if (app.listen) {
        app.listen().close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
