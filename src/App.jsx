import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Sidebar from './components/Sidebar'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import productsData from './data/productsData'
import Checkout from './pages/Checkout'


function App() {
  // Usestates
  const [searchText, setSearchText] = useState("")
  const [selectFilter, setSelectFilter] = useState("All")
  const [showCart, setShowCart] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])

  // Delete item
  const deleteCartItem = (index) => {
    const updatedSelectedProducts = selectedProducts.filter((_,i) => i !== index);
    setSelectedProducts(updatedSelectedProducts)
  }

  // Local storage

  useEffect(function(){
    const a =  JSON.parse(localStorage.getItem("cartData"));
    if (a) {
      setSelectedProducts(a)
    }
  },[])

  useEffect(function(){
    localStorage.setItem("cartData", JSON.stringify(selectedProducts))
  },[selectedProducts])


  // Search and filter
  const filteredProducts = productsData.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchText.toLowerCase())
    const filterMatch = selectFilter.toLowerCase() === "all" || p.cat.toLowerCase() === selectFilter.toLowerCase()
    return matchSearch && filterMatch
  })


  return (
    <>
      <Navbar searchText={searchText} setSearchText={setSearchText} selectFilter={selectFilter} setSelectFilter={setSelectFilter} showCart={showCart} setShowCart={setShowCart} selectedProducts={selectedProducts} />
      <Sidebar searchText={searchText} setSearchText={setSearchText} selectFilter={selectFilter} setSelectFilter={setSelectFilter} showCart={showCart} setShowCart={setShowCart} selectedProducts={selectedProducts} />
      <Routes>
        <Route path='/' element={<Home selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
        <Route path='/products' element={<Products filteredProducts={filteredProducts} selectFilter={selectFilter} setSelectFilter={setSelectFilter} setSearchText={setSearchText} selectedProducts={selectedProducts} setSelectedProducts = {setSelectedProducts} />} />
        <Route path='/productdetail/:id' element={<ProductDetail productsData={productsData} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
        <Route path='/checkout' element={<Checkout selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
      </Routes>

      <Cart className="absolute top-0 left-0" showCart={showCart} setShowCart={setShowCart} selectedProducts={selectedProducts} deleteCartItem={deleteCartItem} />
    </>
  )
}

export default App
