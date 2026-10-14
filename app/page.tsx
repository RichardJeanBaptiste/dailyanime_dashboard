"use client"

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { supabase } from './utils';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuoteProvider } from './components/QuoteContext';


const queryClient = new QueryClient();

export default function Home() {

  const router = useRouter();

  useEffect(() => {

    const { data } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      console.log(event, session);

      if( event === 'SIGNED_IN') { 
        console.log("Signed In");
        router.push("/dashboard");
      } else {
        data.subscription.unsubscribe();
      }

    })
  },[]);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  }

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if(error) {
      if(error.message == "Invalid login credentials") {
        console.log(error.message);
        alert("Invalid Login Credentials")
      }
    } else {
      console.log(data)
      router.push("/dashboard");
    }
  }


  return (

        <QueryClientProvider client={queryClient}>        
          <QuoteProvider>
      
            <div className="flex min-h-screen items-center justify-center bg-[#e9ecf2] px-4 font-['Zen_Kaku_Gothic_New',system-ui,sans-serif] text-[#1c2033]">
              <form
                onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
                className="flex w-full max-w-[400px] flex-col gap-4 rounded-md border border-[#d3d8e3] bg-white p-8"
              >
                <h3 className="-skew-x-6 font-['Dela_Gothic_One',sans-serif] text-[34px] leading-tight">
                  Daily Anime
                </h3>
                <p className="text-[#636a80]">Sign in with an admin account to manage quotes.</p>

                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Email
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleEmail}
                    className="h-11 rounded-md border border-[#d3d8e3] px-3 text-[15px] font-normal outline-none focus:border-[#2f4bff] focus:ring-2 focus:ring-[#2f4bff]/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Password
                  <input
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handlePassword}
                    className="h-11 rounded-md border border-[#d3d8e3] px-3 text-[15px] font-normal outline-none focus:border-[#2f4bff] focus:ring-2 focus:ring-[#2f4bff]/20"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-1 h-11 cursor-pointer rounded-md bg-[#2f4bff] text-sm font-medium text-white hover:bg-[#1f35c9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4bff]"
                >
                  Sign in
                </button>
              </form>
            </div>
          </QuoteProvider>
        </QueryClientProvider>
  );
}

/**
 *  <div className="">
      <h3 className='login_text'>Login Page</h3>
      <input type="text" placeholder="username" onChange={handleEmail}/>
      <input type="text" placeholder="password" onChange={handlePassword}/>
      <button onClick={handleLogin}>Login</button>
    </div>
 * 
 * 
 */