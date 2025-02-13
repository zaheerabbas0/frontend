import React from 'react';
import EventCalender from '../pages/calender/EventCalender';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const HeaderRoutes = () => {
  return (
    <Routes>
      <Route
        exact
        path="/calendar"
        element={
          <ProtectedRoutes>
            <EventCalender />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default HeaderRoutes;
