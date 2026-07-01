import bcrypt from "bcrypt";
// agregando clase password
export class Bcrypt {
    // agregando metodo hash para poder hashear el password
    static async hash(password: string) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt)
    };

    static async check(password: string, hash: string){
          return await bcrypt.compare(password, hash);
    }
}
