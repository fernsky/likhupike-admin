import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Flag,
  Users,
  Building,
  FileText,
  Award,
  ChevronRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const HistoryTimeline = () => {
  const events = [
    {
      year: 2015,
      title: "Constitutional Milestone",
      description:
        "Promulgation of the new Constitution of Nepal, establishing federal democratic republic",
      icon: Flag,
      color: "bg-green-100 text-green-600",
      location: "Kathmandu",
      impact: "National restructuring",
      category: "Governance",
    },
    {
      year: 2017,
      title: "Municipality Formation",
      description:
        "Official establishment of Likhu Pike Rural Municipality under the new federal structure",
      icon: Building,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      year: 2018,
      title: "First Local Government",
      description:
        "Formation of first elected local government and administrative setup",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      year: 2021,
      title: "National Census",
      description:
        "Population: 5,334 | Households: 1,268 | Average Family Size: 5",
      icon: FileText,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      year: 2023,
      title: "Digital Transformation",
      description: "Launch of digital profile and e-governance initiatives",
      icon: Award,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-transparent" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-4 h-4 mr-1" />
            Historical Journey
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Our Journey Through Time
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Key milestones in the development of Likhupike Rural Municipality
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-200 via-green-400 to-green-200 md:transform md:-translate-x-1/2" />

          {events.map((event, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              key={event.year}
              className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Enhanced Timeline Point for Mobile */}
              <motion.div
                className="absolute left-[16px] md:left-1/2 z-10 top-[24px] md:top-1/2 transform -translate-y-1/2 md:-translate-x-1/2"
                whileHover={{ scale: 1.2 }}
              >
                <div className="w-12 h-12 md:w-4 md:h-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg flex items-center justify-center md:bg-primary group-hover:shadow-emerald-500/25">
                  <span className="text-white text-sm font-semibold md:hidden">
                    {event.year}
                  </span>
                </div>
                {/* Mobile Year Label */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-green-600 bg-white px-2 py-1 rounded-full shadow-sm border border-green-100 md:hidden">
                  {event.category}
                </div>
              </motion.div>

              {/* Content */}
              <div
                className={`pl-20 md:pl-0 w-full md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative">
                    {/* Enhanced gradient header */}
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/5" />

                    <div className="relative p-4 md:p-6">
                      {/* Mobile-optimized header */}
                      <div className="flex items-start md:items-center gap-3 mb-4">
                        <div
                          className={`hidden md:flex p-3 rounded-xl ${event.color} backdrop-blur-sm group-hover:scale-110 transition-transform`}
                        >
                          <event.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1 w-full">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className="font-medium hidden md:inline-flex"
                            >
                              {event.category}
                            </Badge>
                            <span className="hidden md:block text-sm font-semibold text-primary">
                              {event.year}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Rest of the content */}
                      <div className="space-y-3">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t flex flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">
                            {event.location}
                          </span>
                        </div>
                        <button className="flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all w-full md:w-auto justify-center md:justify-start">
                          Learn more <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
