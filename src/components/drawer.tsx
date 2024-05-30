import { ReplicateAIModels } from "@/constants/ai-models";
import { toKebabCase } from "@/utils/case";
import Link from "next/link";
import styles from "./drawer.module.scss";

export default function Drawer() {
  return (
    <nav className={styles.drawer}>
      <ul>
        {Object.keys(ReplicateAIModels).map((key) => (
          <li key={key}>
            <Link href={`/${toKebabCase(key)}`}>{key}</Link>{" "}
          </li>
        ))}
      </ul>
    </nav>
  );
}
