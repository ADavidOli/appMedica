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
                .withMessage("Correo inválido")
                .normalizeEmail(),

            body("password")
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 0,
                })
                .withMessage("la contraseña debe tener al menos 8 caracteres, un numero, una mayuscula y una minuscula"),

            HandleValidationError
        ];
    }

    static get Login() {
        return [
            body("email")
                .isEmail()
                .withMessage("Correo inválido")
                .normalizeEmail(),

            body("password")
                .notEmpty()
                .withMessage("La contraseña no puede ir vacia"),

            HandleValidationError
        ]
    }
    static get email() {
        return [
            body("email")
                .isEmail()
                .withMessage("Correo inválido")
                .normalizeEmail(),
        ]
    }
}