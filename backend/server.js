import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("I'm working!");
});

app.get("/artists", async (req, res) => {
  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);
  res.send(artists);
});

app.post("/artists", async (req, res) => {
  const newArtist = req.body;
  newArtist.id = new Date().getTime();

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);

  artists.push(newArtist);
  console.log(newArtist);

  fs.writeFile("artists.json", JSON.stringify(artists, null, 2));

  res.json(artists);
});

app.put("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);

  let artistToUpdate = artists.find((artist) => artist.id === id);
  const body = req.body;
  artistToUpdate.favorite = body.favorite;
  artistToUpdate.name = body.name;
  artistToUpdate.birthdate = body.birthdate;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.genres = body.genres;
  artistToUpdate.labels = body.labelse;
  artistToUpdate.website = body.website;
  artistToUpdate.image = body.image;
  artistToUpdate.shortDescription = body.shortDescription;

  fs.writeFile("artists.json", JSON.stringify(artists, null, 2));
  res.json(artists);
});

app.delete("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);

  const newArtist = artists.filter((artist) => artist.id !== id);
  fs.writeFile("artists.json", JSON.stringify(newArtist));
  res.json(artists);
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
