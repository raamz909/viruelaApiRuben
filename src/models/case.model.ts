import { Schema, model, Document } from 'mongoose';

interface ICase extends Document {
  lat: number;
  lng: number;
  isSent: boolean;
  genre: string;
  age: number;
  symptoms: string;  // Campo para los síntomas
  creationDate: Date;
}

const caseSchema = new Schema<ICase>({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  isSent: { type: Boolean, required: true, default: false },
  genre: { type: String, required: true },
  age: { type: Number, required: true },
  symptoms: { type: String, required: true },  // Definimos los síntomas como un string obligatorio
  creationDate: { type: Date, default: Date.now }
});

const CaseModel = model<ICase>('Case', caseSchema);

export default CaseModel;