import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// lambda function or serverless api call
export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    // in this route we will make a connection to database each time, and after doing its job the connection will die
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });

    await newPrompt.save();

    // nextjs way to send response
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
