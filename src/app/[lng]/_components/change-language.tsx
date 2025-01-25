"use client";
import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { languages } from "@/app/i18n/settings";
import { useClickAway } from "react-use";

interface ChangeLanguageProps {
  lng: string;
}

const ChangeLanguage: React.FC<ChangeLanguageProps> = ({ lng }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (newLng: string) => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 0 && languages.includes(segments[0])) {
      segments[0] = newLng;
    } else {
      segments.unshift(newLng);
    }
    const newPath = `/${segments.join("/")}`;
    router.push(newPath);
    setIsOpen(false);
  };

  useClickAway(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="flex gap-[4px] px-[8px] py-[4px] items-center drop-shadow-[0_0px_1px_rgba(0,0,0,0.1)] bg-[#FFFFFF] w-fit h-fit rounded-[12px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs text-[#616161]">
          {lng == "en" ? "en" : "ने"}
        </span>
        <ChevronDown className="w-[16px] h-[16px] text-[#575757]" />
      </div>
      {isOpen && (
        <ul
          id={`navbar-${lng}`}
          className="absolute z-[1000] top-[32px] left-[-0.05rem] rounded-[8px] border-[0.05rem] border-[#F5F5F5] w-[48px] bg-[#FFFFFF]"
        >
          <li
            className="rounded-t-[8px] text-xs hover:bg-[#F6F6F6] px-[8px] py-[4px] cursor-pointer w-full border-b-[1px] border-b-[#D3D3D3]"
            onClick={() => changeLanguage("en")}
          >
            en
          </li>
          <li
            className="text-xs hover:bg-[#F6F6F6] px-[8px] py-[4px] cursor-pointer w-full rounded-b-[8px]"
            onClick={() => changeLanguage("ne")}
          >
            ने
          </li>
        </ul>
      )}
    </div>
  );
};

export default ChangeLanguage;
