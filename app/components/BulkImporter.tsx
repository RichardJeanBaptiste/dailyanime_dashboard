"use client"

import { useQuoteContext } from "./QuoteContext"

export default function BulkImporter() {

    const { charSet } = useQuoteContext();

    return (
        <div>
            <p onClick={() => console.log(charSet)}>Test</p>
        </div>
    )
}