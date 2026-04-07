import { useContext } from "react";
import { useeGraph ,chatHistory,chatDelete} from "../services/ai.api";
import { AIContext } from "../ai.context";


export const useAI = () =>{

  const context = useContext(AIContext)


  const {problem,setProblem,loading,setLoading,history, setHistory} = context


  const handleGraph = async (problem)=>{
    setLoading(true)
    try {
      const res = await useeGraph(problem)
      setProblem(res.ai)

      const newChat = {
        id: Date.now(),
        title:problem,
        data:res.ai
      }
      setHistory(prev => [...prev , newChat])

      return res.ai
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const loadChat = (id) => {
    // 1. History array mein se wo chat dhoondo
    const selectedChat = history.find((item) => item._id === id);
    if (selectedChat) {
      // 2. Jo data (AI response) us chat mein tha, usse active problem bana do
      setProblem(selectedChat); // Make sure 'ai' wahi field hai jisme response hai
    }
  };


  const fetchAndSetHistory = async () => {
    try {
      const response = await chatHistory();
      if (response.success) {
        setHistory(response.data);
      }
    } catch (err) {
      console.log("History load nahi ho payi",err);
    }
  };

  const removeChatFromHistroy = async (chatId) => {
try {
  const res = await chatDelete(chatId)

  if(res.success){
    setHistory((prev) => prev.filter((chat)=> chat._id !== chatId))
  }
  if(problem._id === chatId){
    setProblem("")
  }

} catch (error) {
  console.error("Delete failed:", error);
}
  }

  return{
    handleGraph,problem,loading,history,fetchAndSetHistory,removeChatFromHistroy,loadChat,setProblem
  }

}
