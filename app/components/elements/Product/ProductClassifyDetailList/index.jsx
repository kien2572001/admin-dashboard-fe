import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./style.css";

export default function ProductClassifyDetailList({
  listClassifyDetail,
  setListClassifyDetail,
  selectedClassify,
}) {
  const [productClassifyDetailList, setProductClassifyDetailList] =
    useState(listClassifyDetail);

  useEffect(() => {
    setProductClassifyDetailList(listClassifyDetail);
  }, [listClassifyDetail]);

  const handleInputChange = (index, field, value) => {
    const newDetails = [...productClassifyDetailList];
    newDetails[index][field] = value;
    setProductClassifyDetailList(newDetails);
    setListClassifyDetail(newDetails); // Update the parent state as well
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4>Product Classify Detail List</h4>
      </div>
      <div className="card-body">
        <form>
          <Table striped bordered hover>
            <thead>
              <tr>
                {selectedClassify?.map((classify, index) => (
                  <th key={index}>{classify.classification_name}</th>
                ))}
                <th className="table-price">Price</th>
                <th className="table-stock">Stock</th>
              </tr>
            </thead>
            <tbody>
              {productClassifyDetailList.map((productClassifyDetail, index) => (
                <tr key={index}>
                  {selectedClassify?.map((classify, i) => {
                    if (i === 0) {
                      return (
                        <td key={i}>
                          {productClassifyDetail.classification_main || "   "}
                        </td>
                      );
                    } else if (i === 1) {
                      return (
                        <td key={i}>
                          {productClassifyDetail.classification_sub || "   "}
                        </td>
                      );
                    }
                  })}

                  <td className="table-price">
                    <input
                      type="number"
                      placeholder="Type price"
                      value={productClassifyDetail.price}
                      onChange={(e) =>
                        handleInputChange(index, "price", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td className="table-stock">
                    <input
                      type="number"
                      placeholder="Type stock"
                      value={productClassifyDetail.stock}
                      onChange={(e) =>
                        handleInputChange(index, "stock", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </form>
      </div>
    </div>
  );
}
