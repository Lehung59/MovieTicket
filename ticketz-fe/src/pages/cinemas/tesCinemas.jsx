import React, { useState } from "react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Layout from "components/Layout";
// import Link from "next/link";
import axios from "axios";
import Link from "next/link";

export default function Cinemas() {
  // const [JktCinemas, setJktCinemas] = useState(false);

  // const handleClick = () => {
  //     setJktCinemas(!JktCinemas);
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  // };
  const [cinemas, setCinemas] = useState([]);
  const [showBioskops, setShowBioskops] = useState(false);
  const [selectedBioskop, setSelectedBioskop] = useState("");

  let cityId;

  const handleChange = (event) => {
    cityId = event.target.getAttribute('data-city-id');
    console.log("btn clicked")
    fetchCinemas(cityId);
    console.log(cityId);
  }



  const handleBioskopClick = (bioskop) => {
    setSelectedBioskop(bioskop);
  };


  return (
    <>
      <Layout title={"Cinemas List"}>
        <div>
          <Navbar />
          <div>
      <h1>Daftar Bioskop</h1>

      {showBioskops && (
        <div>
          <p>Daftar bioskop di {selectedCity}:</p>
          <ul>
            {cities
              .find((city) => city.name === selectedCity)
              .bioskops.map((bioskop) => (
                <li
                  key={bioskop.id}
                  onClick={() => handleBioskopClick(bioskop.name)}
                >
                  <Link href={`/bioskop/${bioskop.id}`}>
                    <a>{bioskop.name}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
      {selectedBioskop !== "" && (
        <p>
          Anda memilih bioskop <strong>{selectedBioskop}</strong>.
        </p>
      )}
    </div>
  
          <Footer />
        </div>
      </Layout>
    </>
  )
}


