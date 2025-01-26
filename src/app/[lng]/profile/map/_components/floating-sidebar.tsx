"use client";
import React from "react";
import { PanelRight } from "lucide-react";
import useStore from "../../_store/app-store";
import { useTranslation } from "@/app/[lng]/i18n/client";

interface FloatingSidebarProps {
  lng: string;
}

const FloatingSidebar: React.FC<FloatingSidebarProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "mapSidebar", {});

  const setMapSidebarOpen = useStore((state) => state.setMapSidebarOpen);

  return (
    <div className="absolute top-4 left-4 z-[1000] ">
      <button className="bg-white p-3 rounded-lg shadow-md hover:bg-gray-50 transition-colors w-[200px]">
        <div className="flex items-center gap-2 w-full justify-between">
          <p className="text-[15px] font-[500]">{t("layers")}</p>
          <PanelRight
            className="w-[20px] h-[20px] stroke-[#5B5B5B]"
            onClick={() => setMapSidebarOpen(true)}
          />
        </div>
      </button>
    </div>
  );
};

export default FloatingSidebar;
