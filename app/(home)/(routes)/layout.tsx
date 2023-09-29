import NavBtSeo from "../../../components/navbar_seo/navbar_seo";
import FooterDemo from "../../../components/Footer/footer";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="fixed w-full h-[80px] inset-y-0 z-10 shadow-sm">
        <NavBtSeo />
      </div>
      <main className="pt-[80px]">{children}</main>
      <FooterDemo />
    </div>
  );
};

export default AuthLayout;
