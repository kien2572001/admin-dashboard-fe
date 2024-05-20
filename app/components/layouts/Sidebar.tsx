import React from "react";
import { RouterLinks } from "@/app/enums/RouterLinks";
import Link from "next/link";

const SellerSidebarMenu = [
  {
    title: "Dashboard",
    icon: "md-home",
    link: RouterLinks.HOME,
  },
  {
    title: "Products",
    icon: "md-shopping_bag",
    link: "page-products-list.html",
    submenu: [
      {
        title: "Product List",
        link: "page-products-list.html",
      },
      {
        title: "Product grid",
        link: "page-products-grid.html",
      },
      {
        title: "Product grid 2",
        link: "page-products-grid-2.html",
      },
      {
        title: "Categories",
        link: "page-categories.html",
      },
    ],
  },
  {
    title: "Orders",
    icon: "md-shopping_cart",
    link: "page-orders-1.html",
    submenu: [
      {
        title: "Order list 1",
        link: "page-orders-1.html",
      },
      {
        title: "Order list 2",
        link: "page-orders-2.html",
      },
      {
        title: "Order detail",
        link: "page-orders-detail.html",
      },
    ],
  },
  {
    title: "Sellers",
    icon: "md-store",
    link: "page-sellers-cards.html",
    submenu: [
      {
        title: "Sellers cards",
        link: "page-sellers-cards.html",
      },
      {
        title: "Sellers list",
        link: "page-sellers-list.html",
      },
      {
        title: "Seller profile",
        link: "page-seller-detail.html",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="navbar-aside" id="offcanvas_aside">
      <div className="aside-top">
        <Link href={RouterLinks.HOME} className="brand-wrap">
          <img
            src="assets/imgs/theme/logo.svg"
            className="logo"
            alt="Nest Dashboard"
          />
        </Link>
        <div>
          <button className="btn btn-icon btn-aside-minimize">
            <i className="text-muted material-icons md-menu_open"></i>
          </button>
        </div>
      </div>
      <nav>
        <ul className="menu-aside">
          <li className="menu-item active">
            <a className="menu-link" href="index.html">
              <i className="icon material-icons md-home"></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li className="menu-item has-submenu">
            <a className="menu-link" href="page-products-list.html">
              <i className="icon material-icons md-shopping_bag"></i>
              <span className="text">Products</span>
            </a>
            <div className="submenu">
              <a href="page-products-list.html">Product List</a>
              <a href="page-products-grid.html">Product grid</a>
              <a href="page-products-grid-2.html">Product grid 2</a>
              <a href="page-categories.html">Categories</a>
            </div>
          </li>
          <li className="menu-item has-submenu">
            <a className="menu-link" href="page-orders-1.html">
              <i className="icon material-icons md-shopping_cart"></i>
              <span className="text">Orders</span>
            </a>
            <div className="submenu">
              <a href="page-orders-1.html">Order list 1</a>
              <a href="page-orders-2.html">Order list 2</a>
              <a href="page-orders-detail.html">Order detail</a>
            </div>
          </li>
          <li className="menu-item has-submenu">
            <a className="menu-link" href="page-sellers-cards.html">
              <i className="icon material-icons md-store"></i>
              <span className="text">Sellers</span>
            </a>
            <div className="submenu">
              <a href="page-sellers-cards.html">Sellers cards</a>
              <a href="page-sellers-list.html">Sellers list</a>
              <a href="page-seller-detail.html">Seller profile</a>
            </div>
          </li>
          <li className="menu-item has-submenu">
            <a className="menu-link" href="page-form-product-1.html">
              <i className="icon material-icons md-add_box"></i>
              <span className="text">Add product</span>
            </a>
            <div className="submenu">
              <a href="page-form-product-1.html">Add product 1</a>
              <a href="page-form-product-2.html">Add product 2</a>
              <a href="page-form-product-3.html">Add product 3</a>
              <a href="page-form-product-4.html">Add product 4</a>
            </div>
          </li>
          <li className="menu-item has-submenu">
            <a className="menu-link" href="page-transactions-1.html">
              <i className="icon material-icons md-monetization_on"></i>
              <span className="text">Transactions</span>
            </a>
            <div className="submenu">
              <a href="page-transactions-1.html">Transaction 1</a>
              <a href="page-transactions-2.html">Transaction 2</a>
            </div>
          </li>
          <li className="menu-item has-submenu">
            <a className="menu-link" href="#">
              <i className="icon material-icons md-person"></i>
              <span className="text">Account</span>
            </a>
            <div className="submenu">
              <a href="page-account-login.html">User login</a>
              <a href="page-account-register.html">User registration</a>
              <a href="page-error-404.html">Error 404</a>
            </div>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="page-reviews.html">
              <i className="icon material-icons md-comment"></i>
              <span className="text">Reviews</span>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="page-brands.html">
              {" "}
              <i className="icon material-icons md-stars"></i>{" "}
              <span className="text">Brands</span>{" "}
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="#">
              <i className="icon material-icons md-pie_chart"></i>
              <span className="text">Statistics</span>
            </a>
          </li>
        </ul>
        <hr />
        <ul className="menu-aside">
          <li className="menu-item has-submenu">
            <a className="menu-link" href="#">
              <i className="icon material-icons md-settings"></i>
              <span className="text">Settings</span>
            </a>
            <div className="submenu">
              <a href="page-settings-1.html">Setting sample 1</a>
              <a href="page-settings-2.html">Setting sample 2</a>
            </div>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="page-blank.html">
              <i className="icon material-icons md-local_offer"></i>
              <span className="text"> Starter page </span>
            </a>
          </li>
        </ul>
        <br />
        <br />
      </nav>
    </aside>
  );
}

// export default function Sidebar() {
//   return (
//     <aside className="navbar-aside" id="offcanvas_aside">
//       <div className="aside-top">
//         <a href="index.html" className="brand-wrap">
//           <img
//             src="assets/imgs/theme/logo.svg"
//             className="logo"
//             alt="Nest Dashboard"
//           />
//         </a>
//         <div>
//           <button className="btn btn-icon btn-aside-minimize">
//             <i className="text-muted material-icons md-menu_open"></i>
//           </button>
//         </div>
//       </div>
//       <nav>
//         <ul className="menu-aside">
//           <li className="menu-item active">
//             <a className="menu-link" href="index.html">
//               <i className="icon material-icons md-home"></i>
//               <span className="text">Dashboard</span>
//             </a>
//           </li>
//           <li className="menu-item has-submenu">
//             <a className="menu-link" href="page-products-list.html">
//               <i className="icon material-icons md-shopping_bag"></i>
//               <span className="text">Products</span>
//             </a>
//             <div className="submenu">
//               <a href="page-products-list.html">Product List</a>
//               <a href="page-products-grid.html">Product grid</a>
//               <a href="page-products-grid-2.html">Product grid 2</a>
//               <a href="page-categories.html">Categories</a>
//             </div>
//           </li>
//           <li className="menu-item has-submenu">
//             <a className="menu-link" href="page-orders-1.html">
//               <i className="icon material-icons md-shopping_cart"></i>
//               <span className="text">Orders</span>
//             </a>
//             <div className="submenu">
//               <a href="page-orders-1.html">Order list 1</a>
//               <a href="page-orders-2.html">Order list 2</a>
//               <a href="page-orders-detail.html">Order detail</a>
//             </div>
//           </li>
//           <li className="menu-item has-submenu">
//             <a className="menu-link" href="page-sellers-cards.html">
//               <i className="icon material-icons md-store"></i>
//               <span className="text">Sellers</span>
//             </a>
//             <div className="submenu">
//               <a href="page-sellers-cards.html">Sellers cards</a>
//               <a href="page-sellers-list.html">Sellers list</a>
//               <a href="page-seller-detail.html">Seller profile</a>
//             </div>
//           </li>
//           <li className="menu-item has-submenu">
//             <a className="menu-link" href="page-form-product-1.html">
//               <i className="icon material-icons md-add_box"></i>
//               <span className="text">Add product</span>
//             </a>
//             <div className="submenu">
//               <a href="page-form-product-1.html">Add product 1</a>
//               <a href="page-form-product-2.html">Add product 2</a>
//               <a href="page-form-product-3.html">Add product 3</a>
//               <a href="page-form-product-4.html">Add product 4</a>
//             </div>
//           </li>
//           <li className="menu-item has-submenu">
//             <a className="menu-link" href="page-transactions-1.html">
//               <i className="icon material-icons md-monetization_on"></i>
//               <span className="text">Transactions</span>
//             </a>
//             <div className="submenu">
//               <a href="page-transactions-1.html">Transaction 1</a>
//               <a href="page-transactions-2.html">Transaction 2</a>
//             </div>
//           </li>
//           <li className="menu-item has-submenu">
//             <a className="menu-link" href="#">
//               <i className="icon material-icons md-person"></i>
//               <span className="text">Account</span>
//             </a>
//             <div className="submenu">
//               <a href="page-account-login.html">User login</a>
//               <a href="page-account-register.html">User registration</a>
//               <a href="page-error-404.html">Error 404</a>
//             </div>
//           </li>
//           <li className="menu-item">
//             <a className="menu-link" href="page-reviews.html">
//               <i className="icon material-icons md-comment"></i>
//               <span className="text">Reviews</span>
//             </a>
//           </li>
//           <li className="menu-item">
//             <a className="menu-link" href="page-brands.html">
//               {" "}
//               <i className="icon material-icons md-stars"></i>{" "}
//               <span className="text">Brands</span>{" "}
//             </a>
//           </li>
//           <li className="menu-item">
//             <a className="menu-link" href="#">
//               <i className="icon material-icons md-pie_chart"></i>
//               <span className="text">Statistics</span>
//             </a>
//           </li>
//         </ul>
//         <hr />
//         <ul className="menu-aside">
//           <li className="menu-item has-submenu">
//             <a className="menu-link" href="#">
//               <i className="icon material-icons md-settings"></i>
//               <span className="text">Settings</span>
//             </a>
//             <div className="submenu">
//               <a href="page-settings-1.html">Setting sample 1</a>
//               <a href="page-settings-2.html">Setting sample 2</a>
//             </div>
//           </li>
//           <li className="menu-item">
//             <a className="menu-link" href="page-blank.html">
//               <i className="icon material-icons md-local_offer"></i>
//               <span className="text"> Starter page </span>
//             </a>
//           </li>
//         </ul>
//         <br />
//         <br />
//       </nav>
//     </aside>
//   );
// }
