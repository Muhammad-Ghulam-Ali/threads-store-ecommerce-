import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = ({ searchText, setSearchText, selectFilter, setSelectFilter, showCart, setShowCart, selectedProducts }) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Top bar for mobile/tablet */}
      <div className='fixed top-0 left-0 right-0 z-50 py-4 px-6 flex items-center justify-between bg-[#f4f1ec] border-b border-b-[#e5e1da] lg:hidden'>
        <div className="logo">
          <h1 className='font-bold text-2xl font-["Bebas_Neue"] tracking-[0.3em]'>THREADS</h1>
        </div>
        <div className="flex items-center gap-5">
          <div
            onClick={() => setShowCart(true)}
            className="cart relative">
            <i className="fa fa-shopping-bag text-[#6e6e6e] hover:text-[#0c0c0c] text-xl cursor-pointer"></i>
            <span className='flex items-center justify-center h-5 w-5 rounded-full bg-[#c9a96e] text-[#0c0c0c] absolute -translate-y-8 left-2.5 text-[0.8rem]'>{selectedProducts.length}</span>
          </div>
          <i
            onClick={() => setIsOpen(true)}
            className="fa fa-bars text-[#0c0c0c] text-xl cursor-pointer"></i>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 z-50 bg-black/40 lg:hidden'>
        </div>
      )}

      {/* Sidebar drawer */}
      <div className={`fixed top-0 right-0 z-50 h-full w-[75%] sm:w-[350px] bg-[#f4f1ec] flex flex-col gap-8 px-8 py-8 transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex items-center justify-between">
          <h1 className='font-bold text-2xl font-["Bebas_Neue"] tracking-[0.3em]'>THREADS</h1>
          <i
            onClick={() => setIsOpen(false)}
            className="fa fa-times text-[#0c0c0c] text-xl cursor-pointer"></i>
        </div>

        <div className="searchBar relative">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className='py-1 px-5 border border-[#6e6e6e] rounded-2xl w-full'
            type="text"
            placeholder='Search product...' />
          <i className="fa fa-search text-[#6e6e6e] hover:text-[#0c0c0c] cursor-pointer absolute top-1/2 -translate-y-1/2 right-3"></i>
        </div>

        <ul className='flex flex-col gap-6 text-sm text-[#6e6e6e]'>
          <li>
            <NavLink
              to={'/'}
              end
              className={({ isActive }) => isActive ? "text-black underline underline-offset-8 decoration-2" : ""}
              onClick={() => { setSelectFilter("All"); setIsOpen(false) }}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/products'}
              className={({ isActive }) => isActive && (selectFilter !== "T-Shirts" && selectFilter !== "Hoodies" && selectFilter !== "Pants") ? "text-black underline underline-offset-8 decoration-2" : ""}
              onClick={() => { setSelectFilter("All"); setIsOpen(false) }}>
              SHOP
            </NavLink>
          </li>
          <li>
            <a
              onClick={() => { setSelectFilter("T-Shirts"); setIsOpen(false) }}
              className={`cursor-pointer ${selectFilter === "T-Shirts" && location.pathname !== "/" ? "text-black underline underline-offset-8 decoration-2" : ""}`}>
              T-SHIRTS
            </a>
          </li>
          <li>
            <a
              onClick={() => { setSelectFilter("Hoodies"); setIsOpen(false) }}
              className={`cursor-pointer ${selectFilter === "Hoodies" && location.pathname !== "/" ? "text-black underline underline-offset-8 decoration-2" : ""}`}>
              HOODIES
            </a>
          </li>
          <li>
            <a
              onClick={() => { setSelectFilter("Pants"); setIsOpen(false) }}
              className={`cursor-pointer ${selectFilter === "Pants" && location.pathname !== "/" ? "text-black underline underline-offset-8 decoration-2" : ""}`}>
              PANTS
            </a>
          </li>
        </ul>

      </div>
    </>
  )
}

export default Sidebar
