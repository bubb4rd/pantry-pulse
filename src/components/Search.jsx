import {useContext, useState} from "react";
import SearchPage from "./SearchPage";
import SearchContext from "./SearchContext";
import FullSearchBar from "./FullSearchBar";

export default function Search() {
    const {search} = useContext(SearchContext);
    const [query, setQuery] = useState('');
    return (
        (search !== undefined && query !== '') ?
                <SearchPage query={query} setQuery={setQuery}/>
                :
                <section className={""} id={"search"}>
                    <div className={"flex flex-col py-12 justify-center items-center"}>
                        <h1 className={"text-center text-4xl font-black"}>Find your recipe.</h1>
                        <p className={"px-8 lg:px-48 py-4 text-center my-8"}>
                            Unlock a world of flavors with your pantry essentials. Every ingredient is a potential
                            masterpiece waiting to happen. Let's bring your culinary visions to life. Start by sharing
                            your pantry, and we'll do the rest.
                        </p>
                        <FullSearchBar query={query} setQuery={setQuery}/>
                    </div>
                </section>
    );
}