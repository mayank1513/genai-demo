import type { ModelKey } from "@/constants/ai-models";
import { IMGBB_URL } from "@/constants/img";

export async function uploadImage(imgFile: File) {
  const body = new FormData();
  body.append("image", imgFile);
  const { data } = await fetch(
    `${IMGBB_URL}?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    {
      method: "POST",
      body,
    }
  ).then((res) => res.json());
  return data.url;
}

export async function processImage(model: ModelKey, input: Object) {
  const res = await fetch("/api/image", {
    method: "POST",
    body: JSON.stringify({ model, input }),
  });
  if (res.ok) {
    return (await res.json()).imgUrl;
  } else {
    throw new Error("Failed to process image");
  }
}
