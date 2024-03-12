import express, { Router, Request, Response } from "express";


type ControllerType<T> = {
  create(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  getById(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
};

type RoutePrefix = 'restaurants' | 'chefs' | 'dishes';

const registerRoutes = <T>(controller: ControllerType<T>, routePrefix: RoutePrefix): Router => {
  const router = Router();

  router.post(`/${routePrefix}`, controller.create);
  router.get(`/${routePrefix}`, controller.getAll);
  router.put(`/${routePrefix}/:id`, controller.update);
  router.delete(`/${routePrefix}/:id`, controller.delete);
  router.get(`/${routePrefix}/:id`, controller.getById);
  return router;
};

export default registerRoutes;
