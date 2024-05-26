import React from "react";
import { v4 as uuidv4 } from "uuid";

interface Item {
  _id: string;
  item_name: string;
}

interface Classification {
  _id: string;
  classification_name: string;
  items: Item[];
}

interface ProductClassifySelectorProps {
  selectedClassify: Classification[];
  setSelectedClassify: (classify: Classification[]) => void;
  isHasManyClassifications: boolean;
  setIsHasManyClassifications: (isHasManyClassifications: boolean) => void;
  price: number;
  quantity: number;
  setPrice: (price: number) => void;
  setQuantity: (quantity: number) => void;
}

export default function ProductClassifySelector({
  selectedClassify,
  setSelectedClassify,
  isHasManyClassifications,
  setIsHasManyClassifications,
  price,
  quantity,
  setPrice,
  setQuantity,
}: ProductClassifySelectorProps) {
  const handleAddClassification = () => {
    setIsHasManyClassifications(true);
    setSelectedClassify([
      ...selectedClassify,
      {
        _id: uuidv4(),
        classification_name: "",
        items: [{ _id: uuidv4(), item_name: "" }],
      },
    ]);
  };

  const handleRemoveClassification = (index: number) => {
    const newClassifications = [...selectedClassify];
    newClassifications.splice(index, 1);
    setSelectedClassify(newClassifications);
  };

  const handleClassificationNameChange = (index: number, name: string) => {
    const newClassifications = [...selectedClassify];
    newClassifications[index].classification_name = name;
    setSelectedClassify(newClassifications);
  };

  const handleItemChange = (
    classificationIndex: number,
    itemIndex: number,
    value: string
  ) => {
    const newClassifications = [...selectedClassify];
    newClassifications[classificationIndex].items[itemIndex].item_name = value;
    setSelectedClassify(newClassifications);
  };

  const handleAddItem = (index: number) => {
    const newClassifications = [...selectedClassify];
    newClassifications[index].items.push({ _id: uuidv4(), item_name: "" });
    setSelectedClassify(newClassifications);
  };

  const handleRemoveItem = (classificationIndex: number, itemIndex: number) => {
    const newClassifications = [...selectedClassify];
    newClassifications[classificationIndex].items.splice(itemIndex, 1);
    setSelectedClassify(newClassifications);
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between">
        <h4>Sales information</h4>
        {selectedClassify.length < 2 && (
          <button
            type="button"
            className="btn btn-primary font-sm"
            onClick={handleAddClassification}
          >
            Add classification
          </button>
        )}
      </div>
      <div className="card-body">
        <form>
          {!isHasManyClassifications ? (
            <div className="row">
              <div className="mb-4 col-lg-6">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  placeholder="$"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="mb-4 col-lg-6">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="text"
                  placeholder="Quantity"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
            </div>
          ) : (
            selectedClassify.map((classification, classificationIndex) => (
              <div key={classificationIndex} className="mb-4">
                <div className="mb-3">
                  <label
                    htmlFor={`classification_name_${classificationIndex}`}
                    className="form-label"
                  >
                    Classification {classificationIndex + 1} name
                  </label>
                  <div className="row">
                    <div className="col-lg-10">
                      <input
                        type="text"
                        placeholder="Example: Color, Size, ..."
                        className="form-control"
                        id={`classification_name_${classificationIndex}`}
                        value={classification.classification_name}
                        onChange={(e) =>
                          handleClassificationNameChange(
                            classificationIndex,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-lg-2">
                      <button
                        type="button"
                        className="btn btn-danger font-sm"
                        onClick={() =>
                          handleRemoveClassification(classificationIndex)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <label className="form-label">Item</label>
                {classification.items.map((item, itemIndex) => (
                  <div key={item._id} className="row mb-2">
                    <div className="col-lg-10">
                      <input
                        type="text"
                        placeholder={"Example: Red, Blue, Green, ..."}
                        className="form-control"
                        value={item.item_name}
                        onChange={(e) =>
                          handleItemChange(
                            classificationIndex,
                            itemIndex,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-lg-2">
                      <button
                        type="button"
                        className="btn btn-danger font-sm"
                        onClick={() =>
                          handleRemoveItem(classificationIndex, itemIndex)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary font-sm"
                  onClick={() => handleAddItem(classificationIndex)}
                >
                  Add item
                </button>
              </div>
            ))
          )}
        </form>
      </div>
    </div>
  );
}
