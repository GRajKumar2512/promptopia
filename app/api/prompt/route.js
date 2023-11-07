import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator"); // populate the creator to know who created it

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Cannot process your request", { status: 500 });
  }
};
