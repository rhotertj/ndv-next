export default async function Player({
    params,
  }: {
    params: {
      humanID: string
    };
  }) {
    const humanID = decodeURIComponent(params.humanID)
    // fetch all player identities
    // for these player identites, find last games, ratings
    return(
       <main className="container flex justify-center mx-auto">
        <div className="">
        <div>
            <h1 className="flex justify-center mt-[100px] text-4xl lg:text-9xl font-bold antialiased">
                <span className="italic font-black">NDV</span>Rankings
            </h1>
        </div>
        {/* dont completely center, more to the left would be nice */}
        <div className="flex mt-12">
            {/* <div className="avatar">
                <div className="w-24 mask mask-hexagon">
                    <img src="https://www.absoluteanime.com/avatar_the_last_airbender/aang[2].jpg" />
                </div>
            </div> */}
            <div className="flex flex-col">
                <p className="text-4xl mb-6">Mämmäd Gulijev</p>
                {/* badges here */}
            </div>
            
        </div>
        <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Rankings</h2>
        <div className="flex">
            <div className="card max-w-fit border-primary border-dotted shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl flex justify-center">34.3</h2>
                    <p className="mx-4">Kreisliga 5, Dart Akademie Hannover</p>
                </div>
            </div>
            <div className="card max-w-fit border-primary border-dotted shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl flex justify-center">14.3</h2>
                    <p className="mx-4">Kreisliga 1, Dart Akademie Hannover</p>
                </div>
            </div>
        </div>
        <h2 className="text-2xl font-bold mt-6">Letzte Spiele</h2>    
        </div>
        </div>
       </main>
    )
  };