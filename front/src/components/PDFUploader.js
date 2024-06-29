import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { setPDFFiles, setExtractedData, setDataTableHeaders, switchLoaderState } from '../redux/actions';


const PDFUploader = () => {
    const pdfFiles = useSelector(state => state.pdfFiles)
    
    const dispatch = useDispatch()

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        
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
            dispatch(switchLoaderState(true))
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
                dispatch(setExtractedData(data.data))
                dispatch(setDataTableHeaders(data.headers))
                dispatch(switchLoaderState(false))
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
           <div className="file-upload d-flex flex-column justify-content-center align-items-center  p-5">
                <input type="file" accept="application/pdf" className="form-control" multiple onChange={handleFileChange} />
                {pdfFiles.length > 0 && <button className="btn btn-dark my-5" type="button" onClick={handleUpload}>Upload and Analyse</button>}
                {pdfFiles.length === 0 && <button className="btn btn-dark my-5" type="button" onClick={handleUpload} disabled>Upload and Analyse</button>}
            </div>
            
        </>
    )
}

export default PDFUploader