import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, MapPin, Users, Mountain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const features = [
    {
      icon: <Mountain className="w-5 h-5" />,
      title: "Geographical Location",
      description: "Situated in Solukhumbu District of Province No. 1, Nepal",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Administrative Center",
      description: "Headquarters located in Chaulakharka",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: "Formation",
      description: "Merged from Goli, Chaulakharka, and Bhakanje VDCs",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Governance",
      description: "Rural municipality with 5 administrative wards",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Section Header */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight leading-tight">
                About Likhu Pike
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed tracking-tighter">
                Discover the beauty and potential of our thriving rural
                municipality
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-6 text-gray-600">
              <p className="leading-relaxed tracking-tight">
                Likhu Pike (नेपाली: लिखु पिके गाउँपालिका) is a rural
                municipality established through the merger of former Village
                Development Committees, covering 124.38 square kilometers of
                diverse terrain.
              </p>
              <p className="leading-relaxed tracking-tight">
                With a population of 5,534, our municipality represents a
                vibrant community focused on sustainable development and
                preserving our rich cultural heritage.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-all duration-200 border-green-100/50">
                    <CardContent className="p-4">
                      <div className="flex gap-4 items-start">
                        <div className="p-2 rounded-xl bg-green-50 text-green-600">
                          {feature.icon}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-gray-800">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/likhu-pike-landscape.jpg"
                alt="Likhu Pike Landscape"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full rounded-2xl bg-green-100/50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
