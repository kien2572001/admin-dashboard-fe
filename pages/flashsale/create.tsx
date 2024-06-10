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
export default function CreateFlashSale() {
  const { user } = useAuth();
  const router = useRouter();
  const [showTimePickerModal, setShowTimePickerModal] = useState(false);

  const [timeSlot, setTimeSlot] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  useEffect(() => {
    console.log("selectedProducts", selectedProducts);
  }, [selectedProducts]);

  const handleCloseTimePickerModal = () => setShowTimePickerModal(false);
  const handleSaveTimePickerModal = (selectedTimeFrame: any) => {
    setTimeSlot(selectedTimeFrame);
    setShowTimePickerModal(false);
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

  const parseDateTimeRange = (dateTimeString: string) => {
    // Split the string into date and times
    const [date, times] = dateTimeString.split(" ");

    // Split the times into start and end
    const [startTime, endTime] = times.split("-");

    // Combine date with start time and end time
    const timeStartString = `${date} ${startTime}`;
    const timeEndString = `${date} ${endTime}`;

    // Convert strings to Date objects
    const time_start = new Date(timeStartString);
    const time_end = new Date(timeEndString);

    return { time_start, time_end };
  };

  const handleSave = async () => {
    try {
      if (!timeSlot) {
        toast.error("Please select time slot");
        return;
      }
      if (selectedProducts.length === 0) {
        toast.error("Please select at least one product");
        return;
      }
      //console.log("selectedProducts", selectedProducts);
      //console.log("timeSlot", timeSlot);
      const { time_start, time_end } = parseDateTimeRange(timeSlot);
      const data = {
        shop_id: user?.shop_id,
        time_start,
        time_end,
        status: FlashSaleStatus.NOT_STARTED,
        is_active: true,
        products: selectedProducts.map((product) => {
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
      console.log("data", data);
      const flashsale = await OrderServices.createFlashSale(data);
      console.log("flashsale", flashsale);
      if (flashsale && flashsale._id) {
        toast.success("Flash sale created successfully");
        router.push("/flashsale/" + flashsale._id);
      } else {
        toast.error("Error creating flash sale");
      }
    } catch (error) {
      toast.error("Error creating flash sale");
      console.error("Error creating flash sale:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="content-header">
            <h2 className="content-title">Add new flash sale</h2>
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
                      className="form-control"
                      value={timeSlot}
                      readOnly
                      onClick={() => setShowTimePickerModal(true)}
                    />
                  </div>
                </div>
              </div>

              <FlashSaleTimePickerModal
                show={showTimePickerModal}
                handleClose={handleCloseTimePickerModal}
                handleSave={handleSaveTimePickerModal}
              />
              <hr className="mb-4 mt-0" />
              <div className="row">
                <div className="col-md-3">
                  <h6>2. The list of Flash Sale's products</h6>
                </div>
                <div className="col-md-9 text-end">
                  <ProductSelector
                    selectedProducts={selectedProducts}
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
                      {selectedProducts?.map((product) => (
                        <React.Fragment key={product._id}>
                          <tr>
                            <td colSpan={6}>
                              <div className="d-flex align-items-center">
                                <div className="me-2">
                                  <img
                                    src={product?.images[0]?.url}
                                    alt={product.product_name}
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
                                            if (p._id === product._id) {
                                              p.items[index].flash_sale_price =
                                                e.target.value;

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
                                            if (p._id === product._id) {
                                              p.items[
                                                index
                                              ].flash_sale_percentage =
                                                e.target.value;
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
                                            if (p._id === product._id) {
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
