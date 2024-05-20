import "../public/assets/css/main.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/app/services/contexts/auth/AuthContext";
import "../app/services/utils/i18n.config";
export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <ToastContainer />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
