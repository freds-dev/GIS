/* eslint-disable jsx-a11y/label-has-associated-control */

import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";

/* eslint-disable @typescript-eslint/no-explicit-any */
function formatTime(time: any) {
  const date = new Date(time);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export default function ControlPanel(props: any) {
  const {
    startTime,
    endTime,
    onChangeTime,
    allDays,
    onChangeAllDays,
    selectedTime,
  } = props;
  const day = 24 * 60 * 60 * 1000;
  const days = Math.round((Date.parse(endTime) - Date.parse(startTime)) / day);
  const selectedDay = Math.round(
    (new Date(selectedTime).getTime() - new Date(startTime).getTime()) / day,
  );

  const onSelectDay = (evt: any) => {
    const daysToAdd = evt.target.value;
    // add selected days to start time to calculate new time
    const newTime = new Date(startTime).getTime() + daysToAdd * day;
    onChangeTime(newTime);
  };
  return (
    <div className="control-panel fixed bottom-4 left-4 p-4 rounded-xl bg-white">
      <h3 className="font-bold py-1">Heatmap of submitted reports</h3>
      <p>
        from <b>{formatTime(startTime)}</b> to <b>{formatTime(endTime)}</b>.
      </p>
      <Separator className="my-2" />
      <div className="input flex items-center justify-start gap-1">
        <label>All Days</label>
        <Checkbox
          name="allDay"
          checked={allDays}
          onCheckedChange={(checked) => {
            onChangeAllDays(checked);
          }}
        />
      </div>
      <div className={`input ${allDays ? "disabled" : ""} flex items-center justify-start gap-1`}>
        <label>Each Day: {formatTime(selectedTime)}</label>
        <input
          type="range"
          disabled={allDays}
          min={0}
          max={days}
          value={selectedDay}
          step={1}
          onChange={onSelectDay}
        />
      </div>
    </div>
  );
}
