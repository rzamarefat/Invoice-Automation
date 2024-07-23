import Navbar from '../components/Navbar'
import PDFUploader from '../components/PDFUploader'
import DataDisplayer from '../components/DataDisplayer'
import { useDispatch, useSelector } from "react-redux"
import Loader from '../components/Loader'

const MainPage = () => {
    const extractedData = useSelector(state => state.extractedData)
    const headers = useSelector(state => state.headers)
    const isLoaderOn = useSelector(state => state.loaderState)



    const hanldeAllAddToDB = () => {
        
        
        fetch('http://127.0.0.1:8086/add-db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(extractedData)
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
    }

    return (
        <>  
            <Navbar/>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                
                <div className='row  p-5'>
                    <h1 className='my-5 text-center'>Welcome to Bill Extractor App</h1>
                    <div className='col d-flex flex-column justify-content-center align-items-center'>

                        {isLoaderOn && <Loader />}
                        
                        {!isLoaderOn && extractedData.length === 0 && <>
                            <div className='col-4'>
                                <p className='display-7 text-center'>Please upload the PDF Bill files: </p>
                            </div>
                            <div className='col-4'>
                                <PDFUploader/>
                            </div>
                        </>}
                        
                    </div>
                </div>
                
                {extractedData.length > 0 && !isLoaderOn && 
                        <div className='row container'>
                            <DataDisplayer allData={extractedData} headers={headers}/>
                        </div>
                }
            </div>
        </>
    )
}

export default MainPage