import React, { useEffect } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Button, SecondaryButton } from "../../components/components";
import { useNavigate } from "react-router-dom";

import { FaPlane } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { IoIosAirplane, IoMdEye } from "react-icons/io";
import { MdChildCare, MdChildFriendly, MdPerson } from "react-icons/md";

const FlightCard = ({ data,doc_type ,travelers, pricingInfo }) => {
  const navigate = useNavigate();
  const totalTravelers = [];
  Object.entries(travelers).forEach(([key, value]) => {
    if (value>0) {
      totalTravelers.push(key.replace('s',''))
    }
  })
  console.log('totaltravelrs',totalTravelers)
  console.log(travelers)
  const flightSegment =
    data.AirItinerary.OriginDestinationOptions[0].FlightSegment[0];

  const viewDetails = () => {
    navigate("/dashboard/travelers-details", { state: { data,doc_type, travelers, pricingInfo } });
  };

  return (
    <>
      <CardLayoutContainer className={"mb-5"}>
        <CardLayoutHeader className={"flex items-center justify-between"}>
          <div className="w-full flex flex-wrap gap-5 justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-text">
                {flightSegment.OperatingAirline.Code}
              </h2>
              <h2 className="text-sm font-semibold text-gray">
                {flightSegment.FlightNumber}
              </h2>
              <h2 className="text-sm font-semibold text-gray">
                {flightSegment.DepartureDate}
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>
                <h2 className="text-sm font-semibold text-text">
                  {flightSegment.FlightDuration}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-5">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-md font-semibold text-text">
                    {flightSegment.DepartureAirport.LocationCode}
                  </h2>
                  <h2 className="text-md font-semibold text-text">
                    {flightSegment.DepartureTime}
                  </h2>
                </div>
                <div className="flex gap-3 items-center text-primary">
                  <span className="h-0.5 w-8 bg-primary"></span>
                  <IoIosAirplane className="text-2xl" />
                  <span className="h-0.5 w-8 bg-primary"></span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-md font-semibold text-text">
                    {flightSegment.ArrivalAirport.LocationCode}
                  </h2>
                  <h2 className="text-md font-semibold text-text">
                    {flightSegment.ArrivalTime}
                  </h2>
                </div>
              </div>
              <div>
                <h2 className="text-xs font-semibold text-text">
                  Non Stop (Fix)
                </h2>
              </div>
            </div>
            <div>
              <SecondaryButton text={"AIRBLUEAPI (Fix)"} />
            </div>
          </div>
        </CardLayoutHeader>
        <CardLayoutBody>
          <div className="flex flex-col">
            {totalTravelers.length &&
              totalTravelers.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`flex py-3 ${index==totalTravelers.length-1?'':'border-b'}  border-slate-200 items-center justify-between`}
                  >
                    <h2 className="text-sm font-semibold text-text flex  items-center justify-center gap-1">
                      <span className="text-lg">
                      {item=='adult'?<MdPerson/>:item=='child'?<MdChildCare/>:<MdChildFriendly/>}
                      </span>
                      <span className="capitalize"> {item}</span>
                    </h2>
                    <h2 className="text-sm font-semibold text-text flex  items-center justify-center gap-1">
                      <span>
                        <FaSuitcase />
                      </span>
                      <span>
                        Baggage {flightSegment.FreeBaggages[index].Quantity} {flightSegment.FreeBaggages[index].Unit}
                      </span>
                    </h2>
                    <h2 className="text-sm font-semibold text-text flex  items-center justify-center gap-1">
                      <span>
                        <FaMoneyBillAlt />
                      </span>
                      <span>20,000 (Fix)</span>
                    </h2>
                  </div>
                );
              })}
          </div>
        </CardLayoutBody>
        <CardLayoutFooter>
          <div>
            <Button icon={<IoMdEye />} onClick={viewDetails} text={"View Details"} />
          </div>
        </CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default FlightCard;
