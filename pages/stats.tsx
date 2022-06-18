import Layout from "../components/Layout";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { ResponsivePieCanvas } from '@nivo/pie'

type StatsType = {details: string, counter: string}[];
type DiagramStats = {id: string, label: string, value: number}[];

export const StatsPage = () => {

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DiagramStats>([]);

  useEffect(() => {
    axios.get<StatsType>(`${process.env.NEXT_PUBLIC_API_BASE}/request-log/coursestats`).then(res => {
      setStats(res.data.map(raw => ({
        id: raw.details,
        label: raw.details,
        value: parseInt(raw.counter),
      })));
      setLoading(false);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const notLoading = () => (
    <>
      <div className={"mt-3 divide-zinc-500 w-full divide-y md:w-3/4 w-2/4 px-2 md:px-0 pb-3"}>
        <span className={"text-zinc-200 text-4xl font-light"}>Kursaufrufe Total</span>
        <div className="flex flex-grow justify-center">

          <div className={"mt-3"} style={{height: "90vh", width: "90vw"}}>
            <ResponsivePieCanvas
              data={stats}
              margin={{ top: 40, right: 50, bottom: 40, left: 50 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ scheme: 'paired' }}
              borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              pixelRatio={10}
              arcLabelsTextColor="#333333"
            />
          </div>

        </div>
      </div>
    </>
  )

  return (
    <Layout title={"Stats"}>
      <div className={"flex flex-grow justify-center h-screen overflow-y-scroll"}>
        {loading && <div className="loader ease-linear rounded-full border-8 border-t-8 border-zinc-200 h-64 w-64"/>}
        {!loading && notLoading()}
      </div>
    </Layout>
  )

}

export default StatsPage;