import Navbar from '../components/Navbar'
import PDFUploader from '../components/PDFUploader'

const MainPage = () => {
    return (
        <>  
            <div >
                <Navbar/>
                <div className='row d-flex flex-column justify-content-center align-items-center p-5'>
                    <h1 className='my-5 text-center'>Welcome to Bill Extractor App</h1>
                    <div className='col-8 d-flex flex-column justify-content-center align-items-center'>
                        
                        
                            <div className='col-4'>
                                <p className='display-7'>Please upload the PDF Bill files: </p>
                            </div>
                            <div className='col-4'>
                                <PDFUploader/>
                            </div>

                        
                        
                        
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default MainPage