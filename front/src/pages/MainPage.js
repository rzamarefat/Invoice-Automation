import Navbar from '../components/Navbar'
import PDFUploader from '../components/PDFUploader'
import DataDisplayer from '../components/DataDisplayer'
import { useDispatch, useSelector } from "react-redux"
import Loader from '../components/Loader'

const MainPage = () => {
    const extractedData = useSelector(state => state.extractedData)
    const headers = useSelector(state => state.headers)
    const isLoaderOn = useSelector(state => state.loaderState)

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

                {extractedData.length > 0 && !isLoaderOn && 
                <div className='d-flex flex-column'>
                    <button className="btn btn-dark my-1" type="button">Add Seelected Items to Database</button>
                    <button className="btn btn-dark" type="button">Add All Items to Database</button>
                </div>
                }
                
            </div>
        </>
    )
}

export default MainPage