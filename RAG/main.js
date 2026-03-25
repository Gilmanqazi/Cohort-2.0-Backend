import {PDFParse } from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs"
import {MistralAIEmbeddings} from "@langchain/mistralai"
import "dotenv/config"
import { Pinecone } from '@pinecone-database/pinecone'



const pc = new Pinecone({ apiKey:process.env.PINECONE_API_KEY});

const index = pc.index("cohort-2-rag")


// let dataBuffer = fs.readFileSync("./ONLINE BOOK STORE REPORT.BBMJ.pdf");

// const parser = new PDFParse({data: dataBuffer});

// const data = await parser.getText()

const embedding = new MistralAIEmbeddings({
  apiKey:process.env.MISTRAL_API_KEY,
  model:"mistral-embed"
})


// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize:2500, 
//   chunkOverlap:0,
// })

// const chunks =  await splitter.splitText(data.text)
// const docs = await Promise.all(chunks.map(async(chunk)=>{
//   const embeddingg = await embedding.embedQuery(chunk)

//   return{
//     text:chunk,
//     embeddingg
//   }
// }))

// const result = await index.upsert({
//   records: docs.map((doc, i )=>({
// id:`doc-${i}`,
// values:doc.embeddingg,
// metadata:{
//   text: doc.text
// }
//   }))
// })

const queryEmbedding = embedding.embedQuery("")

console.log(queryEmbedding);


const result = await index.query({
  vector:queryEmbedding,
  topK:2,
  includeMetadata:true
})

console.log(JSON.stringify(result))

