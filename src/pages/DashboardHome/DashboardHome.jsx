import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardCards, Table, Tag } from "../../components/components";
import { getFlightBookings } from "../../_core/features/bookingSlice";
import { IoIosAirplane } from "react-icons/io";
import dayjs from "dayjs";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminData } = useSelector((state) => state.auth);
  const { flightBookings, isLoadingFlightBookings } = useSelector(
    (state) => state.booking
  );

  const columns = [
    {
      name: "ROUTE",
      selector: (row) => (
        <span className="flex items-center gap-2 text-sm w-52 lg:justify-center text-text">
          {row.origin}
          <div className="flex items-center justify-center gap-1">
            <span className="h-0.5 w-3 bg-primary"></span>
            <IoIosAirplane className="text-lg text-primary" />
            <span className="h-0.5 w-3 bg-primary"></span>
          </div>
          {row.destination}
        </span>
      ),
      sortable: false,
      center: true,
      wrap: true,
      grow: 4,
    },
    {
      name: "PNR",
      selector: (row) => row.booking_reference_id,
      sortable: false,
      minwidth: "150px",
      center: true,
      grow: 2,
    },
    {
      name: "TOTAL FARE",
      selector: (row) => row.total_fare,
      sortable: false,
      center: true,
      grow: 2,
    },
    {
      name: "STATUS",
      selector: (row) => <Tag value={row.booking_status} />,
      sortable: false,
      center: true,
      wrap: true,
      grow: 4,
    },
    {
      name: "CREATED AT",
      selector: (row) => dayjs(row.created_at).format("MMM-DD-YYYY"),
      sortable: false,
      center: true,
      grow: 2,
    },
    {
      name: "",
      selector: (row) => (
        <span
          className="text-lg cursor-pointer"
          onClick={() => {
            navigate("/dashboard/booking-details", {
              state: row,
            });
          }}
        >
          <FaEye title="View" className="text-green-500 " />
        </span>
      ),
      sortable: false,
      center: true,
    },
  ];
  
  const DataArray = [
    {
      title: "Latest Transactions",
      tableData: flightBookings,
      link: "/dashboard/transactions",
    },
    {
      title: "Refund Requests",
      tableData: flightBookings,
      link: "/dashboard/refund-requests",
    },
    {
      title: "Recent Bookings",
      tableData: flightBookings,
      link: "/dashboard/flight-bookings",
    },
    {
      title: "Cancelled Orders",
      tableData: flightBookings,
      link: "/dashboard/cancel-requests",
    },
  ];
  
  useEffect(() => {
    if (!adminData.token) return;
    dispatch(getFlightBookings(adminData.token));
  }, [dispatch]);


  return (
    <div className="px-5 pb-10 space-y-10">
      <DashboardCards />

      {DataArray.map((section, index) => (
        <div key={index}>
          <h2 className="mb-3 text-xl font-semibold">{section.title}</h2>
          <Table
            pagination={true}
            columnsData={columns}
            tableData={section.tableData || []}
            progressPending={isLoadingFlightBookings}
            paginationTotalRows={section.tableData.length}
            paginationComponentOptions={{ noRowsPerPage: "10" }}
            // searching={false}
          />
          <div className="mt-4 text-right">
            <button
              onClick={() => navigate(section.link)}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Read More →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardHome;
