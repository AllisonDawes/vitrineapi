import { Request, Response } from "express";
import { classToPlain } from "class-transformer";

import CreatePasswordAdminService from "../../services/admin/CreatePasswordAdminService";
import DeactivateAccountAdminService from "../../services/admin/DeactivateAccountAdminService";
import UpdatePasswordAdminService from "../../services/admin/UpdatePasswordAdminService";

class PasswordAdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { password, admin_password } = request.body;

    const createPasswordAdmin = new CreatePasswordAdminService();

    const passwordAdmin = await createPasswordAdmin.execute({
      user_id,
      password,
      admin_password,
    });

    return response.status(201).json(classToPlain(passwordAdmin));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { password, admin_password } = request.body;

    const deactivateAccountAdmin = new DeactivateAccountAdminService();

    const deactiveAccount = await deactivateAccountAdmin.execute({
      user_id,
      password,
      admin_password,
    });

    return response.status(200).json(classToPlain(deactiveAccount));
  }

  public async patch(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { password, admin_password, newPassAdmin } = request.body;

    const updatePasswordAdmin = new UpdatePasswordAdminService();

    const deactiveAccount = await updatePasswordAdmin.execute({
      user_id,
      password,
      admin_password,
      newPassAdmin,
    });

    return response.status(200).json(classToPlain(deactiveAccount));
  }
}

export default PasswordAdminController;
