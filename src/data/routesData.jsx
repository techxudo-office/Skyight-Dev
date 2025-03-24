import {
  NotFound,
  Dashboard,
  DashboardHome,
  Roles,
  Users,
  Companies,
  CreateUser,
  CreateRole,
  Reasons,
  CreateReason,
  UpdateReason,
  FlightBookings,
  BookingDetails,
  Transactions,
  Banks,
  CreateBank,
  UpdateBank,
  Tickets,
  Settings,
  ApplyCommisions,
  UpdateSetting,
  Login,
  CreateAdmin,
  UpdateAdmin,
  RefundRequests,
  CancelRequests,
  DateChange,
  CompanyUsers,
} from "../pages/pages";

export const routesData = [
  { path: "/", element: <Login /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "roles", element: <Roles /> },
      { path: "users", element: <Users /> },
      { path: "companies", element: <Companies /> },
      { path: "company/user/:companyId", element: <Users isCompanyUser={true} /> },
      { path: "create-user", element: <CreateUser /> },
      { path: "create-role", element: <CreateRole /> },
      { path: "reasons", element: <Reasons /> },
      { path: "create-reason", element: <CreateReason /> },
      { path: "update-reason", element: <UpdateReason /> },
      { path: "flight-bookings", element: <FlightBookings /> },
      { path: "booking-details", element: <BookingDetails /> },
      { path: "transactions", element: <Transactions /> },
      { path: "banks", element: <Banks /> },
      { path: "create-bank", element: <CreateBank /> },
      { path: "update-bank", element: <UpdateBank /> },
      { path: "tickets", element: <Tickets /> },
      { path: "settings", element: <Settings /> },
      { path: "apply-commisions", element: <ApplyCommisions /> },
      { path: "update-setting", element: <UpdateSetting /> },
      { path: "create-admin", element: <CreateAdmin /> },
      { path: "update-admin", element: <UpdateAdmin /> },
      { path: "refund-requests", element: <RefundRequests /> },
      { path: "cancel-requests", element: <CancelRequests /> },
      { path: "date-change", element: <DateChange /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];
