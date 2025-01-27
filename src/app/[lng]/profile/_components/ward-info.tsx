import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  MapPin,
  ArrowUpRight,
  GridIcon,
  TrendingUp,
  GraduationCap,
  Baby,
  Building2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  trend,
}) => (
  <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
    </div>
    {trend && (
      <div className="mt-2 flex items-center gap-1">
        <TrendingUp className="w-4 h-4 text-green-500" />
        <span className="text-sm text-green-600">{trend}</span>
      </div>
    )}
  </div>
);

const WardInfo = () => {
  const wards = [
    {
      number: 1,
      households: 152,
      population: 558,
      area: 35.9,
      density: 15.54,
      avgFamilySize: 4,
      genderRatio: 119.69,
      growthRate: -2.46,
      description: "Northern region with vast mountainous terrain",
      color: "from-green-500 to-emerald-600",
      indicators: {
        households: "18% agricultural",
        education: "75% literacy rate",
        health: "1 health post",
        infrastructure: "12km road network",
      },
    },
    {
      number: 2,
      households: 388,
      population: 1645,
      area: 27.62,
      density: 59.56,
      avgFamilySize: 4,
      genderRatio: 109.55,
      growthRate: 1.23,
      description: "Central agricultural hub with fertile lands",
      color: "from-emerald-500 to-green-600",
      indicators: {
        households: "25% agricultural",
        education: "80% literacy rate",
        health: "2 health posts",
        infrastructure: "20km road network",
      },
    },
    {
      number: 3,
      households: 233,
      population: 1197,
      area: 10.03,
      density: 119.34,
      avgFamilySize: 5,
      genderRatio: 97.69,
      growthRate: 0.56,
      description: "Dense settlement with mixed development",
      color: "from-green-400 to-emerald-500",
      indicators: {
        households: "30% agricultural",
        education: "85% literacy rate",
        health: "3 health posts",
        infrastructure: "15km road network",
      },
    },
    {
      number: 4,
      households: 246,
      population: 1334,
      area: 5.53,
      density: 241.23,
      avgFamilySize: 5,
      genderRatio: 113.78,
      growthRate: 2.34,
      description: "Urban core with highest population density",
      color: "from-emerald-400 to-green-500",
      indicators: {
        households: "35% agricultural",
        education: "90% literacy rate",
        health: "4 health posts",
        infrastructure: "25km road network",
      },
    },
    {
      number: 5,
      households: 249,
      population: 1117,
      area: 45.31,
      density: 24.65,
      avgFamilySize: 4,
      genderRatio: 104.21,
      growthRate: -1.12,
      description: "Southern region with diverse landscape",
      color: "from-green-500 to-emerald-500",
      indicators: {
        households: "40% agricultural",
        education: "70% literacy rate",
        health: "5 health posts",
        infrastructure: "30km road network",
      },
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Administrative Divisions
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Ward Information
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore detailed demographic and development indicators for each
            ward
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {wards.map((ward, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={ward.number}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  {/* Enhanced gradient header */}
                  <div
                    className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${ward.color} opacity-10`}
                  />

                  {/* Main content with relative positioning */}
                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${ward.color} text-white font-semibold`}
                          >
                            {ward.number}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">
                            Ward {ward.number}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Area: {ward.area} km²
                        </p>
                      </div>
                      <Badge variant="outline" className="font-medium">
                        <MapPin className="w-4 h-4 mr-1" />
                        Zone {ward.number}
                      </Badge>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <StatCard
                        label="Population"
                        value={ward.population}
                        icon={Users}
                        trend={`${ward.growthRate}% growth`}
                      />
                      <StatCard
                        label="Households"
                        value={ward.households}
                        icon={Home}
                        trend={`${ward.avgFamilySize} avg. size`}
                      />
                    </div>

                    {/* Indicators */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        Key Indicators
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(ward.indicators).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            {key === "households" && (
                              <Home className="w-4 h-4 text-primary" />
                            )}
                            {key === "education" && (
                              <GraduationCap className="w-4 h-4 text-primary" />
                            )}
                            {key === "health" && (
                              <Baby className="w-4 h-4 text-primary" />
                            )}
                            {key === "infrastructure" && (
                              <Building2 className="w-4 h-4 text-primary" />
                            )}
                            <span className="text-sm text-gray-600">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-6 pt-4 border-t flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GridIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-500">
                          Density: {ward.density}/km²
                        </span>
                      </div>
                      <button className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WardInfo;
