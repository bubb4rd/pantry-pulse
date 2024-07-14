import {useState, useEffect} from "react";
import SavedRecipe from "../components/SavedRecipe";
import Navbar_Alt from "../components/Navbar_Alt";
import {getSavedRecipes} from "../components/util/User";
import Navbar from "../components/Navbar";

export default function SavedRecipes() {

    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        getSavedRecipes()
            .then((recipes) => setSavedRecipes(recipes))
            .catch((error) => console.error(error));
    }, []);
    return (
        <>
            <Navbar/>
            <section className={'py-10 px-14'}>
                <h1 className={'mb-4 text-black text-3xl'}>Your Saved Recipes <span className={'text-gray-500 text-2xl'}> ({savedRecipes.length})</span></h1>
                <div className={'flex flex-wrap gap-3'}>
                    {
                        (savedRecipes.length !== 0) ?
                            savedRecipes.map((recipe, index) => {
                                return <SavedRecipe props={recipe} key={index} setSavedRecipes={setSavedRecipes} savedRecipes={savedRecipes}/>
                            })
                            : <h3 className={''}>You have no saved recipes</h3>
                    }
                </div>
            </section>
        </>
    );
}