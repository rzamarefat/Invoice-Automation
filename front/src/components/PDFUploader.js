import React from 'react';

const PDFUploader = () => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            
        } else {
          alert('Please upload a valid PDF file.');
        }
      };

    const handleUpload = () => {
        const selectedFile = null
        if (selectedFile) {
          console.log('Uploading:', selectedFile);
          const formData = new FormData();
          formData.append('file', selectedFile);
    
          fetch('/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('File uploaded successfully:', data);
            })
            .catch((error) => {
              console.error('Error uploading file:', error);
            });
        } else {
          alert('No file selected.');
        }
      };


    return (
        <>
           <div className="file-upload">
                <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
                <button className="btn btn-block"onClick={handleUpload}>Upload</button>
            </div>
            
        </>
    )
}

export default PDFUploader