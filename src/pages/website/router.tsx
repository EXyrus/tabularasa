import { lazy } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import ErrorComponent from 'components/global/ErrorComponent';
import Redirect from 'components/global/Redirect';
import Shell from 'components/layouts/Shell';
import PATHS from './paths.json';

// Global Pages
const NotFound = lazy(() => import('pages/common/NotFound'));
const Home = lazy(() => import('./Home'));
const SignUp = lazy(() => import('./SignUp'));

const getRoute = () =>
    `${globalThis.location.pathname.endsWith('/') ? globalThis.location.href : globalThis.location.href + '/'}`;

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
            <Route path={PATHS.index} element={<Home />} />
            <Route path={PATHS.signUp} element={<SignUp />} />
            {[PATHS.vendor, PATHS.institution, PATHS.student].map(path => {
                return (
                    <Route path={`${path}/*`} key={path}>
                        <Route index element={<Redirect to={getRoute} />} />
                        <Route
                            path='*'
                            element={
                                <Redirect
                                    to={`${globalThis.location.origin}${path}/`}
                                />
                            }
                        />
                    </Route>
                );
            })}
            <Route path={PATHS.notFound} element={<NotFound />} />
        </Route>
    ),
    {
        basename: '/',
        future: {
            v7_relativeSplatPath: false
        }
    }
);

export default router;
