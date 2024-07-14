import React, {useContext, useEffect, useRef, useState} from "react";
import DropdownFilters from "./DropdownFilters";
import SearchContext from "./SearchContext";
import SearchFiltersContext from "./SearchFiltersContext";
import QueryContext from "./QueryContext";
import {fetchRecipes} from "./util/SearchRecipes";
const filterClicked = () => {
    let t = document.getElementById(`popup`);
    t.classList.toggle("hidden");
}
const filters = [
    {
        "name": "Allergy",
        "values": [
            "Dairy-free",
            "Fish-free",
            "Gluten-free",
            "Keto",
            "Low-sugar",
            "Paleo",
            "Peanut-free",
            "Soy-free",
            "Treenut-free",
            "Vegan",
            "Vegetarian"
        ]
    },
    {
        "name": "Diet",
        "values": [
            "Balanced",
            "High-fiber",
            "High-protein",
            "Low-carb",
            "Low-fat",
            "Low-sodium"
        ]
    },
]

const {search_key,search_id} = require('../config.js');

export default function FullSearchBar({query, setQuery}) {
    const {searchFilters, setSearchFilters} = useContext(SearchFiltersContext);
    const [searchButtonClicked, setSearchButtonClicked] = useState(0);
    const {setSearch} = useContext(SearchContext);
    const {setSearchQuery} = useContext(QueryContext);
    const abortControllerRef = useRef(null);
    let p = `q=${query}`;

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
        setSearchFilters([]);
    }
    const dietString = () => {
        let returnString = '';
        for (let i = 0; i < searchFilters.length; i++) {
            let tempFilter = searchFilters[i];
            if (tempFilter.category === 'Diet') returnString += `&diet=${tempFilter.name.toLowerCase()}`;
        }
        return returnString;
    }
    const allergyString = () => {
        let returnString = '';
        for (let i = 0; i < searchFilters.length; i++) {
            let tempFilter = searchFilters[i];
            if (tempFilter.category === 'Allergy') returnString += `&health=${tempFilter.name.toLowerCase()}`;
        }
        return returnString;
    }

    const fetchData = async () => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        let diet = dietString();
        let allergy = allergyString();
        setSearchQuery(query);
        let url = 'type=public'+'&'+p+'&app_id='+search_id+'&app_key='+search_key+diet+allergy;
        const data = await fetchRecipes(url, abortControllerRef.current)
            .catch((error) => {
                console.log(error);
            });
        setSearch(data);
        // console.log(data);
    }
    const searched = async () => {
        if (query !== '') {
            setSearchButtonClicked(searchButtonClicked+1);
            fetchData().catch((error) => console.error(error));
            setSearchFilters([]);
        }
    }
    return(
        <div className={"flex md:items-center w-full justify-around flex-wrap"}>
            <div
                className={"search-bar w-full flex bg-white px-8 py-5 rounded-full text-[#3C3C3C] justify-around"}>
                <DropdownFilters props={filters}/>
                <button  onClick={filterClicked}>
                    {
                        (searchFilters.length > 0) ?
                            <span className={"bg-orange-900 px-2 text-white rounded-[50px] font-black py-0.5"}>{searchFilters.length}</span>
                            : ""
                    }
                    <i
                        className='text-2xl bx bx-filter-alt text-center items-center hover:text-orange-900 transition-all px-1.5 py-1'></i>

                </button>
                <form className={"w-full flex justify-center"}>
                    <input id={'search-bar'} className={"w-full border-none focus:outline-0 outline-0 text-xl "}
                           type={"text"} onChange={(e) => setQuery(e.target.value)}/>
                </form>


                {
                    (searchFilters.length > 0) ?
                        <button onClick={reset}><i
                            className='search-icon text-3xl bx bx-x text-center items-center hover:text-orange-900 transition-all px-1.5 py-1'></i>
                        </button>
                        : ""
                }
                <button onClick={searched}><i
                    className='search-icon text-3xl bx bx-search text-center items-center hover:text-orange-900 transition-all px-1.5 py-1'></i>
                </button>

            </div>
        </div>
    );
}
// {
//     filters.map((filter, index) => {
//         return <DropdownCheckbox props={filter} key={index}/>
//     })
// }