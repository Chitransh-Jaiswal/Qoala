function uploadImages() {
    const fileInput = document.getElementById('fileInput');
    const tableBody = document.getElementById('tableBody');
    const loadingIndicator = document.getElementById('loadingIndicator');

    const files = fileInput.files;

    if (files.length === 0) {
        alert('Please select at least one image file.');
        return;
    }

    // Show loading indicator
    loadingIndicator.style.display = 'block';

    // Simulate backend API call for file upload
    // In a real application, you'd use an XMLHttpRequest or Fetch API to send files to the backend
    setTimeout(() => {
        // Simulate successful processing
        const sampleJson = {
            "name": "John",
            "last_name": "Doe",
            "identification_number": "1234567890123",
            "date-of-birth": "01/01/1990",
            "date-of-issue": "01/01/2022",
            "date-of-expiry": "01/01/2030",
            "status": "Success"
        };

        // Populate table with extracted information
        populateTable(sampleJson);

        // Hide loading indicator
        loadingIndicator.style.display = 'none';
    }, 2000); // Simulating a delay for processing
}

function populateTable(data) {
    const tableBody = document.getElementById('tableBody');
    const newRow = tableBody.insertRow();

    for (const key in data) {
        const cell = newRow.insertCell();
        cell.textContent = data[key];
    }
}
