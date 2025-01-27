"use client";
import React, { useEffect } from "react";
import SidebarWrapper from "./sidebar-wrapper";
import useStore from "../../_store/app-store";
import dynamic from "next/dynamic";

const Leaflet = dynamic(() => import("./leaflet"), {
  ssr: false,
});

interface MapClientProps {
  params: {
    lng: string;
  };
}

const MapClient: React.FC<MapClientProps> = ({ params }) => {
  const { lng } = params;

  // Store hooks
  const {
    addMunicipalityBoundaries,
    addHealths,
    addMunicipalityOffices,
    addPhysicalInfrastructures,
    addTouristPlaces,
    addWardBoundaries,
    addWardOffices,
    addSchools,
    addAspects,
    addElevations,
    addHighways,
    addLandUses,
    addSlopes,
    addSprings,
    addVillages,
    addRoads,
  } = useStore();

  // Fetch functions
  const fetchData = async (endpoint: string) => {
    const response = await fetch(`/api/${endpoint}`);
    return response.json();
  };

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [
          roads,
          municipalityBoundaries,
          healths,
          municipalityOffices,
          physicalInfrastructures,
          touristPlaces,
          wardBoundaries,
          wardOffices,
          schools,
          aspects,
          elevations,
          highways,
          landUses,
          slopes,
          springs,
          villages,
        ] = await Promise.all([
          fetchData("roads"),
          fetchData("municipalityBoundaries"),
          fetchData("health"),
          fetchData("municipalityOffices"),
          fetchData("physicalInfrastructures"),
          fetchData("touristPlaces"),
          fetchData("wardBoundaries"),
          fetchData("wardOffices"),
          fetchData("schools"),
          fetchData("aspect"),
          fetchData("elevation"),
          fetchData("highway"),
          fetchData("landUse"),
          fetchData("slope"),
          fetchData("springs"),
          fetchData("villages"),
        ]);

        // Update store with fetched data
        addRoads(roads);
        addMunicipalityBoundaries(municipalityBoundaries);
        addHealths(healths);
        addMunicipalityOffices(municipalityOffices);
        addPhysicalInfrastructures(physicalInfrastructures);
        addTouristPlaces(touristPlaces);
        addWardBoundaries(wardBoundaries);
        addWardOffices(wardOffices);
        addSchools(schools);
        addAspects(aspects);
        addElevations(elevations);
        addHighways(highways);
        addLandUses(landUses);
        addSlopes(slopes);
        addSprings(springs);
        addVillages(villages);
      } catch (error) {
        console.error("Error loading map data:", error);
      }
    };

    loadAllData();
  }, [
    addMunicipalityBoundaries,
    addHealths,
    addMunicipalityOffices,
    addPhysicalInfrastructures,
    addTouristPlaces,
    addWardBoundaries,
    addWardOffices,
    addSchools,
    addAspects,
    addElevations,
    addHighways,
    addLandUses,
    addSlopes,
    addSprings,
    addVillages,
    addRoads,
  ]);

  return (
    <div className="flex relative">
      <SidebarWrapper lng={lng} />
      <Leaflet />
    </div>
  );
};

export default MapClient;
