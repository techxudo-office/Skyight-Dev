import React, { useEffect, useState } from "react";
import {
  Table,
  SecondaryButton,
  ConfirmModal,
  Dropdown,
  Tag,
  CustomTooltip,
} from "../../components/components";
import {
  cancelRequestFlight,
  getFlightBookings,
} from "../../_core/features/bookingSlice";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import toast from "react-hot-toast";

import { FaEye } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const CancelRequests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { flightBookings, isLoadingFlightBookings, isCancelRequestLoading } =
    useSelector((state) => state.booking);
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
        <div className="flex items-center gap-x-4">
          <CustomTooltip content={"Details"}>
            <FaEye
              className="text-lg cursor-pointer text-greenColor"
              onClick={() =>
                navigate("/dashboard/booking-details", {
                  state: row,
                })
              }
            />
          </CustomTooltip>
          <CustomTooltip content={"Accept"}>
            <span onClick={() => handleCancelRequest(row.id)}>Accept</span>
          </CustomTooltip>
        </div>
      ),
      sortable: false,
      center: true,
    },
  ];

  const handleCancelRequest = (id) => {
    dispatch(cancelRequestFlight({ id, token: userData?.token }));
  };

  useEffect(() => {
    dispatch(getFlightBookings(userData?.token));
  }, []);
  const canceledBooking = flightBookings.filter(
    (item) => item.booking_status === "requested-cancellation"
  );
  return (
    <CardLayoutContainer removeBg={true}>
      <CardLayoutHeader
        removeBorder={true}
        heading={"Cancel Requests"}
        className="flex items-center justify-between"
      ></CardLayoutHeader>
      <CardLayoutBody removeBorder={true}>
        <Table
          pagination={true}
          columnsData={columns}
          tableData={canceledBooking || []}
          progressPending={isLoadingFlightBookings}
          paginationTotalRows={canceledBooking.length}
          paginationComponentOptions={{ noRowsPerPage: "10" }}
        />
      </CardLayoutBody>
      <CardLayoutFooter></CardLayoutFooter>
    </CardLayoutContainer>
  );
};

export default CancelRequests;
