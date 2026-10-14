"use client"

import { useQuoteContext } from "./QuoteContext"
import { useState } from 'react';
import Papa from 'papaparse';


/**
 *  TODO:
 *  
 *  - Remove any types with proper typing
 */

const SAMPLE = `quote,character,anime,episode
"People's lives don't end, when they die. It ends when they lose faith.",Itachi Uchiha,Naruto Shippuden,
"If you don't ta,ke risks, you can't crea,te a future.",Monkey D. Luffy,One Piece,`;

const alert = "#e8457a"
const success = "#1f9d6b"
const newItem = "#2f4bff"
const warning = "#b77d00"

const btnGhost = "inline-flex h-11 cursor-pointer items-center rounded-md border border-[#d3d8e3] bg-white px-4 text-sm font-medium hover:border-[#1c2033] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#2f4bff]";
const btnOutline = "h-11 cursor-pointer rounded-md border border-[#1c2033] bg-white px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-45";

export default function BulkImporter() {

    const { quotesQuery, charQuery, charSet, saveNewQueries } = useQuoteContext();

    const [raw, setRaw] = useState("");
    const [rows, setRows] = useState<any>([]);
    const [showPreview, setShowPreview] = useState(false);
    const [createMissing, setCreateMissing] = useState(true);
    const [busy, setBusy] = useState(false);
    const [notice, setNotice] = useState(null);


    function loadPreview () {
    const result = Papa.parse(raw, {
        header: true,
        skipEmptyLines: true,
    });

    

    result.data.map((x: any) => {
      if(!x.key) {
        x.key = crypto.randomUUID()
      }
      
    })

        setRows((prev: any) => [
            ...prev,
            ...result.data
        ]);

        // Append to the front of parse

        setShowPreview(true);
    }

    const update = (key: string, field: string, value: any) => setRows((rs: any) => rs.map((r: any) => (r.key === key ? { ...r, [field]: value } : r)));

    const remove = (key: string) => setRows((rs: any) => rs.filter((r: any) => r.key !== key));

    const checkQuote = (item: any) => {

        if(item.quote == "") {
        return alert
        } else if(item.character == "") {
            return warning
        } else {
        return success
        }
    };

    const checkChar = (item: any) => {
        if(item.character == "") {
            return alert
        } else {
            return success
        }
    };

    const checkAnime = (item: any) => {
        if(item.anime == "") {
        return alert
        } else {
        return success
        }
    };

    const handleSubmit = (e: any) => {

        window.alert("Saving new items to db");
        saveNewQueries();
        return;
    }



    return (
        <section className="flex flex-col gap-4 rounded-md border border-[#d3d8e3] bg-white p-6 text-[#1c2033]">
            <header>
                <h2 className="text-[22px] font-bold leading-snug">Add quotes</h2>
                <p className="mt-1 text-[#636a80]">Paste CSV or upload a file. Columns: quote, character, anime.</p>
            </header>

            <div className="flex flex-col gap-3">
                <textarea
                    value={raw}
                    onChange={(e) => setRaw(e.target.value)}
                    placeholder={SAMPLE}
                    rows={6}
                    spellCheck={false}
                    aria-label="Paste quotes"
                    className="w-full resize-y rounded-md border border-[#d3d8e3] px-3 py-2.5 font-mono text-[13px] leading-relaxed outline-none focus:border-[#2f4bff] focus:ring-2 focus:ring-[#2f4bff]/20"
                />

                <div className="flex flex-wrap items-center gap-2">
                    <label className={btnGhost}>
                        Upload file
                        <input type="file" accept=".csv,.tsv,.txt" className="sr-only" />
                    </label>
                    <button className={btnOutline} onClick={loadPreview} disabled={!raw.trim()}>
                        Preview rows
                    </button>
                </div>

                <div className="overflow-x-auto rounded-md border border-[#d3d8e3]">
                    <table className="w-full min-w-[760px] border-collapse">
                         <thead>
                            <tr className="bg-[#e9ecf2] text-left text-[13px] font-medium text-[#636a80]">
                            <th className="w-[45%] px-2.5 py-2 font-medium">Quote</th>
                            <th className="px-2.5 py-2 font-medium">Character</th>
                            <th className="px-2.5 py-2 font-medium">Anime</th>
                            <th className="w-44 px-2.5 py-2 font-medium">Check</th>
                            <th className="w-12"><span className="sr-only">Remove</span></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </section>
    )
}