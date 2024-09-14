import React from "react";
import Form from "./Form";
import Sidebar from "./Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import ListXYZT from "./ListXYZT";

const Main = () => {
  const location = useLocation();

  // Check if the current route is not /admin/listxyzt
  const shouldShowQuoteSection = location.pathname !== "/admin/listxyzt";
  return (
    <main>
      <Routes>
        {/* Other routes */}
        <Route path="/admin/listxyzt" element={<ListXYZT />} />
      </Routes>
      {shouldShowQuoteSection && (
        <>
          <Sidebar />
          <Form />
        </>
      )}
    </main>
  );
};

export default Main;
