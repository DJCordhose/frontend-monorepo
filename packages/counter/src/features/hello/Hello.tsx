import React from "react";
import { useTranslation } from "react-i18next";

import styled from 'styled-components';

const Div = styled.div`
  color: tomato;
  border-color: tomato;
  border-width: 0.1em;
`;

function Hello() {
  const { t } = useTranslation();

  return (
    <div id='hello-app' className="p-6 max-w-sm mx-auto space-x-5">
      <Div>
        {t("hello")}
      </Div>
    </div>
  );
}

export default Hello;
