import { Request, Response } from "express";
import fetch from "node-fetch";

// [GET] /search
export const index = async (req: Request, res: Response) => {
  const query = (req.query.q as string) || "";

  try {
    // Construct the full URL for the internal API call
    const apiUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/search?q=${encodeURIComponent(query)}`;
    const apiResponse = await fetch(apiUrl);
    const results = await apiResponse.json();

    res.render("pages/search/index", {
      title: `Search results for "${query}"`,
      query: query,
      songs: results.songs || [],
      artists: results.artists || [],
      topics: results.topics || [],
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};
