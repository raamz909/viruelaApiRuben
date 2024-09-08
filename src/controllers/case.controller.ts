import { Request, Response } from 'express';
import CaseModel from '../models/case.model';
import { sendEmail } from '../services/email.service';

// Crear un nuevo caso
export const createCase = async (req: Request, res: Response) => {
    try {
      const { lat, lng, genre, age, symptoms } = req.body;
  
      // Crear el nuevo caso con isSent: false para que el cron job lo detecte después
      const newCase = new CaseModel({
        lat,
        lng,
        genre,
        age,
        symptoms,
        isSent: false  // Dejar que el cron job maneje el envío del correo
      });
  
      // Guardar el nuevo caso en la base de datos
      const savedCase = await newCase.save();
  
      res.status(201).json(savedCase);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el caso', error });
    }
  };

// Obtener todos los casos
export const getAllCases = async (req: Request, res: Response) => {
  try {
    const cases = await CaseModel.find();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los casos', error });
  }
};

// Obtener casos de la última semana
export const getRecentCases = async (req: Request, res: Response) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentCases = await CaseModel.find({ creationDate: { $gte: oneWeekAgo } });
    res.status(200).json(recentCases);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los casos recientes', error });
  }
};

// Actualizar un caso
export const updateCase = async (req: Request, res: Response) => {
  try {
    const caseId = req.params.id;
    const updatedCase = await CaseModel.findByIdAndUpdate(caseId, req.body, { new: true });
    
    if (!updatedCase) {
      return res.status(404).json({ message: 'Caso no encontrado' });
    }

    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el caso', error });
  }
};

// Eliminar un caso
export const deleteCase = async (req: Request, res: Response) => {
  try {
    const caseId = req.params.id;
    const deletedCase = await CaseModel.findByIdAndDelete(caseId);

    if (!deletedCase) {
      return res.status(404).json({ message: 'Caso no encontrado' });
    }

    res.status(200).json({ message: 'Caso eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el caso', error });
  }
};