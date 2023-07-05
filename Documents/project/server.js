const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const shortid = require('shortid');
const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config();
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const app = express();
const port = 3000;

// Configure AWS SDK using environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create an S3 service object
const s3 = new AWS.S3();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB connection string
const mongoURI = process.env.MONGODB_URI;

// MongoDB collection and field names
const collectionName = 'files';
const fieldName = 'shortLink';

// Define MongoDB client and connect to the database
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function start() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    app.get('/', (req, res) => {
      res.set('Content-Type', 'text/html');
      res.send('File upload server is running');
    });

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public'), { index: 'index.html' }));

    // Set up routes
    app.post('/upload', upload.single('file'), async (req, res) => {
      try {
        const file = req.file;

        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        if (file.size > 1024 * 1024) {
          return res.status(400).json({ error: 'File size exceeds the limit of 1MB' });
        }

        // Generate unique short link
        const shortLink = shortid.generate();

        // Upload file to S3
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${shortLink}-${file.originalname}`,
          Body: file.buffer
        };

        const s3UploadResult = await s3.upload(params).promise();

        // Store short link and file information in MongoDB
        const collection = client.db().collection(collectionName);
        const fileData = {
          shortLink,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          createdAt: new Date()
        };

        await collection.insertOne(fileData);

        res.json({ shortLink: s3UploadResult.Location });
      } catch (error) {
        console.error('An error occurred during file upload:', error);
        res.status(500).json({ error: 'An error occurred during file upload' });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

start();
