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
      const series = node.data?.series.map((s) => {
        const baseSeriesConfig = {
          name: s.name.content[language] || s.name.fallbackContent,
          type: s.type || node.chartType,
          data: s.data,
          smooth: s.smooth,
          symbolSize: s.symbolSize,
          emphasis: s.emphasis,
          markPoint: s.markPoint,
          markLine: s.markLine,
          markArea: s.markArea,
        };

        // Add chart-specific configurations
        switch (node.chartType) {
          case "pie":
          case "donut":
            return {
              ...baseSeriesConfig,
              radius: [
                node.style?.innerRadius ? `${node.style.innerRadius}%` : "0%",
                node.style?.outerRadius || "75%",
              ],
              label: {
                show: node.style?.showLabels,
                formatter: "{b}: {d}%",
              },
            };

          case "line":
          case "area":
            return {
              ...baseSeriesConfig,
              showSymbol: node.style?.showPoints,
              areaStyle:
                node.chartType === "area"
                  ? {
                      ...s.areaStyle,
                      opacity: s.areaStyle?.opacity || 0.3,
                    }
                  : undefined,
              lineStyle: s.lineStyle,
            };

          case "bar":
          case "column":
            return {
              ...baseSeriesConfig,
              barGap: "30%",
              emphasis: {
                focus: "series",
              },
            };

          case "stacked-column":
            return {
              ...baseSeriesConfig,
              type: "bar",
              stack: "total",
              label: {
                show: true,
                position: "inside",
              },
            };

          default:
            return baseSeriesConfig;
        }
      });

      // Only add dataZoom for cartesian charts (not pie/donut)
      const shouldShowDataZoom =
        node.options?.dataZoom?.show &&
        !["pie", "donut"].includes(node.chartType);

      return {
        title: {
          text: title,
          subtext: subtitle,
          left: "center",
          top: 10,
          textStyle: {
            fontSize: node.style?.fontSize,
          },
        },
        tooltip: {
          ...node.options?.tooltip,
          trigger: node.options?.tooltip?.trigger || "axis",
          backgroundColor: node.options?.tooltip?.backgroundColor,
          borderColor: node.options?.tooltip?.borderColor,
          textStyle: node.options?.tooltip?.textStyle,
        },
        toolbox: node.options?.toolbox?.show
          ? {
              show: true,
              feature: node.options?.toolbox?.features,
            }
          : undefined,
        grid: {
          ...node.options?.grid,
          containLabel: true,
        },
        xAxis:
          node.chartType !== "pie" && node.chartType !== "donut"
            ? {
                ...node.options?.xAxis,
                type: node.options?.xAxis?.type || "category",
                boundaryGap: ["bar", "column", "stacked-column"].includes(
                  node.chartType,
                ),
              }
            : undefined,
        yAxis:
          node.chartType !== "pie" && node.chartType !== "donut"
            ? {
                ...node.options?.yAxis,
                type: node.options?.yAxis?.type || "value",
              }
            : undefined,
        series,
        animation: node.options?.animation?.enabled
          ? {
              duration: node.options?.animation?.duration,
              easing: node.options?.animation?.easing,
            }
          : false,
        dataZoom: shouldShowDataZoom
          ? [
              {
                type:
                  node.options?.dataZoom?.type === "both"
                    ? "slider"
                    : node.options?.dataZoom?.type,
                show: true,
                // Only apply to x-axis for cartesian charts
                xAxisIndex:
                  node.chartType !== "pie" && node.chartType !== "donut"
                    ? [0]
                    : undefined,
                start: 0,
                end: 100,
              },
              node.options?.dataZoom?.type === "both"
                ? {
                    type: "inside",
                    xAxisIndex:
                      node.chartType !== "pie" && node.chartType !== "donut"
                        ? [0]
                        : undefined,
                    start: 0,
                    end: 100,
                  }
                : undefined,
            ].filter(Boolean)
          : undefined,
        legend: node.options?.legend?.show
          ? {
              ...node.options?.legend,
              type: node.options?.legend?.type || "plain",
              orient: node.options?.legend?.orient || "horizontal",
              [node.options?.legend?.position || "bottom"]: 10,
            }
          : undefined,
        color: node.options?.color,
      };
    } catch (error) {
      console.error("Error generating chart options:", error);
      return {};
    }
  }, [node, language, title, subtitle]);

  if (!node.data?.series?.[0]?.data?.length) {
    return (
      <div className="flex items-center justify-center h-[200px] text-gray-400 border rounded">
        No data to display
      </div>
    );
  }

  const theme = node.options?.theme || "light";
  const background =
    node.style?.background || (theme === "dark" ? "#1f1f1f" : undefined);

  return (
    <div
      className={cn("my-8 rounded-lg overflow-hidden", node.className)}
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
          height: node.style?.height || 400,
          width: "100%",
        }}
        theme={theme === "custom" ? "custom-dark" : theme}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};
