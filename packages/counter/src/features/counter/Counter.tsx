import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  decrement,
  increment,
  // loadBackendConfig,
  loadFromServer,
  initFromBackend,
  selectCount,
  selectInProgress,
  selectIsConfigured
} from "./counterSlice";

import { useTranslation } from "react-i18next";
import { AriaButton, FlexContainer } from "zeigermann-component-lib";
import { LoadingIndicator } from "../../common/components/LoadingIndicator";

import { IncrementByAmount } from "./containers/IncrementByAmount";
import { RevenueContainer } from "./components/RevenueContainer";

export default function Counter() {
  const count = useAppSelector(selectCount);
  const inProgress = useAppSelector(selectInProgress);
  const isConfigured = useAppSelector(selectIsConfigured);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    // dispatch(loadBackendConfig())
    dispatch(initFromBackend())
  }, [dispatch]);


  const counterEl = (
    <div>
      <FlexContainer>
        <AriaButton
          testid="count:increment"
          label="Increment value"
          text="+"
          onClick={() => dispatch(increment())}
        />
        <span
          data-testid="count:value"
          className="px-5 py-2 border-gray-900 border-2 m-2"
          aria-label="Value"
          role="presentation"
        >
          {count}
        </span>
        <AriaButton
          testid="count:decrement"
          label="Decrement value"
          text="-"
          onClick={() => dispatch(decrement())}
        />
      </FlexContainer>
      <IncrementByAmount />
      <FlexContainer center={true}>
        <AriaButton
          testid="count:load"
          label={t("load")}
          text={t("load")}
          flat={true}
          onClick={() => dispatch(loadFromServer('users2'))}
          inProgress={inProgress['LOAD']}
        />
      </FlexContainer>
      <RevenueContainer count={count} />
    </div>
  );

  return isConfigured ? counterEl : <LoadingIndicator title="Loading configuration..." />;
}
