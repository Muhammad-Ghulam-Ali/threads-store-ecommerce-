import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductDetail = ({ productsData, selectedProducts, setSelectedProducts }) => {

  const { id } = useParams();
  const product = productsData.find(p => p.id === Number(id))

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  const [showToast, setShowToast] = useState(false);
  const addToCart =  () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
}

  return (

    <div>
      {product && (
        <div className='mt-20 mx-8 py-8 lg:mt-33 lg:mx-22 lg:py-0 flex flex-col gap-10'>
          <div className="home flex items-center gap-2 text-[#6e6e6e] font-bold text-[12px] hover:text-[#0c0c0c]">
            <Link className='flex items-center gap-2' to={'/products'}>
              <i className='fa fa-arrow-left' />
              BACK TO PRODUCTS
            </Link>
          </div>
          <div className="product flex flex-col lg:flex-row justify-center gap-11 lg:gap-22">
            <div className="image w-full lg:w-[40%]">
              <img className='w-full h-150 object-cover' src={product.image} alt="" />
            </div>
            <div className="information w-full lg:w-[60%] flex flex-col gap-6">
              <small className='text-[#6e6e6e] text-[12px] tracking-[0.2em]'>{product.cat.toUpperCase()}</small>
              <h1 className='text-[#0c0c0c] font-["Bebas_Neue"] text-[52px] tracking-[0.01em]'>{product.name}</h1>
              <h1 className='text-[#0c0c0c] text-[28px] font-bold'>Rs. {product.price}</h1>
              <p className='text-[#6e6e6e] text-[14px]'>{product.desc}</p>

              <div className="size flex flex-col gap-2">
                <small className='text-[#0c0c0c] text-[11px] font-bold'>SELECT SIZE</small>
                <div className="sizeBoxes flex items-center gap-3">
                  {product.sizes.map(function (elem, index) {
                    return (
                      <span
                        onClick={() => setSize(elem)}
                        className={`px-5 py-2  text-[13px] border border-[#e5e1da] hover:bg-[#0c0c0c] hover:text-[#f4f1ec] hover:border-[#0c0c0c] cursor-pointer ${size === elem ? "bg-[#0c0c0c] text-[#f4f1ec] border-[#0c0c0c]" : ""}`}>{elem}</span>
                    )
                  })}
                </div>
              </div>

              <div className="qty flex items-center gap-2">
                <small className='text-[#0c0c0c] text-[11px] font-bold'>QTY</small>
                <div className="qtyBtns flex items-center font-bold border border-[#e5e1da] divide-x divide-[#e5e1da]">
                  <span
                    onClick={() => {
                      if (qty < 2) {
                        return;
                      }
                      setQty(qty - 1)
                    }}
                    className='px-5 py-2 text-[13px]  cursor-pointer hover:bg-[#eeeeee]'>-</span>
                  <span value={qty} className='px-5 py-2 text-[13px]'>{qty}</span>
                  <span
                    onClick={() => setQty(qty + 1)}
                    className='px-5 py-2 text-[13px]  cursor-pointer hover:bg-[#eeeeee]'>+</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedProducts(
                    [...selectedProducts, {
                      id: product.id,
                      image: product.image,
                      name: product.name,
                      size: size,
                      quantity: qty,
                      price: product.price
                    }]
                  )
                 addToCart() 
                }}
                className='py-3 bg-[#0c0c0c] rounded-xl text-[12px] text-[#f4f1ec] font-bold mx-5 cursor-pointer hover:bg-[#2c2c2c]'>ADD TO CART</button>

              <hr className='text-[#e5e1da]' />
              <div className="deals flex flex-col gap-3 text-[#0c0c0c] text-[13px]">
                <small>Free delivery on orders over Rs. 3,000</small>
                <small>Easy 7-day returns</small>
                <small>Secure checkout</small>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-20 right-6 bg-green-700 text-[#f4f1ec] text-[12px] font-bold py-3 px-6 rounded-md z-50">
          ✓ Product added to cart
        </div>
      )}
    </div>
  )
}

export default ProductDetail
