import {useState} from "react";
import {bookmark} from "./util/User";

export default function SavedRecipe({props, setSavedRecipes, savedRecipes}) {
    const [bookmarked, setBookmarked] = useState(true);
    return (
        <div className={"bg-white  xl:w-96 lg:w-68 max-w-80 md:w-72 sm:w-72 rounded-2xl flex flex-col hover:border-2 transition-all justify-between"}>

            <div className={"px-2.5 pt-1.5 flex justify-between"}>
                <div className={"text-xl font-bold w-3/4"}>{props.label}</div>
                <button className={"cursor-pointer"} onClick={() => {
                    bookmark(bookmarked, props, 1).then((status) => {
                        if (status === 'unbookmarked') {
                            setSavedRecipes(savedRecipes.filter((data) => data.label !== props.label))
                        }
                        setBookmarked(!bookmarked)
                    })

                }}>
                    {
                        bookmarked ? <i className='text-xl bx bxs-bookmark'></i> : <i className='text-xl bx bx-bookmark '></i>
                    }
                </button>
            </div>
            <div className={"px-2 py-2 flex gap-1.5 justify-center"}>
                    <div className={"px-2 py-1 bg-[#CCCCCC] text-center w-full rounded-2xl"}>
                        <div className={"h-fit"}>Protein</div>
                        <div className={"font-black"}>{props.protein}g</div>
                    </div>
                    <div className={"px-2 py-1 bg-[#CCCCCC] text-center w-full rounded-2xl"}>
                        <div className={"h-fit"}>Carbs</div>
                        <div className={"font-black"}>{props.carbs}g</div>
                    </div>
                    <div className={"px-2 py-1 bg-[#CCCCCC] rounded-2xl w-full center text-center"}>
                        <div className={"h-fit"}>Fat</div>
                        <div className={"font-black"}>{props.fat}g</div>
                    </div>
                </div>
            <div className={"px-3.5 py-3.5 flex gap-1 justify-center justify-around"}>
                <div className={"flex gap-1"}>
                    <div className={"text-lg font-bold"}>{props.servings}</div>
                    <div>servings</div>
                </div>
                <div className={"text lg flex gap-1.5"}>
                    <div className={"text-xl font-bold"}>
                        {
                            props.cals
                        }
                    </div>
                    <div className={""}>
                         cals/serving
                    </div>
                </div>
            </div>
            <div className={"flex justify-center gap-2 px-2.5 pb-2.5"}>

                <a className={"px-3 py-3.5 rounded-3xl bg-orange-900 text-white text-center w-full text-2xl border-2 hover:bg-gray-100 hover:text-orange-900 hover:border-gray-200 transition-all"} href={props.link} target="_blank" rel="noreferrer"><button>Get recipe</button></a>
            </div>
        </div>
    )
}