import React from "react";

import styles from './LoadingIndicator.module.scss';

export function LoadingIndicator({ title }: { title: string }) {
  return (
        <div className={styles.loading}>{title}</div>
  );
}