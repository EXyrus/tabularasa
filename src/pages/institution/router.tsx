import { lazy } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import ErrorComponent from 'components/global/ErrorComponent';
import Shell from 'components/layouts/Shell';
import GuestShell from 'components/layouts/shells/GuestShell';
import UserShell from 'components/layouts/shells/UserShell';
import NotFound from 'pages/common/NotFound';
import PATHS from './paths.json';

// Institution Staff Pages
const InstitutionLogin = lazy(() => import('./Login'));
const SchoolForgotPassword = lazy(() => import('./ForgotPassword'));
const SchoolResetPassword = lazy(() => import('./ResetPassword'));
const ActivateAccount = lazy(() => import('./ActivateAccount'));

const Home = lazy(() => import('./Home'));

// Institution Student Pages
const Students = lazy(() => import('./students/StudentList'));
const StudentProfile = lazy(() => import('./students/student/StudentProfile'));

// Institution Unit Management Pages
const Managements = lazy(() => import('./unit-management/Index'));
const EventsIndex = lazy(() => import('./events/Index'));
const CreateGroup = lazy(() => import('./events/CreateGroup'));
const ManageCreateGroup = lazy(() => import('./events/ManageCreateGroup'));
const Attendance = lazy(
    () => import('./unit-management/attendance/Attendance')
);
const ViewUnit = lazy(() => import('./unit-management/unit/ViewUnit'));
// Institution Control Panel Pages
const ControlPanel = lazy(() => import('./control-panels/Index'));
const Structure = lazy(() => import('./control-panels/structure/Structure'));
const OrganizationRoles = lazy(
    () => import('./control-panels/structure/OrganizationRoles')
);
const ManageStructure = lazy(
    () => import('./control-panels/structure/ManageStructure')
);
const RoleManagement = lazy(() => import('./control-panels/roles/Index'));
const Customization = lazy(
    () => import('./control-panels/customization/Index')
);
const Payment = lazy(() => import('./control-panels/payment/Index'));
const AddPayment = lazy(
    () => import('./control-panels/payment/create/CreatePayment')
);
const PaymentDetails = lazy(
    () => import('./control-panels/payment/PaymentDetails')
);
const Account = lazy(() => import('./control-panels/account/Index'));
const AccountUpdate = lazy(
    () => import('./control-panels/account/AccountUpdate')
);

// Institution Employee Pages
const EmployeeList = lazy(() => import('./employees/EmployeeList'));
const CreateEmployee = lazy(() => import('./employees/CreateEmployee'));
const EmployeeProfile = lazy(() => import('./employees/EmployeeProfile'));

// Institution Finance pages
const Finance = lazy(() => import('./finances/Finance'));
const TransactionsHome = lazy(
    () => import('./finances/transactions/TransactionsHome')
);
const Transactions = lazy(() => import('./finances/transactions/Transactions'));
const Transaction = lazy(() => import('./finances/transactions/Transaction'));
const ManageTransaction = lazy(
    () => import('./finances/transactions/ManageTransaction')
);
const SteppedNewPayment = lazy(() => import('./finances/new-payment/Index'));
const InvoiceHome = lazy(() => import('./finances/invoices/InvoiceHome'));
const AllInvoices = lazy(() => import('./finances/invoices/AllInvoices'));
const SingleInvoice = lazy(() => import('./finances/invoices/SingleInvoice'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<Shell />}
            errorElement={
                <Shell>
                    <ErrorComponent />
                </Shell>
            }
        >
            <Route element={<GuestShell />}>
                <Route path={PATHS.login} element={<InstitutionLogin />} />
                <Route
                    path={PATHS.forgotPassword}
                    element={<SchoolForgotPassword />}
                />
                <Route
                    path={PATHS.resetPassword}
                    element={<SchoolResetPassword />}
                />
                <Route
                    path={PATHS.activateAccount}
                    element={<ActivateAccount />}
                />
            </Route>
            <Route element={<UserShell buttonLabel='Institutions' />}>
                <Route path={PATHS.home} element={<Home />} />
                <Route path={PATHS.students.index} element={<Students />} />
                <Route
                    path={PATHS.students.profile}
                    element={<StudentProfile />}
                />
                <Route
                    path={PATHS.unitManagement.index}
                    element={<Managements />}
                />
                <Route
                    path={PATHS.unitManagement.attendance}
                    element={<Attendance />}
                />
                <Route
                    path={PATHS.unitManagement.unit}
                    element={<ViewUnit />}
                />
                <Route path={PATHS.events.index} element={<EventsIndex />} />
                <Route
                    path={PATHS.events.createGroup}
                    element={<CreateGroup />}
                />
                <Route
                    path={PATHS.events.manageGroup}
                    element={<ManageCreateGroup />}
                />
                <Route
                    path={PATHS.controlPanel.index}
                    element={<ControlPanel />}
                />
                <Route
                    path={PATHS.controlPanel.structure.index}
                    element={<Structure />}
                />
                <Route
                    path={PATHS.controlPanel.structure.roles}
                    element={<OrganizationRoles />}
                />
                <Route
                    path={PATHS.controlPanel.manageStructure}
                    element={<ManageStructure />}
                />
                <Route
                    path={PATHS.controlPanel.structure.roleManagement}
                    element={<RoleManagement />}
                />
                <Route
                    path={PATHS.controlPanel.structure.customization}
                    element={<Customization />}
                />
                <Route
                    path={PATHS.controlPanel.payment.index}
                    element={<Payment />}
                />
                <Route
                    path={PATHS.controlPanel.payment.add}
                    element={<AddPayment />}
                />

                <Route
                    path={PATHS.controlPanel.payment.details}
                    element={<PaymentDetails />}
                />

                <Route
                    path={PATHS.employees.index}
                    element={<EmployeeList />}
                />
                <Route
                    path={PATHS.employees.create}
                    element={<CreateEmployee />}
                />
                <Route
                    path={PATHS.employees.profile}
                    element={<EmployeeProfile />}
                />
                <Route
                    path={PATHS.finance.invoices.index}
                    element={<InvoiceHome />}
                />
                <Route
                    path={PATHS.finance.invoices.items}
                    element={<AllInvoices />}
                />
                <Route
                    path={PATHS.finance.invoices.item}
                    element={<SingleInvoice />}
                />
                <Route path={PATHS.finance.index} element={<Finance />} />
                <Route
                    path={PATHS.finance.transactions.index}
                    element={<TransactionsHome />}
                />
                <Route
                    path={PATHS.finance.transactions.items}
                    element={<Transactions />}
                />
                <Route
                    path={PATHS.finance.transactions.item}
                    element={<Transaction />}
                />
                <Route
                    path={PATHS.finance.transactions.manage}
                    element={<ManageTransaction />}
                />
                <Route
                    path={PATHS.finance.newPayment}
                    element={<SteppedNewPayment />}
                />

                <Route path={PATHS.account.index} element={<Account />} />
                <Route
                    path={PATHS.account.update}
                    element={<AccountUpdate />}
                />
            </Route>
            <Route path={PATHS.notFound} element={<NotFound />} />
        </Route>
    ),
    {
        basename: '/institution',

        future: {
            v7_relativeSplatPath: false
        }
    }
);

export default router;
