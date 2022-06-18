import {NextApiRequest, NextApiResponse} from "next";
import {getMonitorData} from "../../util/cronitorUtils";

export default (req : NextApiRequest, res : NextApiResponse) => {

  getMonitorData().then(monitorData => {
    res.status(200).json(monitorData);
  }).catch(err => {
    res.status(500).json({message: err.message});
  })
}