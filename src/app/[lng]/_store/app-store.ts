import { create } from "zustand";
import { Route } from "./types";
import {
  Aspect,
  Elevation,
  Health,
  Highway,
  LandUse,
  MunicipalityBoundary,
  MunicipalityOffice,
  PhysicalInfrastructure,
  Road,
  School,
  Slope,
  Spring,
  TouristPlace,
  Village,
  WardBoundary,
  WardOffice,
} from "@/server/db/schema/profile";

export interface AppState {
  currentRoute: Route | null;
  setCurrentRoute: (route: Route | null) => void;

  currentPartId: string | null;
  setCurrentPartId: (partId: string | null) => void;

  currentChapterId: string | null;
  setCurrentChapterId: (chapterId: string | null) => void;

  currentSectionId: string | null;
  setCurrentSectionId: (sectionId: string | null) => void;

  isMapSidebarOpen: boolean;
  setMapSidebarOpen: (isOpen: boolean) => void;

  showMunicipalityBoundaries: boolean;
  setShowMunicipalityBoundaries: (show: boolean) => void;

  showHealth: boolean;
  setShowHealth: (show: boolean) => void;

  showMunicipalityOffices: boolean;
  setShowMunicipalityOffices: (show: boolean) => void;

  showPhysicalInfrastructures: boolean;
  setShowPhysicalInfrastructures: (show: boolean) => void;

  showSchools: boolean;
  setShowSchools: (show: boolean) => void;

  showTouristPlaces: boolean;
  setShowTouristPlaces: (show: boolean) => void;

  showWardBoundaries: boolean;
  setShowWardBoundaries: (show: boolean) => void;

  showWardOffices: boolean;
  setShowWardOffices: (show: boolean) => void;

  showAspect: boolean;
  setShowAspect: (show: boolean) => void;

  showAspectFlat: boolean;
  setShowAspectFlat: (show: boolean) => void;

  showAspectNorth: boolean;
  setShowAspectNorth: (show: boolean) => void;

  showAspectNorthEast: boolean;
  setShowAspectNorthEast: (show: boolean) => void;

  showAspectEast: boolean;
  setShowAspectEast: (show: boolean) => void;

  showAspectSouthEast: boolean;
  setShowAspectSouthEast: (show: boolean) => void;

  showAspectSouth: boolean;
  setShowAspectSouth: (show: boolean) => void;

  showAspectSouthWest: boolean;
  setShowAspectSouthWest: (show: boolean) => void;

  showAspectWest: boolean;
  setShowAspectWest: (show: boolean) => void;

  showAspectNorthWest: boolean;
  setShowAspectNorthWest: (show: boolean) => void;

  showElevation: boolean;
  setShowElevation: (show: boolean) => void;

  showElevation2100: boolean;
  setShowElevation2100: (show: boolean) => void;

  showElevation2600: boolean;
  setShowElevation2600: (show: boolean) => void;

  showElevation3100: boolean;
  setShowElevation3100: (show: boolean) => void;

  showElevation3600: boolean;
  setShowElevation3600: (show: boolean) => void;

  showElevation4257: boolean;
  setShowElevation4257: (show: boolean) => void;

  showHighway: boolean;
  setShowHighway: (show: boolean) => void;

  showLandUse: boolean;
  setShowLandUse: (show: boolean) => void;

  showLandUseWaterbodies: boolean;
  setShowLandUseWaterbodies: (show: boolean) => void;

  showLandUseForest: boolean;
  setShowLandUseForest: (show: boolean) => void;

  showLandUseCultivation: boolean;
  setShowLandUseCultivation: (show: boolean) => void;

  showLandUseBushes: boolean;
  setShowLandUseBushes: (show: boolean) => void;

  showLandUseBuiltup: boolean;
  setShowLandUseBuiltup: (show: boolean) => void;

  showRoads: boolean;
  setShowRoads: (show: boolean) => void;

  showSlope: boolean;
  setShowSlope: (show: boolean) => void;

  showSlope15: boolean;
  setShowSlope15: (show: boolean) => void;

  showSlope30: boolean;
  setShowSlope30: (show: boolean) => void;

  showSlope45: boolean;
  setShowSlope45: (show: boolean) => void;

  showSlope60: boolean;
  setShowSlope60: (show: boolean) => void;

  showSlope72: boolean;
  setShowSlope72: (show: boolean) => void;

  showSprings: boolean;
  setShowSprings: (show: boolean) => void;

  showVillages: boolean;
  setShowVillages: (show: boolean) => void;

  municipalityBoundaries: MunicipalityBoundary[];
  addMunicipalityBoundary: (boundary: MunicipalityBoundary) => void;
  addMunicipalityBoundaries: (boundaries: MunicipalityBoundary[]) => void;
  removeMunicipalityBoundary: (boundaryId: string) => void;

  health: Health[];
  addHealth: (health: Health) => void;
  addHealths: (healths: Health[]) => void;
  removeHealth: (healthId: string) => void;

  municipalityOffices: MunicipalityOffice[];
  addMunicipalityOffice: (office: MunicipalityOffice) => void;
  addMunicipalityOffices: (offices: MunicipalityOffice[]) => void;
  removeMunicipalityOffice: (officeId: string) => void;

  physicalInfrastructures: PhysicalInfrastructure[];
  addPhysicalInfrastructure: (infrastructure: PhysicalInfrastructure) => void;
  addPhysicalInfrastructures: (
    infrastructures: PhysicalInfrastructure[],
  ) => void;
  removePhysicalInfrastructure: (infrastructureId: string) => void;

  schools: School[];
  addSchool: (school: School) => void;
  addSchools: (schools: School[]) => void;
  removeSchool: (schoolId: string) => void;

  touristPlaces: TouristPlace[];
  addTouristPlace: (place: TouristPlace) => void;
  addTouristPlaces: (places: TouristPlace[]) => void;
  removeTouristPlace: (placeId: string) => void;

  wardBoundaries: WardBoundary[];
  addWardBoundary: (boundary: WardBoundary) => void;
  addWardBoundaries: (boundaries: WardBoundary[]) => void;
  removeWardBoundary: (boundaryId: string) => void;

  wardOffices: WardOffice[];
  addWardOffice: (office: WardOffice) => void;
  addWardOffices: (offices: WardOffice[]) => void;
  removeWardOffice: (officeId: string) => void;

  aspects: Aspect[];
  addAspect: (aspect: Aspect) => void;
  addAspects: (aspects: Aspect[]) => void;
  removeAspect: (aspectId: string) => void;

  aspectFlat: Aspect | null;
  aspectNorth: Aspect | null;
  aspectNorthEast: Aspect | null;
  aspectEast: Aspect | null;
  aspectSouthEast: Aspect | null;
  aspectSouth: Aspect | null;
  aspectSouthWest: Aspect | null;
  aspectWest: Aspect | null;
  aspectNorthWest: Aspect | null;

  elevations: Elevation[];
  addElevation: (elevation: Elevation) => void;
  addElevations: (elevations: Elevation[]) => void;
  removeElevation: (elevationId: string) => void;

  elevation2100: Elevation | null;
  elevation2600: Elevation | null;
  elevation3100: Elevation | null;
  elevation3600: Elevation | null;
  elevation4257: Elevation | null;

  highways: Highway[];
  addHighway: (highway: Highway) => void;
  addHighways: (highways: Highway[]) => void;
  removeHighway: (highwayId: string) => void;

  landUses: LandUse[];
  addLandUse: (landUse: LandUse) => void;
  addLandUses: (landUses: LandUse[]) => void;
  removeLandUse: (landUseId: string) => void;

  waterBodies: LandUse | null;
  forest: LandUse | null;
  cultivation: LandUse | null;
  bushes: LandUse | null;
  builtup: LandUse | null;

  roads: Road[];
  addRoad: (road: Road) => void;
  addRoads: (roads: Road[]) => void;
  removeRoad: (roadId: string) => void;

  slopes: Slope[];
  addSlope: (slope: Slope) => void;
  addSlopes: (slopes: Slope[]) => void;
  removeSlope: (slopeId: string) => void;

  slope15: Slope | null;
  slope30: Slope | null;
  slope45: Slope | null;
  slope60: Slope | null;
  slope72: Slope | null;

  springs: Spring[];
  addSpring: (spring: Spring) => void;
  addSprings: (springs: Spring[]) => void;
  removeSpring: (springId: string) => void;

  villages: Village[];
  addVillage: (village: Village) => void;
  addVillages: (villages: Village[]) => void;
  removeVillage: (villageId: string) => void;
}
const useStore = create<AppState>((set) => ({
  currentRoute: null,
  setCurrentRoute: (route: Route | null) => set({ currentRoute: route }),

  currentPartId: null,
  setCurrentPartId: (partId: string | null) => set({ currentPartId: partId }),

  currentChapterId: null,
  setCurrentChapterId: (chapterId: string | null) =>
    set({ currentChapterId: chapterId }),

  currentSectionId: null,
  setCurrentSectionId: (sectionId: string | null) =>
    set({ currentSectionId: sectionId }),

  isMapSidebarOpen: false,
  setMapSidebarOpen: (isOpen: boolean) => set({ isMapSidebarOpen: isOpen }),

  showMunicipalityBoundaries: false,
  setShowMunicipalityBoundaries: (show: boolean) =>
    set({ showMunicipalityBoundaries: show }),

  showHealth: false,
  setShowHealth: (show: boolean) => set({ showHealth: show }),

  showMunicipalityOffices: false,
  setShowMunicipalityOffices: (show: boolean) =>
    set({ showMunicipalityOffices: show }),

  showPhysicalInfrastructures: false,
  setShowPhysicalInfrastructures: (show: boolean) =>
    set({ showPhysicalInfrastructures: show }),

  showSchools: false,
  setShowSchools: (show: boolean) => set({ showSchools: show }),

  showTouristPlaces: false,
  setShowTouristPlaces: (show: boolean) => set({ showTouristPlaces: show }),

  showWardBoundaries: false,
  setShowWardBoundaries: (show: boolean) => set({ showWardBoundaries: show }),

  showWardOffices: false,
  setShowWardOffices: (show: boolean) => set({ showWardOffices: show }),

  showAspect: false,
  setShowAspect: (show: boolean) => set({ showAspect: show }),

  showAspectFlat: false,
  setShowAspectFlat: (show: boolean) => set({ showAspectFlat: show }),

  showAspectNorth: false,
  setShowAspectNorth: (show: boolean) => set({ showAspectNorth: show }),

  showAspectNorthEast: false,
  setShowAspectNorthEast: (show: boolean) => set({ showAspectNorthEast: show }),

  showAspectEast: false,
  setShowAspectEast: (show: boolean) => set({ showAspectEast: show }),

  showAspectSouthEast: false,
  setShowAspectSouthEast: (show: boolean) => set({ showAspectSouthEast: show }),

  showAspectSouth: false,
  setShowAspectSouth: (show: boolean) => set({ showAspectSouth: show }),

  showAspectSouthWest: false,
  setShowAspectSouthWest: (show: boolean) => set({ showAspectSouthWest: show }),

  showAspectWest: false,
  setShowAspectWest: (show: boolean) => set({ showAspectWest: show }),

  showAspectNorthWest: false,
  setShowAspectNorthWest: (show: boolean) => set({ showAspectNorthWest: show }),

  showElevation: false,
  setShowElevation: (show: boolean) => set({ showElevation: show }),

  showElevation2100: false,
  setShowElevation2100: (show: boolean) => set({ showElevation2100: show }),

  showElevation2600: false,
  setShowElevation2600: (show: boolean) => set({ showElevation2600: show }),

  showElevation3100: false,
  setShowElevation3100: (show: boolean) => set({ showElevation3100: show }),

  showElevation3600: false,
  setShowElevation3600: (show: boolean) => set({ showElevation3600: show }),

  showElevation4257: false,
  setShowElevation4257: (show: boolean) => set({ showElevation4257: show }),

  showHighway: false,
  setShowHighway: (show: boolean) => set({ showHighway: show }),

  showLandUse: false,
  setShowLandUse: (show: boolean) => set({ showLandUse: show }),

  showLandUseWaterbodies: false,
  setShowLandUseWaterbodies: (show: boolean) =>
    set({ showLandUseWaterbodies: show }),

  showLandUseForest: false,
  setShowLandUseForest: (show: boolean) => set({ showLandUseForest: show }),

  showLandUseCultivation: false,
  setShowLandUseCultivation: (show: boolean) =>
    set({ showLandUseCultivation: show }),

  showLandUseBushes: false,
  setShowLandUseBushes: (show: boolean) => set({ showLandUseBushes: show }),

  showLandUseBuiltup: false,
  setShowLandUseBuiltup: (show: boolean) => set({ showLandUseBuiltup: show }),

  showRoads: false,
  setShowRoads: (show: boolean) => set({ showRoads: show }),

  showSlope: false,
  setShowSlope: (show: boolean) => set({ showSlope: show }),

  showSlope15: false,
  setShowSlope15: (show: boolean) => set({ showSlope15: show }),

  showSlope30: false,
  setShowSlope30: (show: boolean) => set({ showSlope30: show }),

  showSlope45: false,
  setShowSlope45: (show: boolean) => set({ showSlope45: show }),

  showSlope60: false,
  setShowSlope60: (show: boolean) => set({ showSlope60: show }),

  showSlope72: false,
  setShowSlope72: (show: boolean) => set({ showSlope72: show }),

  showSprings: false,
  setShowSprings: (show: boolean) => set({ showSprings: show }),

  showVillages: false,
  setShowVillages: (show: boolean) => set({ showVillages: show }),

  municipalityBoundaries: [],
  addMunicipalityBoundary: (boundary: MunicipalityBoundary) =>
    set((state) => ({
      municipalityBoundaries: state.municipalityBoundaries.some(
        (b) => b.id === boundary.id,
      )
        ? state.municipalityBoundaries
        : [...state.municipalityBoundaries, boundary],
    })),
  addMunicipalityBoundaries: (boundaries: MunicipalityBoundary[]) =>
    set((state) => ({
      municipalityBoundaries: [
        ...state.municipalityBoundaries,
        ...boundaries.filter(
          (boundary) =>
            !state.municipalityBoundaries.some((b) => b.id === boundary.id),
        ),
      ],
    })),
  removeMunicipalityBoundary: (boundaryId: string) =>
    set((state) => ({
      municipalityBoundaries: state.municipalityBoundaries.filter(
        (boundary) => boundary.id !== boundaryId,
      ),
    })),

  health: [],
  addHealth: (health: Health) =>
    set((state) => ({
      health: state.health.some((h) => h.id === health.id)
        ? state.health
        : [...state.health, health],
    })),
  addHealths: (healths: Health[]) =>
    set((state) => ({
      health: [
        ...state.health,
        ...healths.filter(
          (health) => !state.health.some((h) => h.id === health.id),
        ),
      ],
    })),
  removeHealth: (healthId: string) =>
    set((state) => ({
      health: state.health.filter((health) => health.id !== healthId),
    })),

  municipalityOffices: [],
  addMunicipalityOffice: (office: MunicipalityOffice) =>
    set((state) => ({
      municipalityOffices: state.municipalityOffices.some(
        (o) => o.id === office.id,
      )
        ? state.municipalityOffices
        : [...state.municipalityOffices, office],
    })),
  addMunicipalityOffices: (offices: MunicipalityOffice[]) =>
    set((state) => ({
      municipalityOffices: [
        ...state.municipalityOffices,
        ...offices.filter(
          (office) =>
            !state.municipalityOffices.some((o) => o.id === office.id),
        ),
      ],
    })),
  removeMunicipalityOffice: (officeId: string) =>
    set((state) => ({
      municipalityOffices: state.municipalityOffices.filter(
        (office) => office.id !== officeId,
      ),
    })),

  physicalInfrastructures: [],
  addPhysicalInfrastructure: (infrastructure: PhysicalInfrastructure) =>
    set((state) => ({
      physicalInfrastructures: state.physicalInfrastructures.some(
        (i) => i.id === infrastructure.id,
      )
        ? state.physicalInfrastructures
        : [...state.physicalInfrastructures, infrastructure],
    })),
  addPhysicalInfrastructures: (infrastructures: PhysicalInfrastructure[]) =>
    set((state) => ({
      physicalInfrastructures: [
        ...state.physicalInfrastructures,
        ...infrastructures.filter(
          (infrastructure) =>
            !state.physicalInfrastructures.some(
              (i) => i.id === infrastructure.id,
            ),
        ),
      ],
    })),
  removePhysicalInfrastructure: (infrastructureId: string) =>
    set((state) => ({
      physicalInfrastructures: state.physicalInfrastructures.filter(
        (infrastructure) => infrastructure.id !== infrastructureId,
      ),
    })),

  schools: [],
  addSchool: (school: School) =>
    set((state) => ({
      schools: state.schools.some((s) => s.id === school.id)
        ? state.schools
        : [...state.schools, school],
    })),
  addSchools: (schools: School[]) =>
    set((state) => ({
      schools: [
        ...state.schools,
        ...schools.filter(
          (school) => !state.schools.some((s) => s.id === school.id),
        ),
      ],
    })),
  removeSchool: (schoolId: string) =>
    set((state) => ({
      schools: state.schools.filter((school) => school.id !== schoolId),
    })),

  touristPlaces: [],
  addTouristPlace: (place: TouristPlace) =>
    set((state) => ({
      touristPlaces: state.touristPlaces.some((p) => p.id === place.id)
        ? state.touristPlaces
        : [...state.touristPlaces, place],
    })),
  addTouristPlaces: (places: TouristPlace[]) =>
    set((state) => ({
      touristPlaces: [
        ...state.touristPlaces,
        ...places.filter(
          (place) => !state.touristPlaces.some((p) => p.id === place.id),
        ),
      ],
    })),
  removeTouristPlace: (placeId: string) =>
    set((state) => ({
      touristPlaces: state.touristPlaces.filter(
        (place) => place.id !== placeId,
      ),
    })),

  wardBoundaries: [],
  addWardBoundary: (boundary: WardBoundary) =>
    set((state) => ({
      wardBoundaries: state.wardBoundaries.some((b) => b.id === boundary.id)
        ? state.wardBoundaries
        : [...state.wardBoundaries, boundary],
    })),
  addWardBoundaries: (boundaries: WardBoundary[]) =>
    set((state) => ({
      wardBoundaries: [
        ...state.wardBoundaries,
        ...boundaries.filter(
          (boundary) => !state.wardBoundaries.some((b) => b.id === boundary.id),
        ),
      ],
    })),
  removeWardBoundary: (boundaryId: string) =>
    set((state) => ({
      wardBoundaries: state.wardBoundaries.filter(
        (boundary) => boundary.id !== boundaryId,
      ),
    })),

  wardOffices: [],
  addWardOffice: (office: WardOffice) =>
    set((state) => ({
      wardOffices: state.wardOffices.some((o) => o.id === office.id)
        ? state.wardOffices
        : [...state.wardOffices, office],
    })),
  addWardOffices: (offices: WardOffice[]) =>
    set((state) => ({
      wardOffices: [
        ...state.wardOffices,
        ...offices.filter(
          (office) => !state.wardOffices.some((o) => o.id === office.id),
        ),
      ],
    })),
  removeWardOffice: (officeId: string) =>
    set((state) => ({
      wardOffices: state.wardOffices.filter((office) => office.id !== officeId),
    })),

  aspects: [],
  aspectFlat: null,
  aspectEast: null,
  aspectNorth: null,
  aspectNorthEast: null,
  aspectNorthWest: null,
  aspectSouth: null,
  aspectSouthEast: null,
  aspectSouthWest: null,
  aspectWest: null,
  addAspect: (aspect: Aspect) =>
    set((state) => ({
      aspects: state.aspects.some((a) => a.id === aspect.id)
        ? state.aspects
        : [...state.aspects, aspect],
    })),
  addAspects: (aspects: Aspect[]) =>
    set((state) => ({
      aspects: [
        ...state.aspects,
        ...aspects.filter(
          (aspect) => !state.aspects.some((a) => a.id === aspect.id),
        ),
      ],
      aspectFlat: aspects.find((aspect) => aspect.type_en === "Flat"),
      aspectNorth: aspects.find((aspect) => aspect.type_en === "North"),
      aspectNorthEast: aspects.find((aspect) => aspect.type_en === "NorthEast"),
      aspectEast: aspects.find((aspect) => aspect.type_en === "East"),
      aspectSouthEast: aspects.find((aspect) => aspect.type_en === "SouthEast"),
      aspectSouth: aspects.find((aspect) => aspect.type_en === "South"),
      aspectSouthWest: aspects.find((aspect) => aspect.type_en === "SouthWest"),
      aspectWest: aspects.find((aspect) => aspect.type_en === "West"),
      aspectNorthWest: aspects.find((aspect) => aspect.type_en === "NorthWest"),
    })),
  removeAspect: (aspectId: string) =>
    set((state) => ({
      aspects: state.aspects.filter((aspect) => aspect.id !== aspectId),
    })),

  elevations: [],
  elevation2100: null,
  elevation2600: null,
  elevation3100: null,
  elevation3600: null,
  elevation4257: null,
  addElevation: (elevation: Elevation) =>
    set((state) => ({
      elevations: state.elevations.some((e) => e.id === elevation.id)
        ? state.elevations
        : [...state.elevations, elevation],
    })),
  addElevations: (elevations: Elevation[]) =>
    set((state) => ({
      elevations: [
        ...state.elevations,
        ...elevations.filter(
          (elevation) => !state.elevations.some((e) => e.id === elevation.id),
        ),
      ],
      elevation2100: elevations.find(
        (elevation) => elevation.elevation_en == "2100",
      ),
      elevation2600: elevations.find(
        (elevation) => elevation.elevation_en == "2600",
      ),
      elevation3100: elevations.find(
        (elevation) => elevation.elevation_en == "3100",
      ),
      elevation3600: elevations.find(
        (elevation) => elevation.elevation_en == "3600",
      ),
      elevation4257: elevations.find(
        (elevation) => elevation.elevation_en == "4257",
      ),
    })),
  removeElevation: (elevationId: string) =>
    set((state) => ({
      elevations: state.elevations.filter(
        (elevation) => elevation.id !== elevationId,
      ),
    })),

  highways: [],
  addHighway: (highway: Highway) =>
    set((state) => ({
      highways: state.highways.some((h) => h.id === highway.id)
        ? state.highways
        : [...state.highways, highway],
    })),
  addHighways: (highways: Highway[]) =>
    set((state) => ({
      highways: [
        ...state.highways,
        ...highways.filter(
          (highway) => !state.highways.some((h) => h.id === highway.id),
        ),
      ],
    })),
  removeHighway: (highwayId: string) =>
    set((state) => ({
      highways: state.highways.filter((highway) => highway.id !== highwayId),
    })),

  landUses: [],
  waterBodies: null,
  forest: null,
  cultivation: null,
  bushes: null,
  builtup: null,

  addLandUse: (landUse: LandUse) =>
    set((state) => ({
      landUses: state.landUses.some((l) => l.id === landUse.id)
        ? state.landUses
        : [...state.landUses, landUse],
    })),
  addLandUses: (landUses: LandUse[]) =>
    set((state) => ({
      landUses: [
        ...state.landUses,
        ...landUses.filter(
          (landUse) => !state.landUses.some((l) => l.id === landUse.id),
        ),
      ],
      waterBodies: landUses.find((land) => land.land_use_en == "Waterbodies"),
      forest: landUses.find((land) => land.land_use_en == "Forest"),
      cultivation: landUses.find((land) => land.land_use_en == "Cultivation"),
      bushes: landUses.find((land) => land.land_use_en == "Bushesh"),
      builtup: landUses.find((land) => land.land_use_en == "Builtup"),
    })),
  removeLandUse: (landUseId: string) =>
    set((state) => ({
      landUses: state.landUses.filter((landUse) => landUse.id !== landUseId),
    })),

  roads: [],
  addRoad: (road: Road) =>
    set((state) => ({
      roads: state.roads.some((r) => r.id === road.id)
        ? state.roads
        : [...state.roads, road],
    })),
  addRoads: (roads: Road[]) =>
    set((state) => ({
      roads: [
        ...state.roads,
        ...roads.filter((road) => !state.roads.some((r) => r.id === road.id)),
      ],
    })),
  removeRoad: (roadId: string) =>
    set((state) => ({
      roads: state.roads.filter((road) => road.id !== roadId),
    })),

  slopes: [],
  slope15: null,
  slope30: null,
  slope45: null,
  slope60: null,
  slope72: null,
  addSlope: (slope: Slope) =>
    set((state) => ({
      slopes: state.slopes.some((s) => s.id === slope.id)
        ? state.slopes
        : [...state.slopes, slope],
    })),
  addSlopes: (slopes: Slope[]) =>
    set((state) => ({
      slopes: [
        ...state.slopes,
        ...slopes.filter(
          (slope) => !state.slopes.some((s) => s.id === slope.id),
        ),
      ],
      slope15: slopes.find((slope) => slope.angle_en == "15"),
      slope30: slopes.find((slope) => slope.angle_en == "30"),
      slope45: slopes.find((slope) => slope.angle_en == "45"),
      slope60: slopes.find((slope) => slope.angle_en == "60"),
      slope72: slopes.find((slope) => slope.angle_en == "72"),
    })),
  removeSlope: (slopeId: string) =>
    set((state) => ({
      slopes: state.slopes.filter((slope) => slope.id !== slopeId),
    })),

  springs: [],
  addSpring: (spring: Spring) =>
    set((state) => ({
      springs: state.springs.some((s) => s.id === spring.id)
        ? state.springs
        : [...state.springs, spring],
    })),
  addSprings: (springs: Spring[]) =>
    set((state) => ({
      springs: [
        ...state.springs,
        ...springs.filter(
          (spring) => !state.springs.some((s) => s.id === spring.id),
        ),
      ],
    })),
  removeSpring: (springId: string) =>
    set((state) => ({
      springs: state.springs.filter((spring) => spring.id !== springId),
    })),

  villages: [],
  addVillage: (village: Village) =>
    set((state) => ({
      villages: state.villages.some((v) => v.id === village.id)
        ? state.villages
        : [...state.villages, village],
    })),
  addVillages: (villages: Village[]) =>
    set((state) => ({
      villages: [
        ...state.villages,
        ...villages.filter(
          (village) => !state.villages.some((v) => v.id === village.id),
        ),
      ],
    })),
  removeVillage: (villageId: string) =>
    set((state) => ({
      villages: state.villages.filter((village) => village.id !== villageId),
    })),
}));

export default useStore;
export const defaultInitState: AppState = {
  currentRoute: null,
  setCurrentRoute: () => {},
  currentPartId: null,
  setCurrentPartId: () => {},

  currentChapterId: null,
  setCurrentChapterId: () => {},

  currentSectionId: null,
  setCurrentSectionId: () => {},

  isMapSidebarOpen: false,
  setMapSidebarOpen: () => {},

  showMunicipalityBoundaries: false,
  setShowMunicipalityBoundaries: () => {},

  showHealth: false,
  setShowHealth: () => {},

  showMunicipalityOffices: false,
  setShowMunicipalityOffices: () => {},

  showPhysicalInfrastructures: false,
  setShowPhysicalInfrastructures: () => {},

  showSchools: false,
  setShowSchools: () => {},

  showTouristPlaces: false,
  setShowTouristPlaces: () => {},

  showWardBoundaries: false,
  setShowWardBoundaries: () => {},

  showWardOffices: false,
  setShowWardOffices: () => {},

  showAspect: false,
  setShowAspect: () => {},

  showAspectFlat: false,
  setShowAspectFlat: () => {},

  showAspectNorth: false,
  setShowAspectNorth: () => {},

  showAspectNorthEast: false,
  setShowAspectNorthEast: () => {},

  showAspectEast: false,
  setShowAspectEast: () => {},

  showAspectSouthEast: false,
  setShowAspectSouthEast: () => {},

  showAspectSouth: false,
  setShowAspectSouth: () => {},

  showAspectSouthWest: false,
  setShowAspectSouthWest: () => {},

  showAspectWest: false,
  setShowAspectWest: () => {},

  showAspectNorthWest: false,
  setShowAspectNorthWest: () => {},

  showElevation: false,
  setShowElevation: () => {},

  showElevation2100: false,
  setShowElevation2100: () => {},

  showElevation2600: false,
  setShowElevation2600: () => {},

  showElevation3100: false,
  setShowElevation3100: () => {},

  showElevation3600: false,
  setShowElevation3600: () => {},

  showElevation4257: false,
  setShowElevation4257: () => {},

  showHighway: false,
  setShowHighway: () => {},

  showLandUse: false,
  setShowLandUse: () => {},

  showLandUseWaterbodies: false,
  setShowLandUseWaterbodies: () => {},

  showLandUseForest: false,
  setShowLandUseForest: () => {},

  showLandUseCultivation: false,
  setShowLandUseCultivation: () => {},

  showLandUseBushes: false,
  setShowLandUseBushes: () => {},

  showLandUseBuiltup: false,
  setShowLandUseBuiltup: () => {},

  showRoads: false,
  setShowRoads: () => {},

  showSlope: false,
  setShowSlope: () => {},

  showSlope15: false,
  setShowSlope15: () => {},

  showSlope30: false,
  setShowSlope30: () => {},

  showSlope45: false,
  setShowSlope45: () => {},

  showSlope60: false,
  setShowSlope60: () => {},

  showSlope72: false,
  setShowSlope72: () => {},

  showSprings: false,
  setShowSprings: () => {},

  showVillages: false,
  setShowVillages: () => {},

  municipalityBoundaries: [],
  addMunicipalityBoundary: () => {},
  addMunicipalityBoundaries: () => {},
  removeMunicipalityBoundary: () => {},

  health: [],
  addHealth: () => {},
  addHealths: () => {},
  removeHealth: () => {},

  municipalityOffices: [],
  addMunicipalityOffice: () => {},
  addMunicipalityOffices: () => {},
  removeMunicipalityOffice: () => {},

  physicalInfrastructures: [],
  addPhysicalInfrastructure: () => {},
  addPhysicalInfrastructures: () => {},
  removePhysicalInfrastructure: () => {},

  schools: [],
  addSchool: () => {},
  addSchools: () => {},
  removeSchool: () => {},

  touristPlaces: [],
  addTouristPlace: () => {},
  addTouristPlaces: () => {},
  removeTouristPlace: () => {},

  wardBoundaries: [],
  addWardBoundary: () => {},
  addWardBoundaries: () => {},
  removeWardBoundary: () => {},

  wardOffices: [],
  addWardOffice: () => {},
  addWardOffices: () => {},
  removeWardOffice: () => {},

  aspects: [],
  aspectEast: null,
  aspectFlat: null,
  aspectNorth: null,
  aspectNorthEast: null,
  aspectNorthWest: null,
  aspectSouth: null,
  aspectSouthEast: null,
  aspectSouthWest: null,
  aspectWest: null,
  addAspect: () => {},
  addAspects: () => {},
  removeAspect: () => {},

  elevations: [],
  elevation2100: null,
  elevation2600: null,
  elevation3100: null,
  elevation3600: null,
  elevation4257: null,
  addElevation: () => {},
  addElevations: () => {},
  removeElevation: () => {},

  highways: [],
  addHighway: () => {},
  addHighways: () => {},
  removeHighway: () => {},

  landUses: [],
  waterBodies: null,
  forest: null,
  cultivation: null,
  bushes: null,
  builtup: null,
  addLandUse: () => {},
  addLandUses: () => {},
  removeLandUse: () => {},

  roads: [],
  addRoad: () => {},
  addRoads: () => {},
  removeRoad: () => {},

  slopes: [],
  slope15: null,
  slope30: null,
  slope45: null,
  slope60: null,
  slope72: null,
  addSlope: () => {},
  addSlopes: () => {},
  removeSlope: () => {},

  springs: [],
  addSpring: () => {},
  addSprings: () => {},
  removeSpring: () => {},

  villages: [],
  addVillage: () => {},
  addVillages: () => {},
  removeVillage: () => {},
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return create<AppState>((set) => ({
    ...initState,
    setCurrentRoute: (route: Route | null) => set({ currentRoute: route }),
    setCurrentPartId: (partId: string | null) => set({ currentPartId: partId }),
    setCurrentChapterId: (chapterId: string | null) =>
      set({ currentChapterId: chapterId }),
    setCurrentSectionId: (sectionId: string | null) =>
      set({ currentSectionId: sectionId }),
    setMapSidebarOpen: (isOpen: boolean) => set({ isMapSidebarOpen: isOpen }),
    setShowMunicipalityBoundaries: (show: boolean) =>
      set({ showMunicipalityBoundaries: show }),
    setShowHealth: (show: boolean) => set({ showHealth: show }),
    setShowMunicipalityOffices: (show: boolean) =>
      set({ showMunicipalityOffices: show }),
    setShowPhysicalInfrastructures: (show: boolean) =>
      set({ showPhysicalInfrastructures: show }),
    setShowSchools: (show: boolean) => set({ showSchools: show }),
    setShowTouristPlaces: (show: boolean) => set({ showTouristPlaces: show }),
    setShowWardBoundaries: (show: boolean) => set({ showWardBoundaries: show }),
    setShowWardOffices: (show: boolean) => set({ showWardOffices: show }),
    setShowAspect: (show: boolean) => set({ showAspect: show }),
    setShowAspectFlat: (show: boolean) => set({ showAspectFlat: show }),
    setShowAspectNorth: (show: boolean) => set({ showAspectNorth: show }),
    setShowAspectNorthEast: (show: boolean) =>
      set({ showAspectNorthEast: show }),
    setShowAspectEast: (show: boolean) => set({ showAspectEast: show }),
    setShowAspectSouthEast: (show: boolean) =>
      set({ showAspectSouthEast: show }),
    setShowAspectSouth: (show: boolean) => set({ showAspectSouth: show }),
    setShowAspectSouthWest: (show: boolean) =>
      set({ showAspectSouthWest: show }),
    setShowAspectWest: (show: boolean) => set({ showAspectWest: show }),
    setShowAspectNorthWest: (show: boolean) =>
      set({ showAspectNorthWest: show }),
    setShowElevation: (show: boolean) => set({ showElevation: show }),
    setShowElevation2100: (show: boolean) => set({ showElevation2100: show }),
    setShowElevation2600: (show: boolean) => set({ showElevation2600: show }),
    setShowElevation3100: (show: boolean) => set({ showElevation3100: show }),
    setShowElevation3600: (show: boolean) => set({ showElevation3600: show }),
    setShowElevation4257: (show: boolean) => set({ showElevation4257: show }),
    setShowHighway: (show: boolean) => set({ showHighway: show }),
    setShowLandUse: (show: boolean) => set({ showLandUse: show }),
    setShowLandUseWaterbodies: (show: boolean) =>
      set({ showLandUseWaterbodies: show }),
    setShowLandUseForest: (show: boolean) => set({ showLandUseForest: show }),
    setShowLandUseCultivation: (show: boolean) =>
      set({ showLandUseCultivation: show }),
    setShowLandUseBushes: (show: boolean) => set({ showLandUseBushes: show }),
    setShowLandUseBuiltup: (show: boolean) => set({ showLandUseBuiltup: show }),
    setShowRoads: (show: boolean) => set({ showRoads: show }),
    setShowSlope: (show: boolean) => set({ showSlope: show }),
    setShowSlope15: (show: boolean) => set({ showSlope15: show }),
    setShowSlope30: (show: boolean) => set({ showSlope30: show }),
    setShowSlope45: (show: boolean) => set({ showSlope45: show }),
    setShowSlope60: (show: boolean) => set({ showSlope60: show }),
    setShowSlope72: (show: boolean) => set({ showSlope72: show }),
    setShowSprings: (show: boolean) => set({ showSprings: show }),
    setShowVillages: (show: boolean) => set({ showVillages: show }),
    addMunicipalityBoundary: (boundary: MunicipalityBoundary) =>
      set((state) => ({
        municipalityBoundaries: state.municipalityBoundaries.some(
          (b) => b.id === boundary.id,
        )
          ? state.municipalityBoundaries
          : [...state.municipalityBoundaries, boundary],
      })),
    addMunicipalityBoundaries: (boundaries: MunicipalityBoundary[]) =>
      set((state) => ({
        municipalityBoundaries: [
          ...state.municipalityBoundaries,
          ...boundaries.filter(
            (boundary) =>
              !state.municipalityBoundaries.some((b) => b.id === boundary.id),
          ),
        ],
      })),
    removeMunicipalityBoundary: (boundaryId: string) =>
      set((state) => ({
        municipalityBoundaries: state.municipalityBoundaries.filter(
          (boundary) => boundary.id !== boundaryId,
        ),
      })),
    addHealth: (health: Health) =>
      set((state) => ({
        health: state.health.some((h) => h.id === health.id)
          ? state.health
          : [...state.health, health],
      })),
    addHealths: (healths: Health[]) =>
      set((state) => ({
        health: [
          ...state.health,
          ...healths.filter(
            (health) => !state.health.some((h) => h.id === health.id),
          ),
        ],
      })),
    removeHealth: (healthId: string) =>
      set((state) => ({
        health: state.health.filter((health) => health.id !== healthId),
      })),
    addMunicipalityOffice: (office: MunicipalityOffice) =>
      set((state) => ({
        municipalityOffices: state.municipalityOffices.some(
          (o) => o.id === office.id,
        )
          ? state.municipalityOffices
          : [...state.municipalityOffices, office],
      })),
    addMunicipalityOffices: (offices: MunicipalityOffice[]) =>
      set((state) => ({
        municipalityOffices: [
          ...state.municipalityOffices,
          ...offices.filter(
            (office) =>
              !state.municipalityOffices.some((o) => o.id === office.id),
          ),
        ],
      })),
    removeMunicipalityOffice: (officeId: string) =>
      set((state) => ({
        municipalityOffices: state.municipalityOffices.filter(
          (office) => office.id !== officeId,
        ),
      })),
    addPhysicalInfrastructure: (infrastructure: PhysicalInfrastructure) =>
      set((state) => ({
        physicalInfrastructures: state.physicalInfrastructures.some(
          (i) => i.id === infrastructure.id,
        )
          ? state.physicalInfrastructures
          : [...state.physicalInfrastructures, infrastructure],
      })),
    addPhysicalInfrastructures: (infrastructures: PhysicalInfrastructure[]) =>
      set((state) => ({
        physicalInfrastructures: [
          ...state.physicalInfrastructures,
          ...infrastructures.filter(
            (infrastructure) =>
              !state.physicalInfrastructures.some(
                (i) => i.id === infrastructure.id,
              ),
          ),
        ],
      })),
    removePhysicalInfrastructure: (infrastructureId: string) =>
      set((state) => ({
        physicalInfrastructures: state.physicalInfrastructures.filter(
          (infrastructure) => infrastructure.id !== infrastructureId,
        ),
      })),
    addSchool: (school: School) =>
      set((state) => ({
        schools: state.schools.some((s) => s.id === school.id)
          ? state.schools
          : [...state.schools, school],
      })),
    addSchools: (schools: School[]) =>
      set((state) => ({
        schools: [
          ...state.schools,
          ...schools.filter(
            (school) => !state.schools.some((s) => s.id === school.id),
          ),
        ],
      })),
    removeSchool: (schoolId: string) =>
      set((state) => ({
        schools: state.schools.filter((school) => school.id !== schoolId),
      })),
    addTouristPlace: (place: TouristPlace) =>
      set((state) => ({
        touristPlaces: state.touristPlaces.some((p) => p.id === place.id)
          ? state.touristPlaces
          : [...state.touristPlaces, place],
      })),
    addTouristPlaces: (places: TouristPlace[]) =>
      set((state) => ({
        touristPlaces: [
          ...state.touristPlaces,
          ...places.filter(
            (place) => !state.touristPlaces.some((p) => p.id === place.id),
          ),
        ],
      })),
    removeTouristPlace: (placeId: string) =>
      set((state) => ({
        touristPlaces: state.touristPlaces.filter(
          (place) => place.id !== placeId,
        ),
      })),
    addWardBoundary: (boundary: WardBoundary) =>
      set((state) => ({
        wardBoundaries: state.wardBoundaries.some((b) => b.id === boundary.id)
          ? state.wardBoundaries
          : [...state.wardBoundaries, boundary],
      })),
    addWardBoundaries: (boundaries: WardBoundary[]) =>
      set((state) => ({
        wardBoundaries: [
          ...state.wardBoundaries,
          ...boundaries.filter(
            (boundary) =>
              !state.wardBoundaries.some((b) => b.id === boundary.id),
          ),
        ],
      })),
    removeWardBoundary: (boundaryId: string) =>
      set((state) => ({
        wardBoundaries: state.wardBoundaries.filter(
          (boundary) => boundary.id !== boundaryId,
        ),
      })),
    addWardOffice: (office: WardOffice) =>
      set((state) => ({
        wardOffices: state.wardOffices.some((o) => o.id === office.id)
          ? state.wardOffices
          : [...state.wardOffices, office],
      })),
    addWardOffices: (offices: WardOffice[]) =>
      set((state) => ({
        wardOffices: [
          ...state.wardOffices,
          ...offices.filter(
            (office) => !state.wardOffices.some((o) => o.id === office.id),
          ),
        ],
      })),
    removeWardOffice: (officeId: string) =>
      set((state) => ({
        wardOffices: state.wardOffices.filter(
          (office) => office.id !== officeId,
        ),
      })),
    addAspect: (aspect: Aspect) =>
      set((state) => ({
        aspects: state.aspects.some((a) => a.id === aspect.id)
          ? state.aspects
          : [...state.aspects, aspect],
      })),
    addAspects: (aspects: Aspect[]) =>
      set((state) => ({
        aspects: [
          ...state.aspects,
          ...aspects.filter(
            (aspect) => !state.aspects.some((a) => a.id === aspect.id),
          ),
        ],
      })),
    removeAspect: (aspectId: string) =>
      set((state) => ({
        aspects: state.aspects.filter((aspect) => aspect.id !== aspectId),
      })),
    addElevation: (elevation: Elevation) =>
      set((state) => ({
        elevations: state.elevations.some((e) => e.id === elevation.id)
          ? state.elevations
          : [...state.elevations, elevation],
      })),
    addElevations: (elevations: Elevation[]) =>
      set((state) => ({
        elevations: [
          ...state.elevations,
          ...elevations.filter(
            (elevation) => !state.elevations.some((e) => e.id === elevation.id),
          ),
        ],
      })),
    removeElevation: (elevationId: string) =>
      set((state) => ({
        elevations: state.elevations.filter(
          (elevation) => elevation.id !== elevationId,
        ),
      })),
    addHighway: (highway: Highway) =>
      set((state) => ({
        highways: state.highways.some((h) => h.id === highway.id)
          ? state.highways
          : [...state.highways, highway],
      })),
    addHighways: (highways: Highway[]) =>
      set((state) => ({
        highways: [
          ...state.highways,
          ...highways.filter(
            (highway) => !state.highways.some((h) => h.id === highway.id),
          ),
        ],
      })),
    removeHighway: (highwayId: string) =>
      set((state) => ({
        highways: state.highways.filter((highway) => highway.id !== highwayId),
      })),
    addLandUse: (landUse: LandUse) =>
      set((state) => ({
        landUses: state.landUses.some((l) => l.id === landUse.id)
          ? state.landUses
          : [...state.landUses, landUse],
      })),
    addLandUses: (landUses: LandUse[]) =>
      set((state) => ({
        landUses: [
          ...state.landUses,
          ...landUses.filter(
            (landUse) => !state.landUses.some((l) => l.id === landUse.id),
          ),
        ],
      })),
    removeLandUse: (landUseId: string) =>
      set((state) => ({
        landUses: state.landUses.filter((landUse) => landUse.id !== landUseId),
      })),
    addRoad: (road: Road) =>
      set((state) => ({
        roads: state.roads.some((r) => r.id === road.id)
          ? state.roads
          : [...state.roads, road],
      })),
    addRoads: (roads: Road[]) =>
      set((state) => ({
        roads: [
          ...state.roads,
          ...roads.filter((road) => !state.roads.some((r) => r.id === road.id)),
        ],
      })),
    removeRoad: (roadId: string) =>
      set((state) => ({
        roads: state.roads.filter((road) => road.id !== roadId),
      })),
    addSlope: (slope: Slope) =>
      set((state) => ({
        slopes: state.slopes.some((s) => s.id === slope.id)
          ? state.slopes
          : [...state.slopes, slope],
      })),
    addSlopes: (slopes: Slope[]) =>
      set((state) => ({
        slopes: [
          ...state.slopes,
          ...slopes.filter(
            (slope) => !state.slopes.some((s) => s.id === slope.id),
          ),
        ],
      })),
    removeSlope: (slopeId: string) =>
      set((state) => ({
        slopes: state.slopes.filter((slope) => slope.id !== slopeId),
      })),
    addSpring: (spring: Spring) =>
      set((state) => ({
        springs: state.springs.some((s) => s.id === spring.id)
          ? state.springs
          : [...state.springs, spring],
      })),
    addSprings: (springs: Spring[]) =>
      set((state) => ({
        springs: [
          ...state.springs,
          ...springs.filter(
            (spring) => !state.springs.some((s) => s.id === spring.id),
          ),
        ],
      })),
    removeSpring: (springId: string) =>
      set((state) => ({
        springs: state.springs.filter((spring) => spring.id !== springId),
      })),
    addVillage: (village: Village) =>
      set((state) => ({
        villages: state.villages.some((v) => v.id === village.id)
          ? state.villages
          : [...state.villages, village],
      })),
    addVillages: (villages: Village[]) =>
      set((state) => ({
        villages: [
          ...state.villages,
          ...villages.filter(
            (village) => !state.villages.some((v) => v.id === village.id),
          ),
        ],
      })),
    removeVillage: (villageId: string) =>
      set((state) => ({
        villages: state.villages.filter((village) => village.id !== villageId),
      })),
  }));
};
