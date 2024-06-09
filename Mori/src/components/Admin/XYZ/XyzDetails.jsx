import React, { useState, useEffect } from "react";
import { TableComponent } from "./TableComponent";

const XyzDetails = () => {
  const initialNewWarehouseState = {
    warehouseName: '',
    email: '',
    phone: '',
    location: '',
    createdDate: new Date().toISOString().substring(0, 10), // Format: YYYY-MM-DD
  };

  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState("warehouseName-a-z");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [isAddNewVisible, setAddNewVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [editWarehouseIndex, setEditWarehouseIndex] = useState(null);
  const [newWarehouse, setNewWarehouse] = useState(initialNewWarehouseState);

  useEffect(() => {
    fetch("/data_xyz.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        handleSearchAndSort(data, "warehouseName-a-z"); // Initial sort with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    handleSearchAndSort(data, sortKey); // Call with current data and sort key
  }, [searchQuery, filterLocation]);

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortKey(sortValue);
    handleSearchAndSort(data, sortValue);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearchAndSort(data, sortKey);
  };

  const handleFilterChange = (e) => {
    setFilterLocation(e.target.value);
    handleSearchAndSort(data, sortKey);
  };

  const handleSearchAndSort = (data, sortValue) => {
    let filteredData = data.filter(
      (row) =>
        row.warehouseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterLocation) {
      filteredData = filteredData.filter((row) =>
        row.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    if (sortValue === "warehouseName-a-z") {
      filteredData.sort((a, b) =>
        a.warehouseName.localeCompare(b.warehouseName)
      );
    } else if (sortValue === "warehouseName-z-a") {
      filteredData.sort((a, b) =>
        b.warehouseName.localeCompare(a.warehouseName)
      );
    } else if (sortValue === "createdDate-asc") {
      filteredData.sort(
        (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
      );
    } else if (sortValue === "createdDate-desc") {
      filteredData.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    }

    setSortedData(filteredData);
  };

  const handleAddNewClick = () => {
    setAddNewVisible(true);
    setEditVisible(false);
    setNewWarehouse(initialNewWarehouseState);
  };

  const handleEditClick = (index) => {
    const warehouseToEdit = sortedData[index];
    const originalIndex = data.findIndex(
      item =>
        item.warehouseName === warehouseToEdit.warehouseName &&
        item.email === warehouseToEdit.email &&
        item.phone === warehouseToEdit.phone &&
        item.location === warehouseToEdit.location &&
        item.createdDate === warehouseToEdit.createdDate
    );

    setEditWarehouseIndex(originalIndex);
    setEditVisible(true);
    setAddNewVisible(false);
    setNewWarehouse({
      warehouseName: warehouseToEdit.warehouseName,
      email: warehouseToEdit.email,
      phone: warehouseToEdit.phone,
      location: warehouseToEdit.location,
      createdDate: warehouseToEdit.createdDate,
    });
  };

  const handleBackToList = () => {
    setAddNewVisible(false);
    setEditVisible(false);
    setNewWarehouse(initialNewWarehouseState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWarehouse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addWarehouse = () => {
    if (
      newWarehouse.warehouseName &&
      newWarehouse.email &&
      newWarehouse.phone &&
      newWarehouse.location &&
      newWarehouse.createdDate
    ) {
      const newWarehouseEntry = { ...newWarehouse };

      setData((prevState) => [...prevState, newWarehouseEntry]);
      setAddNewVisible(false);
      setNewWarehouse(initialNewWarehouseState);
      handleSearchAndSort([...data, newWarehouseEntry], sortKey);
    } else {
      alert('Please fill in all fields');
    }
  };

  const updateWarehouse = () => {
    const updatedData = data.map((warehouse, index) =>
      index === editWarehouseIndex
        ? { ...newWarehouse }
        : warehouse
    );

    setData(updatedData);
    setEditVisible(false);
    setNewWarehouse(initialNewWarehouseState);
    setEditWarehouseIndex(null);
    handleSearchAndSort(updatedData, sortKey);
  };

  const uniqueLocations = [...new Set(data.map((item) => item.location))];

  const formatDateWithoutTime = (dateString) => {
    if (!dateString) return '';
    const [date] = dateString.split('T');
    return date;
  };

  return (
    <div className="bg-transparent">
      {!isAddNewVisible && !isEditVisible ? (
        <div className="flex flex-col w-full gap-5">
          <div className="text-black font-vietnam text-3xl font-extrabold tracking-tight">
            XYZ
          </div>
          <div className="flex flex-col p-4 rounded bg-[#CCE8EA] w-1/4 gap-1">
            <div className="text-[#828282] font-vietnam text-sm font-medium">
              Total Warehouse
            </div>
            <div className="text-black font-vietnam text-3xl font-semibold">
              {sortedData.length} Warehouse
            </div>
          </div>
          <div className="flex flex-row w-full justify-between items-center gap-4">
            <label className="input input-bordered flex items-center gap-2 rounded-md px-5 h-10">
              <input
                type="text"
                className="grow border-none focus:border-none focus:ring-0 m-0 p-0 font-vietnam w-48"
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
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2 items-center">
                <div className="font-vietnam font-semibold text-md items-center">
                  Sort By:
                </div>
                <select
                  className="bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent py-2.5"
                  value={sortKey}
                  onChange={handleSortChange}
                >
                  <option value="warehouseName-a-z">
                    Warehouse Name (A to Z)
                  </option>
                  <option value="warehouseName-z-a">
                    Warehouse Name (Z to A)
                  </option>
                  <option value="createdDate-asc">Created Date (↑)</option>
                  <option value="createdDate-desc">Created Date (↓)</option>
                </select>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="font-vietnam font-semibold text-md items-center">
                  Location:
                </div>
                <select
                  className="bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent py-2.5"
                  value={filterLocation}
                  onChange={handleFilterChange}
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="bg-[#CD4848] rounded py-2 px-6 flex gap-2 items-center justify-center hover:bg-[#CD4848]/80" onClick={handleAddNewClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M1.14263 7.09844C0.535977 7.09844 0.0441895 6.60665 0.0441895 6C0.0441895 5.39335 0.535976 4.90156 1.14263 4.90156H10.9016C11.5082 4.90156 12 5.39335 12 6C12 6.60665 11.5082 7.09844 10.9016 7.09844H1.14263ZM6.02211 12C5.41546 12 4.92368 11.5082 4.92368 10.9016V1.09844C4.92368 0.491787 5.41546 0 6.02211 0C6.62876 0 7.12055 0.491787 7.12055 1.09844V10.9016C7.12055 11.5082 6.62876 12 6.02211 12Z"
                  fill="white"
                />
              </svg>
              <div className="text-white font-vietnam text-base font-medium">
                ADD NEW
              </div>
            </button>
          </div>

          <div className="overflow-hidden">
            <TableComponent data={sortedData} onEditClick={handleEditClick} />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold">{isAddNewVisible ? 'Add Warehouse' : 'Edit Warehouse'}</h2>
          </div>
          <form className="grid grid-cols-2 gap-4">
            <input
              name="warehouseName"
              value={newWarehouse.warehouseName}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Warehouse Name"
            />
            <input
              name="email"
              value={newWarehouse.email}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Email"
            />
            <input
              name="phone"
              value={newWarehouse.phone}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Phone"
            />
            <input
              name="location"
              value={newWarehouse.location}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Location"
            />
            <div className="col-span-2">              
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 text-white bg-gray-500 rounded-lg mr-2"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-white bg-[#CD4848] rounded-lg"
                onClick={isAddNewVisible ? addWarehouse : updateWarehouse}
              >
                {isAddNewVisible ? 'Add Warehouse' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default XyzDetails;
