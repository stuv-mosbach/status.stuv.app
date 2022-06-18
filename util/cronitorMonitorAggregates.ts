import axios from "axios";
import {getCronitorAuthorization} from "./cronitorUtils";

export interface MonitorsAggregatesResponse {
  monitors: { [key: string]: Monitor };
}

export interface Monitor {
  eu: RegionInfo;
}

export interface RegionInfo {
  duration_mean:   number;
  event_count:     number;
  run_count:       number;
  fail_count:      number;
  complete_count:  number;
  uptime:          number;
  alert_count:     number;
  count_sum:       number;
  error_count_sum: number;
}

export const getMonitorAggregates = () : Promise<MonitorsAggregatesResponse> => {
  return new Promise<MonitorsAggregatesResponse>((resolve, reject) => {
    axios.get<MonitorsAggregatesResponse>(`https://cronitor.io/api/aggregates?env=production&field=duration_mean&field=event_count&field=run_count&field=fail_count&field=complete_count&field=uptime&field=alert_count&field=count_sum&field=error_count_sum&region=eu&time=180d`,
      {
        headers: {
          Authorization: getCronitorAuthorization()
        }
      }).then(res => {
      resolve(res.data);
    }).catch(reject);
  });
}