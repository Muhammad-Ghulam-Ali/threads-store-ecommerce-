import React from 'react'
import { Link } from 'react-router-dom'


const Cart = ({ showCart, setShowCart, selectedProducts, deleteCartItem }) => {
    return (
        <div>
            <div className={`fixed top-0 right-0  z-50 cart h-screen bg-[#f4f1ec] border border-[#e5e1da] flex flex-col py-8 w-100 transition-transform ease-in-out duration-300 ${showCart ? "translate-x-0" : "translate-x-full"}`}>
                <div className="header flex items-center justify-between px-6">
                    <h1 className='font-["Bebas-Neue"] text-[20px] font-bold'>YOUR CART</h1>
                    <i
                        onClick={() => setShowCart(false)}
                        className='fa fa-times text-[20px] text-[#6e6e6e] cursor-pointer hover:text-[#0c0c0c]' />
                </div>
                <hr className='mt-4 border border-[#e5e1da]' />

                <div className="cartProducts flex-1 overflow-y-auto pb-48 mt-10 px-6 flex flex-col gap-4 ">
                {selectedProducts.map(function(elem,index){
                    return (
                        <div key={index} className="cartBag  py-2 px-3 bg-[#e6e4e0] rounded-xl flex items-center justify-between gap-3">
                        <div className="cartBagDetail w-[90%] flex items-center gap-4">
                            <img className='h-25 w-20 object-cover rounded-xl' src={elem.image} alt="" />
                            <div className="bagExtraInfo flex flex-col gap-1">
                                <p className='text-[#0c0c0c] text-[14px] font-bold'>{elem.name}</p>
                                <small className='text-[#6e6e6e] text-[12px]'>Size: {elem.size}</small>
                                <small className='text-[#6e6e6e] text-[12px]'>Qty: {elem.quantity}</small>
                                <p className='text-[#0c0c0c] text-[14px] font-bold'>Rs. {((elem.quantity)*(elem.price)).toLocaleString()}</p>
                            </div>

                        </div>
                        <div className="delete w-[10%] flex items-center justify-center">
                            <i
                            onClick={() => deleteCartItem(index)}
                            className="fa-solid fa-trash text-[#6e6e6e] hover:text-[#e05555] cursor-pointer"></i>
                        </div>
                    </div>
                    )
                })}

                </div>

                <hr className=' border border-[#e5e1da]' />
                <div className=" footer flex flex-col gap-5 px-6 mt-5">
                    <div className="totalAmout flex items-center justify-between">
                        <h1 className='text-[#6e6e6e] text-[13px]'>TOTAL</h1>
                        <h1 className='text-[#0c0c0c] font-bold text-2xl'>RS. &nbsp;
                            {selectedProducts.reduce((acc, item) => acc + (item.price) * (item.quantity),0).toLocaleString()}
                        </h1>
                    </div>
                    <div className="button flex items-center justify-center">

                        <Link 
                        to={selectedProducts.length > 0 ? '/checkout' : '#'} 
                        onClick={() => setShowCart(false)}
                        className='bg-[#0c0c0c] text-[#f4f1ec] text-[12px] font-bold w-full py-3 rounded-xl hover:bg-[#222222] tracking-wide  text-center'>
                        PROCEED TO CHECKOUT
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
