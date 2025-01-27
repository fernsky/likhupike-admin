import Image from "next/image";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About Likhu Pike
            </h2>
            <p className="text-gray-600 mb-4">
              Likhu Pike (Nepali: लिखु पिके गाउँपालिका) is a rural municipality
              (gaunpalika) located in Solukhumbu District of Province No. 1 of
              Nepal. It is one of the seven rural municipalities in the
              district.
            </p>
            <p className="text-gray-600 mb-4">
              The municipality was formed by merging the former Village
              Development Committees of Goli, Chaulakharka, and Bhakanje. It
              covers an area of 124.38 square kilometers and has a population of
              5534 as per the 2011 Census of Nepal.
            </p>
            <p className="text-gray-600 mb-4">
              The rural municipality is divided into 5 wards, with its
              headquarters situated in Chaulakharka.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/images/likhu-pike-landscape.jpg"
              alt="Likhu Pike Landscape"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
