import { body } from "express-validator";
import { HandleValidationError } from "../middlewares/validation.middleware.js";

export class AuthValidator {
    static get register() {
        return [
            body("name")
                .notEmpty()
                .withMessage("El nombre es obligatorio"),

            body("email")
                .isEmail()
                .withMessage("Correo inválido"),

            body("password")
                .isLength({ min: 8 })
                .withMessage("La contraseña debe tener al menos 8 caracteres"),

            HandleValidationError
        ];
    }

    static get Login() {
        return [        
            body("email")
                .isEmail()
                .withMessage("Correo inválido"),

            body("password")
                .notEmpty()
                .withMessage("La contraseña no puede ir vacia"),

            HandleValidationError
        ]
    }
}