"use client";

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type Quote = {
  id: string;
  quote: string;
  author: string;
};

type QuotesListProps = {
  initialQuotes: Quote[];
};

const QuotesList = ({ initialQuotes }: QuotesListProps) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleClearAll = () => {
    setQuotes([]);
  };

  const handleRemoveQuote = (idToRemove: string) => {
    setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== idToRemove));
  };

  const fetchSingleQuote = async () => {
    try {
      const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        method: "GET",
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_API_KEY!,
        },
      });

      const data = await res.json();
      setQuotes(prevQuotes => [
        ...prevQuotes,
        ...data.map((quote: any) => ({
          id: quote.id || crypto.randomUUID(),
          quote: quote.quote,
          author: quote.author,
        })),
      ]);
    } catch (error) {
      console.error("Failed to fetch single quote", error);
    }
  };

  return (
    <div className="w-[90%] md:w-[70%] max-w-[1300px] relative">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-3xl font-bold">My Quotes</h1>
        {quotes.length > 0 ? (
          <motion.button
            className="text-sm py-2 px-4 rounded-full border"
            onClick={handleClearAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            Clear All Quotes
          </motion.button>
        ) : (
          ""
        )}
      </div>

      
      <AnimatePresence>
        {quotes.length > 0 ? (
          quotes.map((quote) => (
            <motion.div
              key={quote.id}
              className="flex justify-between items-center mb-10"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-start items-start gap-5 ">
                <div className="p-5 border w-[60px] rounded-lg">
                  <Image src="/quotation.png" alt="Quote icon" width={50} height={50} />
                </div>
                <div className="-mt-1 w-[80%]">
                  <h2 className="text-md font-bold text-gray-100">Quote</h2>
                  <p className="text-sm text-gray-300">{quote.quote}</p>
                  <p className="text-gray-500 italic">&quot;{quote.author}&quot;</p>
                </div>
              </div>
              <motion.div
                className="w-[40px] h-[40px] p-1 rounded-full flex-shrink-0 cursor-pointer"
                onClick={() => handleRemoveQuote(quote.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image src="/cross.png" width={35} height={35} alt="cross icon" />
              </motion.div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">QuoteVault is Empty. Fetch a Quote Now!</p>
        )}
      </AnimatePresence>

      <motion.button
        className="absolute right-0 mt-5 py-2 px-4 rounded-full border"
        onClick={fetchSingleQuote}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        Fetch Quote
      </motion.button>
    </div>
  );
};

export default QuotesList;




// "use client";

// import { useState, useContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import AuthContext from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// type Quote = {
//   id: string;
//   quote: string;
//   author: string;
// };

// type QuotesListProps = {
//   initialQuotes: Quote[];
// };

// const QuotesList = ({ initialQuotes }: QuotesListProps) => {
//   const { user } = useContext(AuthContext);
//   const router = useRouter();

//   const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

//   if (!user) {
//     router.push("/login");
//     return null;
//   }

//   const handleClearAll = () => {
//     setQuotes([]);
//   };

//   const handleRemoveQuote = (idToRemove: string) => {
//     setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== idToRemove));
//   };

//   const fetchSingleQuote = async () => {
//     try {
//       const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
//         method: "GET",
//         headers: {
//           "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_API_KEY!,
//         },
//       });

//       const data = await res.json();
//       setQuotes((prevQuotes) => [
//         ...prevQuotes,
//         ...data.map((quote: any) => ({
//           id: quote.id || crypto.randomUUID(),
//           quote: quote.quote,
//           author: quote.author,
//         })),
//       ]);
//     } catch (error) {
//       console.error("Failed to fetch single quote", error);
//     }
//   };

//   return (
//     <div className="w-[90%] md:w-[70%] max-w-[1300px] relative mx-auto">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 gap-4">
//         <h1 className="text-2xl md:text-3xl font-bold">My Quotes</h1>
//         {quotes.length > 0 && (
//           <motion.button
//             className="text-xs md:text-sm py-2 px-4 rounded-full border"
//             onClick={handleClearAll}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ duration: 0.1 }}
//           >
//             Clear All Quotes
//           </motion.button>
//         )}
//       </div>

//       <AnimatePresence>
//         {quotes.length > 0 ? (
//           quotes.map((quote) => (
//             <motion.div
//               key={quote.id}
//               className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-10 gap-5"
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -100 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="flex items-start gap-4 w-full">
//                 <div className="p-3 md:p-5 border rounded-lg flex-shrink-0">
//                   <Image src="/quotation.png" alt="Quote icon" width={40} height={40} className="md:w-[50px] md:h-[50px]" />
//                 </div>
//                 <div className="w-full">
//                   <h2 className="text-sm md:text-md font-bold text-gray-100 mb-1">Quote</h2>
//                   <p className="text-sm text-gray-300">{quote.quote}</p>
//                   <p className="text-xs md:text-sm text-gray-500 italic mt-1">&quot;{quote.author}&quot;</p>
//                 </div>
//               </div>
//               <motion.div
//                 className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] p-1 rounded-full flex-shrink-0 cursor-pointer self-end md:self-center"
//                 onClick={() => handleRemoveQuote(quote.id)}
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Image src="/cross.png" width={30} height={30} alt="cross icon" />
//               </motion.div>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center mt-5">QuoteVault is Empty. Fetch a Quote Now!</p>
//         )}
//       </AnimatePresence>

//       <motion.button
//         className="block mx-auto md:absolute md:right-0 mt-5 py-2 px-4 rounded-full border"
//         onClick={fetchSingleQuote}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         transition={{ duration: 0.1 }}
//       >
//         Fetch Quote
//       </motion.button>
//     </div>
//   );
// };

// export default QuotesList;
