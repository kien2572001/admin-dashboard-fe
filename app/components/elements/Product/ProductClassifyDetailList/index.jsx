import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./style.css";

export default function ProductClassifyDetailList({
  listClassifyDetail,
  setListClassifyDetail,
  selectedClassify,
  isHasManyClassifications,
  setIsHasManyClassifications,
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
        {isHasManyClassifications && (
          <form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {selectedClassify?.map((classify, index) => (
                    <th key={index}>{classify.classification_name}</th>
                  ))}
                  <th className="table-price">Price</th>
                  <th className="table-quantity">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {productClassifyDetailList.map(
                  (productClassifyDetail, index) => (
                    <tr key={index}>
                      {selectedClassify?.map((classify, i) => {
                        if (i === 0) {
                          return (
                            <td key={i}>
                              {productClassifyDetail.classification_main_id ||
                                "   "}
                            </td>
                          );
                        } else if (i === 1) {
                          return (
                            <td key={i}>
                              {productClassifyDetail.classification_sub_id ||
                                "   "}
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
                      <td className="table-quantity">
                        <input
                          type="number"
                          placeholder="Type quantity"
                          value={productClassifyDetail.quantity}
                          onChange={(e) =>
                            handleInputChange(index, "quantity", e.target.value)
                          }
                          className="form-control"
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </form>
        )}
      </div>
    </div>
  );
}
