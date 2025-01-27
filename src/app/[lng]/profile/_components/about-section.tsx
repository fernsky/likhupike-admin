import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, MapPin, Users, Mountain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutSection = () => {
  const features = [
    {
      icon: <Mountain className="w-5 h-5" />,
      title: "Geographical Location",
      description:
        "Located in Solukhumbu District, covering 124.38 sq. kilometers",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Administrative Center",
      description: "Central operations based in Chaulakharka municipality",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: "Formation History",
      description:
        "Established through merger of three major VDCs in the region",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Local Governance",
      description:
        "Structured with 5 administrative wards for effective management",
      color: "from-green-400 to-emerald-500",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-green-50/30" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              <Badge variant="outline" className="mb-4">
                <Mountain className="w-4 h-4 mr-1" />
                About Us
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                About Likhu Pike
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
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
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-full flex flex-col">
                      <div
                        className={`absolute inset-x-0 top-0 h-12 bg-gradient-to-br ${feature.color} opacity-10`}
                      />
                      <CardContent className="relative p-6">
                        <div className="flex flex-col gap-4">
                          <div
                            className={`p-3 w-fit rounded-xl bg-gradient-to-br ${feature.color} text-white group-hover:scale-110 transition-transform`}
                          >
                            {feature.icon}
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900">
                              {feature.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
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
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
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
