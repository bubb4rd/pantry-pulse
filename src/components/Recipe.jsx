import {useContext, useEffect, useState} from "react";
import {updateDoc, doc, arrayUnion, arrayRemove} from 'firebase/firestore';
import {auth, db} from "../config/firebase";
import UserContext from "./UserContext";
import SearchContext from "./SearchContext";
import {bookmark} from "./util/User";

export default function Recipe({props}) {
    const [bookmarked, setBookmarked] = useState(false);
    const {user} = useContext(UserContext);
    const {search} = useContext(SearchContext);
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    // const bookmark = async () => {
    //     if (user?.loggedIn) {
    //         if (bookmarked === false) {
    //             await bookmarkRecipe().then(() => setBookmarked(!bookmarked))
    //                 .catch((error) => console.error(error));
    //
    //         } else {
    //
    //         }
    //     }
    // }
    // const bookmarkRecipe = async () => {
    //     const recipe = {
    //         label: props.recipe.label,
    //         protein: Math.ceil(props.recipe.totalNutrients.PROCNT.quantity/props.recipe.yield),
    //         carbs: Math.ceil(props.recipe.totalNutrients.CHOCDF.quantity/props.recipe.yield),
    //         fat: Math.ceil(props.recipe.totalNutrients.PROCNT.quantity/props.recipe.yield),
    //         servings: props.recipe.yield,
    //         cals: Math.ceil(props.recipe.calories/props.recipe.yield),
    //         link: props.recipe.url,
    //     };
    //     // console.log(recipe);
    //     await updateDoc(userDoc, {
    //         recipes: arrayUnion(...[recipe]),
    //     })
    //     // console.log(userDoc);
    // }
    // const removeBookmarkRecipe = async () => {
    //     const recipe = {
    //         label: props.recipe.label,
    //         protein: Math.ceil(props.recipe.totalNutrients.PROCNT.quantity/props.recipe.yield),
    //         carbs: Math.ceil(props.recipe.totalNutrients.CHOCDF.quantity/props.recipe.yield),
    //         fat: Math.ceil(props.recipe.totalNutrients.PROCNT.quantity/props.recipe.yield),
    //         servings: props.recipe.yield,
    //         cals: Math.ceil(props.recipe.calories/props.recipe.yield),
    //         link: props.recipe.url,
    //     };
    //     // console.log(recipe);
    //     await updateDoc(userDoc, {
    //         recipes: arrayRemove(...[recipe]),
    //     })
    //     console.log(userDoc);
    // }
    useEffect(() => {
        if (bookmarked) setBookmarked(false);
    }, [search]);
    return (
        <div className={"bg-white  xl:w-96 lg:w-68 max-w-80 md:w-72 sm:w-72 rounded-2xl flex flex-col hover:border-2 transition-all justify-between"}>

            <img className={"rounded-t-2xl h-1/2 object-cover"} src={props.recipe.images?.SMALL.url}/>
            <div className={"px-2.5 pt-1.5 flex justify-between"}>
                <div className={"text-xl font-bold w-3/4"}>{props.recipe.label}</div>
                <button className={"cursor-pointer"} onClick={() => {
                    bookmark(bookmarked, props, 2)
                        .catch((error) => console.error(error));
                    setBookmarked(!bookmarked)
                }}>
                    {
                        bookmarked ? <i className='text-xl bx bxs-bookmark'></i> : <i className='text-xl bx bx-bookmark '></i>
                    }
                </button>
            </div>
            <div className={"px-2 py-2 flex gap-1.5 justify-center"}>
                    <div className={"px-2 py-1 bg-[#CCCCCC] text-center w-full rounded-2xl"}>
                        <div className={"h-fit"}>Protein</div>
                        <div className={"font-black"}>{Math.ceil(props.recipe.totalNutrients.PROCNT.quantity/props.recipe.yield)}g</div>
                    </div>
                    <div className={"px-2 py-1 bg-[#CCCCCC] text-center w-full rounded-2xl"}>
                        <div className={"h-fit"}>Carbs</div>
                        <div className={"font-black"}>{Math.ceil(props.recipe.totalNutrients.CHOCDF.quantity/props.recipe.yield)}g</div>
                    </div>
                    <div className={"px-2 py-1 bg-[#CCCCCC] rounded-2xl w-full center text-center"}>
                        <div className={"h-fit"}>Fat</div>
                        <div className={"font-black"}>{Math.ceil(props.recipe.totalNutrients.PROCNT.quantity/props.recipe.yield)}g</div>
                    </div>
                </div>
            <div className={"px-3.5 py-3.5 flex justify-center justify-around"}>
                <div className={"flex gap-1"}>
                    <div className={"text-lg font-bold"}>{props.recipe.yield}</div>
                    <div>servings</div>
                </div>
                <div className={"text lg flex gap-1.5"}>
                    <div className={"text-xl font-bold"}>
                        {
                            Math.ceil(props.recipe.calories/props.recipe.yield)
                        }
                    </div>
                    <div className={""}>
                         cals/serving
                    </div>
                </div>
            </div>
            <div className={"flex justify-center gap-2 px-2.5 pb-2.5"}>

                <a className={"px-3 py-3.5 rounded-3xl bg-orange-900 text-white text-center w-full text-2xl border-2 hover:bg-gray-100 hover:text-orange-900 hover:border-gray-200 transition-all"} href={props.recipe.url} target="_blank" rel="noreferrer"><button>Get recipe</button></a>
            </div>
        </div>
    )
}