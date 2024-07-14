import Checkbox from "./Checkbox";
import React from "react";
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
export default function DropdownFilters({props}) {

    return (
      <div className={" bg-white relative inline-block text-left"}>
          <div
              className="popup hidden absolute top-10 z-10  rounded-md bg-white    focus:outline-none px-3 py-3 flex flex-col md:flex-row gap-10"
              role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1" id={'popup'}>
              {
                  props.map((filter, index) => {
                      return <div key={index}>
                          <h3 className={"text-gray-700"}>{filter.name}</h3>
                          <form>
                              {
                                  filter.values.map((item, index) => {
                                      return <Checkbox props={item} key={index} category={filter.name}/>
                                  })
                              }
                          </form>
                      </div>
                  })
              }
              <div className="wrapper px-2 w-52">
                  <h2 className={"text-gray-700"}>Calorie Range</h2>
                  <div className={"transition-all"} id={"calorie"}>
                      <div className="price-input gap-5 w-full">
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
          </div>
      </div>
    );
}