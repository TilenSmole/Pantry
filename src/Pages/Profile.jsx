
import React from 'react';
import { useState, useEffect } from 'react';
import Axios from "axios"


function Profile() {
  const [data, setData] = useState();
  const [username, setUsername] = useState();

  const [email, setEmail] = useState();
  const [date, setDate] = useState();
  const [profilePic, setProfilePic] = useState();



  const getUserData = async () => {
    try {
        const userFetch = await Axios.get('http://localhost:5000/account/',
          {withCredentials: true,}
        );
        setData(userFetch.data);
        setUsername(userFetch.data.username)
        setDate(userFetch.data.createdAt)
        setEmail(userFetch.data.email)



    } catch (error) {
        console.error('Error fetching user data', error);
    }
};


useEffect(() => {
    getUserData();
}, []);


  return (
    <div >{data && (
      <>
        <h1>WELCOME {username} </h1>
        <p>your email {email}</p>
        <p>your data of creatinon {date}</p>

        <p>this is your profile</p>
      </>
    )}
    
    </div>
  );
}

export default Profile;
