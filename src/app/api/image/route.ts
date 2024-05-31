import { ModelKey, ReplicateAIModels } from "@/constants/ai-models";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || "",
});

export async function POST(req: Request) {
  const { model, input } = await req.json();
  const response = await replicate.predictions.create({
    version: ReplicateAIModels[model as ModelKey],
    input,
  });
  const predictions = await replicate.wait(response);
  const imgUrl =
    typeof predictions.output === "string"
      ? predictions.output
      : predictions.output?.[0];
  return Response.json({ imgUrl });
}
