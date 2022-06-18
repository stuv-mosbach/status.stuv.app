import {getMonitors, LatestEvent, LatestIncident, Monitor} from "./cronitorMonitorsUtils";
import {getMonitorAggregates, RegionInfo} from "./cronitorMonitorAggregates";
import axios from "axios";

export const getCronitorAuthorization = () => `Basic ${btoa(`${process.env.CRONITOR_TOKEN}:`)}`;

export interface MonitorStats {
  frontend: MonitorData,
  backend: MonitorData
}

export interface MonitorData {
  key: string,
  status: "HEALTHY" | "FAILING",
  created: Date,
  disabled: boolean,
  initialized: boolean,
  passing: boolean,
  paused: boolean,
  running: boolean,
  latestEvent: LatestEvent
  latestIncident: LatestIncident
  aggregates: RegionInfo
}

const getStatus = (monitor : Monitor) : "HEALTHY" | "FAILING" => {
  if (monitor.latest_incident) {
    if (monitor.latest_incident.state === "open") return "FAILING";
  }
  return "HEALTHY";
}

export const getMonitorData = () : Promise<MonitorStats> => {
  return new Promise<MonitorStats>(async (resolve, reject) => {
    try {
      const monitors = await getMonitors();
      const monitorAggregates = await getMonitorAggregates();

      const frontendMonitor = monitors.monitors.find(m => m.key === process.env.FRONTEND_MONITOR_KEY as string);
      const frontendMonitorAggregates = monitorAggregates.monitors[process.env.FRONTEND_MONITOR_KEY as string];

      if (!frontendMonitor || !frontendMonitorAggregates) {
        throw new Error("Frontend Monitor not found!");
      }

      const frontend : MonitorData = {
        key: frontendMonitor.key,
        status: getStatus(frontendMonitor),
        created: frontendMonitor.created,
        disabled: frontendMonitor.disabled,
        initialized: frontendMonitor.initialized,
        passing: frontendMonitor.passing,
        paused: frontendMonitor.paused,
        running: frontendMonitor.running,
        latestEvent: frontendMonitor.latest_event,
        latestIncident: frontendMonitor.latest_incident,
        aggregates: frontendMonitorAggregates.eu
      }

      const backendMonitor = monitors.monitors.find(m => m.key === process.env.BACKEND_MONITOR_KEY as string);
      const backendMonitorAggregates = monitorAggregates.monitors[process.env.BACKEND_MONITOR_KEY as string];

      if (!backendMonitor || !backendMonitorAggregates) {
        throw new Error("Backend Monitor not found!");
      }

      const backend : MonitorData = {
        key: backendMonitor.key,
        status: getStatus(backendMonitor),
        created: backendMonitor.created,
        disabled: backendMonitor.disabled,
        initialized: backendMonitor.initialized,
        passing: backendMonitor.passing,
        paused: backendMonitor.paused,
        running: backendMonitor.running,
        latestEvent: backendMonitor.latest_event,
        latestIncident: backendMonitor.latest_incident,
        aggregates: backendMonitorAggregates.eu
      }

      resolve({frontend, backend});

    } catch (e) {
      reject(e);
    }
  })
}

export const getFrontendMonitorData = () : Promise<MonitorStats> => {
  return new Promise<MonitorStats>((resolve, reject) => {
    axios.get<MonitorStats>(`/api/getStatus`).then(res => {
      resolve(res.data);
    }).catch(reject)
  });
}