/* eslint-disable react-hooks/exhaustive-deps */
import { data } from "autoprefixer";
import Footer from "components/Footer";
import Layout from "components/Layout";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
import Seat from "components/Seat/Seat";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { getOrderPage, orderSeat } from "utils/https/seat";

function Order() {
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState();
  const [seat, setSeat] = useState([]);
  const token = useSelector((state) => state.auth.data.token);
  // console.log(router.query);
  const show_id = router.query.show_id;
  // console.log(idSeat);
  // console.log(seat);
  // console.log(datas);
  let seatIds = "";
  if (datas.length !== 0 && seat.length !== 0) {
    seatIds = datas.details
      .filter((datas) => seat.includes(datas.seat))
      .map((seat) => seat.seat_id);
    // console.log(seatIds);
  }
  // console.log(seatIds);
  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);
    orderSeat(seatIds, token, controller)
      .then((res) => {
        // console.log(res.data.data[0].transaction_id);
        swal("Success", "Order successful", "success");
        setTimeout(() => {
          router.push(`/payment/${res.data.data[0].transaction_id}`);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getOrderPage(show_id, controller)
      .then(({ data }) => {
        setDatas(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // console.log(datas);
  
}

export default Order;
