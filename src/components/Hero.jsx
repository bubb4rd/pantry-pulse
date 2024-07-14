import { Button } from "@material-tailwind/react";
import React from "react";
import hero from '../assets/hero.jpg';
import {Link} from "react-router-dom";

export default function Hero() {
    return (
      <section id={"home"} className={"p-10 hero items-center flex-col-reverse  flex md:flex-row-reverse justify-center"}>
        <img src={hero} className={"relative right-0 object-cover z-0 md:w-1/2 h-[75vh] rounded-[50px] p-4"}/>
          <div className={"relative flex flex-col md:items-start z-10 px-2 py-10 gap-7 md:text-left text-center"}>
              <div className={"mx-auto md:mx-0"}>
                  <h1 className={"font-gasoek lowercase text-6xl md:text-7xl w-fit text-wrap text-black"}>COOK WHAT</h1>
                  <h1 className={"font-gasoek lowercase text-6xl md:text-7xl w-fit text-wrap text-black mx-auto md:mx-0"}><span
                      className={"text-orange-900"}>YOU</span> LOVE.</h1>
              </div>

              <p className={"text-black rounded-2xl bg-opacity-90 text-xl w-full md:w-3/4"}>Got a couple items in your fridge and
                  don't know how to combine them? Need a marinade for a steak? Don't know how to cook?</p>
              <div className={"flex gap-4 w-fit h-fit mx-auto md:mx-0"}>
                  <Link to={'signup'}
                        className={"button text-white bg-orange-900 px-4 py-4 rounded-3xl text-2xl cursor-pointer  transition-all w-fit  font-black justify-between gap-3 items-center border-orange-900 border-2 hover: hover:text-orange-900 hover:bg-gray-100 hover:border-gray-300 border-opacity-50 h-fit flex "}
                        href={"#search"}>
                      <div className={""}>
                          Sign up
                      </div>
                      <i className='bx bx-right-arrow-alt text-3xl'></i>
                  </Link>
                  <a className={"button px-4 py-4 rounded-3xl text-2xl cursor-pointer  transition-all w-fit font-black h-fit flex border-4 border-black text-black hover:bg-black hover:text-white"}
                     href={"#search"}>
                      Search Recipes
                  </a>
              </div>
              <div className="max-w-7xl px-1 ">
                  <dl className="grid  gap-x-4 gap-y-16 text-center grid-cols-1 md:grid-cols-3 ">
                      <div className="flex  flex-col gap-y-1 h-fit p-1 ">
                          <dt className="text-base leading-7 text-gray-600">Recipes</dt>
                          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl">2,000,000+
                          </dd>
                      </div>
                      <div className="flex  flex-col gap-y-1  h-fit p-1">
                          <dt className="text-base leading-7 text-gray-600">Satisfaction Rate</dt>
                          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl">97%
                          </dd>
                      </div>
                      <div className="flex flex-col gap-y-1  h-fit p-1">
                          <dt className="text-base leading-7 text-gray-600">Kitchens Inspired</dt>
                          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl">100+
                          </dd>
                      </div>

                  </dl>
              </div>
          </div>

      </section>
    );
}