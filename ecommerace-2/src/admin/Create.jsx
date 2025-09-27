import React, { useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const [form, setForm] = useState({ title: '', description: '', price: '' })

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setImage(file)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', image)
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('price', form.price)

    if (!form.description || !form.price || !form.title || !image) {
      return setError('All fields are required!')
    }

    if (!form.description.trim() && !form.title.trim()) {
      return;
    }

    if (!image) {
      return
    }

    try {
      const res = await axios.post('/products/postProduct', formData)
      setResult(res.data)
      setForm({ title: '', description: '', price: '' })
      setImage(null)
      setPreview(null)
      navigate('/admin')
    } catch (err) {
      if (err) {
        setError(err)
      }
    }
  }

  return (
    <div className='flex justify-center items-center w-full pb-4 pt-4'>
      <div className="py-10 flex flex-col justify-between bg-white">
        <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg flex flex-col gap-4">
          <div>
            <p className="text-base font-medium">Product Image</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 min-w-[360px] min-h-[210px] max-w-[400px] max-h-[250px]">

              {
                preview ? <img src={preview} className='cursor-pointer min-w-[360px] min-h-[210px] max-w-[400px] max-h-[250px] object-cover' />
                  :
                  <label>
                    <input onChange={handleFileChange} accept="image/*" type="file" hidden />
                    <img className="cursor-pointer w-full h-full" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png" alt="uploadArea" />
                  </label>
              }

            </div>
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
            <input name='title' value={form.title} onChange={handleChange} type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
            <textarea required name='description' value={form.description} onChange={handleChange} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex-1 flex flex-col gap-1 w-32">
              <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
              <input name='price' value={form.price} onChange={handleChange} id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
            </div>

          </div>

          {
            error && <span className='bg-red-400 py-2 text-white font-semibold w-full rounded text-center'>{error}</span>
          }

          <button type='submit' className="px-8 py-2.5 bg-indigo-500 hover:bg-indigo-700 transition duration-200 text-white font-semibold rounded cursor-pointer w-full">Create</button>
        </form>
      </div>
    </div>
  )
}

export default Create
