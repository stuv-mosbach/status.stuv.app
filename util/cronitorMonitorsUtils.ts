import axios from "axios";
import {getCronitorAuthorization} from "./cronitorUtils";

export interface MonitorsResponse {
  monitors:            Monitor[];
  page_size:           number;
  page:                number;
  total_monitor_count: number;
  version:             Date;
}

export interface Monitor {
  attributes:         Attributes;
  assertions:         string[];
  created:            Date;
  disabled:           boolean;
  failure_tolerance:  number;
  grace_seconds:      number;
  group:              null;
  initialized:        boolean;
  key:                string;
  latest_event:       LatestEvent;
  latest_events:      null;
  latest_incident:    LatestIncident;
  latest_invocations: null;
  metadata:           null;
  name:               string;
  next_expected_at:   null;
  note:               null;
  notify:             string[];
  passing:            boolean;
  paused:             boolean;
  platform:           string;
  realert_interval:   string;
  request:            Request;
  running:            boolean;
  schedule:           string;
  schedule_tolerance: null;
  tags:               any[];
  timezone:           null;
  type:               string;
  environments:       string[];
}

export interface Attributes {
  group_name: null;
  site:       Site;
}

export interface Site {
  ssl: SSL;
  dns: DNS;
}

export interface DNS {
  name:         string;
  expires_at:   Date;
  registrar:    string;
  name_servers: string[];
}

export interface SSL {
  issued_to:  string;
  issued_by:  string;
  issued_at:  Date;
  expires_at: Date;
}

export interface LatestEvent {
  stamp:   number;
  msg:     string;
  event:   "req-ok" | "req-fail";
  metrics: Metrics;
}

export interface LatestIncident {
  stamp: number,
  state: "open" | "recovered"
}

export interface Metrics {
  duration: number;
}

export interface Request {
  url:              string;
  headers:          Cookies;
  cookies:          Cookies;
  body:             string;
  method:           string;
  timeout_seconds:  number;
  regions:          string[];
  follow_redirects: boolean;
  verify_ssl:       boolean;
}

export interface Cookies {
}

export const getMonitors = () : Promise<MonitorsResponse> => {
  return new Promise<MonitorsResponse>((resolve, reject) => {
    axios.get<MonitorsResponse>(`https://cronitor.io/api/monitors`, {
      headers: {
        Authorization: getCronitorAuthorization()
      }
    }).then(res => {
      resolve(res.data);
    }).catch(reject)
  });
}

