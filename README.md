# Profile Pod

Welcome to Profile Pod, a personal portfolio playground to showcase your professional profile, including skills, projects, and experience. This application is built with Next.js and leverages Genkit for AI-powered project searching.

## Architecture

Profile Pod uses a modern, server-centric approach with the Next.js App Router.

- **Frontend**: Built with React and Next.js 14. Components are styled using Tailwind CSS and shadcn/ui for a clean, professional look.
- **Backend/API**: Implemented as API Route Handlers within the Next.js application (`src/app/api`).
- **Database**: Uses MongoDB for data persistence. A connection helper is located at `src/lib/mongodb.ts`.
- **AI Integration**: Project searching is enhanced with Google's Gemini model via Genkit. The `intelligentSkillSearch` flow analyzes project descriptions against a search query to rank them by relevance.

## Data Schema

The application uses a single `profile` collection in MongoDB with a document that follows this schema.

### Profile

```json
{
  "_id": "ObjectId",
  "name": "string",
  "title": "string",
  "email": "string",
  "links": {
    "github": "string (url)",
    "linkedin": "string (url)",
    "portfolio": "string (url)"
  },
  "skills": ["string"],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "period": "string"
    }
  ],
  "workExperience": [
    {
      "company": "string",
      "role": "string",
      "period": "string",
      "description": "string"
    }
  ],
  "projects": [
    {
      "title": "string",
      "description": "string",
      "links": ["string (url)"]
    }
  ]
}
```

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
    Create a `.env` file in the root of the project and add your Google AI API key and your MongoDB connection details. You can get a Google AI key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```
    GOOGLE_API_KEY=your_google_api_key
    MONGODB_URI=your_mongodb_connection_string
    MONGODB_DB_NAME=your_database_name
    ```

4.  **Seed your database:**
    Run the following command in your terminal to populate the database with the profile data.
    ```bash
    npm run db:seed
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

## API Endpoints

- **`GET /api/profile`**: Retrieves the entire profile document.
- **`POST /api/search`**: Searches projects based on a skill, ranked by AI.

## Known Limitations

- **Single Profile**: The application is designed to showcase a single profile document from the database.
- **No Authentication**: The API is public and has no authentication or authorization layer.
- **Update/Create Functionality**: The UI and API for creating or updating a profile are not implemented. Data must be updated directly in the database.
