function handleServerError(res, error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
}

function handleClientError(res, message, status = 400) {
    console.error('Client Error:', message);
    res.status(status).json({ error: message });
}

module.exports = {
    handleServerError,
    handleClientError
};
