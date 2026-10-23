import { useQueryClient, useQueries, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { supabase } from "../utils";


interface QuoteProps {
    quotesQuery: any;
    charQuery: any;
    charSet: any;
    saveNewQueries: any;
}

interface QuoteProviderProps {
    children: ReactNode
}


const queryClient = new QueryClient();

const QuoteContext = createContext<QuoteProps | null >(null);

export const QuoteProvider = ({ children }: QuoteProviderProps) => {

    return (
        <QueryClientProvider client={queryClient}>
            <QP>{children}</QP>
        </QueryClientProvider>
    )

} 

const QP = ({ children }: QuoteProviderProps) => {

    const queryClient = useQueryClient();

    const getQuotes = async () => {

        const {data, error} = await supabase.rpc('get_quotes_json');

        if (error) throw error;

        return data;
    }

    const getChars = async () => {

        const { data, error } = await supabase.rpc('get_characters');

        if (error) throw error;

        return data;
    }

    const results = useQueries({
        queries: [
            {
                queryKey: ["quotes"],
                queryFn: getQuotes
            },
            {
                queryKey: ["characters"],
                queryFn: getChars
            }
        ]
    });

    const [quotesQuery, charQuery] = results;

    const saveNewQueries = async () => {
        return;
    }

    let charSet;

    if(charQuery) {
        charSet = new Set(charQuery.data);
    } 

    return (
        <QuoteContext.Provider value={{ quotesQuery, charQuery, charSet, saveNewQueries}}>
            {children}
        </QuoteContext.Provider>
    )
   
}

export function useQuoteContext(): QuoteProps {
    const context = useContext(QuoteContext);

    if (context === null) {
        
        throw new Error(
            "useQuoteContext must be used within QuoteProvider" + "\n\n" +Error.toString()
        );
    }

    return context;
}
