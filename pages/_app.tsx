import "../public/assets/css/main.css";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Component {...pageProps} />
    </div>
  );
}
