import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import Container from "../container/container";

function AppLayout() {
  return (
    <>
      <Header />
      <Container customClass="min-height">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default AppLayout;
