import "dotenv/config"
import readline from "readline/promises"
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "langchain";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const model = new ChatMistralAI({
  model: "mistral-small-latest",
})

const messages = []

while (true) {
  const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")  //User 

  messages.push(new HumanMessage(userInput))
  
  const response = await model.invoke(messages) //AI

  messages.push(response)

  console.log(`\x1b[34m[AI]\x1b[0m ${response.content}`)
}



rl.close()

// function askQuestion (question){
//   return new Promise((reslove)=>{
//     rl.question(question, (answer)=>{
//       reslove(answer)
//     })
//   })
// }

// async function main(){
//   const name = await askQuestion("Enter Your Question")
//   console.log(`Hello, ${name}!`)

//   rl.close();
// }
// main();