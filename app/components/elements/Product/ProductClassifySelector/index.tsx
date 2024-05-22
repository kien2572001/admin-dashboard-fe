import React, { useState, useEffect } from "react";

interface Classification {
  id?: string;
  classification_name: string;
  items: string[];
}

interface ProductClassifySelectorProps {
  selectedClassify: Classification[];
  setSelectedClassify: (classify: any) => void;
}

export default function ProductClassifySelector({
  selectedClassify,
  setSelectedClassify,
}: ProductClassifySelectorProps) {
  const [isHasManyClassifications, setIsHasManyClassifications] =
    useState(false);
  const [classifications, setClassifications] =
    useState<Classification[]>(selectedClassify);

  useEffect(() => {
    setSelectedClassify(classifications);
  }, [classifications]);

  const handleAddClassification = () => {
    setIsHasManyClassifications(true);
    setClassifications([
      ...classifications,
      { classification_name: "", items: [""] },
    ]);
  };

  const handleRemoveClassification = (index: number) => {
    const newClassifications = [...classifications];
    newClassifications.splice(index, 1);
    setClassifications(newClassifications);
  };

  const handleClassificationNameChange = (index: number, name: string) => {
    const newClassifications = [...classifications];
    newClassifications[index].classification_name = name;
    setClassifications(newClassifications);
  };

  const handleItemChange = (
    classificationIndex: number,
    itemIndex: number,
    value: string
  ) => {
    const newClassifications = [...classifications];
    newClassifications[classificationIndex].items[itemIndex] = value;
    setClassifications(newClassifications);
  };

  const handleAddItem = (index: number) => {
    const newClassifications = [...classifications];
    newClassifications[index].items.push("");
    setClassifications(newClassifications);
  };

  const handleRemoveItem = (classificationIndex: number, itemIndex: number) => {
    const newClassifications = [...classifications];
    newClassifications[classificationIndex].items.splice(itemIndex, 1);
    setClassifications(newClassifications);
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between">
        <h4>Sales information</h4>
        {classifications.length < 2 && (
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
                />
              </div>
            </div>
          ) : (
            classifications.map((classification, classificationIndex) => (
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
                  <div key={itemIndex} className="row mb-2">
                    <div className="col-lg-10">
                      <input
                        type="text"
                        placeholder={"Example: Red, Blue, Green, ..."}
                        className="form-control"
                        value={item}
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
