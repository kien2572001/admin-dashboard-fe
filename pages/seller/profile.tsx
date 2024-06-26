"use client";

import DashboardLayout from "@/app/components/layouts/Dashboard";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/hooks/useAuth";
import UserServices from "@/app/services/api/user-api";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import GoogleMapReact from "google-map-react";
import { RiMapPin2Fill } from "react-icons/ri";

const AnyReactComponent = ({ text }: { text: string }) => (
  <div className="">
    <RiMapPin2Fill className="text-danger" size={30} />
  </div>
);

export default function SellerProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [shop, setShop] = useState<any>({});
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const shop = await UserServices.fetchShopProfile();
        if (shop) {
          //console.log("Shop found", shop);
          setShop(shop);
        } else {
          console.log("No shop found");
          // Redirect to create shop
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="content-header">
        <a href="javascript:history.back()">
          <i className="material-icons md-arrow_back"></i> Go back{" "}
        </a>
      </div>
      <div className="card mb-4">
        <div
          className="card-header bg-brand-2"
          style={{ height: "150px" }}
        ></div>
        <div className="card-body">
          <div className="row">
            <div
              className="col-xl col-lg flex-grow-0"
              style={{ flexBasis: "230px" }}
            >
              <div
                className="img-thumbnail shadow w-100 bg-white position-relative text-center"
                style={{ height: "190px", width: "200px", marginTop: "-120px" }}
              >
                {/* <img
                  src="/assets/imgs/brands/vendor-2.png"
                  className="center-xy img-fluid"
                  alt="Logo Brand"
                /> */}
                {shop.logo ? (
                  <img
                    src={"/assets/imgs/brands/vendor-2.png"}
                    className="center-xy img-fluid"
                    alt="Logo Brand"
                  />
                ) : (
                  <Skeleton height={100} width={100} />
                )}
              </div>
            </div>
            <div className="col-xl col-lg">
              <h3>{shop.shop_name || <Skeleton />}</h3>
              <p>{shop.description || <Skeleton count={2} />}</p>
            </div>
            <div className="col-xl-4 text-md-end">
              <select className="form-select w-auto d-inline-block">
                <option>Actions</option>
                <option>Disable shop</option>
                <option>Analyze</option>
                <option>Something</option>
              </select>
              <a href="#" className="btn btn-primary">
                {" "}
                View live <i className="material-icons md-launch"></i>{" "}
              </a>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row g-4">
            <div className="col-md-12 col-lg-4 col-xl-2">
              <article className="box">
                <p className="mb-0 text-muted">Total sales:</p>
                <h5 className="text-success">238</h5>
                <p className="mb-0 text-muted">Revenue:</p>
                <h5 className="text-success mb-0">$2380</h5>
              </article>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <h6>Contacts</h6>
              <p>
                <b>Manager:</b> {user?.username} <br />
                <b>Email:</b> {user?.email} <br />
                (229) 555-0109, (808) 555-0111
              </p>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <h6>Address</h6>
              <p>
                {shop.address ? (
                  <>
                    Address: {shop.address.full_address} <br />
                  </>
                ) : (
                  <Skeleton count={2} />
                )}
              </p>
            </div>
            <div className="col-sm-6 col-xl-4 text-xl-end">
              {/* <map className="mapbox position-relative d-inline-block">
                <img
                  src="/assets/imgs/misc/map.jpg"
                  className="rounded2"
                  height="120"
                  alt="map"
                />
                <span
                  className="map-pin"
                  style={{ top: "50px", left: "100px" }}
                ></span>
                <button
                  className="btn btn-sm btn-brand position-absolute bottom-0 end-0 mb-15 mr-15 font-xs"
                  style={{ bottom: "15px", right: "15px" }}
                >
                  Large
                </button>
              </map> */}
              {/* <div style={{ height: "120px", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.GOOGLE_MAP_API_KEY,
                  }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                  size={{ height: "100%", width: "100%" }}
                >
                  <AnyReactComponent
                    lat={defaultProps.center.lat}
                    lng={defaultProps.center.lng}
                    text="My Marker"
                  />
                </GoogleMapReact>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
