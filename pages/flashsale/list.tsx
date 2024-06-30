"use client";

import DashboardLayout from "@/app/components/layouts/Dashboard";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/hooks/useAuth";
import { FlashSaleStatus } from "@/app/enums/FlashSaleStatus";
import usePagination from "@/app/services/hooks/usePagination";
import OrderServices from "@/app/services/api/order-api";
import FlashSaleTimePickerModal from "@/app/components/elements/FlashSale/FlashSaleTimePickerModal";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { RouterLinks } from "@/app/enums/RouterLinks";
export default function FlashSaleList() {
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
  } = usePagination(1, 10);

  const [showFlashSaleTimePickerModal, setShowFlashSaleTimePickerModal] =
    useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [flashSales, setFlashSales] = useState([]);

  const fetchFlashSales = async () => {
    try {
      const response = await OrderServices.fetchFlashSaleBySellerId(
        // @ts-ignore
        user.shop_id,
        {
          page,
          limit,
          //status: FlashSaleStatus.Active,
        }
      );
      console.log("response", response);
      setTotalPages(response.totalPages);
      setFlashSales(response.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.shop_id) {
      fetchFlashSales();
    }
  }, [page, limit, totalPages, user]);

  const handleSave = (time: string) => {
    console.log(time);
    setSelectedTimeSlot(time);
    setShowFlashSaleTimePickerModal(false);
  };

  const previewStatus = (time_start: string, time_end: string) => {
    const startTime = new Date(time_start);
    const endTime = new Date(time_end);
    const now = new Date();
    let content = "";
    if (now < startTime) {
      return (
        <span className="badge rounded-pill alert-warning">Not started</span>
      );
    }
    if (now > startTime && now < endTime) {
      return (
        <span className="badge rounded-pill alert-primary">In progress</span>
      );
    }
    return <span className="badge rounded-pill alert-danger">Ended</span>;
  };

  const previewTimeSlot = (time_start: string, time_end: string) => {
    const dateObj = new Date(time_start);
    const date = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed, so we add 1
    const year = dateObj.getFullYear();

    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const start = new Date(time_start).toLocaleTimeString("en-GB", options);
    const end = new Date(time_end).toLocaleTimeString("en-GB", options);

    return `${date}/${month}/${year} ${start} - ${end}`;
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

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null); // Lưu trữ thông tin về mục cần xóa

  const openDeleteConfirmationModal = (item: any) => {
    setItemToDelete(item); // Lưu thông tin về mục cần xóa
    setShowDeleteConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    // Thực hiện hành động xóa ở đây
    try {
      if (!itemToDelete) {
        return;
      }
      const res = OrderServices.deleteFlashSale(itemToDelete._id);
      setFlashSales(
        flashSales.filter((item: any) => item._id !== itemToDelete._id)
      );
      //console.log(res);
      toast.success("Delete flash sale successfully");
      // Sau khi hoàn tất, đóng modal
      setShowDeleteConfirmationModal(false);
      // Sau khi xóa thành công, cập nhật lại danh sách
    } catch (error) {
      toast.error("Delete flash sale failed");
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="content-header">
        <div>
          <h2 className="content-title card-title">Flash Sale List</h2>
        </div>
        <div>
          <a
            href="#"
            className="btn btn-primary btn-sm rounded"
            onClick={() => router.push(RouterLinks.CREATE_FLASH_SALE)}
          >
            Create new
          </a>
        </div>
      </div>
      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search by time slot"
                className="form-control"
                value={selectedTimeSlot}
                readOnly
                onClick={() => setShowFlashSaleTimePickerModal(true)}
              />
              <FlashSaleTimePickerModal
                show={showFlashSaleTimePickerModal}
                handleClose={() => setShowFlashSaleTimePickerModal(false)}
                handleSave={handleSave}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
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
                  <th scope="col-2">Time Slot</th>
                  <th scope="col">Products</th>
                  <th scope="col ">Status</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Active</th>
                  <th scope="col" className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!flashSales?.length && (
                  <tr>
                    <td colSpan={7} className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
                {flashSales?.map((flashSale: any) => (
                  <tr key={flashSale._id}>
                    <td>
                      {previewTimeSlot(
                        flashSale.time_start,
                        flashSale.time_end
                      )}
                    </td>
                    <td>
                      Number of products: {` `}
                      {flashSale.products?.length}
                    </td>
                    <td>
                      {previewStatus(flashSale.time_start, flashSale.time_end)}
                    </td>
                    <td>
                      {moment(flashSale.created_at).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td>
                      {flashSale.is_active ? (
                        <span className="badge rounded-pill alert-primary">
                          Active
                        </span>
                      ) : (
                        <span className="badge rounded-pill alert-danger">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-primary"
                        style={{
                          padding: "6px 10px",
                          marginRight: "5px",
                        }}
                        onClick={() =>
                          router.push(`/flashsale/${flashSale._id}`)
                        }
                      >
                        Detail
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => openDeleteConfirmationModal(flashSale)}
                        disabled={
                          !isAvailableToUpdate(
                            flashSale.time_start,
                            flashSale.time_end
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
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
      {/* Confirm delete modal */}
      <Modal
        show={showDeleteConfirmationModal}
        onHide={() => setShowDeleteConfirmationModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
}
