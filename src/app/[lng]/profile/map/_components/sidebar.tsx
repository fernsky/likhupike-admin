"use client";
import React from "react";
import Division from "./division";
import { PanelRight } from "lucide-react";
import { useTranslation } from "@/app/[lng]/i18n/client";
import useStore from "../../_store/app-store";

const sampleData = [
  {
    divisionId: "municipalityBoundaries",
  },
  {
    divisionId: "health",
  },
  {
    divisionId: "municipalityOffices",
  },
  {
    divisionId: "physicalInfrastructures",
  },
  {
    divisionId: "touristPlaces",
  },
  {
    divisionId: "wardBoundaries",
  },
  {
    divisionId: "wardOffices",
  },
  {
    divisionId: "schools",
  },
  {
    divisionId: "roads",
  },
  {
    divisionId: "aspect",
    subDivisions: [
      {
        subDivisionId: "aspectFlat",
      },
      {
        subDivisionId: "aspectNorth",
      },
      {
        subDivisionId: "aspectNorthEast",
      },
      {
        subDivisionId: "aspectEast",
      },
      {
        subDivisionId: "aspectSouthEast",
      },
      {
        subDivisionId: "aspectSouth",
      },
      {
        subDivisionId: "aspectSouthWest",
      },
      {
        subDivisionId: "aspectWest",
      },
      {
        subDivisionId: "aspectNorthWest",
      },
    ],
  },
  {
    divisionId: "elevation",
    subDivisions: [
      {
        subDivisionId: "elevation2100",
      },
      {
        subDivisionId: "elevation2600",
      },
      {
        subDivisionId: "elevation3100",
      },
      {
        subDivisionId: "elevation3600",
      },
      {
        subDivisionId: "elevation4257",
      },
    ],
  },
  {
    divisionId: "highway",
  },
  {
    divisionId: "landUse",
    subDivisions: [
      {
        subDivisionId: "landUseWaterbodies",
      },
      {
        subDivisionId: "landUseForest",
      },
      {
        subDivisionId: "landUseCultivation",
      },
      {
        subDivisionId: "landUseBushes",
      },
      {
        subDivisionId: "landUseBuiltup",
      },
    ],
  },
  {
    divisionId: "slope",
    subDivisions: [
      {
        subDivisionId: "slope15",
      },
      {
        subDivisionId: "slope30",
      },
      {
        subDivisionId: "slope45",
      },
      {
        subDivisionId: "slope60",
      },
      {
        subDivisionId: "slope72",
      },
    ],
  },
  { divisionId: "springs" },
  { divisionId: "villages" },
];

interface SidebarProps {
  lng: string;
}

const Sidebar: React.FC<SidebarProps> = ({ lng }) => {
  const setMapSidebarOpen = useStore((state) => state.setMapSidebarOpen);
  const { t } = useTranslation(lng, "mapSidebar", {});

  return (
    <div className=" w-[300px] h-[100vh] overflow-y-scroll px-[32px] py-[16px] flex flex-col gap-[12px] ">
      <div className="py-[8px] pr-[8px] flex justify-between items-center">
        <p className="text-[16px] font-[500] tracking-[-0.5px]">
          {t("layers")}
        </p>
        <PanelRight
          className="w-[20px] h-[20px] stroke-[#5B5B5B]"
          onClick={() => setMapSidebarOpen(false)}
        />
      </div>
      <div className="flex flex-col gap-0">
        {sampleData.map((division, index) => (
          <Division
            lng={lng}
            key={division.divisionId}
            divisionName={t(division.divisionId)}
            divisionId={division.divisionId}
            subDivisions={division?.subDivisions}
            isLast={index === sampleData.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
