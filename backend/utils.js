const fs = require('fs');
const path = require('path');

function saveBase64Image(base64String, filePath) {
    // Remove the data:image/png;base64 part
    const base64Data = base64String.replace(/^data:image\/png;base64,/, '');

    fs.writeFileSync(filePath, base64Data, 'base64');
}

module.exports = {
    saveBase64Image
};
 
