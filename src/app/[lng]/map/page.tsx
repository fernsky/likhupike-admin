"use client";
import React, { useEffect } from "react";
import SidebarWrapper from "@/components/Map/Sidebar/SidebarWrapper";
import useStore from "@/store";
import dynamic from "next/dynamic";
const Leaflet = dynamic(() => import("@/components/Map/Leaflet"), {
  ssr: false, // This ensures the component is not SSR'd
});

interface MapProps {
  params: {
    lng: string;
  };
}

const MapPage: React.FC<MapProps> = ({ params }) => {
  const { lng } = params;

  const addMunicipalityBoundaries = useStore(
    (state) => state.addMunicipalityBoundaries
  );
  const addHealths = useStore((state) => state.addHealths);

  const addMunicipalityOffices = useStore(
    (state) => state.addMunicipalityOffices
  );
  const addPhysicalInfrastructures = useStore(
    (state) => state.addPhysicalInfrastructures
  );
  const addTouristPlaces = useStore((state) => state.addTouristPlaces);
  const addWardBoundaries = useStore((state) => state.addWardBoundaries);
  const addWardOffices = useStore((state) => state.addWardOffices);
  const addSchools = useStore((state) => state.addSchools);
  const addAspects = useStore((state) => state.addAspects);
  const addElevations = useStore((state) => state.addElevations);
  const addHighways = useStore((state) => state.addHighways);
  const addLandUses = useStore((state) => state.addLandUses);

  const addSlopes = useStore((state) => state.addSlopes);
  const addSprings = useStore((state) => state.addSprings);
  const addVillages = useStore((state) => state.addVillages);
  const addRoads = useStore((state) => state.addRoads);

  const fetchMunicipalityBoundaries = async () => {
    const response = await fetch("/api/municipalityBoundaries");
    const data = await response.json();
    return data;
  };

  const fetchHealthData = async () => {
    const response = await fetch("/api/health");
    const data = await response.json();
    return data;
  };

  const fetchMunicipalityOffices = async () => {
    const response = await fetch("/api/municipalityOffices");
    const data = await response.json();
    return data;
  };

  const fetchPhysicalInfrastructures = async () => {
    const response = await fetch("/api/physicalInfrastructures");
    const data = await response.json();
    return data;
  };

  const fetchTouristPlaces = async () => {
    const response = await fetch("/api/touristPlaces");
    const data = await response.json();
    return data;
  };

  const fetchWardBoundaries = async () => {
    const response = await fetch("/api/wardBoundaries");
    const data = await response.json();
    return data;
  };

  const fetchWardOffices = async () => {
    const response = await fetch("/api/wardOffices");
    const data = await response.json();
    return data;
  };

  const fetchSchools = async () => {
    const response = await fetch("/api/schools");
    const data = await response.json();
    return data;
  };

  const fetchAspect = async () => {
    const response = await fetch("/api/aspect");
    const data = await response.json();
    return data;
  };

  const fetchElevation = async () => {
    const response = await fetch("/api/elevation");
    const data = await response.json();
    return data;
  };

  const fetchHighway = async () => {
    const response = await fetch("/api/highway");
    const data = await response.json();
    return data;
  };

  const fetchLandUse = async () => {
    const response = await fetch("/api/landUse");
    const data = await response.json();
    return data;
  };

  const fetchSlope = async () => {
    const response = await fetch("/api/slope");
    const data = await response.json();
    return data;
  };

  const fetchSprings = async () => {
    const response = await fetch("/api/springs");
    const data = await response.json();
    return data;
  };

  const fetchVillages = async () => {
    const response = await fetch("/api/villages");
    const data = await response.json();
    return data;
  };

  const fetchRoads = async () => {
    const response = await fetch("/api/roads");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const loadAllData = async () => {
      const roads = await fetchRoads();
      addRoads(roads);

      const municipalityBoundaries = await fetchMunicipalityBoundaries();
      addMunicipalityBoundaries(municipalityBoundaries);

      const healths = await fetchHealthData();
      addHealths(healths);

      const municipalityOffices = await fetchMunicipalityOffices();
      addMunicipalityOffices(municipalityOffices);

      const physicalInfrastructures = await fetchPhysicalInfrastructures();
      addPhysicalInfrastructures(physicalInfrastructures);

      const touristPlaces = await fetchTouristPlaces();
      addTouristPlaces(touristPlaces);

      const wardBoundaries = await fetchWardBoundaries();
      addWardBoundaries(wardBoundaries);

      const wardOffices = await fetchWardOffices();
      addWardOffices(wardOffices);

      const schools = await fetchSchools();
      addSchools(schools);

      const aspects = await fetchAspect();
      addAspects(aspects);

      const elevations = await fetchElevation();
      addElevations(elevations);

      const highways = await fetchHighway();
      addHighways(highways);

      const landUses = await fetchLandUse();
      addLandUses(landUses);

      const slopes = await fetchSlope();
      addSlopes(slopes);

      const springs = await fetchSprings();
      addSprings(springs);

      const villages = await fetchVillages();
      addVillages(villages);
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
  ]); // Include all dependencies

  return (
    <div className="flex relative">
      <SidebarWrapper lng={lng} />
      <Leaflet />
    </div>
  );
};

export default dynamic(() => Promise.resolve(MapPage), { ssr: false });
