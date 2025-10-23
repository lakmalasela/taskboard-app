# Task Management Application

A modern Angular task management application that matches the provided UI design.

## Features

- **Add Tasks**: Create new tasks with title and description
- **View Tasks**: Display all tasks in a clean, organized list
- **Mark Complete**: Mark tasks as done with a single click
- **Responsive Design**: Works on desktop and mobile devices
- **API Integration**: Ready to connect to your NestJS backend

## Project Structure

```
src/app/
├── components/
│   ├── task-manager.component.ts      # Main task management component
│   ├── task-manager.component.html    # Component template
│   └── task-manager.component.scss    # Component styles
├── services/
│   └── task.service.ts                # API service for task operations
├── models/
│   └── task.model.ts                  # TypeScript interfaces
├── app-routing-module.ts              # Routing configuration
├── app-module.ts                      # Main app module
└── app.html                           # App template
```

## API Endpoints

The application is configured to work with the following NestJS API endpoints:

- `POST /task/create-post` - Create a new task
- `GET /task/all` - Get all tasks with pagination
- `PATCH /task/:id` - Mark a task as completed

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:4200`

## Backend Configuration

To connect to your NestJS backend, update the `apiUrl` in `src/app/services/task.service.ts`:

```typescript
private apiUrl = 'http://localhost:3000/task'; // Update this URL
```

## Sample Data

The application includes sample tasks that match the provided design:
- Buy books
- Clean home
- Takehome assignment
- Play Cricket
- Help Saman

## Technologies Used

- **Angular 20** - Frontend framework
- **TypeScript** - Programming language
- **SCSS** - Styling
- **RxJS** - Reactive programming
- **Angular Router** - Navigation
- **Angular Forms** - Form handling

## Design Features

- Clean, minimalist interface
- Two-column layout (Add Task | Task List)
- Light gray background with white content area
- Blue "Add" button
- Gray task cards with "Done" buttons
- Responsive design for mobile devices
- Smooth transitions and hover effects