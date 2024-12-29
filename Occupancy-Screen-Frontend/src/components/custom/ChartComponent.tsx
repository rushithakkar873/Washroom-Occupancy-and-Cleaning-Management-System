import { useEffect, useMemo, useState } from "react";
import { AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ApiHelper from "@/utils/apiHelper";

const chartConfig = {
  washrooms: {
    label: "Washrooms",
  },
  available: {
    label: "Available",
    color: "#d4edbc",
  },
  occupied: {
    label: "Occupied",
    color: "#ffcfc9",
  },
  cleaning: {
    label: "Cleaning",
    color: "#ffe5a0",
  },
} satisfies ChartConfig;

const ChartComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState([
    { status: "Available", washrooms: 0, fill: "#d4edbc" },
    { status: "Occupied", washrooms: 0, fill: "#ffcfc9" },
    { status: "Cleaning", washrooms: 0, fill: "#ffe5a0" },
  ]);

  const getWashroomsSummary = async () => {
    try {
      const response = await ApiHelper.get("/admin/get-washrooms-list");
      const { data: washrooms } = (response as AxiosResponse).data;

      // Define the color map with explicit types
      const colorMap: { [key: string]: string } = {
        Available: "#d4edbc",
        Occupied: "#ffcfc9",
        Cleaning: "#ffe5a0",
      };

      // Reduce the array to count by status and format for the chart
      const statusCounts = washrooms?.reduce(
        (
          acc: {
            [key: string]: { status: string; washrooms: number; fill: string };
          },
          washroom: { status: string }
        ) => {
          const status = washroom.status;
          if (acc[status]) {
            acc[status].washrooms++;
          } else {
            acc[status] = {
              status,
              washrooms: 1,
              fill: colorMap[status] || "#cccccc",
            };
          }
          return acc;
        },
        {}
      );

      setChartData(Object.values(statusCounts));
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch washrooms:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWashroomsSummary();
  }, []);

  const totalVisitors = useMemo(() => {
    return chartData?.reduce((acc, curr) => acc + curr.washrooms, 0);
  }, [chartData]);

  return (
    <Card className="h-full flex flex-col justify-center items-center">
      <CardHeader className="pb-0">
        <CardTitle className="text-center text-gray-400 font-medium">
          Washroom Occupancy Status
        </CardTitle>
      </CardHeader>
      <CardContent className="grow">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
            Loading...
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-full max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="washrooms"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Washrooms
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
