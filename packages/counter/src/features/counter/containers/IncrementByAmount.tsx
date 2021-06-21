import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  incrementByAmount,
  incrementAsync,
  selectInProgress,
} from "../counterSlice";

import { useTranslation } from "react-i18next";
import { AriaButton, FlexContainer } from "zeigermann-component-lib";

export function IncrementByAmount() {
  const inProgress = useAppSelector(selectInProgress);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState<number>(2);
  const { t } = useTranslation();

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
  return (
      <FlexContainer>
        <input
          className="px-2 py-2 m-2 w-20"
          aria-label="Set increment amount"
          type="number"
          inputMode='numeric'
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number.parseInt(e.target.value))}
        />
        <AriaButton
          testid="count:incrementByAmount"
          label={t("add", { mode: "sync" })}
          text={t("add", { mode: "sync" })}
          onClick={() => dispatch(incrementByAmount(incrementAmount ?? 0))}
        />
        <AriaButton
          testid="count:incrementByAmountAsync"
          label={t("add", { mode: "async" })}
          text={t("add", { mode: "async" })}
          onClick={() => dispatch(incrementAsync(incrementAmount ?? 0))}
          inProgress={inProgress['ADD_ASYNC']}
        />
      </FlexContainer>
  );
}
