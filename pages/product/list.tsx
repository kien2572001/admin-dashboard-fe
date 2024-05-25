"use client";

import DashboardLayout from "@/app/components/layouts/Dashboard";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/hooks/useAuth";
import { ProductStatus } from "@/app/enums/ProductStatus";
import ProductServices from "@/app/services/api/product-api";
import usePagination from "@/app/services/hooks/usePagination";
export default function ProductList() {
  const { user } = useAuth();
  const {
    page,
    limit,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    setPageNumber,
    setLimitPerPage,
    setTotalPages,
  } = usePagination();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on page and limit
    const fetchProducts = async () => {
      try {
        const response = await ProductServices.fetchProductsListForSeller({
          page,
          limit,
        });
        setTotalPages(response.totalPages);
        setProducts(response.docs);
        //setProducts(data.docs);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [page, limit, totalPages]);

  return (
    <DashboardLayout>
      <div className="content-header">
        <div>
          <h2 className="content-title card-title">Products List</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          <a href="#" className="btn btn-light rounded font-md">
            Export
          </a>
          <a href="#" className="btn btn-light rounded font-md">
            Import
          </a>
          <a href="#" className="btn btn-primary btn-sm rounded">
            Create new
          </a>
        </div>
      </div>
      <div className="card mb-4">
        <header className="card-header">
          <div className="row align-items-center">
            <div className="col col-check flex-grow-0">
              <div className="form-check ms-2">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </div>
            <div className="col-md-3 col-12 me-auto mb-md-0 mb-3">
              <select className="form-select">
                <option selected>All category</option>
                <option>Electronics</option>
                <option>Clothes</option>
                <option>Automobile</option>
              </select>
            </div>
            <div className="col-md-2 col-6">
              <input type="date" value="02.05.2021" className="form-control" />
            </div>
            <div className="col-md-2 col-6">
              <select className="form-select">
                {Object.values(ProductStatus).map((status) => (
                  <option>{status}</option>
                ))}
                <option>Show all</option>
              </select>
            </div>
          </div>
        </header>
        {/* <!-- card-header end// --> */}
        <div className="card-body">
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="/assets/imgs/items/1.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">Seeds of Change Organic Quinoa</h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                <span>$34.50</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-success">Active</span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-date">
                <span>02.11.2021</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                <a href="#" className="btn btn-sm font-sm rounded btn-brand">
                  {" "}
                  <i className="material-icons md-edit"></i> Edit{" "}
                </a>
                <a href="#" className="btn btn-sm font-sm btn-light rounded">
                  {" "}
                  <i className="material-icons md-delete_forever"></i> Delete{" "}
                </a>
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="/assets/imgs/items/2.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">All Natural Italian-Style Chicken</h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                <span>$990.99</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-success">Active</span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-date">
                <span>02.11.2021</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                <a href="#" className="btn btn-sm font-sm rounded btn-brand">
                  {" "}
                  <i className="material-icons md-edit"></i> Edit{" "}
                </a>
                <a href="#" className="btn btn-sm font-sm btn-light rounded">
                  {" "}
                  <i className="material-icons md-delete_forever"></i> Delete{" "}
                </a>
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="/assets/imgs/items/3.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">Gortons Beer Battered Fish Fillets</h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                <span>$76.99</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-warning">
                  Archived
                </span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-date">
                <span>02.11.2021</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                <a href="#" className="btn btn-sm font-sm rounded btn-brand">
                  {" "}
                  <i className="material-icons md-edit"></i> Edit{" "}
                </a>
                <a href="#" className="btn btn-sm font-sm btn-light rounded">
                  {" "}
                  <i className="material-icons md-delete_forever"></i> Delete{" "}
                </a>
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="/assets/imgs/items/4.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">
                      Foster Farms Takeout Crispy Classic Buffalo
                    </h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                <span>$18.00</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-success">Active</span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-date">
                <span>02.11.2021</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                <a href="#" className="btn btn-sm font-sm rounded btn-brand">
                  {" "}
                  <i className="material-icons md-edit"></i> Edit{" "}
                </a>
                <a href="#" className="btn btn-sm font-sm btn-light rounded">
                  {" "}
                  <i className="material-icons md-delete_forever"></i> Delete{" "}
                </a>
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="/assets/imgs/items/3.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">
                      Blue Diamond Almonds Lightly Salted
                    </h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                <span>$76.99</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-danger">
                  Disabled
                </span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-date">
                <span>02.11.2021</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                <a href="#" className="btn btn-sm font-sm rounded btn-brand">
                  {" "}
                  <i className="material-icons md-edit"></i> Edit{" "}
                </a>
                <a href="#" className="btn btn-sm font-sm btn-light rounded">
                  {" "}
                  <i className="material-icons md-delete_forever"></i> Delete{" "}
                </a>
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="/assets/imgs/items/5.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">
                      Chobani Complete Vanilla Greek Yogurt
                    </h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                <span>$18.00</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-warning">
                  Archived
                </span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-date">
                <span>02.11.2021</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                <a href="#" className="btn btn-sm font-sm rounded btn-brand">
                  {" "}
                  <i className="material-icons md-edit"></i> Edit{" "}
                </a>
                <a href="#" className="btn btn-sm font-sm btn-light rounded">
                  {" "}
                  <i className="material-icons md-delete_forever"></i> Delete{" "}
                </a>
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="/assets/imgs/items/6.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">Canada Dry Ginger Ale 2 L Bottle</h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                <span>$76.99</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-success">Active</span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-date">
                <span>02.11.2021</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                <a href="#" className="btn btn-sm font-sm rounded btn-brand">
                  {" "}
                  <i className="material-icons md-edit"></i> Edit{" "}
                </a>
                <a href="#" className="btn btn-sm font-sm btn-light rounded">
                  {" "}
                  <i className="material-icons md-delete_forever"></i> Delete{" "}
                </a>
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="/assets/imgs/items/4.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">Gortons Beer Battered Fish Fillets</h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                <span>$18.00</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-success">Active</span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-date">
                <span>02.11.2021</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                <a href="#" className="btn btn-sm font-sm rounded btn-brand">
                  {" "}
                  <i className="material-icons md-edit"></i> Edit{" "}
                </a>
                <a href="#" className="btn btn-sm font-sm btn-light rounded">
                  {" "}
                  <i className="material-icons md-delete_forever"></i> Delete{" "}
                </a>
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="/assets/imgs/items/3.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">Gortons Beer Battered Fish Fillets</h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                <span>$76.99</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-success">Active</span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-date">
                <span>02.11.2021</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                <a href="#" className="btn btn-sm font-sm rounded btn-brand">
                  {" "}
                  <i className="material-icons md-edit"></i> Edit{" "}
                </a>
                <a href="#" className="btn btn-sm font-sm btn-light rounded">
                  {" "}
                  <i className="material-icons md-delete_forever"></i> Delete{" "}
                </a>
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </div>
              <div className="col-lg-3 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="/assets/imgs/items/4.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">Haagen-Dazs Caramel Cone Ice</h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                <span>$180.99</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-success">Active</span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-date">
                <span>02.11.2021</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                <a href="#" className="btn btn-sm font-sm rounded btn-brand">
                  {" "}
                  <i className="material-icons md-edit"></i> Edit{" "}
                </a>
                <a href="#" className="btn btn-sm font-sm btn-light rounded">
                  {" "}
                  <i className="material-icons md-delete_forever"></i> Delete{" "}
                </a>
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}
        </div>
        {/* <!-- card-body end// --> */}
      </div>
      {/* <!-- card end// --> */}
      <div className="pagination-area mt-30 mb-50">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-start">
            <li className="page-item">
              <button
                className="page-link"
                onClick={goToPreviousPage}
                disabled={page === 1}
              >
                <i className="material-icons md-chevron_left"></i>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
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
            <li className="page-item">
              <button
                className="page-link"
                onClick={goToNextPage}
                disabled={page === totalPages}
              >
                <i className="material-icons md-chevron_right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </DashboardLayout>
  );
}
