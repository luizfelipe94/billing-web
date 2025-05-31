import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Menu from "./components/menu/menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Breadcrumb } from "react-bootstrap";
import Prices from "./pages/prices/prices";
import { Home } from "./pages/home/home";

const queryClient = new QueryClient();

const AppProvider: React.FC<any> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>

  );
};

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Home
      </Breadcrumb.Item>
      {paths.map((path, index) => {
        const to = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;
        const capitalizedPath = path.charAt(0).toUpperCase() + path.slice(1);
        return (
          <Breadcrumb.Item
            key={to}
            linkAs={Link}
            linkProps={{ to }}
            active={isLast}
          >
            {capitalizedPath}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

const Layout = () => (
  <AppProvider>
    <div style={{ display: "flex", height: "100vh" }}>
      <Menu />
      <div style={{ flex: 1, padding: "20px" }}>
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  </AppProvider>
)

function App() {

  return (
    <Routes>
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/prices" element={<Prices />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
