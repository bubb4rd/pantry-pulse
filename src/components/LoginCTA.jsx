import {Link} from "react-router-dom";

export default function LoginCTA() {
    return (
      <div className={"bg-gray-900 flex flex-col sm:flex-row justify-between rounded-3xl mx-5 md:mx-20 py-6 px-10 gap-3 "}>
          <div className={"text-white text-3xl flex justify-center items-center gap-2 w-fit"}>
              <i className='bx bxs-offer text-5xl'></i><p>Get the most out of <span className={"text-orange-900 font-bold"}>PantryPulse</span>!</p>
          </div>
          <Link className={"bg-white text-center font-bold border-2 border-white px-5 py-3.5 rounded-3xl cursor-pointer hover:border-2 hover:border-blue-900 hover:bg-blue-700 hover:text-white transition-all hover:border-opacity-50 w-full sm:w-1/4"} to={'/signup'}>
              Sign Up Now
          </Link>
      </div>
    );
}