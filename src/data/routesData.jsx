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
  Admins,
  CreateAdmin,
  UpdateAdmin,
  RefundRequests,
  CancelRequests,
  DateChange,
  CompanyUsers,
  NotificationPage,
  CompanyDetails,
  CompanyTickets,
  CompanyRefundedRequests,
  CompanyCancelledRequests
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
      {
        path: "company/users/:companyId",
        element: <Users isCompanyUser={true} />,
      },
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
      { path: "admins", element: <Admins /> },
      { path: "create-admin", element: <CreateAdmin /> },
      { path: "update-admin", element: <UpdateAdmin /> },
      { path: "refund-requests", element: <RefundRequests /> },
      { path: "cancel-requests", element: <CancelRequests /> },
      { path: "date-change", element: <DateChange /> },
      { path: "notifications", element: <NotificationPage /> },
      { path: "company/details/:companyId", element: <CompanyDetails /> },
      {
        path: "company/details/tickets/:companyId",
        element: <CompanyTickets />,
      },
      {
        path: "company/details/refunded-requests/:companyId",
        element: <CompanyRefundedRequests />,
      },
      {
        path: "company/details/refunded-requests/booking-details/:companyId",
        element: <BookingDetails />,
      },
      {
        path: "company/details/cancelled-requests/:companyId",
        element: <CompanyCancelledRequests />,
      },
      {
        path: "company/details/cancelled-requests/booking-details/:companyId",
        element: <BookingDetails />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];
