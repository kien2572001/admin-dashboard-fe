import DashboardLayout from "../app/components/layouts/Dashboard";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <DashboardLayout>
      <div className="container">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to the dashboard</p>
        <p>{t("hello_world")}</p>
      </div>
    </DashboardLayout>
  );
}
