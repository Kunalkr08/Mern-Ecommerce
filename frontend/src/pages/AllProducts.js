import React, { useEffect, useState } from 'react'
import { UploadProduct } from '../components/UploadProduct'
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

export const AllProducts = () => {
  const [openUpoladProduct, setOpenUpoladProduct] = useState(false);
  const [allProduct,setAllProduct] = useState([]);

  const fetchAllProduct = async() => {
       const response = await fetch(SummaryApi.allProduct.url)
       const dataResponse = await response.json()

       setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
      fetchAllProduct() 
  },[])
  return (
    <div>
       <div className='bg-white py-2 px-4 flex justify-between items-center'>
          <h2 className='font-bold text-lg'>AllProducts</h2>
          <button className='border-2 py-1 px-3 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all' onClick={()=>setOpenUpoladProduct(true)}>Upload Product</button>
       </div>


       {/**All product */}

       <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProduct.map((product,index)=>{
               return(
                  <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
               )
            })
          }
       </div>





       {/**upload product component*/}

       {
           openUpoladProduct && (
              <UploadProduct onClose={()=>setOpenUpoladProduct(false)} fetchData={fetchAllProduct}/> 
           )
       }
    </div>
  )
}
