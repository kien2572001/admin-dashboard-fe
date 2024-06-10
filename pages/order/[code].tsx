import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/app/components/layouts/Dashboard";
import ProductPrice from "@/app/components/elements/ProductPrice";
import moment from "moment";
import OrderServices from "@/app/services/api/order-api";
import Skeleton from "react-loading-skeleton";

export default function OrderDetail() {
  const router = useRouter();
  const { code } = router.query;
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await OrderServices.fetchOrderByCode(code);
        console.log("response", response);
        setOrder(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (code) {
      fetchOrder();
    }
  }, [code]);

  return (
    <DashboardLayout>
      <div className="content-header">
        <div>
          <h2 className="content-title card-title">Order detail</h2>
          <p>
            {order ? (
              `Details for Order ID: ${order.code}`
            ) : (
              <Skeleton width={200} />
            )}
          </p>
        </div>
      </div>
      <div className="card">
        <header className="card-header">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 mb-lg-0 mb-15">
              <span>
                {" "}
                <i className="material-icons md-calendar_today"></i>{" "}
                <b>
                  {order ? (
                    moment(order.created_at).format("ddd, MMM D, YYYY, h:mmA")
                  ) : (
                    <Skeleton width={200} />
                  )}
                </b>{" "}
              </span>{" "}
              <br />
              <small className="text-muted">
                Order ID: {order ? order.code : <Skeleton width={100} />}
              </small>
            </div>
            <div className="col-lg-6 col-md-6 ms-auto text-md-end">
              <select className="form-select d-inline-block mb-lg-0 mr-5 mw-200">
                <option>Change status</option>
                <option>Awaiting payment</option>
                <option>Confirmed</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
              <a className="btn btn-primary" href="#">
                Save
              </a>
              <a className="btn btn-secondary print ms-2" href="#">
                <i className="icon material-icons md-print"></i>
              </a>
            </div>
          </div>
        </header>
        {/* <!-- card-header end// --> */}
        <div className="card-body">
          <div className="row mb-50 mt-20 order-info-wrap">
            <div className="col-md-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle bg-primary-light">
                  <i className="text-primary material-icons md-person"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Customer</h6>
                  <div className="mb-1">
                    {/* John Alexander <br />
                    alex@example.com <br />
                    +998 99 22123456 */}
                    {order ? (
                      <p>
                        {order.user.username} <br />
                        {order.user.email} <br />
                        {order.user.phone_number}
                      </p>
                    ) : (
                      <Skeleton width={200} count={3} />
                    )}
                  </div>
                  {/* <a href="#">View profile</a> */}
                </div>
              </article>
            </div>
            {/* <!-- col// --> */}
            <div className="col-md-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle bg-primary-light">
                  <i className="text-primary material-icons md-local_shipping"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Order info</h6>
                  <p className="mb-1">
                    {/* Shipping: Fargo express <br />
                    Pay method: card <br />
                    Status: new */}
                    {order ? (
                      <p>
                        Shipping: {order.shipping_method} <br />
                        Pay method: {order.payment_method} <br />
                        Status: {order.status}
                      </p>
                    ) : (
                      <Skeleton width={200} count={3} />
                    )}
                  </p>
                  {/* <a href="#">Download info</a> */}
                </div>
              </article>
            </div>
            {/* <!-- col// --> */}
            <div className="col-md-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle bg-primary-light">
                  <i className="text-primary material-icons md-place"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Deliver to</h6>
                  <p className="mb-1">
                    City: Tashkent, Uzbekistan <br />
                    Block A, House 123, Floor 2 <br />
                    Po Box 10000
                  </p>
                  {/* <a href="#">View profile</a> */}
                </div>
              </article>
            </div>
            {/* <!-- col// --> */}
          </div>
          {/* <!-- row // --> */}
          <div className="row">
            <div className="col-lg-7">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: "40%" }}>Product</th>
                      <th style={{ width: "20%" }}>Unit Price</th>
                      <th style={{ width: "20%" }}>Quantity</th>
                      <th style={{ width: "20%" }} className="text-end">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.order_items &&
                      order.order_items.map((item: any) => (
                        <tr key={"order-item-" + item.inventory_id}>
                          <td>
                            <a className="itemside" href="#">
                              <div className="left">
                                <img
                                  src={
                                    item.product?.images[0]?.url ||
                                    "/assets/imgs/items/1.jpg"
                                  }
                                  width="40"
                                  height="40"
                                  className="img-xs"
                                  alt="Item"
                                />
                              </div>
                              <div className="info">
                                {item.product?.product_name}
                              </div>
                            </a>
                          </td>
                          <td>
                            <ProductPrice price={item.price} />
                          </td>
                          <td>{item.quantity}</td>
                          <td className="text-end">
                            <ProductPrice price={item.price * item.quantity} />
                          </td>
                        </tr>
                      ))}

                    <tr>
                      <td colSpan={4}>
                        <article className="float-end">
                          <dl className="dlist">
                            <dt>Subtotal:</dt>
                            <dd>$973.35</dd>
                          </dl>
                          <dl className="dlist">
                            <dt>Shipping cost:</dt>
                            <dd>
                              {order?.shipping_fee ? (
                                <ProductPrice price={order?.shipping_fee} />
                              ) : (
                                <Skeleton width={100} />
                              )}
                            </dd>
                          </dl>
                          <dl className="dlist">
                            <dt>Grand total:</dt>
                            <dd>
                              <b className="h5">
                                {order ? (
                                  <ProductPrice price={order.total} />
                                ) : (
                                  <Skeleton width={100} />
                                )}
                              </b>
                            </dd>
                          </dl>
                          <dl className="dlist">
                            <dt className="text-muted">Status:</dt>
                            <dd>
                              <span className="badge rounded-pill alert-success text-success">
                                Payment done
                              </span>
                            </dd>
                          </dl>
                        </article>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <!-- table-responsive// --> */}
            </div>
            {/* <!-- col// --> */}
            <div className="col-lg-1"></div>
            <div className="col-lg-4">
              <div className="box shadow-sm bg-light">
                <h6 className="mb-15">Payment info</h6>
                <p>
                  <img
                    src="/assets/imgs/card-brands/2.png"
                    className="border"
                    height="20"
                  />{" "}
                  Master Card **** **** 4768 <br />
                  Business name: Grand Market LLC <br />
                  Phone: +1 (800) 555-154-52
                </p>
              </div>
              <div className="h-25 pt-4">
                <div className="mb-3">
                  <label>Notes</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    id="notes"
                    placeholder="Type some note"
                  ></textarea>
                </div>
                <button className="btn btn-primary">Save note</button>
              </div>
            </div>
            {/* <!-- col// --> */}
          </div>
        </div>
        {/* <!-- card-body end// --> */}
      </div>
      {/* <!-- card end// --> */}
    </DashboardLayout>
  );
}
