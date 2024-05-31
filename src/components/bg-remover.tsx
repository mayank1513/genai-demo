"use client";
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import styles from "./bg-remover.module.scss";
import { useLoader } from "react18-loaders/dist/hooks";
import { processImage, uploadImage } from "@/utils/api";

export default function BgRemover() {
  const [inputImg, setInputImg] = useState("");
  const [outputImg, setOutputImg] = useState("");
  const imgRef = useRef<HTMLInputElement>(null);
  const { setLoading } = useLoader();
  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (imgFile) setInputImg(URL.createObjectURL(imgFile));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const imgFile = imgRef.current?.files?.[0];
    if (!imgFile) return;
    const url = await uploadImage(imgFile);

    try {
      const outputImg = await processImage("BgRemover", { image: url });
      setOutputImg(outputImg);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Background Remover</h1>
      <div>
        {inputImg && <img src={inputImg} alt="input" />}
        {outputImg && <img src={outputImg} alt="input" />}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={imgRef}
          type="file"
          accept="image/*"
          required
          onChange={handleInput}
        />
        <button type="submit">Remove Background</button>
      </form>
    </div>
  );
}
