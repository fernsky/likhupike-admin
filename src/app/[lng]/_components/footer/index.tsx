import Link from "next/link";
import React from "react";
import FacebookIcon from "./logos/facebook";
import InstagramIcon from "./logos/instagram";
import TwitterIcon from "./logos/twitter";
import YoutubeIcon from "./logos/youtube";
import { Copyright } from "lucide-react";
import { useTranslation } from "@/app/i18n";

interface FooterProps {
  lng: string;
}

const Footer: React.FC<FooterProps> = async ({ lng }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "footer");
  console.log(lng);
  return (
    <footer className="w-full bg-[#F1F1F1] py-[20px] h-[308px] flex flex-col items-center justify-center">
      <div className="flex flex-col gap-[24px] w-[1080px] tracking-[-0.4px]">
        <div className="flex justify-between">
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[#000000] text-[14px]">{t("resources")}</h1>
            <ul className="flex flex-col gap-[4px]">
              <li className="text-[#3E3E3E] text-[12px]">{t("profile")}</li>
              <li className="text-[#3E3E3E] text-[12px]">{t("map")}</li>
              <li className="text-[#3E3E3E] text-[12px]">{t("downloads")}</li>
            </ul>
          </div>
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[#000000] text-[14px] text-right">
              {t("followUs")}
            </h1>
            <ul className="flex justify-end gap-[6px]">
              <Link href="https://www.facebook.com/">
                <FacebookIcon />
              </Link>
              <Link href="https://www.instagram.com/">
                <InstagramIcon />
              </Link>
              <Link href="https://www.twitter.com/">
                <TwitterIcon />
              </Link>
              <Link href="https://www.youtube.com/">
                <YoutubeIcon />
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-[2px]">
            <span className="text-[10px] text-[#5E5E5E]">{t("copyright")}</span>
            <Copyright className="text-[#363636] stroke-[1.5px] w-[12px] h-[12px]" />
            <span className="text-[10px] text-[#5E5E5E]">
              {t(`date-${new Date().getFullYear()}`)}
            </span>
          </div>
          <div className="text-[10px] text-[#5E5E5E]">{t("terms")}</div>
          <p className="text-[10px] text-[#5E5E5E]">{t("municipality")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
