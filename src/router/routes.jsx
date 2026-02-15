import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Customer = lazy(() => import('@/pages/Customer'));
const Invoice = lazy(() => import('@/pages/Invoice'));
const InvoiceCreate = lazy(() => import('@/pages/Invoice/InvoiceCreate'));

const InvoiceRead = lazy(() => import('@/pages/Invoice/InvoiceRead'));
const InvoiceUpdate = lazy(() => import('@/pages/Invoice/InvoiceUpdate'));
const InvoiceRecordPayment = lazy(() => import('@/pages/Invoice/InvoiceRecordPayment'));
const Quote = lazy(() => import('@/pages/Quote/index'));
const QuoteCreate = lazy(() => import('@/pages/Quote/QuoteCreate'));
const QuoteRead = lazy(() => import('@/pages/Quote/QuoteRead'));
const QuoteUpdate = lazy(() => import('@/pages/Quote/QuoteUpdate'));
const Payment = lazy(() => import('@/pages/Payment/index'));
const PaymentCreate = lazy(() => import('@/pages/Payment/PaymentCreate'));
const PaymentRead = lazy(() => import('@/pages/Payment/PaymentRead'));
const PaymentUpdate = lazy(() => import('@/pages/Payment/PaymentUpdate'));

const Settings = lazy(() => import('@/pages/Settings/Settings'));
const PaymentMode = lazy(() => import('@/pages/PaymentMode'));
const Taxes = lazy(() => import('@/pages/Taxes'));

const Profile = lazy(() => import('@/pages/Profile'));

const About = lazy(() => import('@/pages/About'));

// Travel Agency & Accounting
const Account = lazy(() => import('@/pages/Account'));
const AccountCreate = lazy(() => import('@/pages/Account/AccountCreate'));
const AccountRead = lazy(() => import('@/pages/Account/AccountRead'));
const AccountUpdate = lazy(() => import('@/pages/Account/AccountUpdate'));
const JournalEntry = lazy(() => import('@/pages/JournalEntry'));
const JournalEntryCreate = lazy(() => import('@/pages/JournalEntry/JournalEntryCreate'));
const JournalEntryRead = lazy(() => import('@/pages/JournalEntry/JournalEntryRead'));
const JournalEntryUpdate = lazy(() => import('@/pages/JournalEntry/JournalEntryUpdate'));
const Package = lazy(() => import('@/pages/Package'));
const PackageCreate = lazy(() => import('@/pages/Package/PackageCreate'));
const PackageRead = lazy(() => import('@/pages/Package/PackageRead'));
const PackageUpdate = lazy(() => import('@/pages/Package/PackageUpdate'));
const Supplier = lazy(() => import('@/pages/Supplier'));
const SupplierCreate = lazy(() => import('@/pages/Supplier/SupplierCreate'));
const SupplierRead = lazy(() => import('@/pages/Supplier/SupplierRead'));
const SupplierUpdate = lazy(() => import('@/pages/Supplier/SupplierUpdate'));
const Expense = lazy(() => import('@/pages/Expense'));
const ExpenseCreate = lazy(() => import('@/pages/Expense/ExpenseCreate'));
const ExpenseRead = lazy(() => import('@/pages/Expense/ExpenseRead'));
const ExpenseUpdate = lazy(() => import('@/pages/Expense/ExpenseUpdate'));
const Ledger = lazy(() => import('@/pages/Reports/Ledger'));
const TrialBalance = lazy(() => import('@/pages/Reports/TrialBalance'));
const ProfitLoss = lazy(() => import('@/pages/Reports/ProfitLoss'));
const BalanceSheet = lazy(() => import('@/pages/Reports/BalanceSheet'));
const CommissionReport = lazy(() => import('@/pages/Reports/CommissionReport'));
const ProfitAnalysis = lazy(() => import('@/pages/Reports/ProfitAnalysis'));
const BusinessInsights = lazy(() => import('@/pages/Reports/BusinessInsights'));
const ReportsDashboard = lazy(() => import('@/pages/Reports/ReportsDashboard'));
const CashFlow = lazy(() => import('@/pages/Reports/CashFlow'));
const ARAging = lazy(() => import('@/pages/Reports/ARAging'));
const DayBook = lazy(() => import('@/pages/Reports/DayBook'));
const CurrencyConverter = lazy(() => import('@/pages/CurrencyConverter/index'));
const BankAccount = lazy(() => import('@/pages/BankAccount'));
const BankAccountCreate = lazy(() => import('@/pages/BankAccount/BankAccountCreate'));
const BankAccountRead = lazy(() => import('@/pages/BankAccount/BankAccountRead'));
const BankAccountUpdate = lazy(() => import('@/pages/BankAccount/BankAccountUpdate'));

// New Modules
const Company = lazy(() => import('@/pages/Company'));
const CompanyCreate = lazy(() => import('@/pages/Company/CompanyCreate'));
const CompanyRead = lazy(() => import('@/pages/Company/CompanyRead'));
const CompanyUpdate = lazy(() => import('@/pages/Company/CompanyUpdate'));
const FinancialYear = lazy(() => import('@/pages/FinancialYear'));
const FinancialYearCreate = lazy(() => import('@/pages/FinancialYear/FinancialYearCreate'));
const FinancialYearRead = lazy(() => import('@/pages/FinancialYear/FinancialYearRead'));
const FinancialYearUpdate = lazy(() => import('@/pages/FinancialYear/FinancialYearUpdate'));
const Employee = lazy(() => import('@/pages/Employee'));
const EmployeeCreate = lazy(() => import('@/pages/Employee/EmployeeCreate'));
const EmployeeRead = lazy(() => import('@/pages/Employee/EmployeeRead'));
const EmployeeUpdate = lazy(() => import('@/pages/Employee/EmployeeUpdate'));
const Attendance = lazy(() => import('@/pages/Attendance'));
const Payroll = lazy(() => import('@/pages/Payroll'));
const Commission = lazy(() => import('@/pages/Commission'));
const VisaPackage = lazy(() => import('@/pages/VisaPackage'));
const VisaPackageCreate = lazy(() => import('@/pages/VisaPackage/VisaPackageCreate'));
const VisaPackageRead = lazy(() => import('@/pages/VisaPackage/VisaPackageRead'));
const VisaPackageUpdate = lazy(() => import('@/pages/VisaPackage/VisaPackageUpdate'));
const HotelBooking = lazy(() => import('@/pages/HotelBooking'));
const HotelBookingCreate = lazy(() => import('@/pages/HotelBooking/HotelBookingCreate'));
const HotelBookingRead = lazy(() => import('@/pages/HotelBooking/HotelBookingRead'));
const HotelBookingUpdate = lazy(() => import('@/pages/HotelBooking/HotelBookingUpdate'));
const Booking = lazy(() => import('@/pages/Booking'));
const BookingCreate = lazy(() => import('@/pages/Booking/BookingCreate'));
const BookingRead = lazy(() => import('@/pages/Booking/BookingRead'));
const BookingUpdate = lazy(() => import('@/pages/Booking/BookingUpdate'));
const Document = lazy(() => import('@/pages/Document'));
const LoginHistory = lazy(() => import('@/pages/LoginHistory'));
const Role = lazy(() => import('@/pages/Role'));
const RoleCreate = lazy(() => import('@/pages/Role/RoleCreate'));
const RoleRead = lazy(() => import('@/pages/Role/RoleRead'));
const RoleUpdate = lazy(() => import('@/pages/Role/RoleUpdate'));

let routes = {
  expense: [],
  default: [
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/customer',
      element: <Customer />,
    },

    {
      path: '/invoice',
      element: <Invoice />,
    },
    {
      path: '/invoice/create',
      element: <InvoiceCreate />,
    },
    {
      path: '/invoice/read/:id',
      element: <InvoiceRead />,
    },
    {
      path: '/invoice/update/:id',
      element: <InvoiceUpdate />,
    },
    {
      path: '/invoice/pay/:id',
      element: <InvoiceRecordPayment />,
    },
    {
      path: '/quote',
      element: <Quote />,
    },
    {
      path: '/quote/create',
      element: <QuoteCreate />,
    },
    {
      path: '/quote/read/:id',
      element: <QuoteRead />,
    },
    {
      path: '/quote/update/:id',
      element: <QuoteUpdate />,
    },
    {
      path: '/payment',
      element: <Payment />,
    },
    {
      path: '/payment/create',
      element: <PaymentCreate />,
    },
    {
      path: '/payment/read/:id',
      element: <PaymentRead />,
    },
    {
      path: '/payment/update/:id',
      element: <PaymentUpdate />,
    },

    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/settings/edit/:settingsKey',
      element: <Settings />,
    },
    {
      path: '/payment/mode',
      element: <PaymentMode />,
    },
    {
      path: '/taxes',
      element: <Taxes />,
    },
    {
      path: '/currency-converter',
      element: <CurrencyConverter />,
    },

    {
      path: '/profile',
      element: <Profile />,
    },
    // Travel Agency & Accounting
    {
      path: '/account',
      element: <Account />,
    },
    {
      path: '/account/create',
      element: <AccountCreate />,
    },
    {
      path: '/account/read/:id',
      element: <AccountRead />,
    },
    {
      path: '/account/update/:id',
      element: <AccountUpdate />,
    },
    {
      path: '/journalentry',
      element: <JournalEntry />,
    },
    {
      path: '/journalentry/create',
      element: <JournalEntryCreate />,
    },
    {
      path: '/journalentry/read/:id',
      element: <JournalEntryRead />,
    },
    {
      path: '/journalentry/update/:id',
      element: <JournalEntryUpdate />,
    },
    {
      path: '/package',
      element: <Package />,
    },
    {
      path: '/package/create',
      element: <PackageCreate />,
    },
    {
      path: '/package/read/:id',
      element: <PackageRead />,
    },
    {
      path: '/package/update/:id',
      element: <PackageUpdate />,
    },
    {
      path: '/supplier',
      element: <Supplier />,
    },
    {
      path: '/supplier/create',
      element: <SupplierCreate />,
    },
    {
      path: '/supplier/read/:id',
      element: <SupplierRead />,
    },
    {
      path: '/supplier/update/:id',
      element: <SupplierUpdate />,
    },
    {
      path: '/expense',
      element: <Expense />,
    },
    {
      path: '/expense/create',
      element: <ExpenseCreate />,
    },
    {
      path: '/expense/read/:id',
      element: <ExpenseRead />,
    },
    {
      path: '/expense/update/:id',
      element: <ExpenseUpdate />,
    },
    {
      path: '/bank-account',
      element: <BankAccount />,
    },
    {
      path: '/bankaccount',
      element: <BankAccount />,
    },
    {
      path: '/bank-account/create',
      element: <BankAccountCreate />,
    },
    {
      path: '/bankaccount/create',
      element: <BankAccountCreate />,
    },
    {
      path: '/bank-account/read/:id',
      element: <BankAccountRead />,
    },
    {
      path: '/bankaccount/read/:id',
      element: <BankAccountRead />,
    },
    {
      path: '/bank-account/update/:id',
      element: <BankAccountUpdate />,
    },
    {
      path: '/bankaccount/update/:id',
      element: <BankAccountUpdate />,
    },
    // Company Management
    {
      path: '/company',
      element: <Company />,
    },
    {
      path: '/company/create',
      element: <CompanyCreate />,
    },
    {
      path: '/company/read/:id',
      element: <CompanyRead />,
    },
    {
      path: '/company/update/:id',
      element: <CompanyUpdate />,
    },
    // Financial Year
    {
      path: '/financialyear',
      element: <FinancialYear />,
    },
    {
      path: '/financialyear/create',
      element: <FinancialYearCreate />,
    },
    {
      path: '/financialyear/read/:id',
      element: <FinancialYearRead />,
    },
    {
      path: '/financialyear/update/:id',
      element: <FinancialYearUpdate />,
    },
    // Employee/HR
    {
      path: '/employee',
      element: <Employee />,
    },
    {
      path: '/employee/create',
      element: <EmployeeCreate />,
    },
    {
      path: '/employee/read/:id',
      element: <EmployeeRead />,
    },
    {
      path: '/employee/update/:id',
      element: <EmployeeUpdate />,
    },
    // Attendance
    {
      path: '/attendance',
      element: <Attendance />,
    },
    // Payroll
    {
      path: '/payroll',
      element: <Payroll />,
    },
    // Commission
    {
      path: '/commission',
      element: <Commission />,
    },
    // Travel Agency
    {
      path: '/visapackage',
      element: <VisaPackage />,
    },
    {
      path: '/visapackage/create',
      element: <VisaPackageCreate />,
    },
    {
      path: '/visapackage/read/:id',
      element: <VisaPackageRead />,
    },
    {
      path: '/visapackage/update/:id',
      element: <VisaPackageUpdate />,
    },
    {
      path: '/hotelbooking',
      element: <HotelBooking />,
    },
    {
      path: '/hotelbooking/create',
      element: <HotelBookingCreate />,
    },
    {
      path: '/hotelbooking/read/:id',
      element: <HotelBookingRead />,
    },
    {
      path: '/hotelbooking/update/:id',
      element: <HotelBookingUpdate />,
    },
    {
      path: '/booking',
      element: <Booking />,
    },
    {
      path: '/booking/create',
      element: <BookingCreate />,
    },
    {
      path: '/booking/read/:id',
      element: <BookingRead />,
    },
    {
      path: '/booking/update/:id',
      element: <BookingUpdate />,
    },
    // Documents
    {
      path: '/document',
      element: <Document />,
    },
    // Login History
    {
      path: '/loginhistory',
      element: <LoginHistory />,
    },
    // Role Management
    {
      path: '/role',
      element: <Role />,
    },
    {
      path: '/role/create',
      element: <RoleCreate />,
    },
    {
      path: '/role/read/:id',
      element: <RoleRead />,
    },
    {
      path: '/role/update/:id',
      element: <RoleUpdate />,
    },
    {
      path: '/reports/ledger',
      element: <Ledger />,
    },
    {
      path: '/reports/trialbalance',
      element: <TrialBalance />,
    },
    {
      path: '/reports/profitloss',
      element: <ProfitLoss />,
    },
    {
      path: '/reports/balancesheet',
      element: <BalanceSheet />,
    },
    {
      path: '/reports/commissionreport',
      element: <CommissionReport />,
    },
    {
      path: '/reports/profitanalysis',
      element: <ProfitAnalysis />,
    },
    {
      path: '/reports/businessinsights',
      element: <BusinessInsights />,
    },
    {
      path: '/reports',
      element: <ReportsDashboard />,
    },
    {
      path: '/reports/cashflow',
      element: <CashFlow />,
    },
    {
      path: '/reports/araging',
      element: <ARAging />,
    },
    {
      path: '/reports/daybook',
      element: <DayBook />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default routes;
