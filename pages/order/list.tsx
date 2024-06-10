"use client";

import DashboardLayout from "@/app/components/layouts/Dashboard";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/hooks/useAuth";
import { useRouter } from "next/router";
import usePagination from "@/app/services/hooks/usePagination";
import OrderServices from "@/app/services/api/order-api";
import { OrderStatus } from "@/app/enums/OrderStatus";
import ProductPrice from "@/app/components/elements/ProductPrice";
import OrderStatusBadge from "@/app/components/elements/Order/OrderStatusBadge";
import moment from "moment";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Link from "next/link";
export default function OrderList() {
  const { user } = useAuth();
  const router = useRouter();
  const {
    page,
    limit,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    setPageNumber,
    setLimitPerPage,
    setTotalPages,
  } = usePagination(1, 20);

  const [orders, setOrders] = useState([]);
  const [statusSearch, setStatusSearch] = useState("all");
  const [codeSearch, setCodeSearch] = useState("");

  const fetchOrders = async () => {
    try {
      // @ts-ignore
      const response = await OrderServices.fetchOrdersBySellerId(user.shop_id, {
        page,
        limit,
        status: statusSearch,
        code: codeSearch,
      });
      console.log("response", response);
      setTotalPages(response.totalPages);
      setOrders(response.docs);
      // setOrders(response.data);
      // setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.shop_id) {
      fetchOrders();
    }
  }, [page, limit, totalPages, user, statusSearch, codeSearch]);

  const toggleDropdown = (orderId: string) => {
    const dropdown = document.getElementById(`dropdown-${orderId}`);
    dropdown?.classList.toggle("show");
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const dropdowns = document.querySelectorAll(".dropdown-menu");
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target)) {
          dropdown.classList.remove("show");
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="content-header">
        <div>
          <h2 className="content-title card-title">Order List</h2>
        </div>
        {/* <div>
          <input
            type="text"
            placeholder="Search order ID"
            className="form-control bg-white"
          />
        </div> */}
      </div>
      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search order ID"
                className="form-control"
                onChange={(e) => setCodeSearch(e.target.value)}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setStatusSearch(e.target.value)}
                value={statusSearch}
              >
                <option value={"all"}>Show all</option>
                {Object.values(OrderStatus).map((status) => (
                  <option key={status} value={status}>
                    {status?.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setLimitPerPage(Number(e.target.value))}
                value={limit}
              >
                <option value={20}>Show 20</option>
                <option value={30}>Show 30</option>
                <option value={40}>Show 40</option>
              </select>
            </div>
          </div>
        </header>
        {/* <!-- card-header end// --> */}
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                  <th scope="col" className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No data
                    </td>
                  </tr>
                )}
                {orders &&
                  orders.map((order: any) => (
                    <>
                      <tr key={order._id + "-id"}>
                        <td colSpan={6}>
                          <small className="text-muted">ID: {order.code}</small>
                        </td>
                      </tr>
                      <tr key={order._id}>
                        <td>
                          <b>{order?.user?.username}</b>
                        </td>
                        <td>{order?.user?.email}</td>
                        <td>
                          <ProductPrice price={order.total} />
                        </td>
                        <td>
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td>
                          {moment(order.created_at).format("DD/MM/YYYY HH:mm")}
                        </td>
                        <td className="text-end">
                          <Link
                            href={`/order/${order.code}`}
                            className="btn btn-md rounded font-sm"
                          >
                            Detail
                          </Link>
                          <div className="dropdown">
                            <button
                              className="btn btn-light rounded btn-sm font-sm"
                              onClick={() => toggleDropdown(order._id)}
                            >
                              <i className="material-icons md-more_horiz"></i>
                            </button>
                            <div
                              id={`dropdown-${order._id}`}
                              className="dropdown-menu"
                            >
                              <a className="dropdown-item" href="#">
                                View detail
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit info
                              </a>
                              <a className="dropdown-item text-danger" href="#">
                                Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
          {/* <!-- table-responsive //end --> */}
        </div>
        {/* <!-- card-body end// --> */}
      </div>
      {/* <!-- card end// --> */}
      <div className="pagination-area mt-15 mb-50">
        {totalPages > 1 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-start">
              {page > 1 && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={goToPreviousPage}
                    disabled={page === 1}
                  >
                    <i className="material-icons md-chevron_left"></i>
                  </button>
                </li>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={"pagination-" + index}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPageNumber(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              {page < totalPages && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <i className="material-icons md-chevron_right"></i>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </DashboardLayout>
  );
}
