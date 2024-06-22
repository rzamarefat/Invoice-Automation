import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { setPDFFiles } from '../redux/actions';


const PDFUploader = () => {
    const pdfFiles = useSelector(state => state.pdfFiles)
    const dispatch = useDispatch()

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        console.log(files)
        const pdfFiles = files.filter((file) => file.type === 'application/pdf');
        
        if (pdfFiles.length !== files.length) {
          alert('Some files are not PDF. Only PDF files will be uploaded.');
        }
    
        dispatch(setPDFFiles(pdfFiles));
      };

      const handleUpload = () => {
        if (pdfFiles.length > 0) {
          pdfFiles.forEach((file) => {
            // Handle the file upload logic here
            console.log('Uploading:', file);
            const formData = new FormData();
            formData.append('file', file);
    
            fetch('http://127.0.0.1:8086/upload-pdf', {
              method: 'POST',
              body: formData,
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Network response was not ok.');
                }
              })
              .then((data) => {
                console.log('File uploaded successfully:', data);
              })
              .catch((error) => {
                console.error('Error uploading file:', error);
              });
          });
        } else {
          alert('No files selected.');
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