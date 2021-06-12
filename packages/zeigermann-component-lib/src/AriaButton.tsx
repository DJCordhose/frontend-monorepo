import React from "react";

import styles from "./AriaButton.module.css";

type Props = {
  /**
   * Technical property for identification in test.
   */
  testid?: string;
  /**
   * What to display as the text of the button.
   */
  text: string;
  /**
   * Label is not displayed, but should contain aria information.
   */
  label: string;
  /**
   * Click handler
   */
  onClick: () => void;
  /**
   * Optional indicator whether something triggered by the button is still running
   */
  inProgress?: boolean;
  /**
   * Layout option for wide display
   */
  flat?: boolean;
};

/**
 * Accessible and testable button
 */
export function AriaButton({
  testid,
  label,
  text,
  onClick,
  inProgress = false,
  flat = false,
}: Props) {
  return (
    <button
      data-testid={testid}
      className={`
      ${styles.button}
      bg-gray-100 border-2 border-gray-900
      hover:border-gray-500 hover:bg-gray-200 
      active:border-gray-200 active:bg-gray-400 
      px-2 py-2 ${flat ? "w-100" : "w-20"} mx-2 my-2 ${
        inProgress ? "animate-spin" : ""
      }`}
      aria-label={label}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
