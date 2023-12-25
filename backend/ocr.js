const Tesseract = require('tesseract.js');

function performOCR(imageBuffer) {
    return Tesseract.recognize(
        imageBuffer,
        'eng',
        { logger: info => console.log(info) }
    );
}

module.exports = {
    performOCR
};
 
