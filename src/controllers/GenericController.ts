import { Request, Response } from "express";
import { Document, Model } from "mongoose";
import GenericService from "../services/GenericService";

class GenericController<T extends Document> {
  protected service: GenericService<T>;

  constructor(model: Model<T>) {
    this.service = new GenericService(model);
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const newItem = await this.service.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.service.getAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = req.params.id;
      const item = await this.service.getById(itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = req.params.id;
      const updatedItem = await this.service.update(itemId, req.body);
      if (!updatedItem) {
        res.status(404).json({ error: "Item not found" });
        return;
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = req.params.id;
      await this.service.delete(itemId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default GenericController;
