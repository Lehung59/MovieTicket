const seatModel = require("../models/seat.model");
const db = require("../configs/supabase");
const moment = require("moment");
const getSeat = async (req, res) => {
  try {
    // const { show_id } = req.body;
    const { show_id } = req.params;
    const result = await seatModel.getSeat(show_id);
    if (result.rows.length === 0) {
      res.status(404).json({
        msg: "show_id not found",
      });
      return;
    }
    const combinedObject = {
      title: result.rows[0].title,
      cinema_brand_name: result.rows[0].cinema_brand_name,
      cinema_image: result.rows[0].cinema_image,
      show_time: result.rows[0].show_time,
      show_date: result.rows[0].show_date,
      details: result.rows.map(({ seat_id, seat, price, status_order }) => ({
        seat_id,
        seat,
        price,
        status_order,
      })),
    };
    res.status(200).json({
      data: combinedObject,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const orderSeat = async (req, res) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const { id } = req.authInfo;
    const { seat_id } = req.body;
    const dataArray = [];
    const dataSeat = [];
    seat_id.forEach((seat) => {
      dataArray.push({
        id,
        seat,
      });
      dataSeat.push({ seat });
    });
    // const cekCinema = await seatModel.cekCinema(dataCinema);
    // if (cekCinema.length === 0) {
    //   res.status(404).json({
    //     msg: "Cinema Not Found",
    //   });
    //   return;
    // }
    const cekSeat = await seatModel.cekSeat(dataSeat);
    // console.log(cekSeat);
    if (dataSeat.length > cekSeat.length) {
      res.status(400).json({
        msg: "seat not found please cek again",
      });
    }
    const cekStatusSeat = await seatModel.cekStatusSeat(dataSeat);
    if (cekStatusSeat.length === 0) {
      res.status(404).json({
        msg: "Seat Not Found",
      });
      return;
    }
    for (let i = 0; i < cekStatusSeat.length; i++) {
      const seat = cekStatusSeat[i];
      if (seat.status === "Sold") {
        res.status(400).json({
          data: seat,
          msg: "Seat Sold Out",
        });
        return;
      }
    }
    res.status(200).json({
      data: dataResult,
      msg: "Order Succes",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getSeat,
  orderSeat,
};
