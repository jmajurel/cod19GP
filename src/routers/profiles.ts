import { route, GET, POST, PUT, before } from "awilix-express";
import IDoctorService from "../services/interfaces/doctorSInterface";
import ISpecialityService from "../services/specialityService";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import DoctorAssembler from "./dto/doctorAssembler";
import checkJwt from "./auth";
import Speciality from "../models/speciality";

@route("/profiles")
export default class ProfileAPI {
  private readonly _doctorService: IDoctorService;
  private readonly _specialityService: ISpecialityService;
  private readonly _doctorAssembler: DoctorAssembler;
  constructor({
    doctorService,
    doctorAssembler,
    specialityService,
  }: {
    doctorService: IDoctorService;
    doctorAssembler: DoctorAssembler;
    specialityService: ISpecialityService;
  }) {
    this._doctorService = doctorService;
    this._doctorAssembler = doctorAssembler;
    this._specialityService = specialityService;
  }

  @POST()
  @before([checkJwt, bodyParser()])
  async insert(req: Request, res: Response) {
    return res.status(201).json(await this._doctorService.create(req.body));
  }

  @route("/:id")
  @GET()
  @before([checkJwt])
  async getById(req: Request, res: Response) {
    const foundDoctor = await this._doctorService.getById(req.params.id);
    const speciality = await this._specialityService.getById(
      foundDoctor.specialityId
    );
    res
      .status(200)
      .json(this._doctorAssembler.writeDTO(foundDoctor, speciality));
  }

  @route("/email/:email")
  @GET()
  @before([checkJwt])
  async getByEmail(req: Request, res: Response) {
    const foundDoctor = await this._doctorService.getByEmail(req.params.email);

    let speciality: Speciality;
    if (foundDoctor) {
      speciality = await this._specialityService.getById(
        foundDoctor.specialityId
      );
    }
    res
      .status(200)
      .json(this._doctorAssembler.writeDTO(foundDoctor, speciality));
  }

  @route("/:id")
  @PUT()
  @before([checkJwt, bodyParser()])
  async update(req: Request, res: Response) {
    await this._doctorService.update(req.params.id, req.body);
    res.status(204);
  }
}
