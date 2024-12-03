import {
  Home,
  NotFound,
  Dashboard,
  DashboardHome,
  SearchFlights,
  SearchHotels,
  FlightBookings,
  HotelBookings,
  CreditTopup,
  AddCredits,
  Invoices,
  MakePayment,
  SearchHistory,
  TransactionHistory,
  Roles,
  CreateRole,
  Users,
  CreateUser,
  Support,
  Profile,
  Setting,
  Notifications,
  UpdateSetting,
  FlightResults,
  FlightDetails,
} from "../pages/pages";

export const routesData = [
  { path: "/", element: <Home /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "search-flights", element: <SearchFlights /> },
      { path: "search-hotels", element: <SearchHotels /> },
      { path: "flight-bookings", element: <FlightBookings /> },
      { path: "hotel-bookings", element: <HotelBookings /> },
      { path: "credit-topup", element: <CreditTopup /> },
      { path: "add-credits", element: <AddCredits /> },
      { path: "invoices", element: <Invoices /> },
      { path: "make-payment", element: <MakePayment /> },
      { path: "search-history", element: <SearchHistory /> },
      { path: "transactions-history", element: <TransactionHistory /> },
      { path: "roles", element: <Roles /> },
      { path: "create-role", element: <CreateRole /> },
      { path: "users", element: <Users /> },
      { path: "create-user", element: <CreateUser /> },
      { path: "support", element: <Support /> },
      { path: "profile", element: <Profile /> },
      { path: "setting", element: <Setting /> },
      { path: "notifications", element: <Notifications /> },
      { path: "update-setting", element: <UpdateSetting /> },
      { path: "flight-results", element: <FlightResults /> },
      { path: "flight-details", element: <FlightDetails /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];
