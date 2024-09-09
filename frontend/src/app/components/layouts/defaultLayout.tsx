import Head from "next/head";
import Header from "../elements/header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="pt-24 w-full flex justify-center items-center justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-jost)]">
        {children}
      </div>
    </div>
  );
}
