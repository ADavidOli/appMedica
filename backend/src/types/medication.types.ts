import { Types } from "mongoose";

export interface Medication {
    _id: Types.ObjectId;
    name : string,
    dosage : string,
    presentation : string,
    description : string,
    horario : string[],
    usuario : Types.ObjectId
}