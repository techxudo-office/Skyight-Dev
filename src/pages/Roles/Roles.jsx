import React, { useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";

import { FaCross, FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";

import { Table, Dropdown, SecondaryButton, TableNew } from "../../components/components";

const Roles = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [dropdownStatus, setDropdownStatus] = useState(false);

  const data = [
    {
      id: "64c3f3f4e4b0f1a1d2c3b3e1",
      role: "Admin",
      roleRights: "Full Access",
      status: "active",
    },
    {
      id: "64c3f3f4e4b0f1a1d2c3b3e2",
      role: "Editor",
      roleRights: "Create, Update, View",
      status: "active",
    },
    {
      id: "64c3f3f4e4b0f1a1d2c3b3e3",
      role: "Viewer",
      roleRights: "View Only",
      status: "inactive",
    },
    {
      id: "64c3f3f4e4b0f1a1d2c3b3e4",
      role: "Manager",
      roleRights: "Create, Update, View",
      status: "active",
    },
    {
      id: "64c3f3f4e4b0f1a1d2c3b3e5",
      role: "Support",
      roleRights: "Limited Access",
      status: "inactive",
    },
  ];

  const columnsData = [
    // { columnName: "No.", fieldName: "no.", type: "no." },
    // { columnName: "Role Img", fieldName: "image", type: 'img' },
    { columnName: "Role", fieldName: "role", type: "text" },
    { columnName: "Role ID", fieldName: "id", type: "id" },
    { columnName: "Status", fieldName: "status", type: "status" },
    // { columnName: "Actions", fieldName: "actions", type: "actions" },
  ];

  const viewColumns = [
    { columnName: "Role Rights", fieldName: "roleRights", type: "text" },
  ];

  const actionsData = [
    {
      name: "View",
      icon: <FaEye title="View" className="text-green-500" />,
      handler: (index) => {
        if (activeIndex === index) {
          setActiveIndex(null);
        } else setActiveIndex(index);
      },
    },
    {
      name: "Edit",
      icon: <MdEditSquare title="Edit" className="text-blue-500" />,
      handler: () => {
        alert("Hello Im Edit Alert !");
      },
    },
    {
      name: "Rights",
      icon: (
        <FaRegCircleCheck title="Rights" className="text-orange-500 text-sm" />
      ),
      handler: () => {
        alert("Hello Im Rights Alert !");
      },
    },
    {
      name: "Delete",
      icon: <MdAutoDelete title="Delete" className="text-red-500" />,
      handler: () => {
        alert("Hello Im Delete Alert !");
      },
    },
  ];

  const filterOptions = [
    {
      name: "Filter One",
      handler: () => {
        setDropdownStatus(!dropdownStatus);
      },
    },
    {
      name: "Filter Two",
      handler: () => {
        setDropdownStatus(!dropdownStatus);
      },
    },
    {
      name: "Filter Three",
      handler: () => {
        setDropdownStatus(!dropdownStatus);
      },
    },
  ];

  return (
    <>
      {/* {data.map((item, i) => (

        i == activeIndex && <div className="fixed h-screen w-full flex justify-center items-center">
          <div className="relative w-96  h-96 flex justify-center items-center text-text rounded-lg bg-white p-3">
            <FaCross onClick={() => setActiveIndex(null)} className="text-redColor absolute text-4xl top-5 right-5" />
            {item.roleRights}
          </div>
        </div>

      ))} */}

      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Roles"}
          className="flex justify-between items-center"
        >
          <div className="relative">
            <SecondaryButton
              text={"Filters"}
              onClick={() => {
                setDropdownStatus(!dropdownStatus);
              }}
            />
            <Dropdown
              className={"top-16 right-10"}
              status={dropdownStatus}
              changeStatus={setDropdownStatus}
              options={filterOptions}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          {/* <Table
            columns={columnsData}
            viewColumns={viewColumns}
            data={data}
            actions={actionsData}
            activeIndex={activeIndex}
          /> */}
          <TableNew
            columnsToView={columnsData}
            tableData={data}
            actions={actionsData}
            activeIndex={activeIndex}
            // activeField={["roleRights"]}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default Roles;
