import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const createExpedition = async (AirwayBill, estimatedArrival, totalPackages, TotalWeight, expeditionDate, expeditionServiceDetails, batches) => {
    try {
        const expeditionDetails = {
            AirwayBill:AirwayBill,
            EstimatedArrival: estimatedArrival,
            TotalWeight:TotalWeight,
            TotalPackages: totalPackages,
            ExpeditionDate: expeditionDate,
            ExpeditionServiceDetails: expeditionServiceDetails,

        };

        response = await axios.post(host + "/secured/expeditions", expeditionDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const expeditionId = response.data.expeditionId

        const contentDetails = {
        
            ExpeditionID: expeditionId,
            BatchIDs: batches


        }

        return axios.post(host + "/secured/expedition_contents/", contentDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating expedition: ", error);
        throw new Error(error);
    }
};

export const readExpeditions = async (skip = 0, limit = 100) => {
    try {
      return await axios.get(host + "/secured/all_expeditions", {
        params: {
          skip: skip,
          limit: limit,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error reading expeditions: ", error);
      throw new Error(error);
    }
  };

export const readExpeditions_byAWB = async (awb) => {
    try {
        const params = {
           awb
        };

        return await axios.get(host + `/secured/expedition/airwaybill/${awb}`, {
            headers: {
                "Content-Type": "application/json",
            },
            params: params
        });
    } catch (error) {
        console.error("Error reading expeditions: ", error);
        throw new Error(error);
    }
};






export const getExpeditionDetails = async (expedition_id) => {
    try {
        return await axios.get(host + `/secured/expeditions/${expedition_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error getting details of expedition ${expedition_id}: `, error);
        throw new Error(error);
    }
};

// export const updateExpedition = async (expedition_id, estimatedArrival, totalPackages, expeditionDate, expeditionServiceDetails, destination, centralID) => {
//     try {
//         const expeditionDetails = {
//             EstimatedArrival: estimatedArrival,
//             TotalPackages: totalPackages,
//             ExpeditionDate: expeditionDate,
//             ExpeditionServiceDetails: expeditionServiceDetails,
//             Destination: destination,
//             CentralID: centralID
//         };

//         return await axios.put(host + `/secured/expeditions/${expedition_id}`, expeditionDetails, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//     } catch (error) {
//         console.error(`Error updating expedition ${expedition_id}: `, error);
//         throw new Error(error);
//     }
// };


export const updateExpeditionStatus = async (awb, new_status) => {
    try {
        const expeditionDetails = {
            awb: awb,
            status: new_status
        };

        return await axios.put(host + `/secured/expedition/${awb}/status`, expeditionDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error updating expedition status: `, error);
        throw new Error(error);
    }
};

export const deleteExpedition = async (expedition_id) => {
    try {
        return await axios.delete(host + `/secured/expeditions/${expedition_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error deleting expedition ${expedition_id}: `, error);
        throw new Error(error);
    }
};



export const getStatus_byAwb = async (awb) => {
    try {
        return await axios.get(host + `/secured/checkpointstatus/airwaybill/${awb}"`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error getting checkpoint: `, error);
        throw new Error(error);
    }
};
