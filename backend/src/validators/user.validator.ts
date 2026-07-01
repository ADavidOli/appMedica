import { body } from "express-validator";
import { HandleValidationError } from "../middlewares/validation.middleware.js";

export class UserValidator {
    static get profile() {
        return [
            body('name').notEmpty().withMessage('el nombre no puede ir vacio'),
            body('email').isEmail().withMessage('correo invalido').normalizeEmail(),
            HandleValidationError
        ]
    }
    static get password() {
        return [
            body("password")
                .notEmpty()
                .withMessage("La contraseña no puede ir vacia"),

            body("newPassword")
                .isStrongPassword({
                    minLength:8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 0,
                })
                .withMessage("la contraseña debe tener al menos 8 caracteres, un numero, una mayuscula y una minuscula"),

            HandleValidationError
        ]
    }
}