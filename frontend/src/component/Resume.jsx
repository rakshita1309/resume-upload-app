import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const maxFileSize = 80 * 1024; // 80KB in bytes

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > maxFileSize) {
        setError('File size exceeds the 80KB limit.');
        setFile(null);
      } else {
        setFile(selectedFile);
        setError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // Perform the upload action
      console.log('File ready for upload:', file);
    } else {
      console.log('No file selected or file too large.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
