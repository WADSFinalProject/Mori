import React, { useState, useEffect } from "react";
import { TableComponent } from "./TableComponent";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { readExpeditions } from "../../../service/shipments";

const AdminShipmentDetails = () => {
  const [sortedData, setSortedData] = useState([]);
  const [filterKey, setFilterKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalShipments, setTotalShipments] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    readExpeditions()
    .then((res) => {
      console.log("Success : ", res);
      const expeditions = res.data;

      // Group batches by expedition ID
      const groupedExpeditions = expeditions.reduce((acc, expedition) => {
        const id = expedition.Expedition.CentralID.toString();
        if (!acc[id]) {
          acc[id] = {
            id: id,
            batchIds: [],
            flouredDates: [],
            driedDates: [],
            weights: [],
            status: expedition.status,
            checkpoint: `${expedition.Expedition.Status} | ${new Date(expedition.statusdate).toLocaleString()}`,
          };
        }
        acc[id].batchIds.push(expedition.BatchID);
        acc[id].flouredDates.push(expedition.FlouredDate);
        acc[id].driedDates.push(expedition.DriedDate);
        acc[id].weights.push(expedition.Weight);
        return acc;
      }, {});

      // Convert grouped data object to array
      const resArr = Object.values(groupedExpeditions).map((expedition, index) => {
        return {
          id: index + 1,
          shipmentId: expedition.id, // Assuming AirwayBill is stored in expedition.id
          batchId: expedition.batchIds,
          driedDate: expedition.driedDates,
          flouredDate: expedition.flouredDates,
          weight: expedition.weights,
          status: expedition.status,
          checkpoint: expedition.checkpoint,
        };
      });

      // Set your state with resArr
      setSortedData(resArr);
    })
    .catch((err) => {
      console.log("Error : ", err);
    });
  }

  useEffect(() => {
    // Calculate total shipments count
    const uniqueShipmentIds = new Set(sortedData.map((item) => item.shipmentId));
    setTotalShipments(uniqueShipmentIds.size);
  }, [sortedData]);

  useEffect(() => {
    handleSearchAndFilter(searchQuery, filterKey);
  }, [filterKey, searchQuery]);

  const handleFilterChange = (filterValue) => {
    setFilterKey(filterValue);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearchAndFilter = (searchValue, filterValue) => {
    let filteredData = sortedData.filter((row) =>
      row.shipmentId.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filterValue !== "all") {
      filteredData = filteredData.filter((row) => row.status === filterValue);
    }

    setSortedData(filteredData);
  };

  return (
    <div className="bg-transparent">
      <div className="flex flex-col w-full gap-5 mt-8">
        <div className="text-black font-vietnam text-3xl font-extrabold tracking-tight">
          Shipment Details
        </div>

        <div className="flex flex-col p-4 rounded bg-[#00000033] w-1/4 gap-1">
          <div className="text-[#828282] font-vietnam text-sm font-medium">
            Total Shipments
          </div>
          <div className="text-black font-vietnam text-3xl font-semibold">
            {sortedData.length} Shipments
          </div>
        </div>

        <div className="flex flex-row w-full justify-between items-center">
          <label className="input input-bordered flex items-center gap-2 rounded-md px-5 h-10">
            <input
              type="text"
              className="grow border-none focus:border-none focus:ring-0 m-0 p-0 font-vietnam w-64"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="flex flex-row gap-5 items-center">
            <div className="font-vietnam font-semibold text-md items-center">
              Filter By:
            </div>
            {/* Filter */}
            <select
              className="bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent py-2.5"
              value={filterKey}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="To Deliver">To Deliver</option>
              <option value="Completed">Completed</option>
              <option value="Shipped">Shipped</option>
              <option value="Missing">Missing</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden">
          <TableComponent data={sortedData} onDelete={fetchData}/>
        </div>
      </div>
    </div>
  );
};

export default AdminShipmentDetails;
