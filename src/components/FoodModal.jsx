export default function FoodModal({props}) {
    return (
        <div data-modal-show="true" aria-hidden="true" className={"max-h-[100vh] max-w-[100vw]  absolute z-30"}>
            <div id={props} className="hidden overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-40 justify-center items-center bg-gray-900 bg-opacity-70 flex">
                <div className="relative w-full max-w-2xl px-4 h-full md:h-auto z-50 place-items-center justify-center">
                    <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                                Terms of Service
                            </h3>
                            <button type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="default-modal" onClick={() => {
                                        const s = document.getElementById('default-modal');
                                        s.classList.toggle('hidden');
                            }}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws
                                for its citizens, companies around the world are updating their terms of service
                                agreements to comply.
                            </p>
                            <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on
                                May 25 and is meant to ensure a common set of data rights in the European Union. It
                                requires organizations to notify users as soon as possible of high-risk data breaches
                                that could personally affect them.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}