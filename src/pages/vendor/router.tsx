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
import PATHS from 'pages/vendor/paths.json';

// vendor Level Pages
const Login = lazy(() => import('./Login'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));

const Home = lazy(() => import('./institution/Home'));
const ManageInstitution = lazy(() => import('./institution/ManageInstitution'));
const EditInstitution = lazy(
    () => import('./institution/manage/EditInstitution')
);
const AdminAction = lazy(() => import('./institution/manage/AdminAction'));
const CreateInstitution = lazy(
    () => import('./institution/create/CreateInstitution')
);
const InstitutionDetails = lazy(
    () => import('./institution/create/InstitutionDetails')
);
const AssignModule = lazy(() => import('./institution/create/AssignModule'));
const Customize = lazy(() => import('./institution/create/Customize'));
const ManageInstitutionDetails = lazy(
    () => import('./institution/manage/ManageInstitutionDetails')
);
const ManageAssignModule = lazy(
    () => import('./institution/manage/ManageAssignModule')
);
const ManageCustomize = lazy(
    () => import('./institution/manage/ManageCustomize')
);
const ConfirmDetail = lazy(() => import('./institution/create/ConfirmDetail'));

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
            <Route path={PATHS.forgotPassword} element={<ForgotPassword />} />

            <Route
                element={
                    <UserShell
                        buttonLabel='Institutions'
                        primaryPath={PATHS.institutions.index}
                    />
                }
            >
                <Route path={PATHS.home} element={<Home />} />
                <Route
                    path={PATHS.institutions.index}
                    element={<ManageInstitution />}
                />
                <Route
                    path={PATHS.institutions.item.edit}
                    element={<EditInstitution />}
                />
                <Route
                    path={PATHS.institutions.item.manage}
                    element={<AdminAction />}
                />
                <Route
                    path={PATHS.institutions.new.index}
                    element={<CreateInstitution />}
                />
                <Route
                    path={PATHS.institutions.new.details}
                    element={<InstitutionDetails />}
                />
                <Route
                    path={PATHS.institutions.new.assignModule}
                    element={<AssignModule />}
                />
                <Route
                    path={PATHS.institutions.new.customize}
                    element={<Customize />}
                />
                <Route
                    path={PATHS.institutions.new.confirm}
                    element={<ConfirmDetail />}
                />
                <Route
                    path={PATHS.institutions.item.index}
                    element={<ManageInstitutionDetails />}
                />
                <Route
                    path={PATHS.institutions.item.assignModule}
                    element={<ManageAssignModule />}
                />
                <Route
                    path={PATHS.institutions.item.edit}
                    element={<ManageCustomize />}
                />
            </Route>

            <Route path={PATHS.notFound} element={<NotFound />} />
        </Route>
    ),
    {
        basename: '/vendor',
        future: {
            v7_relativeSplatPath: false
        }
    }
);

export default router;
