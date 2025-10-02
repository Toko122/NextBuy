import React from 'react'

const SearchCard = ({product}) => {
  return (
    <div className='flex gap-4 items-center cursor-pointer'>
        <img src={product.image} />
        <h1 className='text-semibold'>{product.title}</h1>
    </div>
  )
}

export default SearchCard
