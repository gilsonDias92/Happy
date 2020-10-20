import express, { json, request } from "express";
import { getRepository } from "typeorm";
import Orphanage from "./models/Orphanage";
import "./database/connection";

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  if (request.body === {}) return response.json(request.body);
  else return response.json({ message: "ok" });
});

app.post("/orphanages", async (request, response) => {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = request.body;

  const orphanagesRepository = getRepository(Orphanage);

  const orphanage = orphanagesRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  });

  await orphanagesRepository.save(orphanage);

  return response.json({ message: "It worked" });
});

app.listen(3333);
