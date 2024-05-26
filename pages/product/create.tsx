"use client";

import DashboardLayout from "@/app/components/layouts/Dashboard";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/hooks/useAuth";
import { toast } from "react-toastify";
import ProductServices from "@/app/services/api/product-api";
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
  classification_main_id?: string;
  classification_sub_id?: string;
};

export default function CreateProduct() {
  const router = useRouter();
  const { user } = useAuth();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [isHasManyClassifications, setIsHasManyClassifications] =
    useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

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

  const fetchBlobs = async (blobArray: string[]) => {
    let listMediaPromises = blobArray.map(async (media) => {
      return await fetchBlobFromUrl(media);
    });
    let listMedia = await Promise.all(listMediaPromises);
    return listMedia;
  };

  // useEffect(() => {
  //   console.log("selectedVariants", selectedVariants);
  // }, [selectedVariants]);

  useEffect(() => {
    console.log("selectedClassify", selectedClassify);
  }, [selectedClassify]);

  useEffect(() => {
    setListClassifyDetail(createListClassifyDetail(selectedClassify) as []);
  }, [selectedClassify]);

  async function fetchBlobFromUrl(blobUrl: string) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blob;
  }

  const isFormValid = (): boolean => {
    if (
      productName === "" ||
      productDescription === "" ||
      selectedCategoryId === "" ||
      selectedImages.length === 0 ||
      selectedVideos.length === 0 ||
      selectedVariants.length === 0 ||
      selectedClassify.length === 0 ||
      listClassifyDetail.length === 0 ||
      shippingInformation.weight === 0 ||
      shippingInformation.length === 0 ||
      shippingInformation.width === 0 ||
      shippingInformation.height === 0
    ) {
      return false;
    }
    return true;
  };

  const handleSaveProduct = async (status: string) => {
    try {
      const data = {
        product_name: productName,
        product_description: productDescription,
        category_id: selectedCategoryId,
        shipping_information: shippingInformation,
        product_variants: selectedVariants,
        classifications: selectedClassify,
        inventories: listClassifyDetail,
        is_has_many_classifications: isHasManyClassifications,
        status: status,
        inventory:
          isHasManyClassifications === false
            ? {
                price: price,
                quantity: quantity,
              }
            : {},
      } as any;

      const response = await ProductServices.createProduct(data);
      const _id = response;
      console.log("product_id", _id);
      const mediaFormData = new FormData();

      // Upload images
      const listImages = await fetchBlobs(selectedImages);
      listImages.forEach((image, index) => {
        mediaFormData.append(`images[${index}]`, image);
      });

      const listVideos = await fetchBlobs(selectedVideos);
      listVideos.forEach((video, index) => {
        mediaFormData.append(`videos[${index}]`, video);
      });

      await ProductServices.updateProductMedia(_id, mediaFormData);
      console.log("Upload media success");
      router.push("/product/" + _id);
    } catch (error) {
      toast.error("Error when create product. Please try again later.");
      console.log("error", error);
    }
  };

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
    console.log("product", product);

    // Chuyển đổi sản phẩm thành cấu trúc đối tượng với các khóa cố định
    const result: ResultItem[] = product.map((itemCombination) => {
      const obj: ResultItem = {};
      itemCombination.forEach((item, index) => {
        if (index === 0) {
          obj.classification_main_id = item;
        } else if (index === 1) {
          obj.classification_sub_id = item;
        }
      });
      return obj;
    });

    console.log("result", result);

    return result.map((item) => {
      return {
        ...item,
        price: 0,
        quantity: 0,
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
              <button
                className="btn btn-light rounded font-sm mr-5 text-body hover-up"
                onClick={() => handleSaveProduct("draft")}
              >
                Save to draft
              </button>
              <button
                className="btn btn-md rounded font-sm hover-up"
                onClick={() => handleSaveProduct("active")}
              >
                Publish
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
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Full description</label>
                  <textarea
                    placeholder="Type here"
                    className="form-control"
                    rows={4}
                    onChange={(e) => setProductDescription(e.target.value)}
                  ></textarea>
                </div>

                <CategorySelector
                  selectedCategoryId={selectedCategoryId}
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
            isHasManyClassifications={isHasManyClassifications}
            setIsHasManyClassifications={setIsHasManyClassifications}
            price={price}
            setPrice={setPrice}
            quantity={quantity}
            setQuantity={setQuantity}
          />
          {/* <!-- card end// --> */}

          <ProductClassifyDetailList
            selectedClassify={selectedClassify}
            listClassifyDetail={listClassifyDetail}
            setListClassifyDetail={setListClassifyDetail}
            isHasManyClassifications={isHasManyClassifications}
            setIsHasManyClassifications={setIsHasManyClassifications}
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
