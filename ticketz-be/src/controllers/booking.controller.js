const bookingModel = require("../models/booking.model");
const db = require("../configs/supabase");

const createBooking = async (req, res) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const { authInfo } = req;
    // Get the user ID from authInfo
    const userId = authInfo.userId;
    const { cinemaId, seatIds } = req.body;

    // Check if the cinema and seats exist and are available
    const cinema = await bookingModel.getCinemaById(cinemaId);
    if (!cinema) {
      throw new Error("Cinema not found");
    }

    const seats = await bookingModel.getSeatsByIds(seatIds);
    if (seats.length !== seatIds.length) {
      throw new Error("Some seats not found");
    }

    const unavailableSeats = seats.filter((seat) => seat.order_status_id !== 1);
    if (unavailableSeats.length > 0) {
      throw new Error("Some seats are not available");
    }

    // Calculate the total price of the booking
    const totalPrice = cinema.prices * seatIds.length;

    await client.query("COMMIT");
    res.status(200).json({
      msg: "Booking created successfully",
      data: {
        reservations,
        totalPrice,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  createBooking,
};
