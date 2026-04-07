import axios from "axios"

const api = axios.create({
  baseURL:"http://localhost:3000",
  withCredentials:true
})

export const useeGraph = async (problem) =>{

try {
  const res = await api.post("/api/ai/useGraph",{
    problem
  })

  return res.data
} catch (error) {
  console.log(error)
}

}

export const chatHistory = async () => {
  try {
    // GET request mein data 'params' ke andar bheja jata hai
    const res = await api.get("/api/ai/my-history"); 

    return res.data; // Ye wahi success:true aur data:history return karega
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error; 
  }
};

export const chatDelete = async (chatId) =>{
try {
  const res = await api.delete(`/api/ai/my-history/${chatId}`)
return res.data
} catch (error) {
  console.log("Delete Error:", error);
}
}