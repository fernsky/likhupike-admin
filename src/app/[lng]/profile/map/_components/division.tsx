"use client";
import React, { useMemo, useState } from "react";
import SubDivision from "./sub-division";
import Checkbox from "./checkbox";
import { Minus, Plus } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import useStore from "../../_store/app-store";

interface DivisionProps {
  divisionName: string;
  subDivisions: { subDivisionId: string }[] | undefined;
  isLast: boolean;
  lng: string;
  divisionId: string;
}

const Division: React.FC<DivisionProps> = ({
  divisionName,
  subDivisions,
  isLast,
  lng,
  divisionId,
}) => {
  const { t } = useTranslation(lng, "mapSidebar", {});
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const setShowMunicipalityBoundaries = useStore(
    (state) => state.setShowMunicipalityBoundaries,
  );
  const setShowHealth = useStore((state) => state.setShowHealth);
  const setShowMunicipalityOffices = useStore(
    (state) => state.setShowMunicipalityOffices,
  );
  const setShowPhysicalInfrastructures = useStore(
    (state) => state.setShowPhysicalInfrastructures,
  );
  const setShowTouristPlaces = useStore((state) => state.setShowTouristPlaces);
  const setShowWardBoundaries = useStore(
    (state) => state.setShowWardBoundaries,
  );
  const setShowWardOffices = useStore((state) => state.setShowWardOffices);
  const setShowSchools = useStore((state) => state.setShowSchools);
  const setShowAspect = useStore((state) => state.setShowAspect);
  const setShowElevation = useStore((state) => state.setShowElevation);
  const setShowHighway = useStore((state) => state.setShowHighway);
  const setShowLandUse = useStore((state) => state.setShowLandUse);

  const setShowSlope = useStore((state) => state.setShowSlope);
  const setShowSprings = useStore((state) => state.setShowSprings);
  const setShowVillages = useStore((state) => state.setShowVillages);
  const setShowRoads = useStore((state) => state.setShowRoads);

  // Sub Divisions
  const setShowAspectFlat = useStore((state) => state.setShowAspectFlat);
  const setShowAspectNorth = useStore((state) => state.setShowAspectNorth);
  const setShowAspectNorthEast = useStore(
    (state) => state.setShowAspectNorthEast,
  );
  const setShowAspectEast = useStore((state) => state.setShowAspectEast);
  const setShowAspectSouthEast = useStore(
    (state) => state.setShowAspectSouthEast,
  );
  const setShowAspectSouth = useStore((state) => state.setShowAspectSouth);
  const setShowAspectSouthWest = useStore(
    (state) => state.setShowAspectSouthWest,
  );
  const setShowAspectWest = useStore((state) => state.setShowAspectWest);
  const setShowAspectNorthWest = useStore(
    (state) => state.setShowAspectNorthWest,
  );

  const setShowElevation2100 = useStore((state) => state.setShowElevation2100);
  const setShowElevation2600 = useStore((state) => state.setShowElevation2600);
  const setShowElevation3100 = useStore((state) => state.setShowElevation3100);
  const setShowElevation3600 = useStore((state) => state.setShowElevation3600);
  const setShowElevation4257 = useStore((state) => state.setShowElevation4257);

  const setShowLandUseWaterbodies = useStore(
    (state) => state.setShowLandUseWaterbodies,
  );
  const setShowLandUseForest = useStore((state) => state.setShowLandUseForest);
  const setShowLandUseCultivation = useStore(
    (state) => state.setShowLandUseCultivation,
  );
  const setShowLandUseBushes = useStore((state) => state.setShowLandUseBushes);
  const setShowLandUseBuiltup = useStore(
    (state) => state.setShowLandUseBuiltup,
  );

  const setShowSlope15 = useStore((state) => state.setShowSlope15);
  const setShowSlope30 = useStore((state) => state.setShowSlope30);
  const setShowSlope45 = useStore((state) => state.setShowSlope45);
  const setShowSlope60 = useStore((state) => state.setShowSlope60);
  const setShowSlope72 = useStore((state) => state.setShowSlope72);

  const showMunicipalityBoundaries = useStore(
    (state) => state.showMunicipalityBoundaries,
  );
  const showHealth = useStore((state) => state.showHealth);
  const showMunicipalityOffices = useStore(
    (state) => state.showMunicipalityOffices,
  );
  const showPhysicalInfrastructures = useStore(
    (state) => state.showPhysicalInfrastructures,
  );
  const showTouristPlaces = useStore((state) => state.showTouristPlaces);
  const showWardBoundaries = useStore((state) => state.showWardBoundaries);
  const showWardOffices = useStore((state) => state.showWardOffices);
  const showSchools = useStore((state) => state.showSchools);
  const showAspect = useStore((state) => state.showAspect);
  const showElevation = useStore((state) => state.showElevation);
  const showHighway = useStore((state) => state.showHighway);
  const showLandUse = useStore((state) => state.showLandUse);
  const showSlope = useStore((state) => state.showSlope);
  const showSprings = useStore((state) => state.showSprings);
  const showVillages = useStore((state) => state.showVillages);
  const showRoads = useStore((state) => state.showRoads);

  const handleCheckboxChange = (checked: boolean) => {
    switch (divisionId) {
      case "municipalityBoundaries":
        setShowMunicipalityBoundaries(checked);
        break;
      case "health":
        setShowHealth(checked);
        break;
      case "municipalityOffices":
        setShowMunicipalityOffices(checked);
        break;
      case "physicalInfrastructures":
        setShowPhysicalInfrastructures(checked);
        break;
      case "touristPlaces":
        setShowTouristPlaces(checked);
        break;
      case "wardBoundaries":
        setShowWardBoundaries(checked);
        break;
      case "wardOffices":
        setShowWardOffices(checked);
        break;
      case "schools":
        setShowSchools(checked);
        break;
      case "aspect":
        setShowAspect(checked);
        setShowAspectFlat(checked);
        setShowAspectNorth(checked);
        setShowAspectNorthEast(checked);
        setShowAspectEast(checked);
        setShowAspectSouthEast(checked);
        setShowAspectSouth(checked);
        setShowAspectSouthWest(checked);
        setShowAspectWest(checked);
        setShowAspectNorthWest(checked);
        break;
      case "elevation":
        setShowElevation(checked);
        setShowElevation2100(checked);
        setShowElevation2600(checked);
        setShowElevation3100(checked);
        setShowElevation3600(checked);
        setShowElevation4257(checked);
        break;
      case "highway":
        setShowHighway(checked);
        break;
      case "landUse":
        setShowLandUse(checked);
        setShowLandUseWaterbodies(checked);
        setShowLandUseForest(checked);
        setShowLandUseCultivation(checked);
        setShowLandUseBushes(checked);
        setShowLandUseBuiltup(checked);
        break;
      case "slope":
        setShowSlope(checked);
        setShowSlope15(checked);
        setShowSlope30(checked);
        setShowSlope45(checked);
        setShowSlope60(checked);
        setShowSlope72(checked);
        break;
      case "springs":
        setShowSprings(checked);
        break;
      case "villages":
        setShowVillages(checked);
        break;
      case "roads":
        setShowRoads(checked);
        break;
      default:
        break;
    }
  };

  const checked = useMemo(() => {
    switch (divisionId) {
      case "municipalityBoundaries":
        return showMunicipalityBoundaries;
      case "health":
        return showHealth;
      case "municipalityOffices":
        return showMunicipalityOffices;
      case "physicalInfrastructures":
        return showPhysicalInfrastructures;
      case "touristPlaces":
        return showTouristPlaces;
      case "wardBoundaries":
        return showWardBoundaries;
      case "wardOffices":
        return showWardOffices;
      case "schools":
        return showSchools;
      case "aspect":
        return showAspect;
      case "elevation":
        return showElevation;
      case "highway":
        return showHighway;
      case "landUse":
        return showLandUse;
      case "slope":
        return showSlope;
      case "springs":
        return showSprings;
      case "villages":
        return showVillages;
      case "roads":
        return showRoads;
      default:
        return false;
    }
  }, [
    showMunicipalityBoundaries,
    showHealth,
    showMunicipalityOffices,
    showPhysicalInfrastructures,
    showTouristPlaces,
    showWardBoundaries,
    showWardOffices,
    showSchools,
    showAspect,
    showElevation,
    showHighway,
    showLandUse,
    showSlope,
    showSprings,
    showVillages,
    showRoads,
    divisionId,
  ]);

  return (
    <div
      className={`pr-[8px] py-[12px] ${
        !isLast ? "border-b-[#9E9E9E] border-b-[1px]" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <Checkbox onChange={handleCheckboxChange} checked={checked} />
          <span className="text-[14px] font-[500]">{divisionName}</span>
        </div>
        {subDivisions && subDivisions?.length > 0 && (
          <button onClick={toggleExpanded} className="">
            {expanded ? (
              <Minus className="text-[#505050] w-[20px] h-[20px]" />
            ) : (
              <Plus className="text-[#505050] w-[20px] h-[20px]" />
            )}
          </button>
        )}
      </div>
      {expanded && (
        <div className="pl-[20px] py-[8px] pt-[16px] flex flex-col gap-0">
          {subDivisions?.map((subDivision, index) => (
            <SubDivision
              subDivisionId={subDivision.subDivisionId}
              key={subDivision.subDivisionId}
              subDivisionName={t(subDivision.subDivisionId)}
              isLast={index === subDivisions.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Division;
