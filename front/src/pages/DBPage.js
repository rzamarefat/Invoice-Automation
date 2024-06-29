import { useEffect } from 'react';
import Navbar from '../components/Navbar'

const DBPage = () => {
    // const extractedData = useSelector(state => state.extractedData)
    // const headers = useSelector(state => state.headers)
    // const isLoaderOn = useSelector(state => state.loaderState)


    const fetch_db = () => {
        fetch('http://127.0.0.1:8086/fetch-db', {
              method: 'GET',
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                  
                } else {
                  throw new Error('Network response was not ok.');
                  
                }
                
              })
              .then((data) => {
                console.log('Fetch DB:', data);
              })
              .catch((error) => {
                console.error('Fetch DB:', error);
              });
    }


    useEffect(() => {
        fetch_db()
    })

    return (
        <>  
            <Navbar/>
                <div className='d-flex flex-column justify-content-center align-items-center'>
            </div>
        </>
    )
}

export default DBPage