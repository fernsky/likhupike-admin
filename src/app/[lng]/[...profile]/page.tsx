import BreadCrumb from "@/components/Profile/BreadCrumb";
import Content from "@/components/Profile/Content";
import Title from "@/components/Profile/Title";
import { sampleContent } from "@/data/sampleContent";
import React from "react";

interface ProfileProps {
  params: {
    profile: string[];
    lng: string;
  };
}

export default async function Profile({ params }: ProfileProps) {
  const { profile, lng } = params;

  // Parse the profile parts from the catch-all route
  const part = profile[0];
  const chapter = profile[1];
  const section = profile[2];

  return (
    <React.Fragment>
      <div className="flex flex-col w-[800px] gap-[32px] pb-[100px]">
        <BreadCrumb />
        <div className="flex flex-col gap-[16px]">
          <Title>Major Settlement Areas</Title>
          <Content lng={lng} content={sampleContent} />
        </div>
      </div>
    </React.Fragment>
  );
}
