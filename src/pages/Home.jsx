import React from 'react'
import { Link } from 'react-router-dom'
import homeData from '../data/homeData'
import productsData from '../data/productsData'
import { useState } from 'react'

const Home = ({ selectedProducts, setSelectedProducts }) => {

  const [hoverId, setHoverId] = useState("")

  return (
    <>
      <div className="div mt-16.5 h-auto min-h-screen w-screen flex flex-col gap-8">
        <div className="heroSection h-auto min-h-screen flex flex-col lg:flex-row">
          <div className="slogans h-full w-full lg:w-[50%] bg-[#111] flex flex-col gap-6 px-10 pb-10 lg:gap-12 lg:px-20 pt-[18%] lg:pb-38">
            <div className="newCollection w-full md:w-[50%] flex items-center justify-center gap-4 px-4 py-1 border-[0.5px] border-[#c9a96e]">
              <span className='inline-block h-2 w-2 bg-[#c9a96e] rounded-full'></span>
              <p className='text-[#c9a96e] text-[12px] tracking-wide  rounded-md'>New Collection — Summer 2025</p>
            </div>
            <div className="tagLine text-white">
              <h1 className='text-[#f4f1ec] font-bold text-4xl md:text-6xl lg:text-8xl tracking-tight'>WEAR <br /> YOUR <br /> <span className='text-[#c9a96e]'>STORY</span></h1>
            </div>
            <div className="info w-[60%]">
              <p className='text-[#525252] text-[12px] md:text-[15px]'>Premium casual wear crafted for the modern Pakistani man. Built for comfort, designed to make a statement.</p>
            </div>
            <div className="button">
              <Link to={'/products'}><button className='bg-[#f4f1ec] px-12 py-3 text-[#0c0c0c] text-[13px] font-bold cursor-pointer tracking-wide hover:bg-[#c9a96e]'>SHOP NOW</button></Link>
            </div>

            <div className="rating flex gap-12">
              <div>
                <p className="font-['Bebas_Neue'] text-[20px] md:text-[36px] text-[#f4f1ec]">200+</p>
                <p className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-widest">Styles</p>
              </div>
              <div>
                <p className="font-['Bebas_Neue'] text-[20px] md:text-[36px] text-[#f4f1ec]">12K+</p>
                <p className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-widest">Customers</p>
              </div>
              <div>
                <p className="font-['Bebas_Neue'] text-[20px] md:text-[36px] text-[#f4f1ec]">4.9★</p>
                <p className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-widest">Rating</p>
              </div>
            </div>
          </div>
          <div className="image h-[400px] lg:h-full w-full lg:w-[50%]">
            <img className='h-full w-full object-cover' src={homeData.hero.image} alt="" />
          </div>
        </div>

        <div className="categories px-6 py-10 md:px-10 md:py-15 lg:px-14 lg:py-24 flex flex-col gap-20">

          {/* Browse by Categories */}
          <div>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[#c9a96e] text-[11px] uppercase tracking-[3px] mb-2">Browse by</p>
                <h2 className="font-['Bebas_Neue'] text-[30px] lg:text-[56px] leading-none tracking-[2px] text-[#0c0c0c]">CATEGORIES</h2>
              </div>
              <Link to="/products" className="text-[#6e6e6e] text-[12px] font-semibold uppercase tracking-wide underline underline-offset-4 hover:text-[#0c0c0c]">View All →</Link>
            </div>

            {/* Mobile & Tablet: single column stack. Desktop: original bento grid */}
            <div className="hidden lg:grid gap-3" style={{ gridTemplateColumns: '1.8fr 1fr 1fr', height: '520px' }}>
              <Link to="/products" className="relative overflow-hidden cursor-pointer group">
                <img src={homeData.categories[0].image} className="w-full h-full object-cover grayscale-[25%] brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" alt="T-Shirts" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent flex flex-col justify-end p-7">
                  <p className="font-['Bebas_Neue'] text-[30px] tracking-[2px] text-[#f4f1ec]">{homeData.categories[0].name.toUpperCase()}</p>
                  <p className="text-[11px] text-[rgba(255,255,255,0.55)] tracking-wide">{homeData.categories[0].count} Products</p>
                </div>
              </Link>

              <div className="flex flex-col gap-3">
                {[homeData.categories[1], homeData.categories[2]].map((cat, i) => (
                  <Link to="/products" key={i} className="relative overflow-hidden cursor-pointer group flex-1">
                    <img src={cat.image} className="w-full h-full object-cover grayscale-[25%] brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" alt={cat.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent flex flex-col justify-end p-7">
                      <p className="font-['Bebas_Neue'] text-[30px] tracking-[2px] text-[#f4f1ec]">{cat.name.toUpperCase()}</p>
                      <p className="text-[11px] text-[rgba(255,255,255,0.55)] tracking-wide">{cat.count} Products</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {[homeData.categories[3], homeData.categories[4]].map((cat, i) => (
                  <Link to="/products" key={i} className="relative overflow-hidden cursor-pointer group flex-1">
                    <img src={cat.image} className="w-full h-full object-cover grayscale-[25%] brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" alt={cat.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent flex flex-col justify-end p-7">
                      <p className="font-['Bebas_Neue'] text-[30px] tracking-[2px] text-[#f4f1ec]">{cat.name.toUpperCase()}</p>
                      <p className="text-[11px] text-[rgba(255,255,255,0.55)] tracking-wide">{cat.count} Products</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile & Tablet grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
              {homeData.categories.map((cat, i) => (
                <Link to="/products" key={i} className="relative overflow-hidden cursor-pointer group" style={{ height: '220px' }}>
                  <img src={cat.image} className="w-full h-full object-cover grayscale-[25%] brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" alt={cat.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent flex flex-col justify-end p-5">
                    <p className="font-['Bebas_Neue'] text-[26px] tracking-[2px] text-[#f4f1ec]">{cat.name.toUpperCase()}</p>
                    <p className="text-[11px] text-[rgba(255,255,255,0.55)] tracking-wide">{cat.count} Products</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="bg-[#ede9e2] px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-24 -mx-6 md:-mx-10 lg:-mx-14">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[#c9a96e] text-[11px] uppercase tracking-[3px] mb-2">Hand picked</p>
                <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[48px] lg:text-[56px] leading-none tracking-[2px] text-[#0c0c0c]">NEW ARRIVALS</h2>
              </div>
              <Link to="/products" className="text-[#6e6e6e] text-[12px] font-semibold uppercase tracking-wide underline underline-offset-4 hover:text-[#0c0c0c]">View All →</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {productsData.slice(0, 4).map((elem) => (
                <div key={elem.id}
                  onMouseEnter={() => setHoverId(elem.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className="cursor-pointer flex flex-col gap-3 pb-6">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: '#e5e1da' }}>
                    <img src={elem.image} className="w-full h-full object-cover" alt={elem.name} />
                    {elem.badge && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1 ${elem.badge === 'Sale' ? 'bg-[#c9a96e] text-[#0c0c0c]' : 'bg-[#0c0c0c] text-[#f4f1ec]'}`}>
                        {elem.badge}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setSelectedProducts([...selectedProducts, {
                          id: elem.id,
                          name: elem.name,
                          image: elem.image,
                          size: "",
                          quantity: 1,
                          price: elem.price,
                        }])
                      }}
                      className={`absolute bottom-0 w-full py-3 bg-[#0c0c0c] text-[#f4f1ec] text-[11px] font-bold tracking-[2px] uppercase transition-all duration-300 cursor-pointer ${hoverId === elem.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                      QUICK ADD
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {elem.sizes.slice(0, 4).map((s, i) => (
                      <span key={i} className="flex items-center justify-center w-6 h-6 border border-[#e5e1da] text-[#6e6e6e] text-[10px]">{s}</span>
                    ))}
                  </div>
                  <p className="text-[#6e6e6e] text-[11px] uppercase tracking-[1px]">{elem.cat}</p>
                  <p className="text-[#0c0c0c] text-[15px] font-medium">{elem.name}</p>
                  <p className="text-[#0c0c0c] text-[15px] font-bold">
                    Rs. {elem.price.toLocaleString()}
                    {elem.sale && <s className="text-[#6e6e6e] text-[13px] font-normal ml-2">Rs. {elem.sale.toLocaleString()}</s>}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
        <footer className="bg-[#0c0c0c] text-[#f4f1ec] px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-14">
            <div className="col-span-2 lg:col-span-1">
              <h2 className="font-['Bebas_Neue'] text-[40px] tracking-[5px] mb-4">THREADS</h2>
              <p className="text-[13px] text-[rgba(255,255,255,0.35)] leading-[1.8] max-w-[240px]">Premium casual wear for the modern Pakistani man. Quality you can feel, style you can own.</p>
            </div>
            <div>
              <h5 className="text-[#c9a96e] text-[10px] uppercase tracking-[3px] mb-5">Shop</h5>
              <Link to="/products" className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 hover:text-[#f4f1ec]">New Arrivals</Link>
              <Link to="/products" className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 hover:text-[#f4f1ec]">T-Shirts</Link>
              <Link to="/products" className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 hover:text-[#f4f1ec]">Hoodies</Link>
              <Link to="/products" className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 hover:text-[#f4f1ec]">Pants</Link>
            </div>
            <div>
              <h5 className="text-[#c9a96e] text-[10px] uppercase tracking-[3px] mb-5">Help</h5>
              <a className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 cursor-pointer hover:text-[#f4f1ec]">Track Order</a>
              <a className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 cursor-pointer hover:text-[#f4f1ec]">Returns Policy</a>
              <a className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 cursor-pointer hover:text-[#f4f1ec]">Size Guide</a>
              <a className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 cursor-pointer hover:text-[#f4f1ec]">Contact Us</a>
            </div>
            <div>
              <h5 className="text-[#c9a96e] text-[10px] uppercase tracking-[3px] mb-5">Follow</h5>
              <a className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 cursor-pointer hover:text-[#f4f1ec]">Instagram</a>
              <a className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 cursor-pointer hover:text-[#f4f1ec]">Facebook</a>
              <a className="block text-[13px] text-[rgba(255,255,255,0.4)] mb-3 cursor-pointer hover:text-[#f4f1ec]">TikTok</a>
            </div>
          </div>
          <div className="border-t border-[#1c1c1c] pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-[rgba(255,255,255,0.25)]">© 2025 THREADS. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="text-[rgba(255,255,255,0.3)] text-[16px] cursor-pointer hover:text-[#c9a96e]"><i className="fab fa-instagram"></i></a>
              <a className="text-[rgba(255,255,255,0.3)] text-[16px] cursor-pointer hover:text-[#c9a96e]"><i className="fab fa-facebook"></i></a>
              <a className="text-[rgba(255,255,255,0.3)] text-[16px] cursor-pointer hover:text-[#c9a96e]"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home