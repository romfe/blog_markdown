import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
interface CategoryLabelProps {
  children: string;
}

const CategoryLabel = ({ children }: CategoryLabelProps) => {
  const colorKey = {
    JavaScript: "yellow",
    CSS: "blue",
    Python: "green",
    PHP: "purple",
    Ruby: "red",
  };
  const color = colorKey[children as keyof typeof colorKey];
  return (
    <div
      //className={`px-2 py-1 bg-${color}-600 text-gray-100 text-bold rounded`}
      className={styles[color]}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
};

export default CategoryLabel;
