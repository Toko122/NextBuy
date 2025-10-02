import React from 'react'

const SearchCard = ({product}) => {
  return (
    <div>
        <img src={product.image} />
        <h1>{product.title}</h1>
    </div>
  )
}

export default SearchCard
