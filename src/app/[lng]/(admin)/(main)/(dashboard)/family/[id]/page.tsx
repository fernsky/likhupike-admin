"use client";

import { useParams } from "next/navigation";

export default function FamilyDetailsPage() {
  const params = useParams();
  const familyId = params.id;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Family Details</h1>
      <p>Family ID: {familyId}</p>
      <div className="mt-4">
        {/* Add more family details here */}
        <p>This is the individual family page. Content coming soon...</p>
      </div>
    </div>
  );
}
