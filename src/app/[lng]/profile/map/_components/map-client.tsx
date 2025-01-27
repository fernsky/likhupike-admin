"use client";
import React, { useState, useEffect } from "react";
import SidebarWrapper from "./sidebar-wrapper";
import useStore from "../../_store/app-store";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const Leaflet = dynamic(() => import("./leaflet"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const LoadingScreen = () => (
  <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50/30">
    <div className="flex flex-col items-center px-4 text-center">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-green-400/20" />
        <div className="relative p-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/25">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Loading Geographic Data
        </h3>
        <p className="text-base text-gray-600 max-w-sm mx-auto leading-relaxed">
          Preparing detailed maps and spatial information for{" "}
          <span className="font-medium text-green-600">Likhupike</span>
        </p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span>Please wait while we fetch the latest data</span>
      </div>
    </div>
  </div>
);

interface MapClientProps {
  params: {
    lng: string;
  };
}

const MapClient: React.FC<MapClientProps> = ({ params }) => {
  const { lng } = params;
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-full w-full relative overflow-hidden">
      <Leaflet />
      <SidebarWrapper lng={lng} />
    </div>
  );
};

export default MapClient;
