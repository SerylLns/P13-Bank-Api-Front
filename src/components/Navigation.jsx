import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/userSlice";
import { useEffect } from "react";
import { useState } from "react";

const Navigation = () => {
  const [connected, setConnected] = useState(false);
  const { firstName, isConnected } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const handleDisconnect = () => {
    dispatch(logOut());
  };
  
  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={"/"}>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {connected ? (
          <>
            <Link className="main-nav-item" to={"/profil"}>
              <i className="fa fa-user-circle"></i>
              {firstName}
            </Link>
            <Link className="main-nav-item" onClick={handleDisconnect} to={"/"}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to={"/sign-in"}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
