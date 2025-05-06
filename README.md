# WorkFlex App 🚀

This project is a web application built to help manage work flexibility, such as tracking overtime and compensation time.

## 🛠️ Technology Stack

- ⚡ **Vite**
- ⚛️ **React**
- 🔷 **TypeScript**
- 🎨 **Tailwind CSS**
- 🔥 **Firebase** (Authentication & Firestore)
- 🔄 **React Router**
- 📋 **React Hook Form**
- 🛡️ **Zod**
- 🔄 **React Query (TanStack Query)**
- ⚙️ **ESLint & Prettier**

## ✨ Features

- 🔑 **User Authentication**: Secure sign-in with Google.
- 👤 **Role-Based Access Control**: Differentiates between `editor` and `viewer` roles.
    - 📝 Editors can add/delete records.
    - 👀 Viewers can only view records.
- 📄 **Record Management**:
    - ➕ Add new records for overtime or compensation time ( Firestore integration for `addRecord` is set up).
- 🖥️ **Dashboard**: Main landing page after login.
- 📈 **Records Page**: Displays records and allows editors to manage them.
- 🛡️ **Protected Routes**: Ensures only authenticated users can access certain pages.
- 🤷 **Not Found Page**: Handles invalid routes gracefully.

## 🚧 Development Progress

- ✅ **Project Setup**: Vite + React + TypeScript + TailwindCSS boilerplate is complete.
- ✅ **Firebase Integration**: Authentication and Firestore database are connected.
- ✅ **Routing**: Basic navigation between Dashboard, Records, and Login pages is implemented.
- ✅ **Authentication Flow**: Login, logout, and session persistence are functional.
- ✅ **Role Management**: User roles are fetched and applied for conditional rendering.
- ✅ **Styling**: TailwindCSS is configured and basic styling is applied.
- ✅ **Linting & Formatting**: ESLint and Prettier are set up for code quality.
- ⏳ **Record Form**: The UI for `RecordForm.tsx` is basic and needs implementation for input fields and submission logic.
- ⏳ **Displaying Records**: Logic to fetch and display records from Firestore needs to be implemented.
- ⏳ **Editing/Deleting Records**: Functionality for editors to modify or remove records is pending.
- ⏳ **Comprehensive Error Handling**: More robust error handling across the application.
- ⏳ **Unit/Integration Tests**: Not yet implemented.

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
