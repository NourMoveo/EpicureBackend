import express, { Router, Request, Response } from "express";


type ControllerType<T> = {
  create(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  getById(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  getFiltered?(req: Request, res: Response): void;
  getOpenNow?(req: Request, res: Response): void;
  groupByRating?(req: Request, res: Response): void;
  getPopular?(req: Request, res: Response): void;
  getNew?(req: Request, res: Response): void;
};

type RoutePrefix = 'restaurants' | 'chefs' | 'dishes';

const registerRoutes = <T>(controller: ControllerType<T>, routePrefix: RoutePrefix): Router => {
  const router = Router();

  router.post(`/${routePrefix}`, controller.create);
  router.get(`/${routePrefix}`, controller.getAll);
  router.get(`/${routePrefix}/:id`, controller.getById);
  router.put(`/${routePrefix}/:id`, controller.update);
  router.delete(`/${routePrefix}/:id`, controller.delete);

  return router;
};

export default registerRoutes;
