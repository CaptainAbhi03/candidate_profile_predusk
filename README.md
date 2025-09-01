# Profile Pod

Welcome to Profile Pod, a personal portfolio playground to showcase your professional profile, including skills, projects, and experience. This application is built with Next.js and leverages Genkit for AI-powered project searching.

## Architecture

Profile Pod uses a modern, server-centric approach with the Next.js App Router.

- **Frontend**: Built with React and Next.js 14. Components are styled using Tailwind CSS and shadcn/ui for a clean, professional look.
- **Backend/API**: Implemented as API Route Handlers within the Next.js application (`src/app/api`).
- **Database**: Uses MongoDB for data persistence. A connection helper is located at `src/lib/mongodb.ts`.

## Data Schema

The application uses a single `profile` collection in MongoDB with a document that follows the schema defined in `src/types/index.ts`.

## Local Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <repo-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key, your MongoDB connection details, and a password for the edit page.
    ```
    GOOGLE_API_KEY=your_google_api_key
    MONGODB_URI=your_mongodb_connection_string
    MONGODB_DB_NAME=your_database_name
    EDIT_PASSWORD=your_secret_password
    ```

4.  **Seed your database:**
    Run the following command in your terminal to populate the database with the initial profile data.
    ```bash
    npm run db:seed
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

## Editing Your Profile

You can edit your profile information by navigating to `/edit`. You will be prompted to enter the `EDIT_PASSWORD` you set in your `.env` file.

## API Endpoints

- **`GET /api/profile`**: Retrieves the entire profile document.
- **`PUT /api/profile`**: Updates the profile document. Requires Bearer token authentication.
- **`POST /api/search`**: Searches projects based on a skill.

## Known Limitations

- **Single Profile**: The application is designed to showcase a single profile document from the database.
- **Simple Authentication**: The edit page uses a simple password stored as an environment variable. For a production application with multiple users, a more robust authentication system like Clerk or NextAuth.js would be recommended.
