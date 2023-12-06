/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryTooltip,
  VictoryLegend,
  VictoryStack,
} from "victory";

interface PlotProps {
  data: {
    date: string;
    counts: Record<string, number>;
  }[];
}

// function that returns the color depending on the input status (PENDIN, IN_PROGRESS, DONE), (red, yellow, green)
function getColor(status: string) {
  switch (status) {
    case "PENDING":
      return "#EC8F5E";
    case "IN_PROGRESS":
      return "#F3B664";
    case "DONE":
      return "#9FBB73";
    default:
      return "black";
  }
}

export default function Plot(props: PlotProps) {
  const { data } = props;

  const uniqueStatuses = Array.from(
    new Set(data.flatMap((entry) => Object.keys(entry.counts))),
  );

  const legendData = uniqueStatuses.map((status) => ({ name: status }));

  return (
    <VictoryChart>
      {/* <VictoryLegend
        x={120}
        y={20}
        centerTitle
        orientation="horizontal"
        gutter={20}
        data={legendData}
      /> */}
      <VictoryStack
        domainPadding={{ x: 20, y: 40 }}
        containerComponent={<VictoryContainer responsive={true} />}
      >
        {uniqueStatuses.map((status, index) => (
          <VictoryBar
            labels={({ datum }) => `${datum.y}`}
            key={index}
            data={data.map((entry: any) => ({
              x: entry.date,
              y: entry.counts[status] || 0, // Use 0 if the value is undefined or NaN
              label: `${status}: ${entry.counts[status] || 0}`,
            }))}
            style={{
              data: { fill: getColor(status) },
            }}
            x="x"
            y="y"
            barWidth={20}
            labelComponent={<VictoryTooltip />}
            animate={{
              duration: 2000,
              onLoad: { duration: 1500 },
            }}
          />
        ))}
      </VictoryStack>
    </VictoryChart>
  );
}
