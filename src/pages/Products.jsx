import React from 'react'
import productsData from '../data/productsData'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Products = ({ filteredProducts, selectFilter, setSelectFilter, setSearchText, selectedProducts, setSelectedProducts }) => {

    const [hoveredId, setHoveredId] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const addToCart =  () => {
        setShowToast(true)
        setTimeout(() => setShowToast(false), 2000)
    }



    return (
        <>
            <div className="mt-18 lg:mt-23 pageTitle px-9 py-7 lg:px-18 lg:py-14">
                <h1 className='font-bold text-[#0c0c0c] font-["Bebas_Neue"] text-4xl lg:text-6xl'>ALL PRODUCTS</h1>
                <small className='text-[#6e6e6e] font-["DM Sans"] font-[14px]'>{filteredProducts.length} products</small>
            </div>
            <div className="filters hidden md:flex md:items-center md:gap-3 md:px-14 lg:gap-5 lg:px-18">
                <a
                    onClick={() => setSelectFilter("All")}
                    className={`bg-["transparent"] text-[#6e6e6e] border border-[#e5e1da] text-[12px] cursor-pointer py-2 px-6 hover:bg-[#0c0c0c] hover:text-[#f4f1ec] hover:border-[#0c0c0c] ${selectFilter === "All" ? "bg-[#0c0c0c] text-[#f4f1ec] border-[#0c0c0c]" : ""}`}>ALL</a>
                <a
                    onClick={() => setSelectFilter("T-Shirts")}
                    className={`bg-["transparent"] text-[#6e6e6e] border border-[#e5e1da] text-[12px] cursor-pointer py-2 px-6 hover:bg-[#0c0c0c] hover:text-[#f4f1ec] hover:border-[#0c0c0c] ${selectFilter === "T-Shirts" ? "bg-[#0c0c0c] text-[#f4f1ec] border-[#0c0c0c]" : ""}`}>T-SHIRTS</a>
                <a
                    onClick={() => setSelectFilter("Hoodies")}
                    className={`bg-["transparent"] text-[#6e6e6e] border border-[#e5e1da] text-[12px] cursor-pointer py-2 px-6 hover:bg-[#0c0c0c] hover:text-[#f4f1ec] hover:border-[#0c0c0c] ${selectFilter === "Hoodies" ? "bg-[#0c0c0c] text-[#f4f1ec] border-[#0c0c0c]" : ""}`}>HOODIES</a>
                <a
                    onClick={() => setSelectFilter("Pants")}
                    className={`bg-["transparent"] text-[#6e6e6e] border border-[#e5e1da] text-[12px] cursor-pointer py-2 px-6 hover:bg-[#0c0c0c] hover:text-[#f4f1ec] hover:border-[#0c0c0c] ${selectFilter === "Pants" ? "bg-[#0c0c0c] text-[#f4f1ec] border-[#0c0c0c]" : ""}`}>PANTS</a>
                <a
                    onClick={() => setSelectFilter("Caps")}
                    className={`bg-["transparent"] text-[#6e6e6e] border border-[#e5e1da] text-[12px] cursor-pointer py-2 px-6 hover:bg-[#0c0c0c] hover:text-[#f4f1ec] hover:border-[#0c0c0c] ${selectFilter === "Caps" ? "bg-[#0c0c0c] text-[#f4f1ec] border-[#0c0c0c]" : ""}`}>CAPS</a>
                <a
                    onClick={() => setSelectFilter("Accessories")}
                    className={`bg-["transparent"] text-[#6e6e6e] border border-[#e5e1da] text-[12px] cursor-pointer py-2 px-6 hover:bg-[#0c0c0c] hover:text-[#f4f1ec] hover:border-[#0c0c0c] ${selectFilter === "Accessories" ? "bg-[#0c0c0c] text-[#f4f1ec] border-[#0c0c0c]" : ""}`}>ACCESSORIES</a>
            </div>
            <div className='px-5 py-6 md:px-14 md:py-7 lg:px-18 lg:py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {filteredProducts.map(function (elem, index) {
                    return (
                        <Link key={elem.id} to={`/productdetail/${elem.id}`}>
                            <div
                                onMouseEnter={() => setHoveredId(elem.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                key={index} className='card cursor-pointer flex flex-col gap-3 pb-6'>
                                <div className="image relative">
                                    <img
                                        className='h-100 cursor-pointer  w-full object-cover' src={elem.image} alt="" />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            addToCart()
                                            setSelectedProducts([...selectedProducts, {
                                                id: elem.id,
                                                name: elem.name,
                                                image: elem.image,
                                                size: "",
                                                quantity: 1,
                                                price: elem.price,
                                            }])
                                        }}
                                        className={`absolute bottom-0 w-full py-2 cursor-pointer bg-[#0c0c0c] font-bold text-[#f4f1ec] text-[12px] text-['DM- Sans'] transition-all duration-300 ease-in overflow-hidden ${hoveredId === elem.id ? "h-10 opacity-100" : "h-0 opacity-0"}`}>QUICK ADD</button>
                                </div>
                                <div className="productInfo flex flex-col gap-2">
                                    <div className="size flex items-center gap-2">
                                        {elem.sizes.map(function (size, i) {
                                            return (
                                                <span key={i} className='flex items-center justify-center w-6 h-6 border border-[#e5e1da] text-[#6e6e6e] text-[10px]'>{size}</span>
                                            )
                                        })}

                                    </div>
                                    <div className="category">
                                        <small className='text-[#6e6e6e]'>{elem.cat}</small>
                                    </div>
                                    <div className="name">
                                        <p className='font-bold text-[#0c0c0c]'>{elem.name}</p>
                                    </div>
                                    <div className="price">
                                        <p className='font-bold text-[#0c0c0c]'>Rs. {elem.price}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            {filteredProducts.length < 1 && (
                <div className='w-full h-full flex items-center justify-center'>
                    <div className="message flex flex-col items-center justify-center gap-3 text-[#6e6e6e]">
                        <i className="fa-solid fa-magnifying-glass text-2xl"></i>
                        <h1 className='font-bold'>Oops! we couldn't find anything.</h1>
                        <small>No results for your search. Try another term to find what you’re looking for!</small>
                        <small
                            onClick={() => {
                                setSelectFilter("All")
                                setSearchText("")
                            }}
                            className='text-black font-bold cursor-pointer'>Clear filter</small>
                    </div>
                </div>
            )}

            {showToast && (
                <div className="fixed top-20 right-6 bg-green-700 text-[#f4f1ec] text-[12px] font-bold py-3 px-6 rounded-md z-50">
                    ✓ Product added to cart
                </div>
            )}
        </>
    )
}

export default Products

