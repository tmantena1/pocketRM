import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import AOS from "aos";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { setContext } from "@apollo/client/link/context";
import "./styles/App.css";
import "aos/dist/aos.css";
import auth from "./utils/auth";


const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:3001";

const httpLink = createHttpLink({
  uri: `${PUBLIC_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const redirect = async () => {
      try {
        const expired = auth.loggedIn();

        if (!expired) {
          return false;
        }

        setIsLoggedIn(expired);
      } catch (err) {
        console.error(err);
      }
    };

    redirect();
  }, [isLoggedIn]);

  // AOS init
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ApolloProvider client={client}>
          <div className="app-wrapper">
            <Router>
              <Navbar />
              <main>
                <Routes>
                  {!isLoggedIn && (
                    <>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </>
                  )}
                  {isLoggedIn && (
                    <>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                    </>
                  )}
                  <Route
                    path="*"
                    element={
                      <Navigate to={isLoggedIn ? "/dashboard" : "/login"} />
                    }
                  />
                </Routes>
              </main>
            </Router>
            <Footer />
          </div>
        </ApolloProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
