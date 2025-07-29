import { Router } from "express";
import { UserDetails } from "../controllers/user.controllers.js";
import {
  verifyJWT_email,
  verifyJWT_username,
} from "../middlewares/verifyJWT.middleware.js";
import {
  UnRegisteredUserDetails,
  saveRegUnRegisteredUser,
  saveEduUnRegisteredUser,
  saveAddUnRegisteredUser,
  registerUser,
  userDetailsWithoutID,
  saveRegRegisteredUser,
  saveEduRegisteredUser,
  saveAddRegisteredUser,
  uploadPic,
  discoverUsers,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/unregistered/getDetails")
  .get(verifyJWT_email, UnRegisteredUserDetails);
router
  .route("/unregistered/saveRegDetails")
  .post(verifyJWT_email, saveRegUnRegisteredUser);
router
  .route("/unregistered/saveEduDetail")
  .post(verifyJWT_email, saveEduUnRegisteredUser);
router
  .route("/unregistered/saveAddDetail")
  .post(verifyJWT_email, saveAddUnRegisteredUser);
router.route("/registerUser").post(verifyJWT_email, registerUser);

router
  .route("/registered/saveRegDetails")
  .post(verifyJWT_username, saveRegRegisteredUser);
router
  .route("/registered/saveEduDetail")
  .post(verifyJWT_username, saveEduRegisteredUser);
router
  .route("/registered/saveAddDetail")
  .post(verifyJWT_username, saveAddRegisteredUser);

router
  .route("/uploadPicture")
  .post(
    verifyJWT_username,
    upload.fields([{ name: "picture", maxCount: 1 }]),
    uploadPic
  );

router
  .route("/registered/getDetails/:username")
  .get(verifyJWT_username, UserDetails);
router
  .route("/registered/getDetails")
  .get(verifyJWT_username, userDetailsWithoutID);

router.route("/discover").get(verifyJWT_username, discoverUsers);


export default router;
