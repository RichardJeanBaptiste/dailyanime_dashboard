const genericInput = "w-[90%] border border-solid border-black mt-2";


export default function CharacterEditor(){

    const ImageCard = ({img_link}: {img_link : string}) =>{
        return (
            <div className="bg-blue-50 border border-solid border-red-100 w-[70%] h-[200]">
                <p>{img_link}</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 flex flex-row bg-cyan-50">
                <div className="flex-[0.3] border border-solid border-black">
                    <div className="flex flex-row">
                        <input placeholder="Search Character"/>
                        <button>Search</button>
                    </div>
                </div>
                <div className="flex-[0.7] h-screen overflow-y-scroll">

                    <div className="flex-1">
                        <div className="ml-3 w-[95%] flex-none" >
                            {/*************************************************  Header *****************************************************************/}
                            <div className="pb-8 ">
                                <h2 className="text-[32px]">{`Edit [Characer]`}</h2>
                                <p className="text-[14px]">char anime</p>

                                <div>
                                    <p>infomatic</p>
                                </div>
                                
                            </div>
                            
                            {/************************************************** Body *********************************************************************/}
                            <div>
                                <div className="flex flex-row pb-8 pt-8">
                                    <div className="w-1/2">
                                        <p>Name</p>
                                        <input className={`${genericInput} rounded-md p-2 focus:border-cyan-500`} type="text" placeholder="Itachi"/>
                                    </div>
                                    
                                    <div className="w-1/2">
                                        <p>Anime</p>
                                        <input className={`${genericInput} rounded-md p-2 focus:border-cyan-500`} type="text" placeholder="Naruto"/>
                                    </div>
                                </div>
                                
                                <div className="flex-none w-[100%]  pb-8">
                                    <p>Signature Quote</p>
                                    <input className={`${genericInput} rounded-md p-2 focus:border-cyan-500`} type="text" placeholder="random quote"/>
                                </div>
                                
                                <div className="flex-none w-[100%]  pb-8">
                                    <p>Biography</p>
                                    <textarea className={`${genericInput} rounded-md p-2 focus:border-cyan-500`} rows={4} placeholder="Character Biography"/>
                                </div>
                                
                                <div className="flex-1 pb-8">
                                    <p className="mb-2">Wiki Link</p>

                                    <div className="flex w-[95%] flex-row gap-2">
                                        <input
                                            placeholder="Wiki Link"
                                            className="min-w-0 flex-1 rounded border p-2"
                                        />
                                        <button className="shrink-0 rounded bg-cyan-600 px-4 py-2 text-white">
                                            Open
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex-none w-[100%] pb-8 gap-4">
                                    <p className="text-[24px]">Images</p>
                                    
                                    <div className="grid grid-cols-3 gap-4 mt-3 pb-8">
                                        <ImageCard img_link="Image 1"/>
                                        <ImageCard img_link="Image 2"/>
                                        <ImageCard img_link="Image 3"/>
                                        <ImageCard img_link="Image 4"/>
                                        <ImageCard img_link="Image 5"/>
                                        <ImageCard img_link="Image 6"/>
                                    </div>
                                    
                                    <div className="flex w-[95%] flex-row gap-2">
                                        <input className="min-w-0 flex-1 rounded border p-2" type="text" placeholder="Add Image Link"/>
                                        <button className="shrink-0 rounded bg-cyan-600 px-4 py-2 text-white" >Add Image</button>
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