# WorkFlex App 🚀

This project is a web application built to help manage work flexibility, such as tracking overtime and compensation time. It provides a user-friendly interface for employees to log overtime hours and managers to approve compensation leave.

## 🛠️ Technology Stack

- ⚡ **Vite** - Fast frontend build tool optimized for development
- ⚛️ **React 19** - Latest React with concurrent features and improved performance
- 🔷 **TypeScript** - Type safety for robust code
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework with the latest features
- 🔥 **Firebase v11** (Authentication & Firestore) - Backend-as-a-service for auth and data
- 🔄 **React Router v7** - Declarative routing for React applications
- 📋 **React Hook Form** - Performant form management with less re-renders
- 🛡️ **Zod** (Form validation) - TypeScript-first schema validation
- 🔄 **TanStack Query v5** (Data fetching) - Powerful data synchronization for React
- 🎭 **Mantine UI v8** (UI components & notifications) - Modern React UI library
- 🎨 **Phosphor Icons** (Modern icon set) - Flexible icon family for interfaces
- ⚙️ **ESLint & Prettier** - Code quality and formatting tools

## ✨ Features

- 🔑 **User Authentication**: Secure sign-in with Google and email whitelist protection.
- 👤 **Role-Based Access Control**: Differentiates between `editor` and `viewer` roles.
    - 📝 Editors can add records.
    - 👀 Viewers can only view records.
- 📄 **Record Management**:
    - ➕ Add new records for overtime or compensation time.
    - 📊 View all records with type indication, hours, and reasons.
    - 🔄 Real-time updates with React Query.
- 🖥️ **Dashboard**: Main landing page after login with role-specific information.
    - 📊 Statistics display showing overtime, used leave, and available leave hours.
    - 🎨 Color-coded indicators for available hours status (positive, negative, or zero).
- 📈 **Records Page**: Displays records and allows editors to manage them.
- 🛡️ **Protected Routes**: Ensures only authenticated users can access certain pages.
- 🔔 **Notifications**: User-friendly success and error notifications.
- 🛑 **Error Handling**: Component-level error states with retry options.
- 🤷 **Not Found Page**: Handles invalid routes gracefully.

## 🚧 Development Progress

- ✅ **Project Setup**: Vite + React + TypeScript + TailwindCSS boilerplate is complete.
- ✅ **Firebase Integration**: Authentication and Firestore database are connected.
- ✅ **Routing**: Basic navigation between Dashboard, Records, and Login pages is implemented.
- ✅ **Authentication Flow**: Login, logout, and session persistence are functional.
- ✅ **Role Management**: User roles are fetched and applied for conditional rendering.
- ✅ **Styling**: TailwindCSS is configured and Mantine UI components are integrated.
- ✅ **Linting & Formatting**: ESLint and Prettier are set up for code quality.
- ✅ **Record Form**: Form fully implemented with Zod validation and React Hook Form.
- ✅ **Displaying Records**: Records are successfully fetched and displayed with proper loading states.
- ✅ **Notifications**: Success and error notifications are implemented using Mantine Notifications.
- ✅ **Basic Error Handling**: Component-level error states have been implemented for data fetching operations.
- ✅ **Dashboard Statistics**: Overtime hours summary with loading and error states is implemented.
- ⏳ **Editing/Deleting Records**: Functionality for editors to modify or remove records is in progress.
- ⏳ **Comprehensive Error Handling**: Implementation of ErrorBoundary components and global error handling system is planned.
- ⏳ **Unit/Integration Tests**: Not yet implemented.
- ⏳ **Data Export**: Functionality to export records to CSV or PDF format is planned.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies:**
    ```bash
    cd workflex
    npm install
    ```
3.  **Set up Firebase:**

    - Create a Firebase project.
    - Add a web app to your Firebase project.
    - Copy your Firebase configuration.
    - Create a `.env` file in the root of the project and add your Firebase credentials:
        ```env
        VITE_API_KEY=your_api_key
        VITE_AUTH_DOMAIN=your_auth_domain
        VITE_PROJECT_ID=your_project_id
        VITE_STORAGE_BUCKET=your_storage_bucket
        VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
        VITE_APP_ID=your_app_id
        VITE_MEASUREMENT_ID=your_measurement_id
        VITE_APP_EMAIL_WHITELIST=your_email@example.com,another_email@example.com
        ```
    - Set up Firestore and define security rules.
    - In Firestore, create a `users` collection. Each document should have the user's UID as the document ID and contain `email` (string) and `role` ("editor" or "viewer") fields. For example:
        - Document ID: `firebaseUserUid123`
        - Fields:
            - `email`: "user@example.com"
            - `role`: "editor"

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the codebase.
- `npm run preview`: Serves the production build locally.

## 🧠 Future Enhancements

- 📱 **Mobile Responsive Design**: Optimize the user interface for mobile devices.
- 🔒 **Enhanced Authentication**: Add email/password authentication option alongside Google login.
- 📊 **Advanced Statistics**: Provide more detailed analytics and reporting features.
- 📅 **Calendar Integration**: Visual calendar view for tracking overtime and leave days.
- 🌙 **Dark Mode**: Toggle between light and dark themes for better user experience.
- 🔔 **Notifications**: Email notifications for pending approvals and status changes.
