import axios from "axios";

export const saveScore = async (
  score: number
) => {
  return axios.post(
    "http://localhost:3000/api/scores",
    {
      score
    }
  );
};