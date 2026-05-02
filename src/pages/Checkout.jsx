import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Checkout = ({selectedProducts, setSelectedProducts}) => {

  const [formStep, setFormStep] = useState(1)

  const submitHandler = (e) => {
    e.preventDefault()
    setFormStep(formStep + 1)
  }

  

  // Form inputs data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [payment, setPayment] = useState("");
  const [instructions, setInstructions] = useState("");

  // Customer review data
  const [customerData, setCustomerData] = useState({})


  const orderSubmitHandler = (e) => {
    e.preventDefault()
    setFormStep(formStep + 1)
    setCustomerData(
      {
        city: city,
        province: province,
        payment: payment
      }
    )
  }
  console.log(customerData);


  return (
    <>
    <div className="flex flex-col lg:flex-row mt-16 h-[calc(100vh-3rem)] lg:py-12 px-4 py-3 md:px-4 md:py-4 lg:px-6 w-screen gap-6">
      <div className="form w-full  lg:w-[70%]  flex flex-col gap-8 px-1  lg:px-6 pt-4">

        <div className="checkOutTitle">
          <h1 className='font-bold text-[20px] md:text-[30px] lg:text-[40px]'>CHECKOUT</h1>
        </div>

        <div className="checkOutLevel flex items-center justify-between gap-3">
          <div className="step1 flex items-center gap-3">
            <span className={`flex items-center justify-center h-8 w-8 rounded-full text-[13px] font-bold ${formStep > 1 ? "bg-[#c9a96e] text-[#0c0c0c]" : "bg-[#e5e1da] text-[#0c0c0c]"}`}>1</span>
            <small className='text-[#6e6e6e] text-[12px] font-semibold'>DELIVERY</small>
          </div>
          <hr className={`flex-1 ${formStep > 1 ? "text-[#c9a96e]" : "text-[#111]"}`}/>
          <div className="step2 flex items-center gap-3">
          <span className={`flex items-center justify-center h-8 w-8 rounded-full text-[13px] font-bold   ${formStep > 2 ? "bg-[#c9a96e] text-[#0c0c0c]" : "bg-[#e5e1da] text-[#0c0c0c]"}`}>2</span>
          <small className='text-[#6e6e6e] text-[12px] font-semibold'>PAYMENT</small>
          </div>
          <hr className={`flex-1 ${formStep > 2 ? "text-[#c9a96e]" : "text-[#111]"}`}/>
          <div className="step3 flex items-center gap-3">
          <span className={`flex items-center justify-center h-8 w-8 rounded-full  text-[13px] font-bold ${formStep > 3 ? "bg-[#c9a96e] text-[#0c0c0c]" : "bg-[#e5e1da] text-[#0c0c0c]"}`}>3</span>
          <small className='text-[#6e6e6e] text-[12px] font-semibold'>REVIEW</small>
          </div>
        </div>

        {formStep === 1 && (
          <form onSubmit={submitHandler} className="stepOne flex flex-col gap-4">
          <div className="inputs flex flex-col gap-4">
              <div className="name flex flex-col md:flex-row item-center gap-4">
                <div className="firstName w-full md:w-[50%] flex flex-col gap-2">
                  <label className='text-[#6e6e6e] text-[11px] font-bold' htmlFor="">FIRST NAME</label>
                  <input 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='bg-[#ede9e2] text-[14px] border border-[#d1cec8] py-3 px-4 rounded-md' type="text" placeholder='Muhammad' required />
                </div>
                <div className="lastName w-full md:w-[50%] flex flex-col gap-2">
                <label className='text-[#6e6e6e] text-[11px] font-bold' htmlFor="">LAST NAME</label>
                <input 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='bg-[#ede9e2] text-[14px] border border-[#d1cec8] py-3 px-4 rounded-md' type="text" placeholder='Ali' required />
                </div>
              </div>
              <div className="email flex flex-col gap-2">
              <label className='text-[#6e6e6e] text-[11px] font-bold' htmlFor="">EMAIL ADDRESS</label>
              <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#ede9e2] text-[14px] border border-[#d1cec8] py-3 px-4 rounded-md' type="text" placeholder='you@gmail.com' required />
              </div>
              <div className="phoneNumber flex flex-col gap-2">
              <label className='text-[#6e6e6e] text-[11px] font-bold' htmlFor="">PHONE NUMBER</label>
              <input 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='bg-[#ede9e2] text-[14px] border border-[#d1cec8] py-3 px-4 rounded-md' type="text" placeholder='+92 300 0000000' required />
              </div>
              <div className="streetAdress flex  flex-col gap-2">
              <label className='text-[#6e6e6e] text-[11px] font-bold' htmlFor="">ADDRESS</label>
              <input 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='bg-[#ede9e2] text-[14px] border border-[#d1cec8] py-3 px-4 rounded-md' type="text" placeholder='House number, Street, Area' required />
              </div>
              <div className="cityProvince flex flex-col md:flex-row items-center gap-4">
              <div className="firstName w-full md:w-[50%] flex flex-col gap-2">
                  <label className='text-[#6e6e6e] text-[11px] font-bold' htmlFor="">City</label>
                  <input 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className='bg-[#ede9e2] text-[14px] border border-[#d1cec8] py-3 px-4 rounded-md' type="text" placeholder='Mardan' required />
                </div>
                <div className="lastName w-full md:w-[50%] flex flex-col gap-2">
                <label className='text-[#6e6e6e] text-[11px] font-bold' htmlFor="">Province</label>
                <input 
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className='bg-[#ede9e2] text-[14px] border border-[#d1cec8] py-3 px-4 rounded-md' type="text" placeholder='KPK' required/>
                </div>
              </div>
          </div>
  
          <div className="buttons flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="backBtn">
            <Link to={'/products'}><button type="button" className='text-[#6e6e6e] text-[12px] font-semibold cursor-pointer'>← BACK TO SHOP</button></Link>  
            </div>
            <div className="continueBtn">
              <button 
              className='bg-[#0c0c0c] py-3 px-12 rounded-md cursor-pointer text-[#f4f1ec] text-[12px] font-bold hover:bg-[#222222]' type='submit'>CONTINUE TO PAYMENT →</button>
            </div>
          </div>
          </form>
        )}

        {formStep === 2 && (
           <form onSubmit={orderSubmitHandler} className="stepTwo flex flex-col gap-6">
           <div className="inputs flex flex-col gap-4">
             <div className="payment flex flex-col gap-2">
               <label className='text-[#6e6e6e] text-[11px] font-bold' htmlFor="">PAYMENT METHOD</label>
               <select
               value={payment} 
               onChange={(e) => setPayment(e.target.value)}
               defaultValue="" className='bg-[#ede9e2] text-[14px] border border-[#d1cec8] py-4 px-4 rounded-md' name="" id="" required>
                 <option value="" disabled>Choose payment method</option>
                 <option value="Cash on Delivery">Cash on Delivery</option>
                 <option value="Easypaisa">Easypaisa</option>
                 <option value="JazzCash">JazzCash</option>
                 <option value="Bank Transfer">Bank Transfer</option>
               </select>
             </div>
             <div className="orderNote flex flex-col gap-2">
               <label className='text-[#6e6e6e] text-[11px] font-bold' htmlFor="">{`ORDER NOTES (OPTIONAL)`}</label>
               <input 
               value={instructions}
               onChange={(e) => setInstructions(e.target.value)}
               className='bg-[#ede9e2] text-[14px] border border-[#d1cec8] py-4 px-4 rounded-md' type="text" placeholder='Any special instruction...'  />
             </div>
           </div>
           <div className="buttons flex items-center justify-between">
           <div className="backBtn">
            <button 
            onClick={() => setFormStep(formStep -1)}
            className='text-[#6e6e6e] text-[12px] font-semibold cursor-pointer' type='button'>← BACK</button>  
             </div>
             <div 
             className="continueBtn">
               <button className='bg-[#0c0c0c] py-3 px-12 rounded-md cursor-pointer text-[#f4f1ec] text-[12px] font-bold hover:bg-[#222222]'type='submit'>REVIEW ORDER →</button>
             </div>
           </div>
         </form> 
        )}

        {formStep===3 && (
          <div className="stepThree flex flex-col gap-6">
          <div className="card bg-[#ede9e2] py-4 px-6 rounded-md flex flex-col gap-4">
            <div className="title">
              <p className='text-[#0c0c0c] text-[13px] font-bold'>ORDER REVIEW</p>
            </div>
            <div className="bulletPoints flex flex-col gap-2">
              <small className='text-[#6e6e6e] text-[14px] font-normal'>✓ Deliver to {customerData.city}, {customerData.province}</small>
              <small className='text-[#6e6e6e] text-[14px] font-normal'>✓ {customerData.payment}</small>
              <small className='text-[#6e6e6e] text-[14px] font-normal'>✓ Estimated delivery: 3-5 business days</small>
            </div>
          </div>
          <div className="buttons flex items-center justify-between">
           <div className="backBtn">
            <button 
            onClick={() => setFormStep(formStep -1)}
            className='text-[#6e6e6e] text-[12px] font-semibold cursor-pointer'>← BACK</button>  
             </div>
             <div className="continueBtn">
               <button 
               onClick={() => {
                setFormStep(formStep + 1)
                setSelectedProducts([])
               }}
               
               className='bg-[#0c0c0c] py-3 px-12 rounded-md cursor-pointer text-[#f4f1ec] text-[12px] font-bold hover:bg-[#222222]'>PLACE ORDER →</button>
             </div>
           </div>
        </div>
        )}

        {formStep === 4 && (
          <div className="h-full w-full flex items-center justify-center">
          <div className="stepFour flex flex-col items-center justify-center gap-4">
            <div className="logo">
              <h1 className='text-[64px] font-bold text-[#c9a96e]'>✓</h1>
            </div>
            <div className="orderPlaced">
              <h1 className='text-[36px] text-[#0c0c0c] font-extrabold'>ORDER PLACED</h1>
            </div>
            <div className="message flex flex-col items-center justify-center gap-2 text-[#6e6e6e] text-[15px]">
              <p>Thank you for your order. We'll confirm via WhatsApp shortly.</p>
              <p>Estimated delivery: 3-5 business days.</p>
            </div>
            <div className="button">
             <Link to={'/products'}><button className='bg-[#0c0c0c] text-[#f4f1ec] text-[12px] font-black py-4 px-12 rounded-md cursor-pointer hover:bg-[#c9a96e] hover:text-[#0c0c0c]'>CONTINUE SHOPPING</button></Link>
            </div>
          </div>
          </div>
        )}
        
      </div>
      <div className="orderSummary flex-1">
        <div className="card bg-[#ede9e2] py-6 px-8 flex flex-col gap-8">
          <div className="title">
            <h1 className='font-bold text-2xl text-[#0c0c0c]'>ORDER SUMMARY</h1>
          </div>

          <div className="purchasedProducts flex flex-col gap-2">
          {selectedProducts.map(function(elem,index){
            return (
            <div key={index} className="product flex items-center justify-between">
            <div className="productInfo flex items-center gap-2">
              <div className="image">
              <img className='h-15 w-15 object-cover rounded-md' src={elem.image} alt="" />
              </div>
              <div className="details flex flex-col gap-0">
              <p className='text-[#0c0c0c] text-[11px] font-bold'>{elem.name}</p>
              <small className='text-[#6e6e6e] text-[11px]'>Size: {elem.size}</small>
              <small className='text-[#6e6e6e] text-[11px]'>Qty: {elem.quantity}</small>
              </div>
            </div>
            <div className="productPrice">
              <h1 className='text-[11px] font-bold'>Rs. {((elem.price)*(elem.quantity)).toLocaleString()}</h1>
            </div>
          </div>
            )
          })}
          </div>
          <hr className='text-[#d1cec8]'/>
          <div className="charges flex flex-col gap-3 text-[13px] font-bold">
            <div className="subtotal flex items-center justify-between">
              <p>Subtotal</p>
              <p>Rs. {(selectedProducts.reduce((acc, item) => acc + (item.price) * (item.quantity),0)).toLocaleString()}</p>
            </div>
            <div className="delivery flex items-center justify-between">
              <p>Delivery</p>
              <p className='text-green-500 font-normal'>Free</p>
            </div>
          </div>
          <hr className='text-[#d1cec8]'/>
          <div className="totalAmount flex items-center justify-between text-md font-bold">
            <p>Total</p>
            <p>Rs. {(selectedProducts.reduce((acc, item) => acc + (item.price) * (item.quantity),0)).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Checkout
