import express from 'express';
import { loginAdmin, registerAdmin, logoutAdmin } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.post('/register', registerAdmin);
adminRouter.post('/logout', logoutAdmin);

export default adminRouter;
