"use client";
import { FormEvent, useCallback, useState } from "react";
import styles from "./text-to-image.module.scss";
import { useLoader } from "react18-loaders/dist/hooks";
import { processImage } from "@/utils/api";

export default function TextToImage() {
  const [img, setImg] = useState("");
  const { setLoading } = useLoader();
  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const prompt = formData.get("prompt")?.toString();

      try {
        const img = await processImage("TextToImage", { prompt });
        setImg(img);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    },
    [setLoading]
  );

  return (
    <div className={styles.container}>
      <h1>Text to Image</h1>
      {img && <img src={img} alt="img" />}
      <form onSubmit={onSubmit}>
        <textarea name="prompt" required placeholder="describe your image..." />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
