"use client";
import React from "react";
import useStore from "../../_store/app-store";
import Sidebar from "./sidebar";
import FloatingSidebar from "./floating-sidebar";

interface SidebarWrapperProps {
  lng: string;
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ lng }) => {
  const isMapSidebarOpen = useStore((state) => state.isMapSidebarOpen);

  return (
    <>
      {isMapSidebarOpen ? (
        <div className="absolute top-0 left-0 z-[999] h-full bg-white">
          <Sidebar lng={lng} />
        </div>
      ) : (
        <FloatingSidebar lng={lng} />
      )}
    </>
  );
};

export default SidebarWrapper;
