# Thought-Stream

<img src="/assets/Home.png" align="right" height="100px">

Thought-Stream is a dynamic blogging platform where you can explore, engage with, and share insightful articles across a wide range of topics. Join our vibrant community to discover thought-provoking content and contribute your own perspectives.

## Tech Stacks
 - **Backend** - Hono, TypeScript, Cloudflare Workers
 - **Frontend** - ReactJS, Tailwind CSS
 - **Authentication** - JWT
 - **Databases** - PostgreSQL

## Features
 - User friendly interfacce allowing easy navigation between pages and sharing of thoughts within the ThoughtStream community.
 - Easy signup and signin procedures for users.
 - ThoughtStream also features secure authorization for users with the help JSON Web Tokens (JWT).
 - ThoughyStream can be accessed from any device as per user's ease


## Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/banerjeesoumya/Thought-Stream.git
    cd Thought-Stream
    ```

2. **Setting up the backend**
    - Install all the dependencies
        ```bash
        cd backend
        npm install
        ```
    - Create a .env file on the backend directory. On the .env file add the variable :
        ```bash
        DATABASE_URL=
        ```
    - Run database migration and generate the prisma client : 
        ```bash
        npx prisma migrate dev --name setup_schema
        npx prisma generate client
        ```
    - To run the server locally :
        ```bash
        npm run dev
        ```
    - To deploy the server
        ```bash
        npm run deploy
        ```

3. **Setting up the client**
    - Install all the dependencies
        ```bash
        cd frontend
        npm install
        ```
    - Create a .env file on the frontend directory. On the .env add the vairable :
        ```bash
        VITE_URL=
        ```
    - Start the client
        ```bash
        npm run dev
        ```

        


