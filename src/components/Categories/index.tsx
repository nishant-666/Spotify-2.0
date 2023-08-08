import { browseCategories } from "@/API/APIs";
import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import { useRouter } from "next/router";

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    let response = await browseCategories();
    setCategories(response?.categories?.items);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className={styles.grid}>
      {categories.map((category: { name: ""; icons: [{ url: "" }] }) => (
        <div className={styles.gridInner} onClick={() => router.push("/")}>
          <img className={styles.icons} src={category.icons[0].url} />
          <p className={styles.title}>{category.name}</p>
        </div>
      ))}
    </div>
  );
}
