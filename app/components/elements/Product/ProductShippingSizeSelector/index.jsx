import React from "react";

export default function ProductShippingSizeSelector({
  shippingInformation,
  setShippingInformation,
}) {
  const handleShippingInputChange = (value, field) => {
    setShippingInformation({
      ...shippingInformation,
      [field]: value,
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4>Shipping</h4>
      </div>
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-4">
                <label htmlFor="shipping_width" className="form-label">
                  Width
                </label>
                <input
                  type="text"
                  placeholder="cm"
                  className="form-control"
                  id="shipping_width"
                  onChange={(e) =>
                    handleShippingInputChange(e.target.value, "width")
                  }
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <label htmlFor="shipping_length" className="form-label">
                  Length
                </label>
                <input
                  type="text"
                  placeholder="cm"
                  className="form-control"
                  id="shipping_length"
                  onChange={(e) =>
                    handleShippingInputChange(e.target.value, "length")
                  }
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-4">
                <label htmlFor="shipping_height" className="form-label">
                  Height
                </label>
                <input
                  type="text"
                  placeholder="cm"
                  className="form-control"
                  id="shipping_height"
                  onChange={(e) =>
                    handleShippingInputChange(e.target.value, "height")
                  }
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <label htmlFor="shipping_weight" className="form-label">
                  Weight
                </label>
                <input
                  type="text"
                  placeholder="gram"
                  className="form-control"
                  id="shipping_weight"
                  onChange={(e) =>
                    handleShippingInputChange(e.target.value, "weight")
                  }
                />
              </div>
            </div>
          </div>
          {/* <div className="mb-4">
            <label htmlFor="shipping_fees" className="form-label">
              Shipping fees
            </label>
            <input
              type="text"
              placeholder="$"
              className="form-control"
              id="shipping_fees"
            />
          </div> */}
        </form>
      </div>
    </div>
  );
}
