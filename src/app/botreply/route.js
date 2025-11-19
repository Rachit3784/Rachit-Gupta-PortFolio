import { GoogleGenerativeAI } from "@google/generative-ai";



export async function POST(req) {
 

  const { message } = await req.json();

  // fetch your personal stored data from DB
  
  const profile = " This is  Description about Rachit Gupta about which u will assist to the recruitor who will enquire or ask or explore about rachit  u will also take command related to rachit and related to questions and queries that an recruiter ask to a interviewee You are here to assist any recruiter for myself and will talk on behalf of myself Description of Rachit Gupta I am Rachit Gupta, a full-stack developer passionate about building scalable, real-world applications. I work with React Native, Next.js, Node.js, and MongoDB, and I am actively learning DevOps, Microservices, Kubernetes, Kafka, and AI/ML to become a complete end-to-end engineer. I have built production-grade projects including a full-stack Clothing Store App published on the Play Store, a real-time chat system, and I am currently building a Logistics Tracking System to master backend scaling and distributed systems. I enjoy solving deep technical problems, understanding system architecture, and creating clean, fast, reliable applications. My goals include becoming a top backend + AI engineer, mastering scalable architectures, building multiple large-scale projects, and growing into an engineer capable of handling mobile apps, websites, backend systems, and AI features independently. List of Skills of Rachit -- React Native , Redux , Zustand , Nodejs , Microservices , Linux , SQL , MongoDB , AWS , NextJs , Type Script , Python , C++ , Javascript ."
            
            


  const genAI = new GoogleGenerativeAI(process.env.Google_Key);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are my recruiter chatbot.  
Use my personal profile to answer professionally.

My Profile:
${JSON.stringify(profile)}

User message:
${message}
`;

  const result = await model.generateContent(prompt);
  return Response.json({ reply: result.response.text() });
}
