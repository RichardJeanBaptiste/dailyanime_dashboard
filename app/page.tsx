"use client"

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { supabase } from './utils';

export default function Home() {


  const router = useRouter();

  useEffect(() => {

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
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
    <div className="">
        <h3 className='login_text'>Login Page</h3>
        <input type="text" placeholder="username" onChange={handleEmail}/>
        <input type="text" placeholder="password" onChange={handlePassword}/>
        <button onClick={handleLogin}>Login</button>
    </div>
  );
}
