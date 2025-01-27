import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { MapPinned, Users, Home, Trees } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Statistics = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    {
      label: "Total Area",
      value: 124.38,
      suffix: "km²",
      icon: <MapPinned className="w-6 h-6" />,
      description: "Total land coverage",
    },
    {
      label: "Population",
      value: 5534,
      suffix: "+",
      icon: <Users className="w-6 h-6" />,
      description: "Resident count",
    },
    {
      label: "Wards",
      value: 5,
      suffix: "",
      icon: <Home className="w-6 h-6" />,
      description: "Administrative divisions",
    },
    {
      label: "Villages",
      value: 3,
      suffix: "",
      icon: <Trees className="w-6 h-6" />,
      description: "Rural communities",
    },
  ];

  return (
    <div ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight leading-tight">
            Municipality Overview
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed tracking-tight">
            Key statistics and figures that define our local governance and
            community
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-green-100/50">
                <CardHeader className="border-b bg-muted/50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-green-50 text-green-600">
                      {stat.icon}
                    </div>
                    <CardTitle className="text-base font-medium text-gray-600">
                      {stat.label}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-gray-800 tracking-tight">
                      {inView && (
                        <CountUp
                          end={stat.value}
                          duration={2}
                          decimals={stat.label === "Total Area" ? 2 : 0}
                        />
                      )}
                    </span>
                    <span className="text-lg font-semibold text-green-600">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
