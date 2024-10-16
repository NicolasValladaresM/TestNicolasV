import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./layouts/login/login";
import Home from "./layouts/home/home";
import Interchange from "./layouts/interchange/preview/interchange";
import Resume from "./layouts/interchange/resume/resume";
import { UserContextProvider, UserContext } from "./context/userContext";
import { useContext } from "react";
import { InfoProvider } from "./context/infoContext";
import { BalanceProvider } from "./context/balanceContext";
import { HistoryProvider } from "./context/historicalContext";
import { PricesProvider } from "./context/pricesContext";
import { TransProvider } from "./context/transContext";
import { Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
// import { ExchangeRateProvider } from "./context/exchangeRateContext";

const RouteProtected = ({ children }) => {
  const { user } = useContext(UserContext);
  return user && user.token_generic_btc ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <UserContextProvider>
      <InfoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <RouteProtected>
                  <BalanceProvider>
                    <HistoryProvider>
                      <Home />
                    </HistoryProvider>
                  </BalanceProvider>
                </RouteProtected>
              }
            />
            <Route
              path="/interchange"
              element={
                <RouteProtected>
                  <PricesProvider>
                    <BalanceProvider>
                      <TransProvider>
                        {/* <ExchangeRateProvider> */}

                        <Interchange />
                        {/* </ExchangeRateProvider> */}
                      </TransProvider>
                    </BalanceProvider>
                  </PricesProvider>
                </RouteProtected>
              }
            />
            <Route
              path="/resume"
              element={
                <RouteProtected>
                  <PricesProvider>
                    <BalanceProvider>
                      <TransProvider>
                        <Resume />
                      </TransProvider>
                    </BalanceProvider>
                  </PricesProvider>
                </RouteProtected>
              }
            />
          </Routes>
        </Router>
      </InfoProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
    </UserContextProvider>
  );
}

export default App;
