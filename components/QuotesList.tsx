"use client"

import { useState,useContext } from "react"
import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";



type Quote = {
  quote: string;
  author: string;
};

type QuotesListProps = {
  initialQuotes: Quote[];
};

const QuotesList = ({ initialQuotes }: QuotesListProps) => {
  
      const { user } = useContext(AuthContext);
    const router = useRouter();
  
    if (!user) {
      return router.push("/login");
    }
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  const handleClearAll = () => {
    setQuotes([]);
  };

  const handleRemoveQuote = (indexToRemove: number) => {
    setQuotes(prevQuotes => prevQuotes.filter((_, index) => index !== indexToRemove));
  };


  const fetchSingleQuote = async () => {
    try {
      const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_API_KEY!,
        },
      });
  
      const data = await res.json();
      // const singleQuote = Array.isArray(data) ? data[0] : data;
      // console.log(data.quote);
      setQuotes(prevQuotes => [...prevQuotes, ...data]);
    } catch (error) {
      console.error("Failed to fetch single quote", error);
    }
  };
  

  const RenderedQuotes = quotes.map((quote, index) => (
    <div key={index} className="flex justify-between items-center mb-10">
      <div className="flex justify-start items-start gap-5 ">
        <div className="p-5 border w-[60px] rounded-lg">
          <Image src="/quotation.png" alt="Quote icon" width={50} height={50}/>
        </div>
        <div className="-mt-1 w-[80%]">
          <h2 className="text-md font-bold text-gray-100">Quote</h2>
          <p className="text-sm text-gray-300">{quote.quote}</p>
          <p className="text-gray-500 italic">"{quote.author}"</p>
        </div>
      </div>
      <div
        className="w-[40px] h-[40px] p-1 rounded-full flex-shrink-0 cursor-pointer"
        onClick={() => handleRemoveQuote(index)}
      >
        <Image src={'/cross.png'} width={35} height={35} alt="cross icon"/>
      </div>
    </div>
  ));

  return (
    <div className="w-[70%] max-w-[1300px] relative">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-3xl font-bold">My Quotes</h1>
        {quotes.length>0?<button className="text-sm py-2 px-4 rounded-full border" onClick={handleClearAll}>
          Clear All Quotes
        </button>:""}
      </div>

      {quotes.length > 0 ? (
        RenderedQuotes
      ) : (
        <p className="text-gray-500">QuoteVault is Empty. Fetch a Quote Now!</p>
      )}

      <button
        className="absolute right-0 mt-5 py-2 px-4 rounded-full border"
        onClick={fetchSingleQuote}
      >
        Fetch Quote
      </button>
    </div>
  );
};

export default QuotesList;
