const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { saveBase64Image } = require('./utils');
const { performOCR } = require('./ocr');
const { handleServerError, handleClientError } = require('./errors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint for image processing
app.post('/api/upload', async (req, res) => {
    const { file } = req.body;

    if (!file) {
        return handleClientError(res, 'No image file provided.', 400);
    }

    // Save the uploaded image to a temporary file
    const tempImagePath = path.join(__dirname, 'temp.png');
    saveBase64Image(file, tempImagePath);

    try {
        // Perform OCR using Tesseract.js
        const { data: { text } } = await performOCR(tempImagePath);

        // Process the extracted text as needed
        const extractedData = processExtractedText(text);

        // Return the extracted information in the response
        res.json(extractedData);
    } catch (error) {
        handleServerError(res, error);
    } finally {
        // Clean up: Delete the temporary image file
        fs.unlinkSync(tempImagePath);
    }
});

function processExtractedText(text) {
    // Implement your logic to process the extracted text
    const lines = text.split('\n');
    return {
        name: lines[0],
        last_name: lines[1],
        identification_number: lines[2],
        date_of_birth: lines[3],
        date_of_issue: lines[4],
        date_of_expiry: lines[5],
        status: 'Success'
    };
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
