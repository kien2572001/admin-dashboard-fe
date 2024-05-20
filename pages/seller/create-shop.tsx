"use client";

import DashboardLayout from "@/app/components/layouts/Dashboard";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/hooks/useAuth";
import UserServices from "@/app/services/api/user-api";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

export default function CreateShop() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-9">
          <div className="content-header">
            <h2 className="content-title">Create new shop</h2>
            <div>
              {/* <button className="btn btn-light rounded font-sm mr-5 text-body hover-up">
                Save to draft
              </button> */}
              <button className="btn btn-md rounded font-sm hover-up">
                Publish
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Shop Profile</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-4">
                  <label htmlFor="shop_name" className="form-label">
                    Shop name
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                    id="product_name"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Description</label>
                  <textarea
                    placeholder="Type here"
                    className="form-control"
                    rows={4}
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <label className="form-label">Regular price</label>
                      <div className="row gx-2">
                        <input
                          placeholder="$"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <label className="form-label">Promotional price</label>
                      <input
                        placeholder="$"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">Currency</label>
                    <select className="form-select">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>RUBL</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label">Tax rate</label>
                  <input
                    type="text"
                    placeholder="%"
                    className="form-control"
                    id="product_name"
                  />
                </div>
                <label className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                  <span className="form-check-label"> Make a template </span>
                </label>
              </form>
            </div>
          </div>
          {/* <!-- card end// --> */}
          <div className="card mb-4">
            <div className="card-header">
              <h4>Shipping</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label for="product_name" className="form-label">
                        Width
                      </label>
                      <input
                        type="text"
                        placeholder="inch"
                        className="form-control"
                        id="product_name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label for="product_name" className="form-label">
                        Height
                      </label>
                      <input
                        type="text"
                        placeholder="inch"
                        className="form-control"
                        id="product_name"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label for="product_name" className="form-label">
                    Weight
                  </label>
                  <input
                    type="text"
                    placeholder="gam"
                    className="form-control"
                    id="product_name"
                  />
                </div>
                <div className="mb-4">
                  <label for="product_name" className="form-label">
                    Shipping fees
                  </label>
                  <input
                    type="text"
                    placeholder="$"
                    className="form-control"
                    id="product_name"
                  />
                </div>
                <div className="mb-4">
                  <button className="btn btn-md rounded font-lg hover-up">
                    Get now location
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- card end// --> */}
        </div>
        <div className="col-lg-3">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Logo</h4>
            </div>
            <div className="card-body">
              <div className="input-upload">
                <img src="/assets/imgs/theme/upload.svg" alt="" />
                <input className="form-control" type="file" />
              </div>
            </div>
          </div>
          {/* <!-- card end// --> */}
        </div>
      </div>
    </DashboardLayout>
  );
}
