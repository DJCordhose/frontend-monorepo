import { useTranslation } from "react-i18next";

type Props = Readonly<{
  count: number;
}>;

export function RevenueContainer({ count }: Props) {
    const { t } = useTranslation();

  return (
    <p>
      {t("users", {
        date: new Date(),
        count: count,
        revenue: count * Math.PI,
      })}
    </p>
  );
}
