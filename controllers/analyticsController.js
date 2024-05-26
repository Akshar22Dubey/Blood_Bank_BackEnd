const inventoryModal = require("../models/inventoryModal");
const mongoose = require("mongoose");
//GET BLOOD DATA
const bloodGroupDetailsContoller = async (req, res) => {
  try {
    const bloodgroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodgroupData = [];
    const organisation = new mongoose.Types.ObjectId(req.body.userId);
    //get single blood group
    await Promise.all(
      bloodgroups.map(async (bloodgroup) => {
        //Count TOTAL IN

        const totalIn = await inventoryModal.aggregate([
          {
            $match: {
              bloodgroup: bloodgroup,
              inventoryType: "in",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);

        //Count TOTAL OUT

        const totalOut = await inventoryModal.aggregate([
          {
            $match: {
              bloodgroup: bloodgroup,
              inventoryType: "out",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);

        //CALCULATE TOTAL

        const availabeBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);


          
        //PUSH DATA

        bloodgroupData.push({
          bloodgroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availabeBlood,
        });
      })
    );
console.log("yaha tak data gaya")
    return res.status(200).send({
     
      success: true,
      message: "Blood Group Data Fetch Successfully",
      bloodgroupData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error,
    });
  }
};

module.exports = { bloodGroupDetailsContoller };
