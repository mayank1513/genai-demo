import { ReplicateAIModels } from "@/constants/ai-models";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || "",
});

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const response = await replicate.predictions.create({
    version: ReplicateAIModels.TextToImage,
    input: { prompt },
  });
  const predictions = await replicate.wait(response);
  const imgUrl = await predictions.output?.[0];
  return Response.json({ imgUrl });
}
