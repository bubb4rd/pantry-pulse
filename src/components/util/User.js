import {auth, db, googleProvider} from '../../config/firebase';
import {arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword, signInWithPopup, signOut,updateProfile, updateEmail, updatePassword, deleteUser} from "firebase/auth";
//User sign-in functions
const createWithEmail = async (email, password, setUser, setError) => {
            return createUserWithEmailAndPassword(auth, email, password)
                .then(async () => {
                        await createUser(auth.currentUser);
                        const newUser ={
                            ...auth.currentUser,
                            loggedIn: true
                        };
                        setUser(newUser);
                    }
                )
                .catch((err) => {
                    if (err.code === 'auth/email-already-in-use') setError('Email already in use');
                    else console.error(err);
                });
}
const updateUserDisplayName = async (name) => {
    await updateProfile(auth.currentUser, {
        displayName: name
    }).catch((error) => console.log(error));
}
const updateUserProfilePicture = async (url) => {
    await updateProfile(auth.currentUser, {
        photoURL: url
    }).catch((error) => console.log(error));
}
const updateUserEmail = async (email) => {
    await updateEmail(auth.currentUser, email).catch((error) => console.log(error));
}
const updateUserPassword = async (password) => {
    await updatePassword(auth.currentUser, password).catch((error) => console.log(error));
}
const signInWithGoogle = async (setUser) => {
    try {
                await signInWithPopup(auth, googleProvider).then(async () => {
                        const newUser ={
                            ...auth.currentUser,
                            loggedIn: true
                        }
                        setUser(newUser);
                        try {
                            const userDocRef = doc(db, 'users', auth.currentUser.uid);
                            const userDocSnap = await getDoc(userDocRef);
                            if (!userDocSnap.exists()) {
                                try {
                                    await createUser(auth.currentUser);
                                } catch (error) {
                                    console.error(error);
                                }
                            }
                        } catch (error) {
                            console.error(error);
                        }

                    }
                )
    } catch (err) {
        console.log(err);
    }

}
const createUser = async (user) => {
    try {
        await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            recipes: [],
            allergies: [],

        });
    } catch (error) {
        console.error(error);
    }
}
const deleteUserAccount = async (user) => {
    await deleteDoc(doc(db, 'users', user.uid))
        .then(() => deleteUser(user))
        .catch((error) => console.error(error));
}
const logOut = async (setUser) => {
    try {
        await signOut(auth)
            .then(() => {
                    setUser(undefined);
                }
            )
    } catch (err) {
        console.error(err);
    }
}
//User getter functions
const getUserData = async () => {
    const user = auth.currentUser;
    const userCollection = collection(db, 'users');
    let userData;
    try {
        const data = await getDocs(userCollection);
        const fullData = data.docs.map((doc) => ({
            ...doc.data()
        }));
        userData = fullData.filter((data) => data.id === user.uid)[0];
    } catch (error) {
        console.log(error);
    }
    return userData;
}
const getSavedRecipes = async () => {
    let recipes;
    try {
        const userData = await getUserData();
        recipes = userData.recipes;
    } catch (error) {
        console.log(error);
    } return recipes;
 }
const getSavedAllergies = async () => {
    let allergies;
    try {
        const userData = await getUserData();
        allergies = userData.allergies;
    } catch (error) {
        console.log(error);
    } return allergies;
}
//User action functions
const bookmark = async (bookmarkedStatus, props, option) => {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    let status;
    let recipe;
    if (option === 1) {
        recipe = {
            label: props.label,
            protein: props.protein,
            carbs: props.carbs,
            fat: props.fat,
            servings: props.servings,
            cals: props.cals,
            link: props.link,
        };
    }
    else {
        recipe = {
            label: props.recipe.label,
            protein: Math.ceil(props.recipe.totalNutrients.PROCNT.quantity/props.recipe.yield),
            carbs: Math.ceil(props.recipe.totalNutrients.CHOCDF.quantity/props.recipe.yield),
            fat: Math.ceil(props.recipe.totalNutrients.PROCNT.quantity/props.recipe.yield),
            servings: props.recipe.yield,
            cals: Math.ceil(props.recipe.calories/props.recipe.yield),
            link: props.recipe.url,
        };
    }

    const bookmarkRecipe = async (recipe, doc) => {
        // console.log(recipe);
        await updateDoc(doc, {
            recipes: arrayUnion(...[recipe]),
        })
        // console.log(userDoc);

    }
    const removeBookmarkRecipe = async (recipe, doc) => {
        // console.log(recipe);
        await updateDoc(doc, {
            recipes: arrayRemove(...[recipe]),
        });
    }

    if (bookmarkedStatus === false) {
        await bookmarkRecipe(recipe, userDoc).catch((error) => console.error(error));
        status = 'bookmarked';
    } else {
        await removeBookmarkRecipe(recipe, userDoc).catch((error) => console.error(error));
        status = 'unbookmarked';
    }
    return status;
}
const allergy = async (allergyStatus, props) => {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    const addAllergy = async (props, doc) => {
        await updateDoc(doc, {
            allergies: arrayUnion(...[props])
        })
            .catch((error) => console.log(error));
    }
    const removeAllergy = async (props, doc) => {
        await updateDoc(doc, {
            allergies: arrayRemove(...[props])
        })
            .catch((error) => console.log(error));
    }

    if (allergyStatus) {
        removeAllergy(props, userDoc).catch((error) => console.log(error));
    } else {
        addAllergy(props, userDoc).catch((error) => console.log(error));
    }
}
export {bookmark, signInWithGoogle, createWithEmail, createUser, logOut, updateUserDisplayName, updateUserEmail, updateUserPassword, updateUserProfilePicture, deleteUserAccount, allergy, getSavedRecipes, getSavedAllergies};
