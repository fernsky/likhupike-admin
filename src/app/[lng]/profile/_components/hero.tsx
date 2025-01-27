import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";
import React from "react";
import MountainImage from "../../../../../public/images/hero-mountain.png";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroProps {
  lng: string;
}

const Hero: React.FC<HeroProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "hero", {});
  return (
    <section className="relative pt-24 lg:pt-32 pb-20 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800 leading-[1.15] mb-4"
              >
                {t("title")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600/90 tracking-tight leading-relaxed mb-8"
              >
                {t("subtitle")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg sm:text-xl bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent font-medium tracking-normal mb-6"
              >
                Agriculture, tourism, energy, and more,
                <br />
                Likhupike's progress at its core.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href={`https://digprofile.com/likhupike`}>
                <button className="px-8 py-3.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-[15px] font-medium tracking-wide">
                  {t("viewProfile")}
                </button>
              </Link>
              <Link href={`/${lng}/map`}>
                <button className="px-8 py-3.5 border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-all duration-300 text-[15px] font-medium tracking-wide">
                  {t("exploreMap")}
                </button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] sm:h-[400px] lg:h-[500px]"
          >
            <Image
              src={MountainImage}
              alt="Mountain"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
