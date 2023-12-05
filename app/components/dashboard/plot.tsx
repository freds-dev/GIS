/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryTooltip,
} from "victory";

export default function Plot(props: any) {
  return (
    <VictoryChart
      domainPadding={{ x: 40, y: 40 }}
      containerComponent={<VictoryContainer responsive={true} />}
    >
      <VictoryBar
        labels={({ datum }) => `${datum.y}`}
        labelComponent={<VictoryTooltip />}
        data={props.data}
        animate={{
          duration: 2000,
          onLoad: { duration: 1500 },
        }}
      />
    </VictoryChart>
  );
}
