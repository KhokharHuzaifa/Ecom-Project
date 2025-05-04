import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className='flex justify-center p-5 items-center min-h-screen bg-gray-100 px-4'>
      <div className='bg-red-100 p-5 border border-red-400 text-red-700 px-6 py-8 rounded-lg shadow-lg max-w-sm w-full text-center'>
      <h2 className='text-2xl font-bold mb-2' style={{ color: 'rgb(220, 38, 38)' }}>Payment Canceled</h2>
        <p className='text-lg mb-6'>Your payment was not completed. Please try again or check your cart.</p>
        <Link
          to='/cart'
          className='my-4 border border-red-600 block bg-red-500 font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300'
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
