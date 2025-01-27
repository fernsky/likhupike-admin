import MapClient from "./_components/map-client";

interface MapPageProps {
  params: {
    lng: string;
  };
}

const MapPage = ({ params }: MapPageProps) => {
  return <MapClient params={params} />;
};

export default MapPage;
