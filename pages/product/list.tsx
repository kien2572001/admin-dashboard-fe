"use client";

import DashboardLayout from "@/app/components/layouts/Dashboard";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/hooks/useAuth";
import { ProductStatus } from "@/app/enums/ProductStatus";
import ProductServices from "@/app/services/api/product-api";
import usePagination from "@/app/services/hooks/usePagination";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { RouterLinks } from "@/app/enums/RouterLinks";
import ProductPrice from "@/app/components/elements/ProductPrice";
export default function ProductList() {
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
  } = usePagination();

  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await ProductServices.fetchProductsListForSeller({
        page,
        limit,
      });
      setTotalPages(response.totalPages);
      setProducts(response.docs);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit, totalPages]);

  const pushToProductDetail = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handlerDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await ProductServices.deleteProduct(productToDelete);
      setShowModal(false);
      fetchProducts();
      toast.success("Product deleted successfully"); // toast is a notification library
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const confirmDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === ProductStatus.ACTIVE) {
      return <span className="badge rounded-pill alert-success">Active</span>;
    } else if (status === ProductStatus.INACTIVE) {
      return <span className="badge rounded-pill alert-danger">Inactive</span>;
    } else if (status === ProductStatus.DRAFT) {
      return <span className="badge rounded-pill alert-warning">Draft</span>;
    }
  };

  return (
    <DashboardLayout>
      {/* Modal */}
      {showModal && (
        <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this product?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handlerDeleteProduct}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <a
            href="#"
            className="btn btn-primary btn-sm rounded"
            onClick={() => router.push(RouterLinks.CREATE_PRODUCT)}
          >
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
        <div className="card-body">
          {products.map((product) => {
            return (
              <article className="itemlist" key={product._id}>
                <div className="row align-items-center">
                  <div className="col col-check flex-grow-0">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                    <a
                      className="itemside"
                      href="#"
                      onClick={() => pushToProductDetail(product._id)}
                    >
                      <div className="left">
                        <img
                          src={
                            product?.images[0]?.url ||
                            "/assets/imgs/items/1.jpg"
                          }
                          className="img-sm img-thumbnail"
                          alt="Item"
                        />
                      </div>
                      <div className="info">
                        <h6 className="mb-0">
                          {product?.product_name || "Product Name"}
                        </h6>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-2 col-sm-2 col-4 col-price">
                    <span>
                      <ProductPrice price={product.price} />
                    </span>
                  </div>
                  <div className="col-lg-2 col-sm-2 col-4 col-status">
                    <StatusBadge status={product?.status} />
                  </div>
                  <div className="col-lg-1 col-sm-2 col-4 col-date">
                    <span>
                      {new Date(product.created_at).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                  <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                    <a
                      href="#"
                      className="btn btn-sm font-sm rounded btn-brand"
                      onClick={() => pushToProductDetail(product._id)}
                    >
                      {" "}
                      <i className="material-icons md-edit"></i> Edit{" "}
                    </a>
                    <a
                      href="#"
                      className="btn btn-sm font-sm btn-light rounded"
                      onClick={() => confirmDeleteProduct(product._id)}
                    >
                      {" "}
                      <i className="material-icons md-delete_forever"></i>{" "}
                      Delete{" "}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="pagination-area mt-30 mb-50">
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
