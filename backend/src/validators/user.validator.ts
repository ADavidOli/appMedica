import { body } from "express-validator";
import { HandleValidationError } from "../middlewares/validation.middleware.js";

export class UserValidator {
    static get profile(){
        return [
            body('name').notEmpty().withMessage('el nombre no puede ir vacio'),
            body('email').isEmail().withMessage('correo invalido').normalizeEmail(),
            HandleValidationError
        ]
    }
}