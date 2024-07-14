import FullSearchBar from "./FullSearchBar";
import React, {useState, useContext} from "react";
import Recipe from "./Recipe";
import edamam from "../assets/Edamam.svg";

import SearchContext from "./SearchContext";
import QueryContext from "./QueryContext";
const reset = () => {
    let inputs = document.querySelectorAll('form');
    inputs.forEach((input) => {
        input.reset();
    });
    let search = document.getElementById('search-bar');
    search.value = "";
    search.placeholder = "";
    let popups = document.getElementsByClassName('popup')
    for (let i = 0; i < popups.length; i++) {
        if (!popups[i].classList.contains('hidden')) popups[i].classList.toggle('hidden');
    }
}

export default function SearchPage({query, setQuery}) {
    const {search, setSearch} = useContext(SearchContext);
    const {searchQuery} = useContext(QueryContext);

    let food;
    if (search !== undefined) food = search.hits;
    return (
        <>
            <section className={"px-8 py-20 max-h w-100"} id={'search'}>
                <FullSearchBar query={query} setQuery={setQuery}/>
                <img className={"max-w-60 md:max-w-80 mx-auto my-4"} src={edamam} height={"100%"} width={"100%"}/>

                <div className={"flex flex-col justify-center items-end"}>

                    <div className={"flex w-full gap-5 mb-2 flex-col md:flex-row"}>
                        <div className={"flex flex-col w-full"}>
                            <div className={"mt-4 flex items-baseline gap-2 mb-2 justify-between"}>
                                <h1 className={"text-4xl align-bottom ml-10"}>{searchQuery}</h1>
                                <div className={"text-l text-[#9C9C9C] mr-5"}>Search results
                                    ({search.from} - {search.to} of {search.count})
                                </div>
                            </div>
                            <div className={"w-full flex flex-wrap gap-5 justify-center h-full"}>

                                {

                                    (food.length > 0 || !food)
                                        ? food.map((recipe, index) => {
                                            return <Recipe props={recipe} key={index} index={index}/>
                                        })
                                        : <div className={"h-fit mt-10"}>No recipes found.</div>
                                }
                            </div>

                        </div>
                    </div>
                    {
                        (search?._links?.next.href) ? <button className={'w-fit mr-10'}
                                                              onClick={async () => {
                                const controller = new AbortController();
                                await fetch(search?._links?.next.href, {
                                    method: 'GET',
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    signal: controller.signal,
                                    })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        setSearch(data);
                                        // console.log(data);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                                return () => controller.abort('Avoid unnecessary calls');
                            }}>Next</button>
                            : ""
                    }
                </div>
            </section>
        </>
    );
}