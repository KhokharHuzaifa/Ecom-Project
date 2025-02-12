import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
     <>
            <div className='bg-danger-600 w-4/5 max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded' style={{backgroundColor: 'rgba(167, 40, 40, 0.5)'}}>
                <p className='text-green-600 font-bold text-xl'>Payment Cancel</p>
                <Link to={'/cart'} className='p-2 px-3 mt-5 border-2 border-danger-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>Go To Cart</Link>
            </div>
            </>
  )
}

export default Cancel
