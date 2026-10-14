"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils";
import BulkImporter from "../components/BulkImporter";
import { QuoteProvider } from "../components/QuoteContext";
// import { useCharacters } from "./lib";
//import BulkQuoteImporter from "./BulkQuoteImporter";
// import QuoteEditor from "./QuoteEditor";
// import CharacterEditor from "./CharacterEditor";

const TABS = [
  { id: "add", label: "Add quotes" },
  { id: "quotes", label: "Edit quotes" },
  { id: "characters", label: "Characters" },
];



function Workspace({ session }: {session: any}) {
     const router = useRouter();

  const [tab, setTab] = useState("add");
  // const { characters, error, reload } = useCharacters();

  const signOut = () => {
    supabase.auth.signOut();
    router.push("/");
}

  return (
    <QuoteProvider>
      <div className="min-h-screen bg-[#e9ecf2] font-['Zen_Kaku_Gothic_New',system-ui,sans-serif] text-[15px] leading-normal text-[#1c2033]">
        <div className="mx-auto max-w-7xl px-6 pb-12">
          <header className="flex flex-wrap items-center gap-x-8 gap-y-2 py-5">
            <h1 className="-skew-x-6 font-['Dela_Gothic_One',sans-serif] text-[26px] font-normal tracking-tight">
              Daily Anime
            </h1>

            <nav
              role="tablist"
              aria-label="Dashboard sections"
              className="order-3 flex w-full gap-1 overflow-x-auto md:order-none md:w-auto md:flex-1"
            >
              {TABS.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className={`h-11 shrink-0 cursor-pointer border-b-[3px] px-3.5 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4bff] ${
                      active
                        ? "border-[#2f4bff] text-[#1c2033]"
                        : "border-transparent text-[#636a80] hover:text-[#1c2033]"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-3 text-[#636a80]">
              <small className="text-[13px]">{session.user.email}</small>
              <button
                onClick={signOut }
                className="h-11 cursor-pointer whitespace-nowrap rounded-md border border-[#d3d8e3] bg-white px-4 text-sm font-medium text-[#1c2033] hover:border-[#1c2033] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4bff]"
              >
                Sign out
              </button>
            </div>
          </header>

          <main>
            {tab === "add" && <BulkImporter/>}
            {/* {tab === "quotes" && <QuoteEditor characters={characters} />} */}
            {/* {tab === "characters" && <CharacterEditor characters={characters} reload={reload} />} */}
          </main>
        </div>
      </div>
    </QuoteProvider>
  );
}

{/**Quote Editor / Character Editor */}

export default function Dashboard() {

    const router = useRouter();
    
    const [session, setSession] = useState<any | undefined>(undefined);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }: {data : any}) => setSession(data.session));
        
        const { data } = supabase.auth.onAuthStateChange((_e: any, s : any) => setSession(s));
        
        return () => data.subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (session === undefined) return;

        if (!session) {
            router.replace("/");
        }
    }, [session, router]);


    if (session === undefined || !session) {
        return null;
    }

  return <Workspace session={session} />;
}