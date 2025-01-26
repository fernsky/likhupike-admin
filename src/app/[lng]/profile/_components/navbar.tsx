"use client";
import React from "react";
import ChangeLanguage from "./change-language";
import { useTranslation } from "@/app/[lng]/i18n/client";
import Search from "./search";
import Link from "next/link";

interface NavbarProps {
  lng: string;
}

const Navbar: React.FC<NavbarProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "navbar", {});

  return (
    <nav className="bg-[#f7f7f7] flex items-center justify-center h-[72px]">
      <div className="w-[1084px] flex items-center justify-between">
        <Link href={`/${lng}`} className="uppercase font-bold tracking-[4%]">
          {t("brand")}
        </Link>
        <Search />
        <ul className="flex items-center gap-[24px] px-[20px] tracking-[-0.4px]">
          <Link
            href={`/${lng}/profile`}
            className="cursor-pointer align-middle text-xs text-[#4C4C4C] font-medium tracking-[-4%]"
          >
            {t("profile")}
          </Link>
          <Link
            href={`/${lng}/map`}
            className="cursor-pointer align-middle text-xs text-[#4C4C4C] font-medium tracking-[-4%]"
          >
            {t("map")}
          </Link>
          <li className="cursor-pointer align-middle text-xs text-[#4C4C4C] font-medium tracking-[-4%]">
            {t("downloads")}
          </li>
          <li>
            <ChangeLanguage lng={lng} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
