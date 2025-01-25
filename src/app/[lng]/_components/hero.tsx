import { useTranslation } from "@/app/i18n";
import Image from "next/image";
import React from "react";
import MountainImage from "../../../../public/images/hero-mountain.png";
import Link from "next/link";

interface HeroProps {
  lng: string;
}

const Hero: React.FC<HeroProps> = async ({ lng }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "hero");
  return (
    <React.Fragment>
      <div className="w-full flex justify-center mt-[200px] mb-[260px]">
        <div className="w-[1080px] grid grid-cols-[1fr_594px]">
          <div className="flex gap-[30px] flex-col">
            <div className="flex flex-col gap-0">
              <p className="tracking-[-4px] text-[#1C1C1C] font-[510] text-[84px] p-0 mb-[-10px]">
                {t("title")}
              </p>
              <p className="text-[#636363] text-[24px] tracking-[-1px] font-[500] mt-[-10px]">
                {t("subtitle")}
              </p>
            </div>
            <p className="text-[#727272] text-left flex flex-col">
              <span>{t("line1")}</span>
              <span>{t("line2")}</span>
            </p>
            <div className="flex w-full gap-[24px]">
              <Link href={`https://digprofile.com/likhupike`}>
                <button className="flex items-center justify-center tracking-[-0.8px] font-medium text-[#FFFFFF] text-[24px] px-[28px] py-[14px] rounded-[12px] bg-[linear-gradient(112.422deg,_rgba(100,_186,_0,_0.8)_0%,_rgba(50,_93,_0,_0.76)_70%)]">
                  {t("viewProfile")}
                </button>
              </Link>
              <Link
                href={`/${lng}/map`}
                className="font-medium border-[1px] rounded-[12px] text-[#5B5B5B] text-[20px] px-[16px] py-[10px] flex items-center justify-center w-[180px] border-[#DADADA] tracking-[-1px]"
              >
                <button>{t("exploreMap")}</button>
              </Link>
            </div>
          </div>
          <Image src={MountainImage} alt="Mountain" width={594} height={436} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hero;
