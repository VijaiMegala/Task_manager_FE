# Task Manager Application

A full-stack task management application built with Next.js, featuring user authentication and CRUD operations for tasks.

## Features

- User Authentication (Login/Signup)
- Task Management:
  - Create new tasks
  - View task details
  - Edit existing tasks
  - Delete tasks
  - Search tasks
  - Sort tasks by title, description, or status
- Responsive Design
- Form Validation
- Toast Notifications
- Protected Routes

## Tech Stack

### Frontend
- Next.js 15.1.7
- React 19.0.0
- TypeScript
- Tailwind CSS
- React Icons
- React Toastify
- Axios

### Development Tools
- ESLint
- PostCSS
- TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm/yarn/pnpm/bun

## Environment Variables

Create a `.env.local` file in the root directory with:

env
NEXT_PUBLIC_BASE_URL= get from developer

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task_manager
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Application Structure

- `/src/app` - Main application pages
- `/src/components` - Reusable React components
- `/src/context` - React context for state management
- `/src/styles` - Global styles and Tailwind configuration

## Key Features Explained

### Authentication
- Secure login and signup functionality
- JWT token-based authentication
- Protected routes using AuthGuard
- Persistent authentication state

### Task Management
- Create tasks with title, description, status, and due date
- View detailed task information
- Edit existing tasks
- Delete tasks with confirmation
- Search functionality across all task fields
- Sort tasks by different attributes

### User Interface
- Responsive design for mobile and desktop
- Clean and intuitive interface
- Form validation with error messages
- Toast notifications for user feedback
- Loading states and error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

