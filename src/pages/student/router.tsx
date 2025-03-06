import { lazy } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import NotFound from 'pages/common/NotFound';
import ErrorComponent from 'components/global/ErrorComponent';
import Shell from 'components/layouts/Shell';
import GuestShell from 'components/layouts/shells/GuestShell';
import UserShell from 'components/layouts/shells/UserShell';
import PATHS from 'pages/student/paths.json';

// student Level Pages
const Login = lazy(() => import('./Login'));
const Home = lazy(() => import('./Home'));
const Notifications = lazy(() => import('./notifications/Notifications'));
const Payment = lazy(() => import('./payment/Payment'));
const PaymentDetails = lazy(() => import('./payment/PaymentDetails'));
const PaymentPurpose = lazy(() => import('./payment/PaymentPurposeSelection'));
const PaymentSummary = lazy(() => import('./payment/PaymentSummary'));
const Students = lazy(() => import('./students/Students'));
const StudentProfile = lazy(() => import('./students/StudentProfile'));
const StudentAttendance = lazy(() => import('./students/StudentAttendance'));
const GuardianAccount = lazy(() => import('./GuardianAccount'));

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
                <Route path={PATHS.login} element={<Login />} />
            </Route>
            <Route element={<UserShell buttonLabel='Students' />}>
                <Route path={PATHS.home} element={<Home />} />
                <Route path={PATHS.notifications} element={<Notifications />} />
                <Route path={PATHS.payment.home} element={<Payment />} />
                <Route
                    path={PATHS.payment.details}
                    element={<PaymentDetails />}
                />
                <Route
                    path={PATHS.payment.purpose}
                    element={<PaymentPurpose />}
                />
                <Route
                    path={PATHS.payment.summary}
                    element={<PaymentSummary />}
                />
                <Route path={PATHS.students.home} element={<Students />} />
                <Route
                    path={PATHS.students.studentProfile}
                    element={<StudentProfile />}
                />
                <Route
                    path={PATHS.students.studentAttendance}
                    element={<StudentAttendance />}
                />
                <Route path={PATHS.account} element={<GuardianAccount />} />
            </Route>

            <Route path={PATHS.notFound} element={<NotFound />} />
        </Route>
    ),
    {
        basename: '/student',
        future: {
            v7_relativeSplatPath: false
        }
    }
);

export default router;
