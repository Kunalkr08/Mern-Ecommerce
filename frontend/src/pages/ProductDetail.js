import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common';
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency"
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
const ProductDetail = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : "" 
  })
  const params = useParams();
  const [loading,setLoading] = useState(true)
  const [activeImage,setActiveImage] = useState("")
  const navigate = useNavigate()
  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
      x : 0,
      y : 0
  })

  const [zoomImage,setZoomImage] = useState(false)
  const { fetchUserAddToCart } = useContext(Context)
  const fetchProductDetails = async()=>{
      setLoading(true)
      const response = await fetch(SummaryApi.productDetails.url,{
          method : SummaryApi.productDetails.method,
          headers : {
             "content-type" : "application/json"
          },
          body : JSON.stringify({
             productId : params?.id
          })
      })
      setLoading(false)

      const dataResponse = await response.json()

      setData(dataResponse?.data)
      setActiveImage(dataResponse?.data?.productImage[0])
  }
  const productImageListLoading = new Array(data?.productImage.length).fill(null)

  useEffect(()=>{
    fetchProductDetails()
  },[params])

const handleMouseEnterProduct = (imageURL)=>{
  setActiveImage(imageURL)
}

const handleZoomImage = useCallback((e) => {
     setZoomImage(true)
     const { left, top, width, height } = e.target.getBoundingClientRect() 
     console.log(left,top,width,height);

     const x = (e.clientX-left)/width
     const y = (e.clientY-top)/height

     setZoomImageCoordinate({
        x,
        y
     })
},[zoomImageCoordinate])

const handleLeaveImageZoom = ()=>{
  setZoomImage(false)
}

const handleAddToCart = async(e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
}


const handleBuyProduct = async(e,id) => {
      await addToCart(e,id)
      fetchUserAddToCart()
      navigate("/cart")
}


  return (
    <div className='container mx-auto p-4'>
        <div className='min-h-{200px] flex flex-col lg:flex-row gap-4'>
           {/* product Image */}
           <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
             
             <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
                
                {/* product zoom */}
                {
                   zoomImage && (
                    <div className='hidden lg:block absolute min-w-[400px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'> 
                        <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-110' style={{backgroundImage : `url(${activeImage})`, backgroundRepeat : 'no-repeat', backgroundPosition : `${zoomImageCoordinate.x*100}% ${zoomImageCoordinate.y*100}%`}}>
               
                        </div>
                    </div>
                   )
                }
             </div>
             
             <div className='h-full'>
                {
                  loading ? (

                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                      {
                         productImageListLoading.map((el,index) => {
                         return(
                            <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loading image"+index}>
                            </div>
                         )
                        })
                      }
                    </div>
                  ):(
                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                      {
                         data?.productImage?.map((imageURL,index) => {
                         return(
                            <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imageURL}>
                               <img src={imageURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'  onMouseEnter={()=>handleMouseEnterProduct(imageURL)} onClick={()=>handleMouseEnterProduct(imageURL)}/>
                            </div>
                         )
                        })
                      }
                      </div>
                  )
                }
             </div>
           </div>
           {/* product details*/}
           {
              loading ? (
                <div className='flex flex-col gap-1'>
                <p className='bg-slate-200 animate-pulse h-6 lg:h-8  w-60 rounded-full inline-block'></p>
                <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 w-60 bg-slate-200 animate-pulse'></h2>
                <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse ph-6 w-60 lg:h-8'></p>
                <div className='text-blue-600 bg-slate-200 h-6 lg:h-8 w-60 animate-pulse flex items-center gap-1'>

                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 w-60 animate-pulse'>
                   <p className='text-blue-600 bg-slate-200'></p>
                   <p className='text-slate-400 line-through bg-slate-200'></p>
                </div>

                <div className='flex item-center gap-3 my-2'>
                  <button className=' h-6 lg:h-8 bg-slate-200 animate-pulse  rounded px-3 py-1 min-w-[120px]'></button>
                  <button className='h-6 lg:h-8 animate-pulse border-2 rounded px-3 py-1 min-w-[120px] font-medium bg-slate-200'></button>
                </div>

                <div className=''>
                   <p className='h-6 lg:h-8 animate-pulse border-2 rounded px-3 py-1 min-w-[120px] font-medium bg-slate-200 my-2'></p>
                   <p className='gap-2 h-6 lg:h-8 animate-pulse border-2 rounded px-3 py-1 min-w-[120px] font-medium bg-slate-200'></p>
                </div>
                </div>
              ) : 
              (
                <div className='flex flex-col gap-1'>
                <p className='bg-blue-200 text-blue-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-400'>{data?.category}</p>
                <div className='text-blue-600 flex items-center gap-1'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaRegStarHalf/>
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                   <p className='text-blue-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                   <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price )}</p>
                </div>

                <div className='flex item-center gap-3 my-2'>
                  <button className='border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] text-blue-600 font-medium hover:bg-blue-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
                  <button className='border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium bg-blue-600 text-white hover:text-blue-600 hover:bg-white'  onClick={(e)=>handleAddToCart(e,data?._id)}>Add to Cart</button>
                </div>

                <div>
                   <p className='text-slate-600 font-medium my-1'>Description</p>
                   <p>{data?.description}</p>
                </div>
                </div>
              )
           }
        </div>

        {
           data.category && (
             <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
           )
        }

    </div>
  )
}

export default ProductDetail