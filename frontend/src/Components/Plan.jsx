import {PricingTable} from "@clerk/clerk-react"

export default function plan() {
    return (
        <div className="py-20 max-w-5xl relative mx-auto px-4">
            <h1 className="text-center text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">Pricing</h1>
            <p className="text-center text-gray-400 md:text-lg mt-2">Use it for free for yourself, upgrade when your team needs
                advanced control.</p>
           
           <div className="w-full   mt-[5vw]">

            <PricingTable  />


           </div>

            
            

         

            
        </div>
    );
};