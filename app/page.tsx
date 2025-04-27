
import QuotesList from "@/components/QuotesList";


async function fetchQuotes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/quotes`, { cache: "no-store" });
  const data = await res.json();
  return data;
}

const QuotesPage = async () => {

  const initialQuotes = await fetchQuotes();

  return (
    <main className="flex min-h-[85%] flex-col items-center justify-between pt-16 md:pt-24 py-2">
      <QuotesList initialQuotes={initialQuotes} />
    </main>
  )
 
};

export default QuotesPage;


