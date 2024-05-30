"use client";
import { FormEvent, useCallback, useState } from "react";
import styles from "./text-to-image.module.scss";

export default function TextToImage() {
  const [img, setImg] = useState("");
  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  }, []);
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
