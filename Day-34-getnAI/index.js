import "dotenv/config"
import readline from "readline/promises"

import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";

import { tool } from "@langchain/core/tools";
import { createAgent } from "langchain";

import * as z from "zod";

import { sendMail } from "./mail.service.js";

import { tavily } from "@tavily/core";


const emailTool = tool(
  sendMail,
  {
    name: "EmailTool",
    description: "Use this tool to send email",
    schema: z.object({
      to: z.string().describe("Recipient email address"),
      html: z.string().describe("HTML content of email"),
      subject: z.string().describe("Email subject")
    })
  }
)

const tvly = tavily({apiKey:"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"})

const tavilyTool = tool(
  async ({query})=>{
    const res=  await tvly.search(query)
    return JSON.stringify(res)
  },
  {
   name:"TavilySearch",
    description:"Search the internet for current or real time information",
    schema:z.object({
      query:z.string().describe("Search query for internet")
    })
  }
)


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const model = new ChatMistralAI({
  model: "mistral-small-latest",
})


const agent = createAgent({
  model,
  tools: [emailTool, tavilyTool],
  systemPrompt:
    "If the user asks about current events, news, latest information, or anything requiring internet search, use TavilySearch."
})


const messages = []


while (true) {

  const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")

  messages.push(new HumanMessage(userInput))

  const response = await agent.invoke({ messages })

  messages.push(...response.messages)

  console.log(
    `\x1b[34m[AI]\x1b[0m ${
      response.messages[response.messages.length - 1].content
    }`
  )

}