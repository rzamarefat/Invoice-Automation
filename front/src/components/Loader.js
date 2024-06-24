import React from 'react';
import { useDispatch, useSelector } from "react-redux"


const Loader = () => {
    const dispatch = useDispatch()

    return (
        <div className='loader'></div>
    )
}

export default Loader