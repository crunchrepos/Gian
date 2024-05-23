# Crunch App

## Requirements
To run this project, you need to have the following installed:

- Docker: Required to run the PostgreSQL database. - Download and install Docker from the [official Docker website](https://www.docker.com/get-started)
- Node.js v20.x+: Ensure you have Node.js version 20 or higher installed. - Download and install Node.js from the [official Node.js website](https://nodejs.org/)
- Shopify CLI: Required to run the Shopify Hydrogen project. Installation instructions for the Shopify CLI in the [official Shopify CLI documentation](https://shopify.dev/apps/tools/cli)

## Project Preview

[![Project Preview](http://img.youtube.com/vi/1hvSv7lnBPQ/0.jpg)](https://youtu.be/1hvSv7lnBPQ)



## Getting Started
Follow these steps to run the project:

1. **Clone the Repository**
   First, clone the repository to your local machine and run npm install to install modules:
   ```bash
   git clone https://github.com/grocha7/crunch-app.git
   cd crunch-app
   npm install
   ```
   

## Running the Project

You can run each part separately or together using the following commands once you are on crunch-app directory:

- **a: Run both server and client together:(preferred)**
   Run the following command in the project root directory:
     
     ```
     npm run start:all
     ```
     
  3. This command checks if the `node_modules` directory exists in both the server and client projects. If it doesn't, it installs the dependencies for each project.
  4. Then, it starts the PostgreSQL database using Docker.
  5. It waits for the database to be ready before starting the Nest.js server.
  6. Once the server is ready, it starts the Hydrogen client.

     
- **b.1: Run the server:**
  1. Navigate to the server directory:
     ```
     cd node-server
     ```
  2. Start the PostgreSQL database:
     ```
     docker-compose up
     ```
  3. Start the server in development mode:
     ```
     yarn start:dev
     ```

- **b.2: Run the client:**
  1. Navigate to the client directory:
     ```
     cd ../hydrogen-quickstart
     ```
  2. Start the Hydrogen client:
     ```
     npm run dev
     ```
     
## Testing

You can test each part separately or together using the following commands:

- **a: Test the client and server:**
 ```bash
  npm run test:all
  ```
- **b.1: Test the server:**
  ```bash
  npm run test:server
  ```

- **b.2: Test the cllient:**
  ```bash
  npm run test:client
  ```

## Considerations & Patterns
- **Client**:
  - **State Management**: I used react-query for state management, which simplifies handling the state of user data.
  - **User Session Management**: I encountered difficulties using `useSession` as documented in the Hydrogen documentation. I also attempted to use the `./lib/session.js` method, but it did not work as I couldn’t retrieve the session in other contexts. This workaround involved storing the logged-in user information in localStorage. While this is not a best practice due to its impact on server-side rendering (SSR), it was a necessary compromise given the time constraints. With more time, I could have explored better solutions. You can see the attempt in `./routes/set-email.jsx`.
  - **Service Calls**: All service calls have been added to the `./services/api` directory, where the react-query hooks are located.
  - **Components**: The developed components are located in `app/components/DialogSign` and `app/components/FavoriteToggleButton`.
  - **HeaderCtas**: I made a modification to `HeaderCtas` in `app/components/Header` to handle Sign In / Sign Out.

- **Server**:
   - **User and Favorite Relationship**: I established the relationship between User and Favorite models using Prisma with onDelete: cascade. Even though there is no route to delete a user, this setup ensures that deleting a user manually from the database won’t cause issues.
   - **Error Handling**: Error handling with status requests is managed within the common folder.
   - **Testing**: I did not implement end-to-end (e2e) tests for the controller due to the complexity and the time required to set up a separate test database. Given the simplicity of the project, I prioritized other tasks, but e2e tests could have been added for more thorough testing.
   - **API Documentation**: Swagger was used for API documentation, which is exposed at `/api`. You can access it at [http://localhost:8080/api](http://localhost:8080/api) while server is running.

