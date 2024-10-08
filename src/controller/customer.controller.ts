import { NextFunction, Request, Response } from "express";
import customerService from "../service/customer/customer.service";
import { GET_ACTIONS_LIST } from "../types/customer/customer.types";
import {ActionLog} from "../entity/action/ActionLog";

class CustomerController {

  public async changeFiatCurrencyDisplay(req: Request, res: Response, next: NextFunction): Promise<void>{
    let dto = { userId: req.params.userId, fiatName: req.params.fiatName }

		try {
      await customerService.changeFiatDisplay(dto)
      res.status(202).json({message: "Fiat name was changed."}).end()
    } catch (e) {
      next(e)
    }
  }

  public async getActionsLog(req: Request, res: Response, next: NextFunction): Promise<void>{

    let dto: GET_ACTIONS_LIST = {
    	userId: req.params.userId,
      skip: Number(req.params.skip),
      limit: Number(req.params.limit),
    }

    try {
      const result: ActionLog[] = await customerService.getActionsData(dto)
      res.status(200).json(result).end()
    } catch (e) {
      next(e)
    }
  }

  public async revokeAnAccess(req: Request, res: Response, next: NextFunction): Promise<void>{
		try {
			await customerService.revokeApiAccess(req.params.userId)
			res.status(202).json({message: "Access to an API was revoked."}).end()
		} catch (e) {
			next(e)
		}
  }

}

export default new CustomerController()