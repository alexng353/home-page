import yahooFinance from "yahoo-finance";

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;
  if (!symbol) {
    res.status(400).json({ msg: "Missing symbol" });
    return;
  }

  // check type of symbol if its a list
  if (Array.isArray(symbol)) {
    yahooFinance
      .quote({
        symbols: symbol,
        modules: ["price"],
      })
      .then((quotes: any) => {
        res.status(200).json(quotes);
      });
  } else {
    yahooFinance
      .quote({
        symbol: symbol,
        modules: ["price"],
      })
      .then((data: any) => {
        res.status(200).json(data);
      })
      .catch((err: { message: any }) => {
        res.status(500).json({ error: err.message });
      });
  }
}
