import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue,ReducedValue, StateGraph, START, END, type GraphNode  } from "@langchain/langgraph";
import {createAgent,providerStrategy} from "langchain"
import {z} from "zod"
import { mistralModel,cohereModel ,geminiModel} from "./models.service.js";

const State = new StateSchema({ //State Me messages:MessageValue hoti hi hai chahe kuch bhi hojaye
  messages:MessagesValue,
  solution_1: new ReducedValue(z.string().default(""),{
    reducer:(current,next)=>{
      return next
    }
  }),

solution_2: new ReducedValue(z.string().default(""),{
  reducer:(current,next)=>{
    return next
  }
}),
judge_recommendation: new ReducedValue(z.object().default({
  solution_1_score:0,
  solution_2_score:0
  
}),
{
  reducer:(current,next)=>{
    return next
  }
}
)

})

const solutionNode:GraphNode<typeof State> = async (state:typeof State)=>{

    console.log(state)

const [mistral_solution,cohere_solution] = await Promise.all([

  mistralModel.invoke(state.messages[0].text),
  cohereModel.invoke(state.messages[0].text)
  ])


  return{
    solution_1:mistral_solution.text,
    solution_2:cohere_solution.text
  }
}

const judgeNode: GraphNode<typeof State> = async (state:typeof State)=>{

  const {solution_1,solution_2} = state;

console.log(solution_1,solution_2,"SOLLLL")
  console.log("Invoking judge with state")

  const judge = createAgent({
    model:geminiModel,
    tools:[],
    responseFormat:providerStrategy(z.object({
      solution_1_score: z.number().min(0).max(10),
      solution_2_score: z.number().min(0).max(10),
    }))
  })

  const judgeResponse = await judge.invoke({
    messages: [
      new HumanMessage(`You are a judge tasked with evaluating the quality of two solutions to a problem. 
    
    Problem: ${state.messages[0].text}
    
    Solution 1: ${solution_1}
    
    Solution 2: ${solution_2}
    
    Please provide a score between 0 and 10 for each solution. A score of 10 means the solution is perfect and fully addresses the problem. Provide a brief justification for each score.`)
    ]
  })

  const result  = judgeResponse.structuredResponse

  return{
    judge_recommendation:result
  }
  
}

const graph =  new StateGraph(State)
.addNode("solution",solutionNode)
.addNode("judge",judgeNode)
.addEdge(START,"solution") //user aapka messages jo hai vo START ko message denga or STARt aapke "solution" node ko message denga
.addEdge("solution","judge")
.addEdge("judge",END)
.compile()

export default async function (userMessage:string){

const result = await graph.invoke({
  messages:[
    new HumanMessage(userMessage)
  ]
})
console.log(result)
return result.messages
}



