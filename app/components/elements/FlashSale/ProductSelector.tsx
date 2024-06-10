// src/ProductModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Pagination } from "react-bootstrap";
import ProductPrice from "@/app/components/elements/ProductPrice";
import ProductServices from "@/app/services/api/product-api";
import usePagination from "@/app/services/hooks/usePagination";
interface Product {
  _id: string;
  product_name: string;
  images: any[];
  price: number;
  stock: string;
  inventories: any[];
  items?: any[];
}

interface ProductModalProps {
  //addProducts: (products: Product[]) => void;
  selectedProducts: any[];
  setSelectedProducts: (products: any[]) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  selectedProducts,
  setSelectedProducts,
}) => {
  const {
    page,
    limit,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    setPageNumber,
    setLimitPerPage,
    setTotalPages,
  } = usePagination(1, 5);
  const [products, setProducts] = useState<Product[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchProducts = async () => {
    try {
      const response = await ProductServices.fetchProductsListForSeller({
        page,
        limit,
      });
      console.log("response", response);
      setTotalPages(response.totalPages);
      setProducts(response.docs);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit, totalPages]);

  const handleCheckboxChange = (product: Product) => {
    if (selectedProducts.map((p) => p._id).includes(product._id)) {
      setSelectedProducts(
        selectedProducts.filter((p) => p._id !== product._id)
      );
    } else {
      const flashsales = product.inventories.map((inventory) => {
        return {
          product_id: product._id,
          inventory_id: inventory.inventory_id,
          price: inventory.price,
          flash_sale_price: inventory.price,
          flash_sale_percentage: 0,
          flash_sale_quantity: 0,
        };
      });
      product.items = flashsales;
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleConfirm = () => {
    //addProducts(selectedProducts);
    handleClose();
  };

  const minPriceMaxPrice = (product: Product) => {
    if (!product.inventories || product.inventories.length === 0) {
      return <ProductPrice price={0} />;
    } else if (product.inventories.length === 1) {
      return <ProductPrice price={product.inventories[0].price} />;
    }
    const minPrice = product.inventories.reduce((acc, inventory) => {
      return acc < inventory.price ? acc : inventory.price;
    }, Number.MAX_SAFE_INTEGER);
    const maxPrice = product.inventories.reduce((acc, inventory) => {
      return acc > inventory.price ? acc : inventory.price;
    }, Number.MIN_SAFE_INTEGER);
    return minPrice === maxPrice ? (
      <ProductPrice price={minPrice} />
    ) : (
      <>
        <ProductPrice price={minPrice} />
        <span className="ms-2 me-2">-</span>
        <ProductPrice price={maxPrice} />
      </>
    );
  };

  return (
    <>
      <button
        className="btn btn-md rounded font-sm hover-up"
        onClick={handleShow}
      >
        Add product
      </button>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Chọn sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th
                  style={{
                    width: "5%",
                  }}
                  className="text-center"
                >
                  #
                </th>
                <th
                  style={{
                    width: "50%",
                  }}
                >
                  Sản phẩm
                </th>
                <th
                  style={{
                    width: "20%",
                  }}
                >
                  Giá
                </th>
                <th
                  style={{
                    width: "20%",
                  }}
                >
                  Kho hàng
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td
                    style={{
                      width: "5%",
                    }}
                    className="text-center"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProducts
                        .map((p) => p._id)
                        .includes(product._id)}
                      onChange={() => handleCheckboxChange(product)}
                    />
                  </td>
                  <td
                    style={{
                      width: "50%",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <img
                          src={product?.images[0]?.url}
                          alt={product.product_name}
                          width="40"
                        />
                      </div>
                      <div>
                        <div>{product.product_name}</div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      width: "20%",
                    }}
                  >
                    {minPriceMaxPrice(product)}
                  </td>
                  <td
                    style={{
                      width: "20%",
                    }}
                  >
                    {product?.inventories?.reduce((acc, inventory) => {
                      return acc + inventory.quantity;
                    }, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="pagination-area mt-30 mb-10 d-flex justify-content-center">
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
                      className={`page-item ${
                        page === index + 1 ? "active" : ""
                      }`}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductModal;
