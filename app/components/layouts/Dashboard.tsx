import { useState } from "react";
import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import AuthGuard from "@/app/guards/AuthGuard";
import LocaleSwitcher from "../elements/LocaleSwitcher";
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthGuard>
      <div className="screen-overlay"></div>
      <Sidebar />
      <main className="main-wrap">
        <header className="main-header navbar">
          <div className="col-search">
            <form className="searchform">
              <div className="input-group">
                <input
                  list="search_terms"
                  type="text"
                  className="form-control"
                  placeholder="Search term"
                />
                <button className="btn btn-light bg" type="button">
                  <i className="material-icons md-search"></i>
                </button>
              </div>
              <datalist id="search_terms">
                <option value="Products"></option>
                <option value="New orders"></option>
                <option value="Apple iphone"></option>
                <option value="Ahmed Hassan"></option>
              </datalist>
            </form>
          </div>
          <div className="col-nav">
            <button
              className="btn btn-icon btn-mobile me-auto"
              data-trigger="#offcanvas_aside"
            >
              <i className="material-icons md-apps"></i>
            </button>
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link btn-icon" href="#">
                  <i className="material-icons md-notifications animation-shake"></i>
                  <span className="badge rounded-pill">3</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn-icon darkmode" href="#">
                  {" "}
                  <i className="material-icons md-nights_stay"></i>{" "}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="requestfullscreen nav-link btn-icon">
                  <i className="material-icons md-cast"></i>
                </a>
              </li>
              <li className="nav-item">
                <LocaleSwitcher />
              </li>
              {/* <li className="dropdown nav-item">
                <a
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  id="dropdownLanguage"
                  aria-expanded="false"
                >
                  <i className="material-icons md-public"></i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownLanguage"
                >
                  <a className="dropdown-item text-brand" href="#">
                    <img src="/assets/imgs/theme/flag-us.png" alt="English" />
                    English
                  </a>
                  <a className="dropdown-item" href="#">
                    <img src="/assets/imgs/theme/flag-fr.png" alt="Français" />
                    Français
                  </a>
                  <a className="dropdown-item" href="#">
                    <img src="/assets/imgs/theme/flag-jp.png" alt="Français" />
                    日本語
                  </a>
                  <a className="dropdown-item" href="#">
                    <img src="/assets/imgs/theme/flag-cn.png" alt="Français" />
                    中国人
                  </a>
                </div>
              </li> */}
              <li className="dropdown nav-item">
                <a
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  id="dropdownAccount"
                  aria-expanded="false"
                >
                  {" "}
                  <img
                    className="img-xs rounded-circle"
                    src="/assets/imgs/people/avatar-2.png"
                    alt="User"
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownAccount"
                >
                  <a className="dropdown-item" href="#">
                    <i className="material-icons md-perm_identity"></i>Edit
                    Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="material-icons md-settings"></i>Account
                    Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="material-icons md-account_balance_wallet"></i>
                    Wallet
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="material-icons md-receipt"></i>Billing
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="material-icons md-help_outline"></i>Help
                    center
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item text-danger" href="#">
                    <i className="material-icons md-exit_to_app"></i>Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </header>
        <section className="content-main">{children}</section>

        <Footer />
      </main>
    </AuthGuard>
  );
};

export default DashboardLayout;
