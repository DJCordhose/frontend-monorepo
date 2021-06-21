import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export function Nav() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end">
      <nav>
          <ul>
            <li>
              <NavLink exact activeClassName="bg-gray-300" className={`bg-gray-100`} to="/">{t("home")}</NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="bg-gray-300" className={`bg-gray-100`} to="/hello">{t("hello")}</NavLink>
            </li>
          </ul>
        </nav>
    </div>
  );
}
