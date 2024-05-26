import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

export const AllUsers = () => {
    const [allUser, setAllUser] = useState([]);
    
    const [openupdateRole,setOpenupdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id : ""
    })
    const fetchAllUsers = async() =>{
        const fetchdata = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include',
        })

        const dataResponse  = await fetchdata.json()

        if(dataResponse.success){
            setAllUser(dataResponse.data);
        }

        if(dataResponse.error){
            toast.error(dataResponse.message);
        }


    }
    useEffect(()=>{
        fetchAllUsers()
    },[])
  return (
    <div className='bg-white pb-4'>
        <table className='w-full userTable'>
             <thead>
                <tr className='bg-black text-white'>
                   <th>Sr.</th>
                   <th>Name</th>
                   <th>Email</th>
                   <th>Role</th>
                   <th>Created Date</th>
                   <th>Action</th>
                 </tr>
              </thead>
                 <tbody>
                     {
                         allUser.map((el,index)=>{
                             return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{el?.role}</td>
                                    <td>{moment(el?.createdAt).format('ll')}</td>
                                    <td>
                                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                           onClick={()=>{
                                             setUpdateUserDetails(el)
                                             setOpenupdateRole(true)
                                           }}
                                        >
                                            <MdModeEdit/>
                                        </button>
                                    </td>
                                </tr>
                             )
                         }) 
                     }
                 </tbody>
        </table>

        {
            openupdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenupdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )      
        }
    </div>
  )
}
