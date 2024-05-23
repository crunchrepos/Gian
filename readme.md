Crunch App
Requirements
To run this project, you need to have the following installed:

Docker: Required to run the PostgreSQL database.
Node.js v20.x+: Ensure you have Node.js version 20 or higher installed.
Shopify CLI: Required to run the Shopify Hydrogen project.
Getting Started
Follow these steps to run the project:

1. Clone the Repository
First, clone the repository to your local machine:

bash
Copy code
git clone <repository-url>
cd crunch-app
2. Install Dependencies
The project consists of two main parts: the server and the client. Both parts have their own dependencies that need to be installed. The start:all script will take care of this for you.

3. Run the Project
Use the following command to start both the server and the client:

bash
Copy code
npm run start:all
This command performs the following steps:

Installs dependencies for the server (node-server) and the client (hydrogen-quickstart) if not already installed.
Starts the PostgreSQL database using Docker.
Waits for the database to be ready.
Starts the Nest.js server.
Waits for the Nest.js server to be ready.
Starts the Hydrogen client.
Additional Information
The server is built using Nest.js and connects to a PostgreSQL database managed by Docker.
The client is built using Shopify Hydrogen.
Notes
Ensure Docker is running on your machine before executing the npm run start:all command.
If you encounter any issues with dependencies, you may need to manually install them by navigating to the respective directories (node-server and hydrogen-quickstart) and running npm install.
By following these steps, you should be able to run both the server and client applications seamlessly. If you encounter any issues, please refer to the documentation or raise an issue in the repository.

Considerations
Client:
State Management: I used react-query for state management, which simplifies handling the state of user data.
User Session Management: I encountered difficulties using useSession as documented in the Hydrogen documentation. I also attempted to use the ./lib/session.js method, but it did not work as I couldn't retrieve the session in other contexts. This workaround involved storing the logged-in user information in localStorage. While this is not a best practice due to its impact on server-side rendering (SSR), it was a necessary compromise given the time constraConsiderations
Client:
State Management: I used react-query for state management, which simplifies handling the state of user data.
User Session Management: I encountered difficulties using useSession as documented in the Hydrogen documentation. I also attempted to use the ./lib/session.js method, but it did not work as I couldn't retrieve the session in other contexts. This workaround involved storing the logged-in user information in localStorage. While this is not a best practice due to its impact on server-side rendering (SSR), it was a necessary compromise given the time constraints. With more time, I could have explored better solutions. You can see the attempt in ./routes/set-email.jsx.
Server:
User and Favorite Relationship: I established the relationship between User and Favorite models using Prisma with onDelete: cascade. Even though there is no route to delete a user, this setup ensures that deleting a user manually from the database won't cause issues.
Error Handling: Error handling with status requests is managed within the common folder.
Testing: I did not implement end-to-end (e2e) tests for the controller due to the complexity and the time required to set up a separate test database. Given the simplicity of the project, I prioritized other tasks, but e2e tests could have been added for more thorough testing.ints. With more time, I could have explored better solutions. You can see the attempt in ./routes/set-email.jsx.
Server:
User and Favorite Relationship: I established the relationship between User and Favorite models using Prisma with onDelete: cascade. Even though there is no route to delete a user, this setup ensures that deleting a user manually from the database won't cause issues.
Error Handling: Error handling with status requests is managed within the common folder.
Testing: I did not implement end-to-end (e2e) tests for the controller due to the complexity and the time required to set up a separate test database. Given the simplicity of the project, I prioritized other tasks, but e2e tests could have been added for more thorough testing.






