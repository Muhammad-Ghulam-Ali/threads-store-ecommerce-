import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'



const Navbar = ({searchText, setSearchText, selectFilter, setSelectFilter,showCart, setShowCart, selectedProducts}) => {

  
  return (
    <div className='fixed top-0 left-0 right-0 z-50 py-4 px-14  items-center justify-between bg-[#f4f1ec] border-b border-b-[#e5e1da] hidden lg:flex'>
      <div className="logo">
        <h1 className='font-bold text-2xl font-["Bebas_Neue"] tracking-[0.3em]'>THREADS</h1>
      </div>
      <div className="filters">
        <ul className='flex items-center gap-12 text-sm text-[#6e6e6e]'>
          <li>
            <NavLink 
            to={'/'} end 
            className={({ isActive }) => isActive ? "text-black underline underline-offset-8 decoration-2" : ""}
            onClick={() => setSelectFilter("All")}
            >HOME</NavLink>
          </li>
          <li>
            <NavLink 
            to={'/products'}
            className={({ isActive }) => isActive && (selectFilter !== "T-Shirts" && selectFilter !== "Hoodies" && selectFilter !== "Pants") ? "text-black underline underline-offset-8 decoration-2" : ""}
            onClick={() => setSelectFilter("All")}
            >SHOP</NavLink>
          </li>
          <li>
            <a 
            onClick={() => setSelectFilter("T-Shirts")}
            className={`cursor-pointer ${selectFilter === "T-Shirts" && location.pathname !== "/" ? "text-black underline underline-offset-8 decoration-2 underline-black" : ""}`}
            >T-SHIRTS</a>
          </li>
          <li>
            <a
            onClick={() => setSelectFilter("Hoodies")}
            className={`cursor-pointer ${selectFilter === "Hoodies" && location.pathname !== "/" ? "text-black underline underline-offset-8 decoration-2 underline-black" : ""}`}
            >HOODIES</a>
          </li>
          <li>
            <a
            onClick={() => setSelectFilter("Pants")}
            className={`cursor-pointer ${selectFilter === "Pants" && location.pathname !== "/" ? "text-black underline underline-offset-8 decoration-2 underline-black" : ""}`}
            >PANTS</a>
          </li>  
        </ul>
      </div>
      <div className="searchCart flex items-center gap-6">
      <div className="searchBar relative">
        <input 
        onChange={(e) => {
          setSearchText(e.target.value)
        }}
        className={`py-1 px-5 border border-[#6e6e6e] rounded-2xl w-70`} type="text" placeholder='Search product...' />
      <i className="fa fa-search text-[#6e6e6e] hover:text-[#0c0c0c] cursor-pointer absolute top-1/2 -translate-y-1/2 right-3"></i>
      </div>
      <div 
      onClick={() => setShowCart(true)}
      className="cart relative">
      <i className="fa fa-shopping-bag text-[#6e6e6e] hover:text-[#0c0c0c] text-xl cursor-pointer"></i>
      <span 
      className='flex items-center justify-center h-5 w-5 rounded-full bg-[#c9a96e] text-[#0c0c0c] absolute -translate-y-8 left-2.5  text-[0.8rem] '>{selectedProducts.length}</span>
      </div>
      </div>
    </div>
  )
}

export default Navbar
