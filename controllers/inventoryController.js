const inventoryModal = require("../models/inventoryModal");
const userModels = require("../models/userModels");
// create inventory

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body; //->yaha pehle email tha donaEmail ki jagah
    //validation
  //  console.log("body respone is:- ", req.body);
    const user = await userModels.findOne({ email });
    console.log("body respone is:- ", user);
    if (!user) {
      throw new Error("User not found");
    }

    //console.log("body respone is:- ", req.body);
    // if(inventoryType==="in" && user.role!='donor')
    // {
    //     throw new Error("NOT POSSIBLE")
    // }

      // if (inventoryType === "out" && user.role != "hospital") {
      //   throw new Error("NOT POSSIBLE");
      // }

    const inventory = new inventoryModal(req.body);
    await inventory.save();
    //  throw new Error("fctt");
    // console.log("Inventory saved successfully:", inventory);
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    console.log("login data ",req.body);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory API",
      error,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModal
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all record successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all inventory API",
      error,
    });
  }
};

const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const donarid = await inventoryModal.distinct("donar", {
      organisation,
    });

    const donars = await userModels.find({ _id: { $in: donarid } });
    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Sucessfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const hospitalId = await inventoryModal.distinct("hospital", {
      organisation,
    });
    const hospitals = await userModels.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals data fetched succesfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get Hospital API",
      error,
    });
  }
};

const getOrganisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModal.distinct("organisation", { donar });
    const organisations = await userModels.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Sucessfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in ORG API",
      error,
    });
  }
};
module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganisationController,
};
