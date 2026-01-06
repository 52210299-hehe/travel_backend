const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/bookings", (req, res) => {
  const CustomerID = req.body.CustomerID;
  const TravelID = req.body.TravelID;
  const q = "INSERT INTO bookings( `CustomerID`, `TravelID`) VALUES (?,?)";
 
  db.query(q, [CustomerID,TravelID], (err, data) => {
    if (err) return res.status(500);
    return res.json(data);
  });
});
 router.get('/bookings/user/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  const sql = 'SELECT bookings.*, travels.Destination FROM bookings JOIN travels ON travels.TravelTemplateID = bookings.TravelID WHERE bookings.CustomerID = ?';

  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(rows);
  });
});
router.put("/bookings/:BookingID", (req, res) => {
  const id = req.params.BookingID;
  const q = "UPDATE bookings SET `Payment_status` = 'payed' WHERE BookingID = ?";

  db.query(q, [id], (err, result) => {
    if (err) {
      console.error("Error updating payment status:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.json({ message: "Payment status updated to 'payed'" });
  });
});

 router.delete("/bookings/:BookingID", (req, res) => {
  const id = req.params.BookingID;
  console.log (id);
  const q = " DELETE FROM bookings WHERE BookingID = ? ";

  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

module.exports = router;
