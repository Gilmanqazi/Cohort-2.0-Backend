import React, { useEffect, useState } from 'react'
import { useProduct } from '../Hook/useProduct'

const GetSellerProducts = () => {

  const { handleGetSellerProducts } = useProduct()
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await handleGetSellerProducts()
    setProducts(data)
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            New Drops
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            Latest fits. Clean silhouettes. Everyday essentials.
          </p>
        </div>

        {/* Grid */}
        <div className="
          grid 
          grid-cols-2 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-x-4 
          gap-y-8
        ">

          {products.map((item) => {
            const imageUrl =
              typeof item.images?.[0] === "string"
                ? item.images[0]
                : item.images?.[0]?.url

            return (
              <div
                key={item._id}
                className="group"
              >

                {/* Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition">

                  {/* Image */}
                  <div className="relative w-full h-[300px] sm:h-[320px] md:h-[340px] overflow-hidden">

                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="
                        w-full h-full 
                        object-cover 
                        object-top   /* 👈 THIS IS IMPORTANT */
                        transition duration-500 group-hover:scale-105
                      "
                    />

                    {/* Badge */}
                    <span className="absolute top-3 left-3 bg-black text-white text-[10px] px-2.5 py-1 rounded-full">
                      NEW
                    </span>

                  </div>

                  {/* Info */}
                  <div className="px-3 py-3 flex flex-col gap-1">

                    {/* Title */}
                    <h2 className="text-[13px] font-medium text-gray-900 line-clamp-1">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-snug">
                      {item.description}
                    </p>

                    {/* Price */}
                    <p className="text-[13px] font-semibold text-gray-900 mt-1">
                      {item.price.currency} {item.price.amount}
                    </p>

                  </div>

                </div>

              </div>
            )
          })}

        </div>

      </div>
    </div>
  )
}

export default GetSellerProducts