import React from 'react'

const SearchCard = ({ product }) => {
  return (
    <div className='flex gap-3 items-center'>
      <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded" />
      <h1 className='font-medium text-sm'>{product.title}</h1>
    </div>
  )
}

export default SearchCard
