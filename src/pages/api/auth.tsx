const client_id = "0063f86f7a194a6398730fe707b0965b";
const client_secret = "b8e1c43827a848188fd9b6e1936449da";
const redirect_uri = "http://localhost:3000";
import { NextApiRequest, NextApiResponse } from "next";

export default function getToken(req: NextApiRequest, res: NextApiResponse) {
  var code = req.query.code || null;

  let body = {
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  };

  try {
    let response = fetch("https://accounts.spotify.com/api/token", {
      headers: {
        Authorization: "Basic " + (client_id + ":" + client_secret),
      },
      body: JSON.stringify(body),
    });

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
}
