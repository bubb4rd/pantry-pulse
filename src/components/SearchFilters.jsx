import Checkbox from "./Checkbox";
import React, {useState} from "react";
const cuisines = [
    "American",
    "Asian",
    "British",
    "Carribean",
    "Italian",
    "Chinese",
    "French",
    "Kosher",
    "Mexican",
    "Middle Eastern",
    "South American"
]
const updateRange = () => {
    const rangeInput = document.querySelectorAll(".range-input input"),
        priceInput = document.querySelectorAll(".price-input input"),
        range = document.querySelector(".slider .progress");
    let priceGap = 1000;
    priceInput.forEach(input =>{
        input.addEventListener("input", e =>{
            let minPrice = parseInt(priceInput[0].value),
                maxPrice = parseInt(priceInput[1].value);

            if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
                if(e.target.className === "input-min"){
                    rangeInput[0].value = minPrice;
                    range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
                }else{
                    rangeInput[1].value = maxPrice;
                    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                }
            }
        });
    });
    rangeInput.forEach(input =>{
        input.addEventListener("input", e =>{
            let minVal = parseInt(rangeInput[0].value),
                maxVal = parseInt(rangeInput[1].value);
            if((maxVal - minVal) < priceGap){
                if(e.target.className === "range-min"){
                    rangeInput[0].value = maxVal - priceGap
                }else{
                    rangeInput[1].value = minVal + priceGap;
                }
            }else{
                priceInput[0].value = minVal;
                priceInput[1].value = maxVal;
                range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
                range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        });
    });
}
const revealFilter = () => {
    let t = document.getElementById('calorie');
    t.classList.toggle('hidden');
}
const revealOtherFilter = () => {
    let f = document.getElementById('cuisine');
    f.classList.toggle('hidden');
}
export default function SearchFilters() {
    return (
        <div className={"bg-white rounded-3xl mt-2 h-max w-64 relative"}>
            <div className="wrapper px-6 py-6">
            <button className={"flex items-center"} onClick={revealFilter}>
                    <h2>Calorie Range</h2>
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd"
                              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
                <div className={"transition-all"} id={"calorie"}>
                    <div className="price-input gap-10">
                        <div className="field">
                            <span>Min</span>
                            <input type="number" className="input-min border-none" defaultValue="0"/>
                        </div>
                        <div className="field">
                            <span>Max</span>
                            <input type="number" className="input-max" defaultValue="4000"/>
                        </div>
                    </div>
                    <div className={"mt-10"}>
                        <div className="slider">
                            <div className="progress"></div>
                        </div>
                        <div className="range-input">
                            <input type="range" className="range-min" min="0" max="4000"
                                   defaultValue="0"
                                   step="100" onChange={updateRange}/>
                            <input type="range" className="range-max" min="0" max="4000"
                                   defaultValue="4000"
                                   step="100" onChange={updateRange}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"py-6 px-6"}>
                <button className={"w-max flex items-center justify-between"}
                        onClick={revealOtherFilter}>
                    <h2>Cuisine Type</h2>
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd"
                              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"/>
                    </svg>
                </button>

                <form id={"cuisine"} className={"flex flex-col mt-2"}>

                    {
                        cuisines.map((cuisine, index) => {
                            return <Checkbox props={cuisine} key={index}/>
                        })
                    }
                </form>
            </div>
        </div>
    );
}