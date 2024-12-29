# Celebrity Manager Dashboard

This project is a **Celebrity Manager Dashboard** built using **React**, **TypeScript**, and **Vite**. It provides a user-friendly interface for managing celebrity profiles, including features such as searching, updating, deleting, and viewing detailed profiles of celebrities. The application leverages React’s context API and reducer for state management, ensuring a scalable and maintainable architecture.

## Features

- **User Management**: Add, edit, and delete celebrity profiles.
- **Search Functionality**: Real-time search to filter users by name.
- **Dynamic Forms**: Editable user details with form validation.
- **Responsive Design**: Fully responsive UI that works across devices.
- **Data Fetching**: Data is fetched from a local JSON file and displayed dynamically.
- **Modals**: Confirmation dialogs for deleting users.

## Key Technologies

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Vite**: A fast and modern build tool that provides lightning-fast HMR (Hot Module Replacement).
- **TailwindCSS**: A utility-first CSS framework used for styling the application.
- **Context API & Reducers**: Used for global state management within the app.

## Installation & Setup

To get started, follow the steps below:

1. Clone the repository to your local machine.
2. Install dependencies by running the following command in your project directory:

    ```bash
    npm install
    ```

3. After the installation is complete, start the development server using:

    ```bash
    npm run dev
    ```

4. The application will be available at `http://localhost:3000` by default.

## Project Structure


### Key Files

- **App.tsx**: The main app component where global context and components are rendered.
- **UserContext**: Provides global state (users, loading state, search text, and errors) to the entire application using React’s Context API.
- **SearchBar.tsx**: Allows searching for users by name in real time.
- **UserList.tsx**: Displays a list of users with their details and options to edit or delete.
- **EditUserForm.tsx**: A form to edit user details with validation and error handling.
- **DeleteDialog.tsx**: A confirmation dialog for deleting users.
- **Accordion.tsx**: A component used to toggle the visibility of user details, providing a clean and organized layout.

## UI/UX Design

The design is built using **TailwindCSS**, making it highly customizable and responsive. The application adapts to different screen sizes, ensuring it works well on both desktop and mobile devices.

- **Responsive Layout**: Automatically adjusts to different screen sizes.
- **User-Friendly UI**: Simple and clean interface that makes it easy to manage celebrity profiles.
- **Error Handling**: Displays user-friendly messages for errors such as failed data fetch or invalid input.

## Conclusion

This project showcases my skills in **React**, **TypeScript**, **state management**, and **UI/UX** design. The use of **TailwindCSS** for styling and **Vite** for rapid development ensures a smooth and fast development experience. The application is built to be easily scalable and maintainable, making it suitable for further features and improvements.