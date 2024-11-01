1. **Navigate to the `client` directory** and install dependencies:  
   `
   cd client  
   npm install
   `

2. **Navigate to the `server` directory** and install dependencies:  
   `
   cd ../server  
   npm install
   `

3. **Create a `.env` file in the `server` directory** and add the provided credentials in the email.

4. **start the server**:  
   `
   npm start
   `

5. **start the client**  
   `
   cd ../client  
   npm start
   `  

**If you are experiencing an issue connecting to the server from the client try changeeing the port for the server as MAC seems to run some processes on default ports**  
files to change are  
client/src/services/taskService.ts  
server/app.ts