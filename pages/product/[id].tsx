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
import { ProductStatus } from "@/app/enums/ProductStatus";
type Classification = {
  id?: string;
  classification_name: string;
  items: any[];
};

type ResultItem = {
  classification_main_id?: string;
  classification_sub_id?: string;
};

export default function ProductDetail() {
  const router = useRouter();
  const id = router.query.id;
  console.log("id", id);

  useEffect(() => {
    if (id) {
      // Fetch product detail
      const fetchProductDetail = async () => {
        try {
          const response = await ProductServices.fetchProductById(id as string);
          console.log("product detail", response);
          setProductName(response.product_name);
          setProductDescription(response.product_description);
          setSelectedCategoryId(response.category._id);
          setSelectedImages(response.images);
          setSelectedVideos(response.videos);
          setSelectedVariants(response.product_variants);
          setProductStatus(response.status);
          setIsHasManyClassifications(response.is_has_many_classifications);
          if (response.is_has_many_classifications) {
            setInitInventoriesData({
              inventories: response.inventories,
              isInit: true,
            });
            setSelectedClassify(response.classifications);
          } else {
            setPrice(response?.inventories[0]?.price || 0);
            setQuantity(response?.inventories[0]?.quantity || 0);
          }

          setShippingInformation(response.shipping_information);
        } catch (error) {
          toast.error(
            "Error when fetch product detail. Please try again later."
          );
          console.error("Error fetching product detail:", error);
        }
      };

      fetchProductDetail();
    }
  }, [id]);

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
  const [productStatus, setProductStatus] = useState("");
  const [initInventoriesData, setInitInventoriesData] = useState({
    inventories: [],
    isInit: false,
  } as { inventories: any[]; isInit: boolean });

  const fetchBlobs = async (blobArray: string[]) => {
    let listMediaPromises = blobArray.map(async (media) => {
      return await fetchBlobFromUrl(media);
    });
    let listMedia = await Promise.all(listMediaPromises);
    return listMedia;
  };

  useEffect(() => {
    //console.log("selectedClassify", selectedClassify);
  }, [selectedClassify]);

  useEffect(() => {
    //console.log("initInventoriesData", initInventoriesData);
    let listClassifyDetail = createListClassifyDetail(selectedClassify) as [];
    const selectedClassifySize = selectedClassify.length;
    //console.log("selectedClassifySize", selectedClassifySize);
    //only init data when first time
    //console.log("initInventoriesData.isInit", initInventoriesData.isInit);
    if (initInventoriesData.isInit) {
      listClassifyDetail = listClassifyDetail.map((item: any) => {
        const found = initInventoriesData.inventories.find((inventory) => {
          if (selectedClassifySize === 1) {
            return (
              inventory.classification_main_id ===
              item.classification_main_id._id
            );
          } else if (selectedClassifySize === 2) {
            return (
              inventory.classification_main_id ===
                item.classification_main_id._id &&
              inventory.classification_sub_id === item.classification_sub_id._id
            );
          }
        });
        if (found) {
          return {
            ...item,
            price: found.price,
            quantity: found.quantity,
          };
        }
        return item;
      }) as []; // Add type annotation to fix the error
      setInitInventoriesData({ ...initInventoriesData, isInit: false });
    }
    //console.log("listClassifyDetail", listClassifyDetail);
    setListClassifyDetail(listClassifyDetail);
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
          obj.classification_main_id = item;
        } else if (index === 1) {
          obj.classification_sub_id = item;
        }
      });
      return obj;
    });

    return result.map((item) => {
      return {
        ...item,
        price: 0,
        quantity: 0,
      };
    });
  };

  const handleSaveEdit = async () => {
    try {
      console.log("Save edit");
      const updatedProduct = {
        _id: id,
        product_name: productName,
        product_description: productDescription,
        category_id: selectedCategoryId,
        product_variants: selectedVariants,
        classifications: selectedClassify,
        shipping_information: shippingInformation,
        status: productStatus,
        is_has_many_classifications: isHasManyClassifications,
      } as any;
      if (isHasManyClassifications) {
        updatedProduct.inventories = listClassifyDetail;
      } else {
        updatedProduct.inventory = {
          price: price,
          quantity: quantity,
        };
      }

      const result = await ProductServices.updateProduct(
        id as string,
        updatedProduct
      );
      toast.success("Update product success");
      router.reload();
    } catch (error) {
      console.error("Error when update product:", error);
      toast.error("Error when update product. Please try again later.");
    }
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-9">
          <div className="content-header">
            <h2 className="content-title">Product detail</h2>
            <div>
              <button
                className="btn btn-md rounded font-sm hover-up"
                onClick={() => handleSaveEdit()}
              >
                Save edit
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
                    value={productName}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Full description</label>
                  <textarea
                    placeholder="Type here"
                    className="form-control"
                    rows={4}
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={productDescription}
                  ></textarea>
                </div>

                <CategorySelector
                  selectedCategoryId={selectedCategoryId}
                  setSelectedCategoryId={setSelectedCategoryId}
                />

                <div className="col-lg-4">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    onChange={(e) => setProductStatus(e.target.value)}
                    value={productStatus}
                  >
                    {Object.values(ProductStatus).map((status) => (
                      <option key={status} value={status}>
                        {status.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
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
