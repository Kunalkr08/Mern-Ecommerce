import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCartProduct from '../components/HorizontalCartProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

export default function Home() {
  return (
    <div className=''>
       <CategoryList/>
       <BannerProduct/>
       <HorizontalCartProduct category={"airpodes"} heading={"Top's Airdopes"}/>
       <HorizontalCartProduct category={"earphones"} heading={"Top's EarPhone"}/>
       <VerticalCardProduct category={"mobiles"} heading={"Top's Mobiles"}/>
       <VerticalCardProduct category={"camera"} heading={"Top's Camera"}/> 
       <VerticalCardProduct category={"refrigerator"} heading={"Top's Refrigerator"}/>
    </div>
  )
}
