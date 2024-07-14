import {useState} from "react";
import {allergy} from "./util/User";
export default function Allergy({props, status}) {
    const [selected, setSelected] = useState(status);
    return (
        (selected) ?
            <button onClick={async () => {
                await allergy(selected, props)
                    .then(() => setSelected(!selected));

            }}
                className={'px-2 py-0.5 rounded-xl flex text-black items-center justify-between border-2 border-orange-900 bg-orange-900 w-28 h-8 gap-1'}>
                <span>{props}</span>
                <i className='bx bx-x text-xl'></i>
            </button>
            : <button onClick={async () => {
                await allergy(selected, props)
                    .then(() => {
                        setSelected(!selected)
                    });

            }}
                className={'px-2 py-0.5 rounded-xl flex text-gray-600 items-center justify-between border-2 border-gray-600 w-28 h-8 gap-1'}>
                <span>{props}</span>
                <i className='bx bx-plus'></i>
            </button>
    );
}