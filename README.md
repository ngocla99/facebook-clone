# Nebook - Facebook Clone

## Introduction

Nebook is a comprehensive Facebook clone project that aims to replicate core features of the popular social networking platform. This project demonstrates advanced web development skills, incorporating both frontend and backend technologies to create a fully functional social media experience.

## Features

- [x] User Authentication and Profiles
- [x] News Feed with Posts, Comments, and Reactions
- [x] Image Upload and Cropping
- [x] Friend Requests and Friend List Management
- [x] User Search
- [ ] Notifications for Interactions and Updates
- [ ] Support for Multiple Languages
- [ ] Messenger (Chat Functionality)

## Tech Stack

### Frontend
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com) - UI component library
- [TanStack Query v5](https://tanstack.com/query/latest) - Powerful asynchronous state management
- [React Hook Form](https://react-hook-form.com) - Efficient form state management
- [Zustand](https://zustand-demo.pmnd.rs) - Lightweight state management solution
- [Zod](https://zod.dev) - TypeScript-first schema validation
- [Rive](https://rive.app) - Runtime animation library

### Backend
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web application framework
- [MongoDB](https://www.mongodb.com) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication
- [OAuth2](https://oauth.net/2/) - Industry-standard protocol for authorization
- [Nodemailer](https://nodemailer.com) - Module for email sending
- [Cloudinary](https://cloudinary.com) - Cloud-based image and video management

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/nebook.git
   cd nebook
   ```

2. Install dependencies for both frontend and backend
   ```
   cd front-end
   npm install
   cd ../back-end
   npm install
   ```

3. Set up environment variables
   Create `.env` files in both `front-end` and `back-end` directories and add necessary environment variables (database URL, JWT secret, Cloudinary credentials, etc.)

4. Start the development servers
   ```
   # In the back-end directory
   npm run dev

   # In the front-end directory
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to see the application running.

## Project Structure

- `front-end/`: Contains all React frontend code
  - `src/`: Source files for the React application
    - `components/`: Reusable React components
    - `pages/`: Individual page components
    - `hooks/`: Custom React hooks
    - `api/`: API service functions
    - `assets/`: Static assets (images, icons, etc.)
    - `config/`: Configuration files
    - `lib/`: Utility functions and helpers
- `back-end/`: Contains all Node.js backend code
  - `controllers/`: Request handlers
  - `models/`: Mongoose models
  - `routes/`: Express routes
  - `services/`: Business logic
  - `middlewares/`: Custom middleware functions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.

## Acknowledgments

- Facebook for inspiration
- All open-source libraries and tools used in this project
