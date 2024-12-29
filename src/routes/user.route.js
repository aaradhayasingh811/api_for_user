import {Router} from "express"

const router = Router();
import {upload} from "../middlewares/multer.middleware.js"

// imports
import { registerController } from "../controllers/register.controller.js";
import {loginController} from "../controllers/login.controllers.js"
import {changePassword} from "../controllers/changepassword.controller.js"
import {updateProfileDetails} from "../controllers/updateProfile.controller.js"
import {setAvatar} from "../controllers/setavatar.controller.js"

// Route for registering the user
router.route("/register").post(upload.fields([{name:"avatar",maxCount:1}]),registerController);
router.route('/login').post(loginController);
router.route('/set-password').post(changePassword);
router.route('/update-details').post(updateProfileDetails);
router.route('/:id/update-profile').post(setAvatar);


export {router}