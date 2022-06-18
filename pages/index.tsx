import React, {ReactNode, useEffect, useState} from "react";
import Layout from "../components/Layout";
import {getFrontendMonitorData, getMonitorData, MonitorData, MonitorStats} from "../util/cronitorUtils";
import moment from "moment";

const Home = (props : {monitorStats: MonitorStats, error: string}) => {

  const [monitorStats, setMonitorStats] = useState<MonitorStats>(props.monitorStats);
  const [loadingError, setLoadingError] = useState<string | undefined>(props.error);

  useEffect(() => {
    getFrontendMonitorData().then(res => {
      setMonitorStats(res);
      setLoadingError(undefined);
    }).catch(err => {
      //setLoadingError(err.message);
    })
  }, []);

  const getSince = (monitor : MonitorData, start? : boolean) => {
    let since = moment(monitor.created);
    if (!start && monitor.latestIncident && monitor.latestIncident.stamp) {
      since = moment(monitor.latestIncident.stamp);
    }
    return since.fromNow(true);
  }

  const StatsColum = (props : {children: ReactNode, title: ReactNode, footer: ReactNode}) => {

    return (
      <div className="py-4 md:px-10 flex-grow-0">
        <div className="flex-grow-0 text-center md:text-start">
          <div className="text-gray-400 font-light uppercase text-md mb-2">{props.title}</div>
          <div className="text-lg">{props.children}</div>
          <div className={"text-gray-400 font-light text-sm mt-2"}>
            {props.footer}
          </div>
        </div>
      </div>
    )
  }

  const StatsCard = ({monitor} : {monitor : MonitorData}) => {

    return (
      <div className="flex bg-gray-700 rounded-md bg-opacity-50 mt-2">

        <div className="py-2 flex flex-col md:flex-row justify-items-center divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-600 flex-grow">

          <StatsColum title={"Status"} footer={<>since: {getSince(monitor)}</>} >
            <>
              {monitor.status === "HEALTHY" &&
                  <span className={"bg-green-800 text-white py-0.5 px-3 rounded-md flex-grow-0"}>
                    Healthy
                  </span>
              }
              {monitor.status !== "HEALTHY" &&
                  <span className={"bg-red-800 text-white py-0.5 px-3 rounded-md flex-grow-0"}>
                    Failing
                  </span>
              }
            </>
          </StatsColum>


          <StatsColum title={"Uptime"} footer={<>since: {getSince(monitor, true)}</>} >
            {Math.round((monitor.aggregates.uptime * 100)).toLocaleString("de")} <span className={"text-gray-400"}>%</span>
          </StatsColum>

          <StatsColum title={"Performance"} footer={<>since: {getSince(monitor, true)}</>} >
            {(monitor.aggregates.duration_mean * 100).toLocaleString("de")} <span className={"text-gray-400"}>ms</span>
          </StatsColum>

          <StatsColum title={"Checks"} footer={<>since: {getSince(monitor, true)}</>} >
            {(monitor.aggregates.event_count).toLocaleString("de")}
          </StatsColum>

          <StatsColum title={"Alerts"} footer={<>since: {getSince(monitor, true)}</>} >
            {0}
          </StatsColum>

        </div>

      </div>
    )
  }

  return (
    <Layout>
      <div className={"container mx-auto flex min-h-screen"}>
        <div className="pt-10 mx-auto text-white">

          {(!monitorStats && !loadingError) && <div className={"h-full flex"}><div className="my-auto loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"/></div>}

          {monitorStats &&(
            <div className={""}>
              <div className="">
                <h1 className={"text-gray-400 font-light text-4xl"}>StuV.app:</h1>
                <div className={"h-px bg-gray-700"} />

                <StatsCard monitor={monitorStats.frontend} />
              </div>

              <div className="pt-10 pb-10">
                <h1 className={"text-gray-400 font-light text-4xl"}>StuV Lecture API:</h1>
                <div className={"h-px bg-gray-700"} />

                <StatsCard monitor={monitorStats.backend} />
              </div>
            </div>
          )}

          {loadingError &&
            <div className={"mt-20"}>
                <div className={"bg-red-700 bg-opacity-50 rounded-md px-5 py-3"}>
                  <h2 className={"text-2xl"}>Error:</h2>
                  <div className={"h-px bg-gray-600"}/>
                  <div className="">
                      Leider ist beim laden der Statusseite ein Fehler aufgetreten.
                      Bitte versuch es erneut.
                  </div>
                  <div className={"italic text-gray-400"}>
                    {loadingError}
                  </div>
                </div>
            </div>
          }

        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {

  try {
    const monitorStats = await getMonitorData();

    return {
      props: {
        monitorStats
      },
      revalidate: 60,
    }
  } catch (e : any) {
    return {
      props: {
        loadingError: e?.message
      },
      revalidate: 1,
    }
  }
}

export default Home
