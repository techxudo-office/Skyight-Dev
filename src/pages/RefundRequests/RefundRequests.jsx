import React, { useEffect, useState } from "react";
import {
  Table,
  SecondaryButton,
  ConfirmModal,
  Dropdown,
  Tag,
  CustomTooltip,
} from "../../components/components";
import { getFlightBookings } from "../../utils/api_handler";

import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import toast from "react-hot-toast";
import MainTable from "../../components/MainTable/MainTable";

import { FaEye, FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";
import { baseUrl, getToken } from "../../utils/api_handler";
import { useDispatch, useSelector } from "react-redux";
import {
  getRefundFlight,
  refundRequestFlight,
} from "../../_core/features/bookingSlice";
import { IoIosAirplane } from "react-icons/io";
import dayjs from "dayjs";

const RefundRequests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookingsData, setBookingsData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);

  const [data, setData] = useState([]);
  const { userData } = useSelector((state) => state.auth);
  const { getRefundBooking, isGetRefundsLoading } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(getRefundFlight(userData?.token));
  }, []);

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
            <span onClick={() => handleAcceptRefund(row.id)}>ACCEPT</span>
          </CustomTooltip>
        </div>
      ),
      sortable: false,
      center: true,
    },
  ];

  const handleAcceptRefund = (id) => {
    dispatch(refundRequestFlight({ id, token: userData?.token }));
  };

  console.log("get refund booking", getRefundBooking);
  return (
    <>
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Refund Requests"}
          className="flex items-center justify-between"
        ></CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <Table
            tableData={getRefundBooking || []}
            columnsData={columns}
            pagination={true}
            progressPending={isGetRefundsLoading}
            paginationTotalRows={getRefundBooking?.length}
            paginationComponentOptions={{ noRowsPerPage: "10" }}

            // viewColumns={viewColumns}
            // data={data||[]}
            // actions={actionsData}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
      {/* <MainTable columns={columns} data={data} />; */}
    </>
  );
};

export default RefundRequests;
