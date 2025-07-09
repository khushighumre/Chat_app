

// import React, { useState } from 'react';
// import assets, { userDummyData } from '../assets/assets';

// const LoginPage = () => {

//    const [currState, setCurrState] = useState("Sign up")
//    const [fullName, setFullName] = useState("")
//    const [email, setEmail] = useState("")
//    const [password, setPassword] = useState("")
//    const [bio, setBio] = useState("")
//    const [isDataSubmitted, setIsDataSubmitted] = useState(false);
//   return (
//     <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
//       {/* left */}
//       <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />
//       {/* right */}
//       <form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
//        <h2 className='font-medium text-2xl flex justify-between items-center'>
//         {currState}
//         <img src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
//        </h2>

//        {currState === "Sign up" && !isDataSubmitted (
//           <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
//            type="text" className='p-2 border-gray-500 rounded-md focus:outline-none' placeholder="Full Name" required/>
//        )}

//        {isDataSubmitted && (
//         <>
//         <input onChange={(e)=>setEmail(e.target.value)} value={email} 
//          type="email" placeholder='Email Address' required 
//          className='p-2 border border-gray-500 rounded-md 
//          focus:outline-none focus:ring-2 focus:ring-indigo-500' />

//          <input onChange={(e)=>setPassword(e.target.value)} value={password} 
//          type="password" placeholder='Password' required 
//          className='p-2 border border-gray-500 rounded-md 
//          focus:outline-none focus:ring-2 focus:ring-indigo-500' />

//         </>
//        )}

//        {
//         currState === "Sign up" && isDataSubmitted && (
//           <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
//           rows={4} className='p-2 border border-gray-500 rounded-md 
//          focus:outline-none focus:ring-2 focus:ring-indigo-500' 
//          placeholder='provide a short bio...' required></textarea>
//         )
//        }

//        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600
//        text-white rounded-md cursor-pointer '>
//         {currState === "Sign up" ? "Create Account" : "Login Now"}
//        </button>

//        <div>
//         <input type="checkbox" />
//         <p>Agree to the terms of use & privacy policy.</p>
//        </div>
        
//       </form>

//     </div>
//   )
// };

// export default LoginPage;









// import React, { useState } from 'react';
// import assets, { userDummyData } from '../assets/assets';

// const LoginPage = () => {
//   const [currState, setCurrState] = useState('Sign up');
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [bio, setBio] = useState('');
//   const [isDataSubmitted, setIsDataSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsDataSubmitted(true);
//     // You can send data to backend here
//     console.log({ fullName, email, password, bio });
//   };

//   return (
//     <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
//       {/* left */}
//       <img src={assets.logo_big} alt="logo" className='w-[min(30vw,250px)]' />

//       {/* right */}
//       <form
//         className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'
//         onSubmit={handleSubmit}
//       >
//         <h2 className='font-medium text-2xl flex justify-between items-center'>
//           {currState}
//           <img src={assets.arrow_icon} alt="toggle" className='w-5 cursor-pointer' 
//             onClick={() =>
//               setCurrState(currState === 'Sign up' ? 'Login' : 'Sign up')
//             }
//           />
//         </h2>

//         {/* Only show Full Name when signing up and not submitted yet */}
//         {currState === 'Sign up' && !isDataSubmitted && (
//           <input
//             onChange={(e) => setFullName(e.target.value)}
//             value={fullName}
//             type='text'
//             className='p-2 border-gray-500 rounded-md focus:outline-none'
//             placeholder='Full Name'
//             required
//           />
//         )}

//         {/* Email & Password always shown after data is submitted once */}
//         {(currState === 'Login' || isDataSubmitted) && (
//           <>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               type='email'
//               placeholder='Email Address'
//               required
//               className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
//             />
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               type='password'
//               placeholder='Password'
//               required
//               className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
//             />
//           </>
//         )}

//         {/* Show bio only for sign-up when data is submitted */}
//         {currState === 'Sign up' && isDataSubmitted && (
//           <textarea
//             onChange={(e) => setBio(e.target.value)}
//             value={bio}
//             rows={4}
//             className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
//             placeholder='Provide a short bio...'
//             required
//           ></textarea>
//         )}

//         <button
//           type='submit'
//           className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'
//         >
//           {currState === 'Sign up' ? 'Create Account' : 'Login Now'}
//         </button>

//         <div className='flex items-center gap-2 text-sm'>
//           <input type='checkbox' required />
//           <p>Agree to the terms of use & privacy policy.</p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState } from 'react';
import assets from '../assets/assets';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const [currState, setCurrState] = useState('Sign up');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const {login} = useContext(AuthContext)
  
  const onSubmitHandler = (event)=> {
    event.preventDefault();

    if(currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
  }

  login(currState=== "Sign up"? 'signup': 'login' , {fullName, email,password,bio})

}
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* Left - Logo */}
      <img src={assets.logo_big} alt='logo' className='w-[min(30vw,250px)]' />

      {/* Right - Form */}
      <form onSubmit={onSubmitHandler}
        className='border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg backdrop-blur-md'
        
      >
        {/* Heading + Toggle */}
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
         { isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
          
        </h2>

        {/* Full Name - Only for Sign up */}
        {currState === 'Sign up' && (
          <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
           type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder="Full Name" required/>
       )}

        {/* Email - Always */}
        <input onChange={(e)=>setEmail(e.target.value)} value={email} 
         type="email" placeholder='Email Address' required 
         className='p-2 border border-gray-500 rounded-md 
         focus:outline-none focus:ring-2 focus:ring-indigo-500' />
         

        {/* Password - Always */}
        <input onChange={(e)=>setPassword(e.target.value)} value={password} 
         type="password" placeholder='Password' required 
         className='p-2 border border-gray-500 rounded-md 
         focus:outline-none focus:ring-2 focus:ring-indigo-500' />

        {/* Bio - Only for Sign up */}
        {currState === 'Sign up' && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black'
            placeholder='Provide a short bio...'
            required
          ></textarea>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'
        >
          {currState === 'Sign up' ? 'Create Account' : 'Login Now'}
        </button>

        {/* Terms Checkbox */}
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type='checkbox' required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>
              Already have an account? <span onClick={()=> {setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Create an account <span onClick={()=> setCurrState("Sign up")} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
