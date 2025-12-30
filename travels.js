const express = require("express");
const db = require("./db");
const router = express.Router();


router.get('/travels',(req ,res)=>
{
 const q = "select * from travels" ;
 db.query(q, (err,data) =>{
  if (err)
  {
    console.log(err);
    return res.json(err);
  }
  return res.json(data);
 })
});

router.get('/scheduled_travels',(req ,res)=>
{
 const q = "select * from scheduled_travel" ;
 db.query(q, (err,data) =>{
  if (err)
  {
    console.log(err);
    return res.json(err);
  }
  return res.json(data);
 })
});
 router.get('/travels/:TravelTemplateID', async (req, res) => {
        const TravelTemplateID = req.params.TravelTemplateID;
        try {            
          const rows = await db.query('SELECT * FROM travels WHERE TravelTemplateID = ?', [TravelTemplateID]);
            if (rows.length > 0) {
                res.json(rows[0]); 
            } else {
                res.status(404).json({ message: 'travel not found' });
            }
        } catch (error) {
            console.error('Error fetching travel:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });
    router.delete("/travels/:TravelTemplateID", (req, res) => {
  const id = req.params.TravelTemplateID;
  console.log (id);
  const q = " DELETE FROM travels WHERE TravelTemplateID = ? ";

  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

router.post("/travels", (req, res) => {
  
  const Destination = req.body.Destination;
  const TravelDate = req.body.TravelDate;
  const Description = req.body.Description;
  const Price = req.body.Price;
 
  if (isNaN(Price) || Price === "" || Price < 0) {
    return res.status(400).json({ error: "Price must be a valid number" });
  }
  const q = "INSERT INTO travels( `Destination`, `TravelDate`, `Description`, `Price`) VALUES (?,?,?,?)";
 
  db.query(q, [Destination,TravelDate,Description,Price], (err, data) => {
    if (err) return res.status(500);
    return res.json(data);
  });
});
router.put("/travels/:TravelTemplateID", (req, res) => {
  const id = req.params.TravelTemplateID;
  const q = "UPDATE travels SET `Destination`= ?, `TravelDate`= ?, `Description`= ?, `Price`= ? WHERE TravelTemplateID = ?";

  const values = [
    req.body.Destination,
    req.body.TravelDate,
    req.body.Description,
    req.body.Price,
  
  ];

  db.query(q, [...values,id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});



module.exports=router;


