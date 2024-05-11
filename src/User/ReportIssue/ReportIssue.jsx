import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import Checkbox from "@mui/material/Checkbox";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import LoadingPage from '../../layout/LoadingPage';
import { useNavigate } from 'react-router-dom';
import { createIssue } from '../../utils/createIssue';
import Swal from 'sweetalert2';


const ReportIssue = () => {
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    const [showName1, setShowName1] = useState({});
    const [value, setValue] = useState(false);
    const category = ["Overflowing Bins", "Littering", "Illegal Dumping", "Damaged Infrastructure"];
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=d0a7e1f328b83330a0ea0321f368cb7f`;

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
      setIsOpen(true);
    }

    const handleChange = () => {
        setValue(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = "#f00";
    }

    function closeModal() {
      setIsOpen(false);
    }

    const [clickedPosition, setClickedPosition] = useState(null);
    const handleClick = (e) => {
      setClickedPosition(e.latlng);
      closeModal();
    };
    const navigate = useNavigate();

    const onSubmit = async (data) => {
    setShow(true);
    const formData = new FormData();
    formData.append("image", image);
    fetch(imageHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (imgResponse) => {
        if (imgResponse.success) {
          const productDetails = {
            lat: data.lat,
            lng: data.lng,
            description: data.description,
            category: data.category,
            image: imgResponse.data.display_url,
            value:value
          };
          try {
            const res = await createIssue(productDetails);
            // console.log(res);
            if (res.result) {
              Swal.fire({
                title: "Successfully Generate Your Report",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/dashboard")
                }
              });
            } else {
              Swal.fire({
                title: "Failed",
                confirmButtonText: "Ok",
              });
            }
          } catch (err) {
            throw new Error(err.message);
          }
        }
      });
    }
    return (
      <div className="my-10 h-[100vh]">
        <div className="">
          <div className="shadow-xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="my-5 flex form-control">
                <div className="">
                  <label className="label">
                    <span className="label-text text-xl font-semibold">
                      GPS Coordinates*
                    </span>
                  </label>
                  {!clickedPosition && (
                    <p
                      onClick={openModal}
                      className="btn w-full p-2 rounded-md placeholder:pl-2"
                    >
                      Open Map
                    </p>
                  )}
                  {clickedPosition && (
                    <input
                      type="text"
                      id="lat"
                      placeholder="Enter Latitude"
                      value={clickedPosition?.lat}
                      {...register("lat", { required: true })}
                      required
                      className="rounded-md p-2 border-2 border-black bg-transparent w-full"
                    />
                  )}
                  {clickedPosition && (
                    <input
                      type="text"
                      id="lng"
                      placeholder="Enter Longitude"
                      value={clickedPosition?.lng}
                      {...register("lng", { required: true })}
                      required
                      className="rounded-md mt-5 p-2 border-2 border-black bg-transparent w-full"
                    />
                  )}
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Issue Type</span>
                </label>
                <select
                  className="select p-2 border-2 border-black bg-transparent w-full"
                  id="category"
                  {...register("category", { required: true })}
                >
                  {category?.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="Description"
                  className="textarea textarea-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <label htmlFor="photo" className="flex w-full max-w-[600px]">
                  <p className="w-full truncate rounded-md hover:shadow-[0px_0px_4px_0.5px] border-[1px] border-black px-4 py-2 text-sm  text-black shadow-md">
                    {showName1.name ? showName1.name : "CHOOSE FILE"}
                  </p>
                </label>
                <input
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    if (e.target.files && e.target.files[0]) {
                      const imageFile = e.target.files[0];
                      setShowName1(imageFile);
                    }
                  }}
                  className="hidden"
                  type="file"
                  name="photo"
                  id="photo"
                />
              </div>
              <div className="form-control">
                <Checkbox {...label} onChange={handleChange}/>
              </div>
              <div className="form-control mt-6">
                {!show ? (
                  <input
                    type="submit"
                    value="Submit"
                    className="input input-bordered"
                  />
                ) : (
                  <div>
                    <LoadingPage></LoadingPage>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div
              className="pb-3"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <button onClick={closeModal}>Close Map</button>
            </div>
            <MapContainer
              center={[23.7654, 90.3917]}
              zoom={13}
              scrollWheelZoom={false}
              style={{
                height: "70vh",
                width: "80vw",
                position: "relative",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler onClick={handleClick} />
              {clickedPosition && (
                <PositionDisplay position={clickedPosition} />
              )}
            </MapContainer>
          </Modal>
        </div>
      </div>
    );
};

const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click: onClick,
  });

  return null;
};

const PositionDisplay = ({ position }) => {
  return (
    <div
      style={{
        color: "black",
        position: "absolute",
        top: "10px",
        left: "50px",
        background: "white",
        padding: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        zIndex: 1000,
        // margin-bottom:"10px",
      }}
    >
      Latitude: {position.lat.toFixed(5)}, Longitude: {position.lng.toFixed(5)}
    </div>
  );
};
MapClickHandler.propTypes = {
  onClick: PropTypes.func,
};
PositionDisplay.propTypes = {
  position: PropTypes.node,
};

export default ReportIssue;