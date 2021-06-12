import React from "react";

type Props = { title: string };

import styles from "./LoadingIndicator.module.css";


export function LoadingIndicator({ title }: Props) {
  return (
        <h1 className={styles.bg}>{title}</h1>
  );
}