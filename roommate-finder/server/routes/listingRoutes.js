import express from "express";
import multer from "multer";
import {
  createListing,
  getListings,
  getSingleListing,
  deleteListing,
  updateListing   // ✅ ADD THIS
} from "../controllers/listingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.post("/", authMiddleware, upload.array("images"), createListing);
router.get("/", getListings);
router.get("/:id", getSingleListing);
router.delete("/:id", authMiddleware, deleteListing);
router.put("/:id", authMiddleware, upload.array("images"), updateListing);

export default router;