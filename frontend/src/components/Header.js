import React, { useContext, useState } from 'react'
import { Logo } from './Logo'
import { BiSearch } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

export const Header = () => {
    const user = useSelector(state => state?.user?.user)

    const dispatch = useDispatch()
    const [menuDisplay,setMenuDisplay] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")
    const [search,setSearch] = useState(searchQuery)
    const handleLogout = async() => {
        const fetchData = await fetch(SummaryApi.logout_user.url,{
            method : SummaryApi.logout_user.method,
            credentials : 'include'
        })

        const data = await fetchData.json();

        if(data.success){
            toast.success(data.message);
            dispatch(setUserDetails(null))
            navigate("/")
        }

        if(data.error){
            toast.error(data.message);
        }
    }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    if(value){
        navigate(`/search?q=${value}`)
    }else{
        navigate("/search")
    }
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <Link to={"/"}>
                  <h1 className='font-bold text-lg'>Comfort Shopping</h1>
            </Link>
            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
               <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
               <div className='text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white '>
                   <BiSearch/>
               </div>
            </div>

            <div className='flex items-center gap-7'>
                <div className='relative flex justify-center'>
                    {
                        user && (
                            <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(prev => !prev)}>
                            { 
                              user?.profilePic ? (
                                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                               ) : (
                                  <FaRegCircleUser />
                               )
                            } 
                          </div>
                        )
                    }

                    {
                        menuDisplay && (
                          <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                            <nav>
                               {
                                user?.role === ROLE.ADMIN && (
                                    <Link to={"/admin-panel/all-product"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                                )
                               }
                        
                            </nav>
                           </div>
                        )
                    }
                </div>
                   {
                      user && (
                           <Link to={"/cart"} className='text-2xl relative cursor-pointer'>
                               <span><FaShoppingCart/></span>
                               <div className='bg-blue-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                   <p className='text-sm'>{context?.cartProductCount}</p>
                               </div>
                            </Link>
                      )
                   }

                 <div>
                    {
                        user ? (
                            <button onClick={handleLogout} className='px-2 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700 '>Logout</button>
                        )
                        : 
                        (
                            <Link to={"/login"} className='px-2 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700 '>Login</Link>
                        )
                    }
                 </div>
            </div>
        </div>
    </header>
  )
}
