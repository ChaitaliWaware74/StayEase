import Listing from "../models/Listing.js";

// CREATE
export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create({
      title: req.body.title,
      location: req.body.location,
      rent: req.body.rent,
      roomType: req.body.roomType,
      furnished: req.body.furnished,
      genderPreference: req.body.genderPreference,
      contactPhone: req.body.contactPhone,
      description: req.body.description,
      address: req.body.address,
      parking: req.body.parking === "true",
      electricityIncluded: req.body.electricityIncluded === "true",
      water24: req.body.water24 === "true",

      images: req.files?.map(file => file.path),
      userId: req.user.id
    });

    res.json(listing);
  } catch (err) {
    res.status(500).json({ msg: "Create failed" });
  }
};

// GET ALL
export const getListings = async (req, res) => {
  

  const {
    location,
    rent,
    roomType,
    furnished,
    genderPreference
  } = req.query;

  let filter = {};

  if (location)
    filter.location = { $regex: location, $options: "i" };

  if (rent)
    filter.rent = { $lte: Number(rent) };

  if (roomType)
    filter.roomType = roomType;

  if (furnished)
    filter.furnished = furnished;

  if (genderPreference)
    filter.genderPreference = genderPreference;

  

  const listings = await Listing.find(filter).sort({ createdAt: -1 });

  res.json(listings);
};

// GET SINGLE
export const getSingleListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.json(listing);
};

// DELETE
export const deleteListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

// UPDATE
export const updateListing = async (req, res) => {
  try {
    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        location: req.body.location,
        rent: req.body.rent,
        roomType: req.body.roomType,
        furnished: req.body.furnished,
        genderPreference: req.body.genderPreference,
        contactPhone: req.body.contactPhone,
        description: req.body.description,
        address: req.body.address,
        parking: req.body.parking === "true",
        electricityIncluded: req.body.electricityIncluded === "true",
        water24: req.body.water24 === "true",

        ...(req.files?.length > 0 && {
  images: req.files.map(file => file.path),
})
      },
      { returnDocument: "after" }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
};