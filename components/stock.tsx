import { useEffect, useState } from "react";

export default function Home() {
  const [stock, setStock] = useState<any>();

  useEffect(() => {
    async function GetStock() {
      const Symbols = [
        "AAPL",
        "AMZN",
        "GOOGL",
        "MSFT",
        "NVDA",
        "META",
        "NFLX",
        "TSLA",
        "%5EGSPC",
        "SPY",
      ];
      // loop through symbols and create a string of all symboles ?symbol=AAPL&symbol=AMZN&symbol=GOOGL&symbol=MSFT
      // sort symbols alphabetically
      // const symbols = Symbols.sort().join("&symbol=");
      const symbols = Symbols.map((symbol) => `symbol=${symbol}`).join("&");
      // console.log(symbols);
      const response = await fetch(`/api/quote?${symbols}`);
      const data = await response.json();
      setStock(data);
    }
    GetStock();
  }, []);

  return (
    <div>
      {stock &&
        Object.keys(stock).map((key: string, index: any) => (
          <div key={index}>
            <div className="flex justify-between">
              <a
                href={`https://ca.finance.yahoo.com/quote/${key}`}
                className="font-bold hover:underline hover:text-gray-300"
              >
                {key}
              </a>
              {/* if regularMarketPrica > regularMarketOpen, set color to green */}
              {stock[key].price.regularMarketPrice > stock[key].price.regularMarketOpen ? (
                <span className="text-green-500">
                  {stock[key].price.regularMarketPrice}
                </span>
              ) : (
                <span className="text-red-500">
                  {stock[key].price.regularMarketPrice}
                </span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
