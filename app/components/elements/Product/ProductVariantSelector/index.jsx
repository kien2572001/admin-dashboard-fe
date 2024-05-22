import React, { useState, useEffect } from "react";

export default function ProductVariantSelector({
  selectedVariants,
  setSelectedVariants,
}) {
  const [attributes, setAttributes] = useState(selectedVariants);

  useEffect(() => {
    setSelectedVariants(attributes);
  }, [attributes]);

  const addAttribute = () => {
    setAttributes([...attributes, { name: "", value: "" }]);
  };

  const removeAttribute = (index) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
  };

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = attributes.map((attr, i) =>
      i === index ? { ...attr, [field]: value } : attr
    );
    setAttributes(newAttributes);
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between">
        <h4>Detail</h4>
        <button
          type="button"
          className="btn btn-primary font-sm"
          onClick={addAttribute}
        >
          Add attribute
        </button>
      </div>
      <div className="card-body">
        <form>
          <div className="row">
            {attributes.map((attribute, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-lg-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên thuộc tính"
                    value={attribute.name}
                    onChange={(e) =>
                      handleAttributeChange(index, "name", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Giá trị thuộc tính"
                    value={attribute.value}
                    onChange={(e) =>
                      handleAttributeChange(index, "value", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-1">
                  <button
                    type="button"
                    className="btn btn-danger font-sm"
                    onClick={() => removeAttribute(index)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
