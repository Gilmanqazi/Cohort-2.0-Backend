import axios from "axios"

const api = axios.create({
  baseURL:"http://localhost:3000/api/auth",
  withCredentials:true
})


export const register = async (username,email,password)=>{


  try{
    const res  = await api.post("/register",{
      username,email,password

     
    })
     
    return res.data
    
    
  }catch(err){
    console.log(err)
  }
}

export const login = async (username, password) => {

  try {
    // console.log("calling api...")
    // console.log(username,password)

    const res = await api.post("/login", {
      username,
      password
    });

    console.log("response", res.data)

    return res.data;
  } catch (err) {
    console.log("error", err.response?.data || err.message)
    throw err
  }
};

// export const login = async (username,password)=>{
//   try{
//     const res = await api.post("/login",{
//       username,password
//     })
//     return res.data
//   }catch(err){
//     console.log(err)
//     throw err
//   }
// }

export const getMe = async ()=>{
  const res = await api.get("/get-me")
  return res.data
}

