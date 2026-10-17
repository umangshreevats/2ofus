"use client";


const Aniversary = () => {

    return <div className="w-full flex flex-col rounded-md items-center p-5 bg-accent text-white gap-5">
        <h2 className="w-full text-md font-bold p-2 border-b border-b-solid">Anivery</h2>
        <div className="w-full grid grid-cols-3 gap-5 text-primary-text">
            <div id="year" className="w-full aspect-square text-3xl font-bold bg-background rounded-md flex items-center justify-center">
                3 Years
            </div>
            <div id="month" className="w-full aspect-square bg-background text-3xl font-bold rounded-md flex items-center justify-center">
                11 Months
            </div>
            <div id="day" className="w-full aspect-square bg-background text-3xl font-bold rounded-md flex items-center justify-center">
                31 Days
            </div>
        </div>
    </div>
}


export default Aniversary;