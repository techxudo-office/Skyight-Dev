import React, { useEffect, useState } from "react";
import {
  DashboardCards,
  TableNew,
  Searchbar,
  Table,
} from "../../components/components";
import { getRoutes, getFlightBookings } from "../../utils/api_handler";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import toast from "react-hot-toast";

import { FaEye } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [flightsData, setFlightsData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const { userData } = useSelector((state) => state.auth);

  var settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 2500, // Adjust speed for smaller screens
          dots: false,
        },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          dots: false,
        },
      },
    ],
  };

  const navigationHandler = () => {
    navigate("/dashboard/search-flights");
  };

  const getActiveRoutes = async () => {
    let response = await getRoutes();
    if (response?.status) {
      setFlightsData(response.data.slice(0, 3));
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    getActiveRoutes();
  }, []);

  const columnsData = [
    // { columnName: "No.", fieldName: "no.", type: "no." },
    { columnName: "Origin", fieldName: "origin", type: "text" },
    { columnName: "Destination", fieldName: "destination", type: "text" },
    { columnName: "PNR", fieldName: "booking_reference_id", type: "text" },
    { columnName: "Total Fare", fieldName: "total_fare", type: "number" },
    // { columnName: "Currency", fieldName: "currency", type: "text" },
    { columnName: "Status", fieldName: "booking_status", type: "status" },
    { columnName: "Created At", fieldName: "created_at", type: "date" },
  ];
  const actionsData = [
    {
      name: "View",
      icon: <FaEye title="View" className="text-green-500 " />,
      // handler: (index) => {
      //   if (activeIndex === index) {
      //     setActiveIndex(null);
      //   } else setActiveIndex(index);
      // },
      handler: (_, item) => {
        navigate("/dashboard/booking-details", {
          state: item,
        });
      },
    },
    // {
    //   name: "Refund",
    //   icon: <HiReceiptRefund title="Refund" className="text-xl text-blue-500" />,
    //   handler: (_, item) => {
    //     setConfirmStatus(true)
    //     setRefundItem(item)

    //   },
    // },
    // {
    //   name: "Cancel",
    //   icon: <MdCancel title="Cancel" className="text-red-500" />,
    //   handler: (_,item) => {
    //     cancelFlightBookingHandler(item);
    //   },
    // },
  ];
  const gettingFlightBookings = async () => {
    const id = userData?.user?.company_id;
    const response = await getFlightBookings(id);
    if (response?.status) {
      setBookingsData(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    gettingFlightBookings();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* <div className="w-[80vw]">
        <Slider {...settings}>
          {Array.from({ length: 10 }).map((_, index) => (
            <DashboardCards key={index} index={index} />
          ))}
        </Slider>
      </div> */}

      {/* Cards */}
      {/* <DownloadButton /> */}
      <div className="w-full p-3">
        <h2 className="text-3xl font-semibold text-text mb-7">
          Featured Flights
        </h2>
        <div className="w-full overflow-x-hidden">
          {flightsData.length > 0 ? (
            <Slider {...settings} className="flex gap-3 ">
              {flightsData.map((item, index) => (
                <DashboardCards key={index} index={index} data={item} />
              ))}
            </Slider>
          ) : (
            <div className="w-full text-center text-gray-500">
              No Featured Flights
            </div>
          )}
        </div>
      </div>
      {/* Flights */}
      <CardLayoutContainer removeBg={true} className={"mt-5"}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Flight Bookings"}
          className="flex items-center justify-between"
        ></CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <Searchbar className={"mb-7"} />

          <TableNew
            columnsToView={columnsData}
            tableData={bookingsData}
            downloadBtn={true}
            actions={actionsData}
          />
          {/* <Table /> */}
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
      <div
        id="footer-container"
        className="flex items-center justify-center w-full p-3 pb-0 bg-white"
      >
        <h2 className="mt-2 font-semibold text-center text-text text-md">
          © 2024 All rights reserved by SKYIGHT AIR & BOOKING SYSTEM
        </h2>
      </div>
    </div>
  );
};

export default DashboardHome;
