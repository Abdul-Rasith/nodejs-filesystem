const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 2000;

// Define the folder path where the files will be saved
const folderPath = path.join(__dirname, 'files');

// Create the folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// Endpoint 1: Create a text file with the current timestamp
app.get('/create-file', (req, res) => {
    // Get the current date-time for the filename
    const date = new Date();
    const formattedDate = date.toISOString().replace(/:/g, '-'); 
    const fileName = `${formattedDate}.txt`;

    // Get the current timestamp for the file content
    const timestamp = date.toISOString();

    // Define the full path where the file will be saved
    const filePath = path.join(folderPath, fileName);

    // Write the timestamp to the file
    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            return res.status(500).send('Error creating the file');
        }
        res.send(`File created successfully: ${fileName}`);
    });
});

app.get('/',(req,res)=>{
    res.send(`<h1>App running Successfull</h1>`)
})

// Endpoint 2: Retrieve all text files in the folder
app.get('/list-files', (req, res) => {
    // Read the directory and filter out only .txt files
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading the folder');
        }

        // Filter files to only include .txt files
        const textFiles = files.filter(file => path.extname(file) === '.txt');

        // Send the list of text files as the response
        res.json(textFiles);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
