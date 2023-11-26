import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import "./profile.css"
import { auth } from '../../Firebase';
import { reauthenticateWithCredential, updatePassword, updateProfile,  } from 'firebase/auth';
import { useUserAuth } from '../../context/UserAuthContext';
import { EmailAuthProvider } from 'firebase/auth';



const Profile = () => {
  const { user, upload } = useUserAuth();
   const [photoURL, setPhotoURL] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrrxsxZSpsfebkw8VLXe6R5j7mryT6PK7Pg&usqp=CAU");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(user.displayName || ""); // Initialize with user's name if available
  const [email, setEmail] = useState(user.email || ""); // Initialize with user's email if available
  const [password, setPassword] = useState(user.password ||""); // You can add a password field here for updating the password


const [previousPassword, setPreviousPassword] = useState("")


  const handleUpdateProfile = async () => {
    try {
      // Update the user's profile
      await updateProfile(auth.currentUser, {
        displayName: name,
       phoneNumber: phoneNumber
        
       
      });



      // You can also update other profile fields here
      // For example, if you want to update phone number and age
      // await updateProfile(auth.currentUser, {
      //   displayName: name,
      //   phoneNumber: phoneNumber,
      //   age: age,
      // });

      // Display a success message
      alert("Profile updated successfully!");
    } catch (error) {
      // Handle any errors here
      alert("An error occurred while updating the profile: " + error.message);
    }


  };


  // Function to update password

const handleUpdatePassword = async()=>{
  try {
    // Ensure that the user is authenticated
    if (user) {
      // Check if the previous password is correct
      const credential = EmailAuthProvider.credential(user.email, previousPassword);

      try {
        await reauthenticateWithCredential(user, credential);
      } catch (reauthError) {
        alert("Error" + reauthError.message);
        return;
      }

      // If the previous password is correct, update the profile and password
      
      if (password) {
        await updatePassword(auth.currentUser, password);
      }

      // Display a success message
      alert("Profile and password updated successfully!");
    } else {
      // Handle the case where the user is not authenticated
      alert("User is not authenticated. Please log in.");
    }
  } catch (error) {
    // Handle any errors here
    alert("An error occurred while updating the profile: " + error.message);
  }
  
}


  //onChance function on input
  const hanldeChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }

  }
  //onClick function on button
  const handleClick = () => {
    upload(photo, user, setLoading)
  
  }


  useEffect(() => {

    if (user?.photoURL) {
      setPhotoURL(user.photoURL)
    }
  }, [user])


 


  return (
    <>
      <Navbar />
      <div className='profile-container'>
        <div className="main-profile-container">
<div className="main-profile-container-2">



          <div className="left-profile">
              {
                user ? (
                  <img className='proifle-img' src={photoURL} alt="user" />
                ) :
                (
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrrxsxZSpsfebkw8VLXe6R5j7mryT6PK7Pg&usqp=CAU" alt="" />
                )
              }
           
           <div className="in-btn">
           <input type="file" onChange={hanldeChange} />
            <button  disabled= {loading || !photo} className='btn-4' onClick={handleClick}> Upload</button>
           </div>
            

           
          </div>
          <div className="right-profile">
         
          {/* Form 1 */}
      <form className='profile-form'>
      <h1 className='pf-h1'> Update User Profile</h1>
      <div className="main-profile-form">

     
        <label className='label'>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      <br />
        <label className='label'>
          Email:
          <input type="text" value={email}  />
        </label>
        <br />
        
        <br />
       
      
        <button id='btn-border' className='btn-3' type="button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
        </div>
      </form>

 {/* Form 2 */}
 <form className='password-form'>
       
       <div className="main-formpass">
       <h1 className='pf-h1'> Update User Password</h1>
       <label className='label'>
         Old Password:
        
       
        <input type="password"  value={previousPassword} onChange={(e) => setPreviousPassword(e.target.value)}/>
        </label>

        <label className='label'>
           New Password:
          
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button id='up-pass-btn' className='btn-3' type="button" onClick={handleUpdatePassword}>
          Update Password
        </button>
       </div>
      
       
      </form>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
