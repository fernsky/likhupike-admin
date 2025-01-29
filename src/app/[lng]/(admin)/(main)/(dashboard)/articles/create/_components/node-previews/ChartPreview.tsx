import { ChartNode } from "../../_store/types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { registerTheme } from "echarts";

// Register custom themes
registerTheme("custom-dark", {
  backgroundColor: "#1f1f1f",
  textStyle: {},
  title: {
    textStyle: {
      color: "#ffffff",
    },
    subtextStyle: {
      color: "#dddddd",
    },
  },
  line: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 4,
    symbol: "circle",
    smooth: false,
  },
  radar: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 4,
    symbol: "circle",
    smooth: false,
  },
});

// Custom color palettes matching the design system
const colorPalettes = {
  default: [
    "rgb(34, 197, 94)", // green-500
    "rgb(16, 185, 129)", // emerald-500
    "rgb(6, 182, 212)", // cyan-500
    "rgb(99, 102, 241)", // indigo-500
    "rgb(168, 85, 247)", // purple-500
    "rgb(236, 72, 153)", // pink-500
    "rgb(249, 115, 22)", // orange-500
    "rgb(234, 179, 8)", // yellow-500
    "rgb(59, 130, 246)", // blue-500
    "rgb(244, 63, 94)", // rose-500
  ],
  light: [
    "rgba(34, 197, 94, 0.6)",
    "rgba(16, 185, 129, 0.6)",
    "rgba(6, 182, 212, 0.6)",
    "rgba(99, 102, 241, 0.6)",
    "rgba(168, 85, 247, 0.6)",
    "rgba(236, 72, 153, 0.6)",
    "rgba(249, 115, 22, 0.6)",
    "rgba(234, 179, 8, 0.6)",
    "rgba(59, 130, 246, 0.6)",
    "rgba(244, 63, 94, 0.6)",
  ],
};

// Enhanced theme configuration
registerTheme("custom-light", {
  backgroundColor: "#ffffff",
  textStyle: {
    fontFamily:
      '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 13,
    letterSpacing: -0.3,
  },
  title: {
    textStyle: {
      fontSize: 18,
      fontWeight: 600,
      color: "#111827", // gray-900
      letterSpacing: -0.5,
      lineHeight: 1.4,
      padding: [0, 0, 16, 0],
    },
    subtextStyle: {
      fontSize: 14,
      color: "#6B7280", // gray-500
      letterSpacing: -0.3,
      padding: [8, 0, 0, 0],
    },
  },
  legend: {
    textStyle: {
      color: "#374151", // gray-700
      fontSize: 12,
      fontFamily: "-apple-system, system-ui, sans-serif",
      letterSpacing: "-0.5px",
    },
    itemGap: 12,
    itemWidth: 12,
    itemHeight: 8,
    borderRadius: 4,
    padding: [0, 16],
    bottom: 0,
    textPadding: [2, 4],
    itemStyle: {
      borderWidth: 0,
    },
  },
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "rgba(229, 231, 235, 1)", // gray-200
    borderWidth: 1,
    textStyle: {
      color: "#111827", // gray-900
    },
    axisPointer: {
      lineStyle: {
        color: "#E5E7EB", // gray-200
      },
      crossStyle: {
        color: "#E5E7EB", // gray-200
      },
    },
  },
  grid: {
    show: false,
    left: "8%",
    right: "8%",
    top: "8%",
    bottom: "15%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    axisLine: {
      lineStyle: {
        color: "#E5E7EB", // gray-200
      },
    },
    axisTick: { show: false },
    axisLabel: {
      color: "#6B7280", // gray-500
      fontSize: 12,
    },
    splitLine: { show: false },
  },
  yAxis: {
    type: "value",
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: {
      lineStyle: {
        color: "#F3F4F6", // gray-100
        type: "dashed",
      },
    },
    axisLabel: {
      color: "#6B7280", // gray-500
      fontSize: 12,
    },
  },
});

interface ChartPreviewProps {
  node: ChartNode;
  language: "en" | "ne";
}

export const ChartPreview = ({ node, language }: ChartPreviewProps) => {
  const title = node.title?.content[language] || node.title?.fallbackContent;
  const subtitle =
    node.subtitle?.content[language] || node.subtitle?.fallbackContent;

  const getEChartOptions = useMemo(() => {
    try {
      // Transform series data based on chart type
      const transformedSeries = node.data?.series.map((s, index) => {
        const seriesData = s.data.map((point) => {
          if (["pie", "donut"].includes(node.chartType)) {
            return {
              name: point.label,
              value: point.value,
              itemStyle: {
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#fff",
              },
            };
          }
          return point.value;
        });

        const labels = s.data.map((point) => point.label);

        const baseSeriesConfig = {
          name: s.name.content[language] || s.name.fallbackContent,
          type:
            node.chartType === "stacked-column"
              ? "bar"
              : s.type || node.chartType === "donut"
                ? "pie"
                : node.chartType,
          data: ["pie", "donut"].includes(node.chartType)
            ? seriesData
            : undefined,
          itemStyle: {
            borderRadius: ["bar", "column", "stacked-column"].includes(
              node.chartType,
            )
              ? [4, 4, 0, 0]
              : 4,
            color: colorPalettes.default[index % colorPalettes.default.length],
            borderWidth: 2,
            borderColor: "#fff",
          },
          emphasis: {
            focus: "series",
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0,0,0,0.1)",
            },
          },
          stack: node.chartType === "stacked-column" ? "total" : undefined,
        };

        // Add chart-specific configurations
        if (["pie", "donut"].includes(node.chartType)) {
          return {
            ...baseSeriesConfig,
            radius: node.chartType === "donut" ? ["40%", "70%"] : ["0%", "75%"],
            label: {
              show: true,
              formatter: "{b}: {d}%",
              fontSize: 13,
              fontFamily: "-apple-system, system-ui, sans-serif",
            },
            avoidLabelOverlap: true,
          };
        }

        return {
          ...baseSeriesConfig,
          data: seriesData,
          showBackground: ["bar", "column"].includes(node.chartType),
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.1)",
            borderRadius: 4,
          },
        };
      });

      // Get all unique labels for x-axis
      const allLabels =
        node.data?.series[0]?.data.map((point) => point.label) || [];

      return {
        title: {
          text: node.title?.content[language] || node.title?.fallbackContent,
          subtext:
            node.subtitle?.content[language] || node.subtitle?.fallbackContent,
          left: "center",
          top: 20,
          textStyle: {
            fontSize: 16,
            fontWeight: 600,
            color: "#111827",
            fontFamily: "-apple-system, system-ui, sans-serif",
          },
          subtextStyle: {
            fontSize: 14,
            color: "#6B7280",
          },
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "rgba(229, 231, 235, 1)",
          borderWidth: 1,
          padding: [8, 12],
          textStyle: {
            color: "#111827",
            fontSize: 13,
          },
          borderRadius: 8,
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowBlur: 10,
        },
        grid: {
          left: "8%",
          right: "8%",
          top: node.title?.content[language] ? "15%" : "10%",
          bottom: "12%", // Reduced from 18% to 12%
          containLabel: true,
        },
        xAxis: !["pie", "donut"].includes(node.chartType)
          ? {
              type: "category",
              data: allLabels,
              axisLine: { lineStyle: { color: "#E5E7EB" } },
              axisTick: { show: false },
              axisLabel: {
                color: "#6B7280",
                fontSize: 12,
                fontFamily: "-apple-system, system-ui, sans-serif",
                interval: 0,
                rotate: allLabels.length > 8 ? 45 : 0,
                letterSpacing: -0.3,
                margin: 16,
              },
              splitLine: {
                show: false,
              },
            }
          : undefined,
        yAxis: !["pie", "donut"].includes(node.chartType)
          ? {
              type: "value",
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: {
                lineStyle: {
                  color: "#F3F4F6",
                  type: "dashed",
                },
              },
              axisLabel: {
                color: "#6B7280",
                fontSize: 12,
                fontFamily: "-apple-system, system-ui, sans-serif",
                formatter: (value: number) =>
                  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value,
                letterSpacing: -0.3,
                margin: 16,
              },
            }
          : undefined,
        series: transformedSeries,
        legend: {
          show: true,
          bottom: 0,
          type: "scroll",
          pageIconSize: 12,
          pageTextStyle: {
            color: "#6B7280",
          },
          textStyle: {
            color: "#374151",
            fontSize: 12,
            fontFamily: "-apple-system, system-ui, sans-serif",
            letterSpacing: "-0.5px",
            padding: [2, 4],
          },
          selectedMode: true,
          itemWidth: 12,
          itemHeight: 8,
          itemGap: 12,
          padding: [0, 16],
        },
        color: colorPalettes.default,
      };
    } catch (error) {
      console.error("Error generating chart options:", error);
      return {};
    }
  }, [node, language]);

  if (!node.data?.series?.[0]?.data?.length) {
    return (
      <div className="flex items-center justify-center h-[200px] text-gray-400 border rounded-xl bg-gray-50/50">
        No data to display
      </div>
    );
  }

  const theme = node.options?.theme || "light";
  const background =
    node.style?.background || (theme === "dark" ? "#1f1f1f" : undefined);

  return (
    <div
      className={cn(
        "my-8 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100",
        "hover:shadow-lg transition-all duration-300",
        "p-6", // Added padding
        node.className,
      )}
      style={{
        ...node.style?.container,
        background,
        padding: node.style?.padding,
        borderRadius: node.style?.borderRadius,
      }}
    >
      <ReactECharts
        option={getEChartOptions}
        style={{
          height: node.style?.height || 500, // Increased from 400 to 500
          width: "100%",
        }}
        theme="custom-light"
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};
