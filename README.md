# Profile Pod

Welcome to Profile Pod, a personal portfolio playground to showcase your professional profile, including skills, projects, and experience. This application is built with Next.js and leverages Genkit for AI-powered project searching.

## Architecture

Profile Pod uses a modern, server-centric approach with the Next.js App Router.

- **Frontend**: Built with React and Next.js 14. Components are styled using Tailwind CSS and shadcn/ui for a clean, professional look. The UI is server-rendered by default, with client-side interactivity for features like searching.
- **Backend/API**: Implemented as API Route Handlers within the Next.js application (`src/app/api`). This provides a RESTful interface for accessing profile data.
- **Database**: To keep the project simple and easily deployable, this version uses a mock database. All profile data is stored in a static file at `src/lib/data.ts`. This can be replaced with a real database (e.g., MongoDB, PostgreSQL) by updating the API routes.
- **AI Integration**: Project searching is enhanced with Google's Gemini model via Genkit. The `intelligentSkillSearch` flow analyzes project descriptions against a search query to rank them by relevance.

## Data Schema

Since a NoSQL-style mock database is used, here is the schema for the main data structure.

### Profile

```json
{
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
    Create a `.env.local` file in the root of the project and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```
    GOOGLE_API_KEY=your_google_api_key
    ```

4.  **Seed your data:**
    Modify the `src/lib/data.ts` file to include your personal profile information.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

## API Endpoints

The API is hosted alongside the frontend.

- **`GET /api/health`**: Liveness probe.
  - **Success Response (200 OK):** `{"status":"ok"}`
  - **Sample cURL:**
    ```bash
    curl http://localhost:9002/api/health
    ```

- **`GET /api/profile`**: Retrieves the entire profile document.
  - **Success Response (200 OK):** The full profile object as defined in the schema.
  - **Sample cURL:**
    ```bash
    curl http://localhost:9002/api/profile
    ```

- **`POST /api/search`**: Searches projects based on a skill, ranked by AI.
  - **Request Body:** `{"skill": "your skill query"}`
  - **Success Response (200 OK):** An array of project objects, each with an added `relevanceScore`.
  - **Sample cURL:**
    ```bash
    curl -X POST http://localhost:9002/api/search \
    -H "Content-Type: application/json" \
    -d '{"skill": "React"}'
    ```

## Known Limitations

- **No Persistent Storage**: The application uses a mock data file instead of a real database. Any changes made via API endpoints (if implemented) would not persist across server restarts.
- **No Authentication**: The API is public and has no authentication or authorization layer.
- **Update/Create Functionality**: The UI and API for creating or updating a profile are not implemented to keep the scope minimal. Data must be updated directly in the `src/lib/data.ts` file.
