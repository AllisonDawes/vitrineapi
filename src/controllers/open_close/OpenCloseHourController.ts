import { Request, Response } from "express";

import FindOpenCloseHourService from "../../services/open_close/FindOpenCloseHourService";
import OpenCloseHourService from "../../services/open_close/OpenCloseHourService";

class OpenCloseHourController {
  public async show(request: Request, response: Response): Promise<Response> {
    const findOpenCloseHourService = new FindOpenCloseHourService();

    const openCloseHour = await findOpenCloseHourService.execute();

    return response.status(200).json(openCloseHour);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { status, hour_open, hour_close } = request.body;

    const openCloseHourService = new OpenCloseHourService();

    const openCloseHour = await openCloseHourService.execute({
      admin_id,
      status,
      hour_open,
      hour_close,
    });

    return response.status(200).json(openCloseHour);
  }
}

export default OpenCloseHourController;
