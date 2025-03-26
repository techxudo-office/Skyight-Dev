import React, { useEffect, useState } from "react";
import {
  Button,
  CustomTooltip,
  ModalWrapper,
  SecondaryButton,
  Table,
  Tag,
} from "../../components/components";
import { FaEye } from "react-icons/fa";
import { MdAdd, MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import "./Transaction.css";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../_core/features/transactionSlice";
import EditTransactionModal from "./EditTransactionModal/EditTransactionModal";

const Transactions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const { transactions, isLoadingTransactions } = useSelector(
    (state) => state.transaction
  );
  const [transactionId, setTransactionId] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getTransactions(userData?.token));
  }, [dispatch, userData?.token]);

  const handleView = (row) => {
    setSelectedTransaction(row);
    setIsViewModalOpen(true);
  };

  const handleEdit = (row) => {
    setTransactionId(row.id);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedTransaction(null);
    setTransactionId(null);
  };

  const columns = [
    {
      name: "BANK",
      selector: (row) => row.bank_name,
      sortable: false,
      minwidth: "150px",
      center: true,
    },
    {
      name: "BANK NO.",
      selector: (row) => row.bank_number,
      sortable: false,
      center: true,
    },
    {
      name: "PAYMENT DATE",
      selector: (row) => dayjs(row.payment_date).format("ddd-DD-MMM-YYYY"),
      sortable: false,
      center: true,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.amount,
      sortable: false,
      center: true,
    },
    {
      name: "STATUS",
      selector: (row) => <Tag value={row.status} />,
      sortable: false,
      center: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "",
      selector: (row) => (
        <div className="flex items-center gap-x-4">
          <CustomTooltip content={"Details"}>
            <FaEye
              className="text-lg cursor-pointer text-greenColor"
              onClick={() => handleView(row)}
            />
          </CustomTooltip>
          <CustomTooltip content={"Edit"}>
            <MdEditSquare
              className="text-base cursor-pointer text-primary"
              onClick={() => handleEdit(row)}
            />
          </CustomTooltip>
        </div>
      ),
      sortable: false,
      center: true,
    },
  ];

  return (
    <>
      {isEditModalOpen && (
        <EditTransactionModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          transactionId={transactionId}
        />
      )}
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Transactions"}
          className="flex items-center justify-between"
        >
          <div className="relative">
            <SecondaryButton
              text={"Create New Transaction"}
              icon={<MdAdd />}
              onClick={() => navigate("/dashboard/create-transaction")}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <Table
            pagination={true}
            columnsData={columns}
            tableData={transactions || []}
            progressPending={isLoadingTransactions}
            paginationTotalRows={transactions.length}
            paginationComponentOptions={{ noRowsPerPage: "10" }}
          />
        </CardLayoutBody>

        <CardLayoutFooter />
      </CardLayoutContainer>
      <ModalWrapper
        isOpen={isViewModalOpen}
        onRequestClose={closeModal}
        contentLabel="Transaction Details"
      >
        {selectedTransaction && (
          <div className="max-w-md p-6 mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
            <h2 className="pb-2 mb-4 text-2xl font-bold text-center border-b">
              Transaction Invoice
            </h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Transaction ID:</span>
              <span className="font-semibold">
                {selectedTransaction?.id || "N/A"}
              </span>
            </div>
            <img
              src={selectedTransaction?.document_url}
              alt="Document"
              className="object-cover w-full h-40 mb-4 border rounded-md"
            />
            <div className="space-y-2 text-sm">
              <p>
                <strong className="text-text">Bank Holder Name:</strong>{" "}
                <span className="font-medium">
                  {selectedTransaction?.account_holder_name}
                </span>
              </p>
              <p>
                <strong className="text-text">Bank number:</strong>{" "}
                <span className="font-medium">
                  {selectedTransaction?.bank_number}
                </span>
              </p>
              <p>
                <strong className="text-text">Bank:</strong>{" "}
                <span className="font-medium">
                  {selectedTransaction?.bank_name}
                </span>
              </p>
              <p>
                <strong className="text-text">Comment:</strong>{" "}
                <span className="font-medium">
                  {selectedTransaction?.comment}
                </span>
              </p>
              <p>
                <strong className="text-text">Payment Date:</strong>{" "}
                <span className="font-medium">
                  {dayjs(selectedTransaction?.payment_date).format(
                    "DD-MMM-YYYY h:mm a"
                  )}
                </span>
              </p>
              <p>
                <strong className="text-text">Amount:</strong>{" "}
                <span className="font-medium text-greenColor">
                  ${selectedTransaction?.amount}
                </span>
              </p>
              <p className="flex items-center w-40 gap-x-2">
                <strong className="text-text">Status:</strong>{" "}
                <Tag value={selectedTransaction?.status} />
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                onClick={closeModal}
                text="Close"
                className="px-4 py-2 text-white rounded-md hover:bg-primary bg-redColor"
              />
            </div>
          </div>
        )}
      </ModalWrapper>
    </>
  );
};

export default Transactions;
