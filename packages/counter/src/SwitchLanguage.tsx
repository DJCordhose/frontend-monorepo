import { useTranslation } from "react-i18next";
import { AriaButton } from "zeigermann-component-lib";

export function SwitchLanguage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex justify-end">
      {i18n.language !== "de" && (
        <AriaButton
          testid="language:switch:de"
          label="Change Language"
          text={t("de")}
          onClick={() => i18n.changeLanguage("de")}
        />
      )}
      {i18n.language !== "en" && (
        <AriaButton
          testid="language:switch:en"
          label="Change Language"
          text={t("en")}
          onClick={() => i18n.changeLanguage("en")}
        />
      )}
    </div>
  );
}
