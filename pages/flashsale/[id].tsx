"use client";

import DashboardLayout from "@/app/components/layouts/Dashboard";
import { useAuth } from "@/app/services/hooks/useAuth";
import FlashSaleTimePickerModal from "@/app/components/elements/FlashSale/FlashSaleTimePickerModal";
import React, { useEffect, useState } from "react";
import ProductSelector from "@/app/components/elements/FlashSale/ProductSelector";
import ProductPrice from "@/app/components/elements/ProductPrice";
import { toast } from "react-toastify";
import { FlashSaleStatus } from "@/app/enums/FlashSaleStatus";
import OrderServices from "@/app/services/api/order-api";
import { useRouter } from "next/router";
export default function FlashSaleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [flashSale, setFlashSale] = useState<any>(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [timeSlot, setTimeSlot] = useState("");
  const [isActive, setIsActive] = useState(true);
  const fetchFlashSale = async () => {
    try {
      const res: any = await OrderServices.getFlashSaleById(id);
      console.log("flash sale", res);
      setFlashSale(res);
      setSelectedProducts(res.products);
      setTimeSlot(
        formatDateTimeRange(new Date(res.time_start), new Date(res.time_end))
      );
      setIsActive(res.is_active);
    } catch (error) {
      toast.error("Failed to fetch flash sale");
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFlashSale();
    }
  }, [id]);

  const formatDateTimeRange = (time_start: Date, time_end: Date) => {
    // Format the start time
    const startTimeString = `${time_start
      .getHours()
      .toString()
      .padStart(2, "0")}:${time_start
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // Format the end time
    const endTimeString = `${time_end
      .getHours()
      .toString()
      .padStart(2, "0")}:${time_end.getMinutes().toString().padStart(2, "0")}`;

    // Format the date
    const dateString = `${time_start.getFullYear()}-${(
      time_start.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${time_start.getDate().toString().padStart(2, "0")}`;

    // Combine date with start time and end time
    const dateTimeRangeString = `${dateString} ${startTimeString}-${endTimeString}`;

    return dateTimeRangeString;
  };

  const classificationName = (product: any, inventory: any) => {
    const is_has_many_classifications = product.is_has_many_classifications;
    if (is_has_many_classifications) {
      const classifications = product.classifications;
      if (classifications.length === 1) {
        const classification_main_id = inventory.classification_main_id;
        const classification_main_item = classifications[0].items.find(
          (item: any) => item._id === classification_main_id
        );
        return classification_main_item.item_name;
      } else {
        const classification_main_id = inventory.classification_main_id;
        const classification_main_item = product.classifications[0].items.find(
          (item: any) => item._id === classification_main_id
        );
        const classification_sub_id = inventory.classification_sub_id;
        const classification_sub_item = product.classifications[1].items.find(
          (item: any) => item._id === classification_sub_id
        );
        return `${classification_main_item.item_name}, ${classification_sub_item.item_name}`;
      }
    } else return "";
  };

  const isAvailableToUpdate = (time_start: string, time_end: string) => {
    const startTime = new Date(time_start);
    const now = new Date();

    // Tính toán sự chênh lệch giữa thời gian bắt đầu và thời gian hiện tại
    const timeDiff = startTime.getTime() - now.getTime();

    // Chuyển đổi thời gian chênh lệch thành phút
    const timeDiffInMinutes = timeDiff / (1000 * 60); // 1 phút = 60000 milliseconds

    // Kiểm tra xem sự chênh lệch có lớn hơn hoặc bằng 30 phút hay không
    return timeDiffInMinutes >= 60;
  };

  const handleSave = async () => {
    try {
      if (selectedProducts.length === 0) {
        toast.error("Please select at least one product");
        return;
      }
      if (
        flashSale &&
        !isAvailableToUpdate(flashSale.time_start, flashSale.time_end)
      ) {
        toast.error("Cannot update flash sale because it is too close");
        return;
      }
      const data = {
        is_active: isActive,
        products: selectedProducts.map((product: any) => {
          return {
            _id: product._id,
            items: product.items.map((item: any) => {
              return {
                inventory_id: item.inventory_id,
                price: item.price,
                flash_sale_price: item.flash_sale_price,
                flash_sale_percentage: Number.parseInt(
                  item.flash_sale_percentage
                ),
                flash_sale_quantity: Number.parseInt(item.flash_sale_quantity),
              };
            }),
          };
        }),
      };

      const res = await OrderServices.updateFlashSale(id, data);
      //console.log(res);
      toast.success("Flash sale updated successfully");
    } catch (error) {
      toast.error("Failed to update flash sale");
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="content-header">
            <h2 className="content-title">Flash sale detail</h2>
            <div>
              <button
                className="btn btn-md rounded font-sm hover-up"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div>
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <h6>1. General info</h6>
                </div>
                <div className="col-md-9">
                  <div className="mb-4">
                    <label className="form-label">Time Slot</label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control cursor-pointer"
                      value={timeSlot}
                      readOnly
                      onClick={() => toast.error("Cannot change time slot")}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Active Status</label>
                    <select
                      className="form-select"
                      value={isActive.toString()} // Chuyển đổi giá trị boolean sang chuỗi
                      onChange={(e) => setIsActive(e.target.value === "true")}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="mb-4 mt-0" />
              <div className="row">
                <div className="col-md-3">
                  <h6>2. The list of Flash Sale's products</h6>
                </div>
                <div className="col-md-9 text-end">
                  <ProductSelector
                    selectedProducts={selectedProducts}
                    //@ts-ignore
                    setSelectedProducts={setSelectedProducts}
                  />
                </div>
                <div className="col-md-12 mt-10">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Phân loại hàng</th>
                        <th>Giá gốc</th>
                        <th>Giá đã giảm</th>
                        <th>Phần trăm giảm</th>
                        <th>Số lượng khuyến mãi</th>
                        <th>Kho hàng</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProducts.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center">
                            No products selected
                          </td>
                        </tr>
                      )}
                      {selectedProducts?.map((product: any) => (
                        <React.Fragment key={product._id}>
                          <tr>
                            <td colSpan={6}>
                              <div className="d-flex align-items-center">
                                <div className="me-2">
                                  <img
                                    src={product?.images[0]?.url}
                                    alt={product?.product_name}
                                    width="40"
                                  />
                                </div>
                                <div>
                                  <div className="fw-bold">
                                    {product.product_name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => {
                                  setSelectedProducts(
                                    selectedProducts.filter(
                                      //@ts-ignore
                                      (p) => p._id !== product._id
                                    )
                                  );
                                }}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                          {product.inventories &&
                            product.inventories.map(
                              (inventory: any, index: number) => (
                                <tr key={index}>
                                  <td>
                                    {classificationName(product, inventory)}
                                  </td>
                                  <td>
                                    <ProductPrice
                                      price={product.items[index].price}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={
                                        product.items[index].flash_sale_price
                                      }
                                      min="1000"
                                      step={1000}
                                      onChange={(e: any) => {
                                        if (
                                          e.target.value >
                                          product.items[index].price
                                        ) {
                                          toast.error(
                                            "Giá khuyến mãi không được lớn hơn giá gốc"
                                          );
                                          return;
                                        }
                                        setSelectedProducts(
                                          selectedProducts.map((p) => {
                                            //@ts-ignore
                                            if (p._id === product._id) {
                                              //@ts-ignore
                                              p.items[index].flash_sale_price =
                                                e.target.value;
                                              //@ts-ignore
                                              p.items[
                                                index
                                              ].flash_sale_percent = Math.floor(
                                                (1 -
                                                  e.target.value /
                                                    product.items[index]
                                                      .price) *
                                                  100
                                              );
                                            }
                                            return p;
                                          })
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={
                                        product.items[index]
                                          .flash_sale_percentage
                                      }
                                      min="0"
                                      max="95"
                                      step={1}
                                      onChange={(e: any) => {
                                        setSelectedProducts(
                                          selectedProducts.map((p) => {
                                            //@ts-ignore
                                            if (p._id === product._id) {
                                              //@ts-ignore
                                              p.items[
                                                index
                                              ].flash_sale_percentage =
                                                e.target.value;
                                              //@ts-ignore
                                              p.items[index].flash_sale_price =
                                                Math.floor(
                                                  product.items[index].price *
                                                    (1 - e.target.value / 100)
                                                );
                                            }
                                            return p;
                                          })
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={
                                        product.items[index].flash_sale_quantity
                                      }
                                      min="1"
                                      onChange={(e) => {
                                        if (
                                          e.target.value > inventory.quantity
                                        ) {
                                          toast.error(
                                            "Số lượng khuyến mãi không được lớn hơn số lượng tồn kho"
                                          );
                                          return;
                                        }
                                        setSelectedProducts(
                                          selectedProducts.map((p) => {
                                            //@ts-ignore
                                            if (p._id === product._id) {
                                              //@ts-ignore
                                              p.items[
                                                index
                                              ].flash_sale_quantity =
                                                e.target.value;
                                            }
                                            return p;
                                          })
                                        );
                                      }}
                                    />
                                  </td>

                                  <td>{inventory.quantity}</td>
                                  <td>
                                    {/* <button className="btn btn-sm btn-danger">
                                      Remove
                                    </button> */}
                                  </td>
                                </tr>
                              )
                            )}
                          <tr>
                            <td colSpan={7}>
                              <hr />
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
