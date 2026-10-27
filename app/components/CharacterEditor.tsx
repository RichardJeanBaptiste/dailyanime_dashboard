import { useState, useEffect } from 'react';
import { useQuoteContext } from "./QuoteContext";
import Link from 'next/link';
import Image from 'next/image';


interface Character {
    id: number,
    name: string,
    anime: string,
    biography?: string,
    wiki?: string,
    img_links?: Array<string>
}

interface ImageCardProps {
    img_link: string,
    name: string,
    removeImage: any,
}

const genericInput = "w-[90%] border border-solid border-black mt-2";


const emptyCharacter = {
    id: -1,
    name: 'loading',
    anime: 'loading',
    biography: '',
    wiki: '',
    img_links: [],
}

const ImageCard = ({img_link, name, removeImage}: ImageCardProps) =>{


    const isValidUrl = (url: string) => {
        try {
            const parsedUrl = new URL(url);

            return ["https:", "http:"].includes(parsedUrl.protocol);
        } catch {
            return false;
        }
    }

    return (
        <div className="relative bg-blue-50 border border-solid border-red-100 w-[70%] h-[200px]">
            
            <button
                className = "absolute top-2 left-2 z-10 rounded bg-red-600 px-3 py-1 text-white shadow hover:bg-red-700" 
                onClick={() => removeImage(img_link)}
            >
                remove
            </button>

            <a
                className = "absolute top-2 right-2 z-10 rounded bg-blue-600 px-3 py-1 text-white shadow hover:bg-blue-700"
                href={img_link}
                target="_blank" rel="noopener noreferrer"
            >
                Open
            </a>
            
            {isValidUrl(img_link) ? 
                <Image
                    src={img_link}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    alt={`Picture of ${name}`} 
                />
                :
                <p>Image cant load</p>
            }
            
        </div>
    )
}

export default function CharacterEditor(){

    const { charQuery } = useQuoteContext();

    const [ currentChar, setCurrentChar ] = useState<Character>(emptyCharacter);
    const [ addImgLink, setAddImgLink ] = useState<string>("");


    const first = charQuery?.data?.[0];

    useEffect(() => {
        if (first) setCurrentChar(first);
    }, [first?.id]); 

    
    const handleCharInput = ({val, e}: {val: string, e: any}) => {
        
        setCurrentChar((prev) => ({
            ...prev,
            [val]: e.target.value,
        }));
    }

    const removeImage = (img_link: string) => {
        setCurrentChar((prev) => ({
            ...prev,
            img_links: prev.img_links?.filter((x) => x !== img_link),
        }));
    };

    const handleImgInput = (e: any) => {
        setAddImgLink((prev) => e.target.value);
    }

    const handleAddImgLink = (img_link: string) => {

        setCurrentChar((prev) => ({
            ...prev,
            img_links: [...(prev.img_links ?? []), img_link],
        }));

        setAddImgLink("");
    };

    

    const CharItem = ({char}: {char: Character}) => {

        return (
            <div className='flex flex-row mt-2'>
                
                {/** <p> Image </p> */}
                <p onClick={() => setCurrentChar(char)}>{char.name}</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen">

            <div className="flex-1 flex flex-row bg-cyan-50">

                {/**********************************************************   Side Nav **************************************************/}
                <div className="flex-[0.3] h-screen border border-solid border-black bg-pink-50 flex flex-col">
                    {/* Search bar */}
                    <div className="flex flex-row shrink-0">
                        <input
                            className={`${genericInput} rounded-md p-2 focus:border-cyan-500`}
                            placeholder="Search Character"
                        />
                        <button>Search</button>
                    </div>

                    {/* Scrollable character list */}
                    <div className="mt-5 flex-1 min-h-0 overflow-y-auto pb-4">
                        {charQuery?.data?.map((x: Character, index: number) => (
                            <CharItem char={x} key={index} />
                        ))}
                    </div>
                </div>


                {/********************************************************** Body ***********************************************************/}
                <div className="flex-[0.7] h-screen overflow-y-scroll">

                    <div className="flex-1">
                        <div className="ml-3 w-[95%] flex-none" >
                            {/*************************************************  Header ******************************************************/}
                            <div className="pb-8 ">
                                <h2 className="text-[32px]">{`Edit ${currentChar.name}`}</h2>
                                <p className="text-[14px]">{currentChar.anime}</p>

                                <div>
                                    <p>infomatic</p>
                                </div>
                                
                            </div>
                            
                            {/************************************************** Body *********************************************************************/}
                            <div>
                                <div className="flex flex-row pb-8 pt-8">
                                    <div className="w-1/2">
                                        <p>Name</p>
                                        <input className={`${genericInput} rounded-md p-2 focus:border-cyan-500`} type="text" placeholder={currentChar.name} value={currentChar.name} onChange={(e) => handleCharInput({ val: "name", e })}/>
                                    </div>
                                    
                                    <div className="w-1/2">
                                        <p>Anime</p>
                                        <input className={`${genericInput} rounded-md p-2 focus:border-cyan-500`} type="text" placeholder={currentChar.anime} value={currentChar.anime} onChange={(e) => handleCharInput({ val: "anime", e })}/>
                                    </div>
                                </div>
                                
                                <div className="flex-none w-[100%]  pb-8">
                                    <p>Biography</p>
                                    <textarea className={`${genericInput} rounded-md p-2 focus:border-cyan-500`} rows={4} placeholder={currentChar.biography} value={currentChar.biography} onChange={(e) => handleCharInput({ val: "biography", e })}/>
                                </div>
                                
                                <div className="flex-1 pb-8">
                                    <p className="mb-2">Wiki Link</p>

                                    <div className="flex w-[95%] flex-row gap-2">
                                        <input
                                            placeholder={currentChar.wiki}
                                            value={currentChar.wiki}
                                            onChange={(e) => handleCharInput({ val: "wiki", e })}
                                            className="min-w-0 flex-1 rounded border p-2"
                                        />
                                        <a
                                            className="shrink-0 rounded bg-cyan-600 px-4 py-2 text-white"
                                            href={`${currentChar.wiki}`} 
                                            target="_blank" rel="noopener noreferrer" 
                                        >
                                            Open
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex-none w-[100%] pb-8 gap-4">
                                    <p className="text-[24px]">Images</p>
                                    
                                    <div className="grid grid-cols-3 gap-4 mt-3 pb-8">
                                        
                                        {currentChar?.img_links?.map((x, index) => {
                                            return (
                                                <ImageCard img_link={`${x}`} name={currentChar.name} removeImage={removeImage} key={x}/>
                                            )
                                        })}
                                    </div>
                                    
                                    <div className="flex w-[95%] flex-row gap-2">
                                        <input className="min-w-0 flex-1 rounded border p-2" type="text" placeholder="Add Image Link" onChange={(e) => handleImgInput(e)} value={addImgLink}/>
                                        <button className="shrink-0 rounded bg-cyan-600 px-4 py-2 text-white" onClick={() => handleAddImgLink(addImgLink)}>Add Image</button>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="flex flex-row w-[100%] gap-[20] pb-8">
                                <p>Delete Character</p>
                                <p>Save Character</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}