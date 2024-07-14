import React from "react";
import Checkbox from "./Checkbox";
export default function DropdownCheckbox({props}) {
    const allergyClicked = () => {
        let t = document.getElementById(`${props.name}`);
        t.classList.toggle("hidden");
    }
    return (
        <div className="md:visible relative inline-block text-left">
            <div>
                <button type="button" onClick={allergyClicked}
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  ring-gray-300 hover:bg-gray-50"
                        id="menu-button" aria-expanded="true" aria-haspopup="true">
                    {props.name}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd"
                              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
            <div id={props.name}
                 className="popup hidden absolute right-0 top-14 z-10 mt-8 w-56 origin-top-right rounded-md bg-white    focus:outline-none px-3 py-3"
                 role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <form>
                    {
                        props.values.map((item, index) => {
                            return <Checkbox props={item} key={index}/>
                        })
                    }
                </form>
                </div>
            </div>
    )
}