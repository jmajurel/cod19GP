import { route, GET, POST, before } from "awilix-express";
import ISpecialityService from "../services/interfaces/specialitySInterface";
import { Request, Response } from "express";
import bodyParser from "body-parser";

@route("/specialities")
export default class SpecialityAPI {
  private readonly _specialityService: ISpecialityService;
  constructor({
    specialityService,
  }: {
    specialityService: ISpecialityService;
  }) {
    this._specialityService = specialityService;
  }

  @GET()
  async getAll(req: Request, res: Response) {
    return res.status(200).json(await this._specialityService.getAll());
  }

  @POST()
  @before([bodyParser()])
  async insert(req: Request, res: Response) {
    return res.status(201).json(await this._specialityService.create(req.body));
  }
}
