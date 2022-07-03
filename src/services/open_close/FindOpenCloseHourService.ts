import { getRepository } from "typeorm";

import OpenCloseHourMenu from "../../models/OpenCloseHourMenu";

class FindOpenCloseHourService {
  public async execute(): Promise<OpenCloseHourMenu | undefined> {
    const openCloseRepository = getRepository(OpenCloseHourMenu);

    const findMenuOpenCloseHour = await openCloseRepository.findOne();

    return findMenuOpenCloseHour;
  }
}

export default FindOpenCloseHourService;
