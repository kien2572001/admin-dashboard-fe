import DashboardLayout from "../app/components/layouts/Dashboard";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="container">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to the dashboard</p>
      </div>
    </DashboardLayout>
  );
}
