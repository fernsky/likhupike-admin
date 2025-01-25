import Hero from "./_components/hero";
import Footer from "./_components/footer";
import React from "react";
import { LanguageParams } from "./_store/types";

export default async function Home({ params }: LanguageParams) {
  const { lng } = await params;
  return (
    <React.Fragment>
      <Hero lng={lng} />
      <Footer lng={lng} />
    </React.Fragment>
  );
}
