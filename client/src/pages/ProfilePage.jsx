// import React, { useState, useContext } from 'react';
// import assets from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';


// const ProfilePage = () => {

//   const {authUser, updateProfile} = useContext(AuthContext)

//   const [selectedImg , setSelectedImg] = React.useState(null);
//   const navigate = useNavigate();
//   const [name, setName] = useState("Maartin Johnson")
//   const [bio, setBio] = useState("Hi everyone, I am using QuickChat")

//   const handleSubmit = async (e)=>{
//     e.preventDefault();
//     if(!selectedImg){
//       await updateProfile({fullName: name, bio});
//       navigate('/');
//       return;
//     }
//     const reader = new FileReader();
//     reader.readAsDataURL(selectedImg);
//     reader.onload = async () =>{
//       const base64Image = reader.result;
//       await updateProfile({profilePic: base64Image, fullName: name, bio});
//       navigate('/');
//     }
//   }


//   return (
//     <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
//       <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600
//        flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
//         <form className='flex flex-col gap-5 p-10 flex-1' >
//           <h3 className='text-lg '>Profile details</h3>
//           <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
//             <input onChange={(e)=>setSelectedImg(e.target.files[0])} type='file' id='avatar' accept='.png, .jpg, .jpeg' hidden  />
//             <img src={selectedImg? URL.createObjectURL(selectedImg) : assets.avatar_icon } alt="" className= {`w-12 h-12 ${selectedImg && 'rounded-full'}`}/>
//             upload profile image
//           </label>

//           <input onChange={(e)=> setName(e.target.value)} value={name}
//           type="text" required placeholder='Your name' className='p-2 border
//            border-gray-500 rounded-b-md focus:outline-none focus:ring-2
//             focus:ring-violet-500'/>

//             <textarea onChange={(e)=> setBio(e.target.value)} value={bio}
//              placeholder='Write profile bio' className='p-2 border
//            border-gray-500 rounded-b-md focus:outline-none focus:ring-2
//             focus:ring-violet-500' rows={4}></textarea>

//             <button type='submit' className='bg-gradient-to-r from-purple-400
//             to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>
//               Save
//             </button>

//         </form>

//         <img className='max-w-44 aspect aspect-square rounded-full mx-10 max-sm:mt-10'
//          src={assets.logo_icon} alt=""/>
//       </div>

//     </div>
//   )
  
// };

// export default ProfilePage;


// import React, { useState, useContext } from 'react';
// import assets from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';

// const ProfilePage = () => {
//   const { authUser, updateProfile } = useContext(AuthContext);

//   const [selectedImg, setSelectedImg] = useState(null);
//   const navigate = useNavigate();
//   const [name, setName] = useState(authUser.fullName );
//   const [bio, setBio] = useState(authUser.bio );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedImg) {
//       await updateProfile({ fullName: name, bio });
//       navigate('/');
//       return;
//     }
//     const reader = new FileReader();
//     reader.readAsDataURL(selectedImg);
//     reader.onload = async () => {
//       const base64Image = reader.result;
//       await updateProfile({ profilePic: base64Image, fullName: name, bio });
//       navigate('/');
//     };
//   };

//   return (
//     <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
//       <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
//         <form className='flex flex-col gap-5 p-10 flex-1' onSubmit={handleSubmit}>
//           <h3 className='text-lg'>Profile details</h3>
//           <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
//             <input
//               onChange={(e) => setSelectedImg(e.target.files[0])}
//               type='file'
//               id='avatar'
//               accept='.png, .jpg, .jpeg'
//               hidden
//             />
//             <img
//               src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon}
//               alt=""
//               className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}
//             />
//             upload profile image
//           </label>

//           <input
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             type="text"
//             required
//             placeholder='Your name'
//             className='p-2 border border-gray-500 rounded-b-md focus:outline-none focus:ring-2 focus:ring-violet-500'
//           />

//           <textarea
//             onChange={(e) => setBio(e.target.value)}
//             value={bio}
//             placeholder='Write profile bio'
//             className='p-2 border border-gray-500 rounded-b-md focus:outline-none focus:ring-2 focus:ring-violet-500'
//             rows={4}
//           ></textarea>

//           <button
//             type='submit'
//             className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'
//           >
//             Save
//           </button>
//         </form>

//         <img
//           className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`}
//           src={assets.logo_icon}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;



import React, { useState, useContext } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser?.fullName || '');
  const [bio, setBio] = useState(authUser?.bio || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
// 
     console.log("📍 handleSubmit triggered with values:", {
    name,
    bio,
    selectedImg,
  });
  // 

    try {
      if (!selectedImg) {
        await updateProfile({ fullName: name, bio });
        toast.success('Profile updated');
        navigate('/');
        return;
      }

      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64Image = reader.result;
          await updateProfile({ profilePic: base64Image, fullName: name, bio });
          toast.success('Profile updated');
          navigate('/');
        } catch (error) {
          toast.error("Failed to update profile with image");
          console.error(error);
        }
      };

      reader.onerror = () => {
        toast.error("Error reading image file");
      };

      reader.readAsDataURL(selectedImg);
    } catch (err) {
      toast.error("Unexpected error occurred");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form className="flex flex-col gap-5 p-10 flex-1" onSubmit={handleSubmit}>
          <h3 className="text-lg">Profile details</h3>

          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser?.profilePic || assets.avatar_icon
              }
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            Upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows={4}
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>

        <img
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
          src={ authUser?.profilePic || assets.logo_icon}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
