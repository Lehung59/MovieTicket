/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import Image from "next/image";
import placeholder from "assets/images/placeholder.jpg";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import hiflix from "assets/icons/hiflix.svg";
import cineone from "assets/icons/CineOne21.svg";
import ebv from "assets/icons/ebv.id.svg";
import Title from "utils/wrapper/title";
import privateRoute from "utils/wrapper/privateRoute";

function Admin() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("Select Location");
  const [addTime, setAddTime] = useState("");
  const [dataTime, setDataTime] = useState([]);

  const showSetImage = () => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return placeholder;
  };

  const onChangeFile = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddTime = () => {
    if (addTime) {
      setDataTime([...dataTime, addTime]);
      setAddTime("");
    }
  };

  const handleRemoveTime = (index) => {
    const updatedDataTime = [...dataTime];
    updatedDataTime.splice(index, 1);
    setDataTime(updatedDataTime);
  };

  return (
    <>
      <Title title="Admin Page">
        <Navbar />
        <main className="px-[1.8rem] lg:px-[2.8rem] py-14 select-none bg-[#F5F6F8]">
          <section className="w-full flex flex-col lg:flex-row gap-4 px-0 lg:px-10">
            <section className="w-full lg:w-[70%]  flex flex-col">
              <h1 className="font-bold text-xl mb-6">Movie Description</h1>
              {/* Your movie description form here */}
            </section>
            <section className="w-full lg:w-[30%]  flex flex-col">
              <h1 className="font-bold text-xl mb-6">Premiere Location</h1>
              {/* Your premiere location selection here */}
              <h1 className="font-bold text-2xl mt-8 lg:mt-10 mb-6">
                Showtimes
              </h1>
              <div className="w-full flex flex-col gap-5 py-8 px-8 bg-base-100 rounded-lg">
                <div className="form-control  ">
                  <label className="label" htmlFor="open-date"></label>
                  <input
                    type="text"
                    value={addTime}
                    onChange={(e) => setAddTime(e.target.value)}
                    className="border border-tickitz-primary-focus outline-none w-full rounded-md px-4"
                    placeholder="ex 08:30"
                  />
                  <input
                    type="date"
                    id="open-date"
                    name="open_date"
                    className="input input-bordered input-tickitz-primary rounded"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <input
                    type="text"
                    value={addTime}
                    onChange={(e) => setAddTime(e.target.value)}
                    className="border border-tickitz-primary-focus outline-none w-full rounded-md px-4"
                    placeholder="ex 08:30"
                  />
                  <input
                    type="text"
                    value={addTime}
                    onChange={(e) => setAddTime(e.target.value)}
                    className="border border-tickitz-primary-focus outline-none w-full rounded-md px-4"
                    placeholder="ex 08:30"
                  />
                  <button
                    onClick={handleAddTime}
                    className="btn btn-tickitz-primary btn-outline w-fit px-3"
                  >
                    <i className="bi bi-plus text-2xl"></i>
                  </button>
                </div>
                <div className="w-full flex flex-wrap justify-center transition-all gap-4">
                  {dataTime.map((item, idx) => (
                    <p key={idx} className="font-bold transition-all">
                      {item}
                      <button
                        onClick={() => handleRemoveTime(idx)}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    </p>
                  ))}
                </div>
              </div>
              {/* Thêm các trường thông tin khác của phim tương tự */}
              <div className="form-control">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <button onClick={handleSaveMovie}>Save Movie</button>
              <button className="btn bg-tickitz-primary hover:bg-tickitz-primary text-white mt-10">
                Save
              </button>
            </section>
          </section>
        </main>
        <Footer />
      </Title>
    </>
  );
}

export default privateRoute(Admin);
