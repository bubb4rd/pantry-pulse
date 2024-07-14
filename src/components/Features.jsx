import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";

export default function Features() {
    const theme = useTheme();
    const windowMatches = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <section className={""} id={"features"}>
            <div className={"text-center py-4"}>
                <h1 className={"text-2xl pt-4 font-bold"}>Discover Delicious Recipes with Ease</h1>
                <p className={"text-lg w-58 px-8 md:px-32 mt-4 mb-4 "}>
                    At PantryPulse, we're all about simplifying your culinary journey. Our mission is to help you find
                    fantastic recipes using ingredients you already have.
                </p>
                <h1 className={"text-2xl font-bold"}>What we offer</h1>
            </div>
            {
                windowMatches ?
                    <div className={"flex flex-col items-center md:flex-row justify-center gap-10 mt-8"}>
                        <div
                            className={"flex flex-col text-center bg-white p-4 rounded-3xl hover:shadow-lg transition-all items-center h-80 max-w-64 justify-around"}>
                            <i className='bx bx-search font-black text-3xl'></i>
                            <h1 className={"font-semibold text-2xl"}>Recipe Search</h1>
                            <p className={"max-w-full text-lg"}>Just tell us what's in your pantry, and we'll serve up a
                                selection of mouthwatering recipes.</p>
                        </div>
                        <div
                            className={"flex flex-col text-center bg-white p-4 rounded-3xl hover:shadow-lg transition-all items-center h-80 justify-around max-w-64"}>
                            <i className='bx bx-fridge font-black text-3xl'></i>
                            <h1 className={"font-semibold text-2xl"}>Nutritional Analysis</h1>
                            <p className={"max-w-full text-lg"}>Know what you're eating. Analyze calories, macros, and
                                micros to make informed dietary choices.</p>
                        </div>
                        <div
                            className={"flex flex-col text-center bg-white p-4 rounded-3xl hover:shadow-lg transition-all items-center h-80 max-w-64 justify-around"}>
                            <i className='bx bx-book-content font-black text-3xl'></i>
                            <h1 className={"font-semibold text-2xl"}>Step-by-Step Guides</h1>
                            <p className={"max-w-full text-lg"}>Our recipes come with clear instructions, making cooking
                                a breeze.</p>
                        </div>
                    </div>
                    : <div className={"flex flex-col items-center md:flex-row justify-center justify-evenly mt-8"}>
                        <div
                            className={"flex flex-col text-center bg-white p-4 rounded-3xl hover:shadow-lg transition-all items-center h-80 max-w-64 justify-around"}>
                            <i className='bx bx-search font-black text-3xl'></i>
                            <h1 className={"font-semibold text-2xl"}>Recipe Search</h1>
                            <p className={"max-w-full text-lg"}>Just tell us what's in your pantry, and we'll serve up a
                                selection of mouthwatering recipes.</p>
                        </div>
                        <div
                            className={"flex flex-col text-center bg-white p-4 rounded-3xl hover:shadow-lg transition-all items-center h-80 justify-around max-w-64"}>
                            <i className='bx bx-fridge font-black text-3xl'></i>
                            <h1 className={"font-semibold text-2xl"}>Nutritional Analysis</h1>
                            <p className={"max-w-full text-lg"}>Know what you're eating. Analyze calories, macros, and micros to make informed dietary choices.</p>
                        </div>
                        <div
                            className={"flex flex-col text-center bg-white p-4 rounded-3xl hover:shadow-lg transition-all items-center h-80 max-h-fit max-w-64 justify-around"}>
                            <i className='bx bx-book-content font-black text-3xl'></i>
                            <h1 className={"font-semibold text-2xl"}>Step-by-Step Guides</h1>
                            <p className={"max-w-full text-lg"}>Our recipes come with clear instructions, making cooking a breeze.</p>
                        </div>
                    </div>
            }
        </section>
    )
}