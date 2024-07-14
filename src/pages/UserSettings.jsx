import Navbar_Alt from "../components/Navbar_Alt";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import UserContext from "../components/UserContext";
import {
    updateUserDisplayName,
    updateUserPassword,
    updateUserProfilePicture,
    deleteUserAccount,
    getSavedAllergies
} from "../components/util/User";
import {auth} from "../config/firebase";
import Allergy from "../components/Allergy";
import Navbar from "../components/Navbar";
export default function UserSettings() {
    const {user, setUser} = useContext(UserContext);
    const [nameActive, setNameActive] = useState(false);
    const [pfpActive, setPfpActive] = useState(false);
    const [passwordTextStatus, setPasswordTextStatus] = useState('text-red-900');
    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [currentUserPassword, setCurrentUserPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const navigate = useNavigate();
    const [allergies, setAllergies] = useState([]);
    const changePassword = (password, confirmPassword) => {
        const textStatus = document.getElementById('text-status')
        textStatus.classList.remove('hidden');
        if (password === confirmPassword) {

            if (password.length > 7) {
                setPasswordTextStatus('text-green-900');


                updateUserPassword(password)
                    .then(() => {
                        textStatus.innerHTML = 'Password successfully changed!';

                    }).catch((error) => {
                        if (error.code === 'auth/requires-recent-login') {
                            textStatus.innerHTML = `Please sign back in before trying this action`
                        } else textStatus.innerHTML = `Error: ${error.name}`
                })
            } else {
                textStatus.innerHTML = 'Password length must be greater than 8 characters.';
            }

        }
    }
    const updateUser = async () => {
        const newUser ={
            ...auth.currentUser,
            loggedIn: true
        };
        setUser(newUser);
    }
    const allergyObjects = [
        { "name": "Peanut", "status": false },
        { "name": "Treenut", "status": false },
        { "name": "Milk", "status": false },
        { "name": "Fish", "status": false },
        { "name": "Sesame", "status": false },
        { "name": "Soy", "status": false },
        { "name": "Egg", "status": false },
        { "name": "Gluten", "status": false },
        { "name": "Wheat", "status": false }
    ];
    const findSavedAllergy = (savedAllergies) => {
        let allergyList = allergyObjects;
        // find allergy in array ==> change allergy status
        for (let i = 0; i < allergyList.length; i++) {
            for (let k = 0; k < savedAllergies.length; k++) {
                if (allergyList[i].name === savedAllergies[k]) allergyList[i].status = true;
            }
        }
        return allergyList;

    }
    useEffect(() => {
        getSavedAllergies().then((data) => {
            // get allergies ['1', '2', etc.]
            // check with allergy objects
            setAllergies(findSavedAllergy(data))
        });
    }, []);
    return (
        <>
            <Navbar/>
            <section className={'py-10 '}>

                <h1 className={'mb-4 text-black text-3xl'}>Your Settings</h1>
                <div className={'text-gray-500 flex gap-1 mb-2'}>
                    <i className='bx bxs-user h-fit my-auto text-2xl '></i>
                    <span className={'my-auto text-2xl flex h-fit'}>Profile settings</span>
                </div>
                <div className={'flex-col flex gap-10'}>
                    <div className={'flex md:flex-row flex-col gap-10'}>
                        <div className={''}>

                            <div className={'flex flex-col md:flex-row gap-5'}>
                                {(user?.providerData[0].photoURL)
                                    ? <img
                                        src={user?.providerData[0].photoURL}
                                        className={'h-36 max-w-36 rounded-full'}/>
                                    : <img
                                        src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                        className={'h-36 max-w-36 rounded-full'}/>
                                }
                                <div className={'flex flex-col gap-1 mb-1 w-full justify-end'}>
                                    <label htmlFor={'name'}>Profile Picture URL</label>
                                    <div className={'flex items-center bg-white rounded-xl p-1'}>
                                        <input
                                            name={'pfp'}
                                            className={'rounded-xl border-0 overflow-hidden disabled:text-gray-500 w-full'}
                                            id={'pfp'}
                                            disabled={true} onChange={(e) => setProfilePic(e.target.value)}/>
                                        {
                                            pfpActive ? <button className={'my-auto p-1'} onClick={() => {
                                                    let pfp = document.getElementById('pfp');
                                                    pfp.disabled = true;
                                                    setPfpActive(false);
                                                    if (profilePic !== '') updateUserProfilePicture(profilePic)
                                                        .then(() => updateUser())
                                                }}><i
                                                    className='bx bx-check text-xl hover:text-green-800 transition-all'></i>
                                                </button>
                                                : <button className={'my-auto p-1'} onClick={() => {
                                                    let pfp = document.getElementById('pfp');
                                                    pfp.disabled = false;
                                                    setPfpActive(true);
                                                }}><i className='bx bxs-edit-alt'></i></button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={'flex flex-col gap-1 mb-1'}>
                                <label htmlFor={'name'}>Name</label>
                                <div className={'flex items-center bg-white rounded-xl p-1'}>
                                    <input name={'name'} placeholder={user?.displayName}
                                           className={'rounded-xl border-0 overflow-hidden disabled:text-gray-500 w-full'}
                                           id={'name'}
                                           disabled={true} onChange={(e) => setUsername(e.target.value)}/>
                                    {
                                        nameActive ? <button className={'my-auto p-1'} onClick={() => {
                                                let name = document.getElementById('name');
                                                name.disabled = true;
                                                setNameActive(false);
                                                updateUserDisplayName(username)
                                                    .then(() => updateUser());
                                            }}><i className='bx bx-check text-xl hover:text-green-800 transition-all'></i>
                                            </button>
                                            : <button className={'my-auto p-1'} onClick={() => {
                                                let name = document.getElementById('name');
                                                name.disabled = false;
                                                setNameActive(true);


                                            }}><i className='bx bxs-edit-alt'></i></button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={'text-gray-500 md:w-1/2'}>
                            <h3 className={'mb-1'}>Allergies & Health</h3>
                            <div className={'flex flex-wrap gap-2'}>
                                {
                                    allergies?.map((allergy, index) => {
                                        return <Allergy props={allergy.name} status={allergy.status} key={index}/>
                                    })
                                    // allergyList.map((props, index) => {
                                    //     if (findSavedAllergy(props)) return <Allergy props={props} key={index} status={true}/>
                                    //     else return <Allergy props={props} key={index} status={false}/>
                                    //
                                    // })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={'w-full'}>
                        <div className={'text-gray-500 flex gap-1'}>
                            <i className='my-auto text-2xl bx bxs-shield h-fit'></i>
                            <span className={'my-auto text-2xl flex h-fit'}>Password change</span>
                        </div>
                        <div className={'flex flex-col gap-1 mb-1'}>
                            <label htmlFor={'new-pw'}>New Password</label>
                            <div className={'flex items-center bg-white rounded-xl p-1'}>
                                <input name={'new-pw'}
                                       className={'rounded-xl border-0 overflow-hidden disabled:text-gray-500 w-full'}
                                       id={'new-pw'} type={'password'}
                                       onChange={(e) => setCurrentUserPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-1 mb-1'}>
                            <label htmlFor={'confirm-pw'}>Confirm Password</label>
                            <div className={'flex items-center bg-white rounded-xl p-1'}>
                                <input name={'confirm-pw'}
                                       className={'rounded-xl border-0 overflow-hidden disabled:text-gray-500 w-full'}
                                       type={'password'}
                                       onChange={(e) => setUserPassword(e.target.value)}/>
                            </div>
                        </div>
                        <button onClick={(() => changePassword(currentUserPassword, userPassword))}
                                className={'p-2 w-full border-2 border-black rounded-xl my-2 text-black font-bold transition-all hover:bg-black hover:text-white'}>Change
                            password
                        </button>
                        <span className={`hidden ${passwordTextStatus}`}
                              id={'text-status'}>Passwords do not match</span>

                    </div>
                </div>
                <div className={'mt-10'}>
                    <div className={'text-gray-500 flex gap-1'}>
                        <i className='h-fit my-auto text-2xl bx bx bxs-error-alt'></i>
                        <span className={'my-auto text-2xl flex h-fit'}>Danger Zone</span>
                    </div>
                    <p className={''}>Enter your email to delete your account</p>
                    <div className={'flex flex-col gap-1 mb-1'}>
                        <div className={'flex items-center bg-white rounded-xl p-1'}>
                            <input name={'delete-email'}
                                   className={'rounded-xl border-0 overflow-hidden disabled:text-gray-500  w-full'}
                                   id={'delete-email'}/>

                        </div>
                        <button
                            className={'p-2 w-full bg-red-900 rounded-xl my-2 text-white font-bold transition-all hover:shadow-md'}
                            onClick={() => {
                                const email = document.getElementById('delete-email');
                                if (user?.email === email.value) {
                                    deleteUserAccount(auth.currentUser).then(() => {
                                        setUser(undefined);
                                        navigate('/')
                                    })
                                }
                            }
                            }
                        >Delete
                            account
                        </button>

                        <span className={`hidden ${passwordTextStatus}`}
                              id={'text-status'}>Passwords do not match</span>
                    </div>
                </div>
            </section>
        </>
    )
}