import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import InitialStepperRoute from './components/InitialStepperRoute';
import ProtectedRoute from './components/ProtectedRoute';
import SideNavigation from './components/SideNavigation';
import TopLoader from './components/TopLoader';
import VerificationRoute from './components/VerificationRoute';
import { useAppSelector } from './hooks/hooks';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthActions } from './hooks/userHooks';
// import {generateToken, messaging} from "./notifications/firebase";
// import { useEffect } from 'react';
// import {onMessage} from "firebase/messaging";
const Profile = React.lazy(() => import('./pages/Profile'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const Friends = React.lazy(() => import('./pages/Friends'));
const OperationInfo = React.lazy(() => import('./pages/OperationInfo'));
const Verification = React.lazy(() => import('./pages/Verification'));
const InitialStepper = React.lazy(() => import('./pages/InitialStepper'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

function App() {
  // useEffect(() => {
  //   generateToken();
  //   onMessage(messaging, (payload) => {
  //     console.log("Message received. ", payload);
  //   })
  // }, [])
  const { isAuthenticated } = useAppSelector(state => state.user);
  const {loadUser, loading} = useAuthActions();

  useEffect(() => {
    (async () => {
      if(location.pathname.includes("/verify")) return;
      console.log("Running app");
      if (isAuthenticated) return;
      await loadUser();
    })()
  }, []);

  return (
    <>
      {isAuthenticated && <SideNavigation />}
      <Routes>
        <Route path="/login" element={<Login auhtLoading={loading} />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Suspense fallback={<TopLoader />}><Profile /></Suspense>} />
          <Route path="/notifications" element={<Suspense fallback={<TopLoader />}><Notifications /></Suspense>} />
          <Route path="/friends" element={<Suspense fallback={<TopLoader />}><Friends /></Suspense>} />
        </Route>
        <Route element={<VerificationRoute />}>
          <Route path='/operation-info/:type' element={<Suspense fallback={<TopLoader />}><OperationInfo /></Suspense>} />
          <Route path='/verify/:veriticationToken' element={<Suspense fallback={<TopLoader />}><Verification /></Suspense>} />
        </Route>
        <Route element={<InitialStepperRoute />}>
          <Route path='/initial-stepper' element={<Suspense fallback={<TopLoader />}><InitialStepper /></Suspense>} />
        </Route>
        <Route path="*" element={<Suspense fallback={<TopLoader />}><ErrorPage /></Suspense>} />
      </Routes>
    </>
  )
}

export default App
