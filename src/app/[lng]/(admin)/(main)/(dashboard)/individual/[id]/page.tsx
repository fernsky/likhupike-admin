"use client";

import React from "react";

interface IndividualPageProps {
  params: {
    id: string;
    lng: string;
  };
}

const IndividualPage = ({ params }: IndividualPageProps) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Individual Details</h1>
      <p>ID: {params.id}</p>
      <p>Language: {params.lng}</p>
    </div>
  );
};

export default IndividualPage;
