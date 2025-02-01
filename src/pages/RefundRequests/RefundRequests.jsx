import React, { useEffect, useState } from "react";
import {
  Table,
  SecondaryButton,
  ConfirmModal,
  Dropdown,
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

const RefundRequests = () => {
  const navigate = useNavigate();

  const [bookingsData, setBookingsData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);

  const [data, setData] = useState([]);

  const navigationHandler = () => {
    navigate("/dashboard/search-flights");
  };

  const columns = [
    { columnName: "No.", fieldName: "no.", type: "no." },
    { columnName: "Origin", fieldName: "origin", type: "text" },
    { columnName: "Destination", fieldName: "destination", type: "text" },
    { columnName: "Total Fare", fieldName: "total_fare", type: "text" },
    { columnName: "Currency", fieldName: "currency", type: "text" },
    { columnName: "Status", fieldName: "booking_status", type: "status" },
    { columnName: "Created At", fieldName: "created_at", type: "text" },
    { columnName: "Actions", fieldName: "actions", type: "actions" },
  ];

  const viewColumns = [
    { columnName: "Ref Id", fieldName: "booking_reference_id", type: "text" },
    { columnName: "Updated At", fieldName: "updated_at", type: "text" },
    {
      columnName: "Transaction Identifier",
      fieldName: "transaction_identifier",
      type: "text",
    },
    {
      columnName: "Ticketing Time Limit",
      fieldName: "ticketing_time_limit",
      type: "text",
    },
    { columnName: "Booking Id", fieldName: "id", type: "id" },
    { columnName: "Rate", fieldName: "rate", type: "text" },
    { columnName: "Percentage", fieldName: "persantage", type: "text" },
    { columnName: "Cancel At", fieldName: "canceled_at", type: "text" },
  ];

  // const actionsData = [
  //   {
  //     name: "View",
  //     icon: <FaEye title="View" className="text-green-500" />,
  //     handler: (index, item) => {
  //       console.log("dsaasd")
  //       console.log({index})
  //       console.log({item: item.booking_reference_id})
  //       if([, index]){
  //         console.log(`Console ${index}`)
  //       }
  //       if([, !activeIndex]){
  //         console.log(`activeIndex ${activeIndex}`)
  //       }
  //       console.log("index", index)
  //       console.log(`Active Index: ${activeIndex}`)
  //       console.log(`Item: ${item}`)

  //       if({item}){
  //         // navigate(`/dashboard/booking-details/${item.booking_reference_id}`)
  //         navigate("/dashboard/booking-details", {
  //           state: item.booking_reference_id,
  //         });
  //       }
  //      else{
  //       console.log("Conditiion False")
  //      }
  //       // if (activeIndex === index) {
  //       //   setActiveIndex(null);
  //       // } else {
  //       //   setActiveIndex(index);
  //         // navigate("/dashboard/booking-details", {
  //         //   state: item.booking_reference_id,
  //         // });
  //       // }

  //     },
  //   },
  // ];

  // const actionsData = [
  //   {
  //     name: "View",
  //     icon: <FaEye title="View" className="text-green-500" />,
  //     // handler: (index) => {
  //     //   if (activeIndex === index) {
  //     //     setActiveIndex(null);
  //     //   } else setActiveIndex(index);
  //     // },
  //     handler: (index, item) => {
  //       navigate("/dashboard/booking-details", {
  //         state: item.booking_reference_id,
  //       });
  //     },
  //   },
  // ];

  const actionsData = [
    {
      name: "View",
      icon: <FaEye title="View" className="text-green-500" />,
      handler: (index, item) => {
        navigate("/dashboard/booking-details", {
          state: item.booking_reference_id,
        });
      },
    },
    {
      name: "Refund",
      icon: <FaMoneyBillWave title="Request Refund" className="text-red-500" />,
      handler: async (index, item) => {
        try {
          const response = await axios.post(
            `http://localhost:3000/api/booking-refund`,
            {
              // ticket_number: String(item.ticket_number),
              ticket_number: item.ticket_number,
              coupon_number: String(item.coupon_number),
              zero_penalty: true
            },
            {
              headers: {
                Authorization: getToken(),
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            console.log(`Sucess`, response)
            toast.success("Refund request submitted successfully!");
          } else {
            toast.error("Failed to submit refund request.");
          }
        } catch (error) {
          toast.error("Error processing refund request.");
          console.error("Refund API Error:", error);
        }
      },
    },
  ];
  console.log(typeof String(null))
  const getRefundFlight = async () => {
    const response = await axios.get(`${baseUrl}/api/refund-booking`, {
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response.data.data);
    console.log("coupon",typeof response.data.data[3].coupen_number)
    console.log("coupon", response.data.data[3].coupen_number)
    setData(response?.data?.data);
  };
  // console.log(`Data: ${JSON.stringify(data)}`);
  // const gettingFlightBookings = async () => {
  //   const response = await getFlightBookings();
  //   console.log("get filght bookings", response);
  //   if (response.status) {
  //     console.log(response.data);
  //     const data = response.data;
  //     setBookingsData(
  //       data.filter(
  //         ({ booking_status }) => booking_status === "requested-refund"
  //       )
  //     );
  //   }
  // };

  const abortDeleteHandler = () => {
    setModalStatus(false);
    setDeleteId(null);
  };

  useEffect(() => {
    // gettingFlightBookings();
    getRefundFlight();
  }, []);

  return (
    <>
      <ConfirmModal
        status={modalStatus}
        abortDelete={abortDeleteHandler}
        // deleteHandler={cancelFlightBookingHandler}
      />
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Refund Requests"}
          className="flex justify-between items-center"
        ></CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <Table
            columns={columns}
            viewColumns={viewColumns}
            data={data}
            actions={actionsData}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
      {/* <MainTable columns={columns} data={data} />; */}
    </>
  );
};

export default RefundRequests;
