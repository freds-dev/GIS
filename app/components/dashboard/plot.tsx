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
        domainPadding={{ x: 40, y: 40 }}
        containerComponent={<VictoryContainer responsive={true} />}
        colorScale={["green", "orange", "gold"]}
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
