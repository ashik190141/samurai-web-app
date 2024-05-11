import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExchangeIdea = () => {
     let [citizen, setCitizen] = useState([]);
     useEffect(() => {
       fetch("http://localhost:5000/app/citizen/users")
         .then((res) => res.json())
         .then((data) => setCitizen(data.data));
     }, []);
     return (
       <div className="w-full md:w-10/12 mx-auto">
         {citizen?.map((user) => (
           <div className="my-4 mx-5 flex justify-between items-center" key={user?._id}>
             <div className="flex gap-5">
               <div className="avatar">
                 <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                   <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                 </div>
               </div>
               <div className="text-xl">{user?.name}</div>
             </div>
             <div>
               <Link to={`/dashboard/send-message/${user?.email}`}>
                <button className='btn btn-warning'>Message</button>
               </Link>
             </div>
           </div>
         ))}
       </div>
     );
};

export default ExchangeIdea;