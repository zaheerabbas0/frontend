import React from 'react';
// import SignUp from '../pages/mainPage/components/SignUp';
import ForgotPassword from '../pages/mainPage/components/ForgotPassword';
import MainPage from '../pages/mainPage/MainPage';
import LogIn from '../pages/mainPage/components/LogIn';
import SetPassword from '../pages/mainPage/components/SetPassword';

const MainPageRoutes = {
  path: '/',
  element: <MainPage />,
  children: [
    {
      index: true,
      element: <LogIn />,
      protected: false,
    },
    // {
    //   path: 'signup',
    //   element: <SignUp />,
    //   protected: false,
    // },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
      protected: false,
    },
    {
      path: 'set-password',
      element: <SetPassword />,
      protected: false,
    },
  ],
};

export default MainPageRoutes;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import MainPage from '../pages/mainPage/MainPage';

// const LoginRoutes = () => {
//   return (
//     <>
//       <Routes>
//         <Route exact path="/" element={<MainPage />} />
//       </Routes>
//     </>
//   );
// };

// export default LoginRoutes;
