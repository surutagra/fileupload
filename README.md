# fileupload
**File Upload**
This is a simple web application that allows users to upload files and store them in the cloud using AWS S3. The project consists of a frontend and backend component.

**Features**
File upload: Users can select a file from their local machine and upload it to the server.
File storage: Uploaded files are stored in an AWS S3 bucket.
Short link generation: Each uploaded file is assigned a unique short link that can be used to access and download the file.
Metadata tracking: The system records metadata about each uploaded file, including the original filename, file size, MIME type, and upload timestamp.
MongoDB integration: The metadata for each uploaded file is stored in a MongoDB database.
Error handling: Proper error handling is implemented for cases such as file size limit exceeded or no file selected for upload.
**Technologies Used**
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
File Upload: Multer (middleware for handling file uploads in Node.js)
Cloud Storage: AWS S3 (Simple Storage Service)
Database: MongoDB
Additional Libraries: AWS SDK, shortid (for generating unique short links)
**Prerequisites**
Before running the project, ensure that you have the following:

AWS account credentials (Access Key ID and Secret Access Key)
MongoDB database connection string
Node.js installed on your machine
**Installation**
Clone the repository: git clone <repository-url>
Install the dependencies: npm install
Set up the environment variables:
Create a .env file in the root directory.
Add the following environment variables and provide your own values:
makefile
**Copy code**
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
AWS_BUCKET_NAME=YOUR_AWS_BUCKET_NAME
Start the application: node server.js
Access the application in your browser at http://localhost:3000
**Usage**
Open the application in your browser.
Select a file to upload using the file input field.
Click the "Upload" button to initiate the file upload process.
If the upload is successful, you will receive a short link to access and download the uploaded file.
The uploaded file's metadata will be stored in the MongoDB database.
**License**
This project is licensed under the MIT License.

Feel free to customize the above description based on your specific project details.
