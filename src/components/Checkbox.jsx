import React, {useContext} from "react";
import SearchFiltersContext from "./SearchFiltersContext";
const findFilter = (filter, filters) => {
    for (let i = 0; i < filters.length; i++) {
        let tempFilter = filters[i];
        if (tempFilter.name === filter) return i;
    }
    return -1;
}
export default function Checkbox({props, category}) {
    const {searchFilters, setSearchFilters} = useContext(SearchFiltersContext);
    return (
        <div className="flex items-center mb-1" role="none">
            <input id={props} type="checkbox" value=""  onChange={(e) => {
                if (e.target.checked === false) {
                    const index = findFilter(props, searchFilters);
                    if (index !== -1) {
                        searchFilters.splice(index, 1);
                        setSearchFilters([...searchFilters])
                    }
                } else {
                    setSearchFilters([...searchFilters, {
                        name: props,
                        category: category
                    }]);
                }
            }
            }
                   className="block px-4 py-2 text-sm text-gray-700 rounded dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600 checked:bg-orange-900"/>
            <label htmlFor={props}
                   className="px-1 py-1 rounded ms-2 text-l font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 cursor-pointer" >{props}</label>
        </div>
    );
}