import { Request, Response } from "express";
import { classToPlain } from "class-transformer";

import CreateAdminSecundaryService from "../../services/admin_secundary/CreateAdminSecundaryService";
import DeactivateAdminSecundaryService from "../../services/admin_secundary/DeactivateAdminSecundaryService";

class PassAdminSecundaryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { user_id } = request.params;
    const { passAdmin, passAdminSecundary } = request.body;

    const createAdminSecundary = new CreateAdminSecundaryService();

    const userAdminSercundary = await createAdminSecundary.execute({
      admin_id,
      user_id,
      passAdmin,
      passAdminSecundary,
    });

    return response.status(201).json(classToPlain(userAdminSercundary));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { user_id } = request.params;
    const { passAdmin } = request.body;

    const deactivateAdminSecundary = new DeactivateAdminSecundaryService();

    const userAdminSercundary = await deactivateAdminSecundary.execute({
      admin_id,
      user_id,
      passAdmin,
    });

    return response.status(201).json(classToPlain(userAdminSercundary));
  }
}

export default PassAdminSecundaryController;
