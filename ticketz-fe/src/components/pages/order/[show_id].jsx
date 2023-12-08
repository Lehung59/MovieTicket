/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
import Seat from "components/Seat/Seat";
import Image from "next/image";
import { getOrderPage, orderSeat } from "utils/https/seat";
import swal from "sweetalert";

function Order() {
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seat, setSeat] = useState([]);
  const token = useSelector((state) => state.auth.data.token);
  const show_id = router.query.show_id;
  let seatIds = "";

  if (datas.length !== 0 && seat.length !== 0) {
    seatIds = datas.details
      .filter((data) => seat.includes(data.seat))
      .map((seat) => seat.seat_id);
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await orderSeat(seatIds, token, controller);
      swal("Success", "Order successful", "success");
      setTimeout(() => {
        router.push(`/payment/${res.data.data[0].transaction_id}`);
      }, 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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

  return (
    <>
      <Layout title={"Order"}>
        {loading && <Loader />}
        <Navbar />
        {datas.length === 0 ? (
          <Loader />
        ) : (
          <main className="global-px py-[3.75rem] mt-16 select-none bg-slate-300/20 px-20">
          //todo add jsx
          </main>
        )}
        <Footer />
      </Layout>
    </>
  );
}

export default Order;
