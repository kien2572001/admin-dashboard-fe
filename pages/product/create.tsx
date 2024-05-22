"use client";

import DashboardLayout from "@/app/components/layouts/Dashboard";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/hooks/useAuth";
import UserServices from "@/app/services/api/user-api";
import { useRouter } from "next/router";
import CategorySelector from "@/app/components/elements/CategorySelector";
import MultiImageSelector from "@/app/components/elements/MultiImageSelector";
import MultiVideoSelector from "@/app/components/elements/MultiVideoSelector";
import ProductVariantSelector from "@/app/components/elements/Product/ProductVariantSelector";
import ProductClassifySelector from "@/app/components/elements/Product/ProductClassifySelector";
import ProductClassifyDetailList from "@/app/components/elements/Product/ProductClassifyDetailList";
import ProductShippingSizeSelector from "@/app/components/elements/Product/ProductShippingSizeSelector";
type Classification = {
  id?: string;
  classification_name: string;
  items: string[];
};

type ResultItem = {
  classification_main?: string;
  classification_sub?: string;
};

export default function CreateProduct() {
  const router = useRouter();
  const { user } = useAuth();

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectedClassify, setSelectedClassify] = useState([]);
  const [listClassifyDetail, setListClassifyDetail] = useState([]);
  const [shippingInformation, setShippingInformation] = useState({
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    console.log("selectedVariants", selectedVariants);
  }, [selectedVariants]);

  useEffect(() => {
    // console.log("selectedClassify", selectedClassify);
    // console.log(
    //   "listClassifyDetail",
    //   createListClassifyDetail(selectedClassify)
    // );
    setListClassifyDetail(createListClassifyDetail(selectedClassify) as []);
  }, [selectedClassify]);

  const createListClassifyDetail = (
    classifications: Classification[]
  ): ResultItem[] => {
    // Hàm trợ giúp để lấy sản phẩm Cartesian của các mảng phần tử
    const cartesianProduct = (arrays: string[][]): string[][] => {
      return arrays.reduce(
        (acc, curr) => {
          return acc.flatMap((d) => curr.map((e) => [...d, e]));
        },
        [[]] as string[][]
      );
    };

    // Trích xuất các mảng phần tử từ các classification
    const itemsArrays = classifications.map((c) => c.items);

    // Tính sản phẩm Cartesian của các mảng phần tử
    const product = cartesianProduct(itemsArrays);

    // Chuyển đổi sản phẩm thành cấu trúc đối tượng với các khóa cố định
    const result: ResultItem[] = product.map((itemCombination) => {
      const obj: ResultItem = {};
      itemCombination.forEach((item, index) => {
        if (index === 0) {
          obj.classification_main = item;
        } else if (index === 1) {
          obj.classification_sub = item;
        }
      });
      return obj;
    });

    return result.map((item) => {
      return {
        ...item,
        price: 0,
        stock: 0,
      };
    });
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-9">
          <div className="content-header">
            <h2 className="content-title">Add New Product</h2>
            <div>
              <button className="btn btn-light rounded font-sm mr-5 text-body hover-up">
                Save to draft
              </button>
              <button className="btn btn-md rounded font-sm hover-up">
                Publich
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Basic</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-4">
                  <label htmlFor="product_name" className="form-label">
                    Product name
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                    id="product_name"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Full description</label>
                  <textarea
                    placeholder="Type here"
                    className="form-control"
                    rows={4}
                  ></textarea>
                </div>

                <CategorySelector
                  setSelectedCategoryId={setSelectedCategoryId}
                />
              </form>
            </div>
          </div>
          {/* <!-- card end// --> */}

          <ProductVariantSelector
            selectedVariants={selectedVariants}
            setSelectedVariants={setSelectedVariants}
          />
          {/* <!-- card end// --> */}

          <ProductClassifySelector
            selectedClassify={selectedClassify}
            setSelectedClassify={setSelectedClassify}
          />
          {/* <!-- card end// --> */}

          <ProductClassifyDetailList
            selectedClassify={selectedClassify}
            listClassifyDetail={listClassifyDetail}
            setListClassifyDetail={setListClassifyDetail}
          />
          {/* <!-- card end// --> */}

          <ProductShippingSizeSelector
            shippingInformation={shippingInformation}
            setShippingInformation={setShippingInformation}
          />
          {/* <!-- card end// --> */}
        </div>
        <div className="col-lg-3">
          <MultiImageSelector setSelectedImagesFromParent={setSelectedImages} />
          {/* <!-- card end// --> */}
          <MultiVideoSelector setSelectedVideosFromParent={setSelectedVideos} />
          {/* <!-- card end// --> */}
        </div>
      </div>
    </DashboardLayout>
  );
}
ProductShippingSizeSelector;
