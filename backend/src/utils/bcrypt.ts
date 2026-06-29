import bcrypt from "bcrypt";
// agregando clase password
export class password {
    // agregando metodo hash para poder hashear el password
    static async hash(password: string) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt)
    };
}
