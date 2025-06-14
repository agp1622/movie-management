# TravelZap - Movie & Actor Management System

## Tech Stack

**Frontend:**
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Axios for API calls

**Backend:**
- NestJS
- TypeORM
- SQL Server database
- TypeScript

---

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- SQL Server (local instance or remote)
- SQL Server Management Studio (optional, for database management)

### Backend Setup

1. **Navigate to backend directory**

2. **Install dependencies**
   npm install

3. **Database Configuration**
   Create `.env` file in the backend root:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=1433
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=MovieManagement
   
   # Application Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. **SQL Server Database Setup**

   **Option A: Create database manually**
   ```sql
   -- Connect to SQL Server and run:
   CREATE DATABASE MovieManagement;
   ```

   **Option B: Let TypeORM create it automatically**
    - Set `synchronize: true` in TypeORM config (development only)
    - Database and tables will be created on first run

5. **Seed Database with initial data**
   run npm seed

6. **Start the backend server**
   npm run start:dev

   Backend will run on http://localhost:3000

### Frontend Setup

1. **Navigate to frontend directory**
   cd frontend

2. **Install dependencies**
   npm install

3. **Environment Configuration**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Start the frontend server**
   # Development mode with Turbopack
   npm run dev
   
   # Production build
   npm run build
   npm run start

   Frontend will run on http://localhost:3001

### Development Workflow

1. **Start SQL Server** (if local instance)
2. **Start backend server**: `npm run start:dev` (in backend directory)
3. **Start frontend server**: `npm run dev` (in frontend directory)
4. **Open browser** to http://localhost:3001

---

API Endpoints
Base URL: http://localhost:3000

Movies

GET    /movies          # Get all movies
GET    /movies/:id      # Get movie by ID
POST   /movies          # Create movie
PUT    /movies/:id      # Update movie  
DELETE /movies/:id      # Delete movie

Actors

GET    /actors          # Get all actors
GET    /actors/:id      # Get actor by ID
POST   /actors          # Create actor
PUT    /actors/:id      # Update actor
DELETE /actors/:id      # Delete actor

Ratings

GET    /ratings                # Get all ratings
GET    /ratings/movie/:movieId # Get ratings for a movie
POST   /ratings               # Create rating
DELETE /ratings/:id           # Delete rating

Movie-Actor Relationships

POST   /movies/:movieId/actors/:actorId    # Add actor to movie
DELETE /movies/:movieId/actors/:actorId    # Remove actor from movie



