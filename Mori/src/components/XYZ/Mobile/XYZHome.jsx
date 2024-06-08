import React from "react";
import { useWindowSize } from 'react-use';
import { Doughnut } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import { useState } from 'react';

import moriLogo from '../../../assets/moriWhite.png';
import bell from '../../../assets/bell.png';
import hamburg from '../../../assets/hamburg.png';
import bg from '../../../assets/usercardBG2.png';
import collector from '../../../assets/collectorLogo.png';
import processor from '../../../assets/processorLogo.png';
import shipping from '../../../assets/shippingLogo.png';
import truck from '../../../assets/shippingTruck.png';
import StatusComponent from "./StatusComponent";
import rightArrow from '../../../assets/rightArrow.png';
import arrowDown from '../../../assets/arrowDown.png';

const shipmentData = [
    {
      id: "98478",
      status: "Missing",
      batches: [10201, 10273, 10279, 10330, 10345],
      totalWeight: 72.3,
      collected: "15 March 2024",
      time: "07:00 PM",
    },
  ];

  
const gaugeOptions = {
  responsive: true,
  cutout: '80%',
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  maintainAspectRatio: false,
  events: [],
};

export default function XYZHome() {
  const { width } = useWindowSize();
  const isMobile = width <= 640;

  const [machinesData, setMachines] = useState([
    { location: 'Kecamatan Semau', status: 'FULL', currentLoad: 31.1, capacity: 50, lastUpdated: '1 hour ago' },
  ]);
  
  const renderMachines = () => {
    return machinesData.map((machine, index) => (
      <MachineCard key={machine.location} machine={machine} extraMarginClass={index === machinesData.length - 1 ? 'mb-10' : 'mb-4'} />
    ));
  };
  
  const MachineCard = ({ machine, extraMarginClass }) => {
    const chartColor = machine.currentLoad === machine.capacity ? '#0F3F43' : (machine.currentLoad > machine.capacity / 2 ? '#A7AD6F' : '#99D0D580');
    const linkTo = `/dryingmachine/${machine.location}`;
    
    const [region, location] = machine.location.split(' ');
  
    return (
      <div className={`machine-card bg-white p-4 rounded-lg shadow ${extraMarginClass} flex flex-col items-center font-vietnam ${machine.status.toLowerCase()}`} style={{ width: 'auto', flexGrow: 1, minWidth: '300px', minHeight: '100px', maxWidth: 'none', position: 'relative' }}>
      {/* Machine Location Button */}
      <div className="machine-location w-[170px] h-[26px] px-2.5 py-1 bg-black rounded justify-start items-center gap-2 inline-flex text-white text-sm font-medium font-['Be Vietnam Pro']" style={{ position: 'absolute', left: '15px', top: '9px'}}>
        <span className="text-sm">{region} </span><span className="font-bold text-sm">{location}</span>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 5C6 5.13464 5.9724 5.26019 5.9172 5.37664C5.86569 5.48945 5.78289 5.60044 5.66881 5.70961L1.50138 9.74891C1.33211 9.9163 1.12603 10 0.883165 10C0.724931 10 0.577737 9.95997 0.441582 9.87991C0.305428 9.80349 0.196872 9.69978 0.115915 9.56878C0.0386385 9.43777 0 9.29221 0 9.1321C0 8.89192 0.0938362 8.67722 0.281509 8.48799L3.91904 4.99454L0.281509 1.50655C0.0938362 1.3246 0 1.11172 0 0.867904C0 0.707787 0.0386385 0.562227 0.115915 0.431223C0.196872 0.300218 0.305428 0.196507 0.441582 0.120087C0.577737 0.0400291 0.724931 0 0.883165 0C1.12603 0 1.33211 0.0818777 1.50138 0.245633L5.66881 4.28493C5.78289 4.3941 5.86569 4.50691 5.9172 4.62336C5.96872 4.73617 5.99632 4.86172 6 5Z" fill="white"/>
        </svg>
      </div>
        
        {/* Machine Info */}
        <div className="machine-info flex justify-center items-center w-full mb-2" style={{ marginTop: '18px' }}>
        <div className="chart-container" style={{ width: '150px', height: '120px', position: 'relative' }}>
          <Doughnut data={{ labels: ['Current Load', 'Capacity'], datasets: [{ data: [machine.currentLoad, machine.capacity - machine.currentLoad], backgroundColor: [chartColor, '#EFEFEF'], borderWidth: 0 }] }} options={gaugeOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ fontSize: '0' }}>
            <span className="font-vietnam font-bold" style={{ fontSize: '24px', lineHeight: '1.2' }}>{machine.currentLoad} kg</span>
            <span className="font-vietnam font-bold" style={{ fontSize: '12px', lineHeight: '1.2', marginBottom: '-30px' }}>{`/ ${machine.capacity} kg`}</span>
          </div>
        </div>
      </div>
      <div className="last-updated" style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '10px', color: '#666666' }}>
        <div>Last updated:</div>
        <div style={{ fontWeight: 'bold' }}>{machine.lastUpdated}</div>
      </div>
    </div>
    );
  };

  return (
    <div>
      <style>
        {`
          .bg-custom-c16548 { background-color: #C16548; }
          .bg-custom-86b788 { background-color: #86B788; }
          .bg-custom-f4df67 { background-color: #F4DF67; }
        `}
      </style>

      {isMobile ? (
        <div className="bg-[#F0F0F0]">
        <header className="flex flex-col p-4 shadow-md" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Link to="/XYZNavigation">
                  <img src={hamburg} alt="divisions" className="text-6xl font-bold text-gray-700 w-5" />
                </Link>
                </div>
                <img src={moriLogo} alt="mori logo" className="text-6xl ml-2 mt-3 font-bold text-gray-700 w-20" />
                <div className="flex">
                <Link to="/XYZNotif">
                  <img src={bell} alt="notifications" className="text-6xl mr-2 font-bold text-gray-700 w-5" />
                </Link>
                </div>
            </div>
            <div className="flex flex-row gap-5 p-3">
                <div className="w-16 h-16 bg-black rounded-full"></div>
                <div className="">
                <p className="text-lg text-white font-semibold">Selamat pagi,</p>
                <p className="text-3xl text-white font-semibold">John Doe</p>
                </div>
            </div>
            <div className="mt-auto flex items-center justify-between px-10">
                <div>
                    <span className="text-white text-sm font-medium font-['Be Vietnam Pro']">Warehouse </span>
                    <span className="text-white text-sm font-bold font-['Be Vietnam Pro']">Kupang</span>
                    <span className="text-white text-sm font-medium font-['Be Vietnam Pro']"> Kecamatan </span>
                    <span className="text-white text-sm font-bold font-['Be Vietnam Pro']">Semau</span>
                </div>
                <img src={arrowDown} alt="right arrow" />
            </div>

        </header>

            {/* Current Stock Management */}
            <div className="p-5">
            <div className="mt-[-10px]">
                <h2 className="text-black text-xl font-bold font-['Be Vietnam Pro']">Current Stock Management</h2>
            </div>
            <div className="machine-status my-4">{renderMachines()}</div>
            
            {/* View all locations */}
            <div className="mt-[-20px]">
            <div className="mb-[10px] w-full h-[38px] px-4 py-2.5 bg-white rounded justify-center items-center gap-2 inline-flex">
                <div className="text-black text-sm font-medium font-['Be Vietnam Pro']">View All</div>
                <img src={rightArrow} alt="right arrow" className="w-[6.69px] h-[11.87px] relative" />
            </div>
            </div>

            </div>

          {/* Quick Access */}
          <div className="p-5">
            <div className="mt-[-30px]">
              <h2 className="text-black text-xl font-bold font-['Be Vietnam Pro']">Quick Access</h2>
            </div>
            <div className="flex">

            <div className="flex justify-center">
              
            <div className="flex justify-center">
              
              {/* Stock */}
              <Link to="/collector" className="flex-grow">
                  <div className="mt-3 mr-3 h-[74px] px-4 py-3 bg-stone-600 rounded-lg flex items-center" style={{ backgroundColor: '#5C612C' }}>
                      <img src={shipping} alt="mori logo" className="w-6" style={{ marginTop: '5px', marginRight: '5px' }} />
                      <div className="w-[18.65px] h-5 relative" />
                      <div className="flex flex-col justify-start items-start gap-0.1">
                          <div className="text-white text-[15px] font-bold font-['Be Vietnam Pro']" style={{ marginTop: '-4px' }}>Stock Management</div>
                          <div className="text-white text-[8px] font-normal font-['Be Vietnam Pro']">2 Warehouse almost FULL</div>
                      </div>
                  </div>
              </Link>

              {/* Shipping */}
              <Link to="/shipping" className="flex-grow">
                  <div className="mt-3 mr-3 h-[74px] px-4 py-3 bg-stone-600 rounded-lg flex items-center" style={{ backgroundColor: '#00000099' }}>
                      <img src={truck} alt="mori logo" className="w-6" style={{ marginTop: '5px', marginRight: '5px' }} />
                      <div className="w-[18.65px] h-5 relative" />
                      <div className="flex flex-col justify-start items-start gap-0.25">
                          <div className="text-white text-[15px] font-bold font-['Be Vietnam Pro']" style={{ marginTop: '-4px' }}>Shipping Information</div>
                          <div className="text-white text-[8px] font-normal font-['Be Vietnam Pro']">4 Shipment Arriving</div>
                      </div>
                  </div>
              </Link>
          </div>
          </div>
          </div>
            {/* Recent Shipping Status */}
            <div className="pt-5">
            <div className="mt-[5px]">
                <h2 className="text-black text-xl font-bold font-['Be Vietnam Pro']">Recent Shipping Status</h2>
            </div>

                <div className="overflow-y-auto">
                {shipmentData.map((shipment) => (
                    <StatusComponent
                    key={shipment.id}
                    id={shipment.id}
                    status={shipment.status}
                    batches={shipment.batches}
                    totalWeight={shipment.totalWeight}
                    collected={shipment.collected}
                    time={shipment.time}
                    />
                ))}
                </div>
   
            {/* View all locations */}
            <div className="pt-5">
            <div className="mt-[-15px]">
            <div className="mb-[10px] w-full h-[38px] px-4 py-2.5 bg-white rounded justify-center items-center gap-2 inline-flex">
                <div className="text-black text-sm font-medium font-['Be Vietnam Pro']">View All Locations</div>
                <img src={rightArrow} alt="right arrow" className="w-[6.69px] h-[11.87px] relative" />
            </div>
            </div>
            </div>
            </div>
            </div>
            {/* Empty Space */}
            <div style={{ height: '30px' }} /> {/* Adjust height as needed for empty space */}

          <footer className="bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
            <p className="font-semibold">@2024 AMIN</p>
            <p className="font-semibold">CENTRA</p>
          </footer>
        </div>

        
      ) : (
        <div className="flex justify-center items-center h-screen mt-4 text-gray-600">
          Not available for this device.
        </div>
      )}
    </div>
  );
}
