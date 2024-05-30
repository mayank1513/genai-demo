"use client";
import { FormEvent, useCallback, useState } from "react";
import styles from "./text-to-image.module.scss";
import { useLoader } from "react18-loaders/dist/hooks";

export default function TextToImage() {
  const [img, setImg] = useState("");
  const { setLoading } = useLoader();
  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const prompt = formData.get("prompt")?.toString();
      const res = await fetch("/api/image/text-to-img", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      if (res.ok) {
        const { imgUrl } = await res.json();
        setImg(imgUrl);
      }
      setLoading(false);
    },
    [setLoading]
  );

  return (
    <div className={styles.container}>
      <h1>Text to Image</h1>
      <form onSubmit={onSubmit}>
        <textarea name="prompt" required placeholder="describe your image..." />
        <button type="submit">Submit</button>
      </form>
      {img && <img src={img} alt="img" />}
    </div>
  );
}
