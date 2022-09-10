import { Fragment, Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, CheckIcon } from "@heroicons/react/outline";
import { useKV } from "../../hooks/useKV";

import Image from "next/image";

type Props = {
  isOpen: boolean;
  selected: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setCount: Dispatch<SetStateAction<number>>;
};

// iterate through a list and return a comma separated string

const ObjectSlideOver = ({ isOpen, selected, setOpen, setCount }: Props) => {
  const [checked, setChecked] = useKV(
    "shipping",
    selected.itemID.toString(),
    false
  );
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-250"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity dark:bg-[#0C0C0C] dark:bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-250 sm:duration-250"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-250 sm:duration-250"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl dark:bg-[#141414]">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-[#141414]"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 dark:text-white sm:px-6">
                      {/* Object Content */}
                      <div>
                        {/* Header with Image */}
                        <div className="flex justify-center">
                          <div>
                            <div className="flex justify-center">
                              <Image
                                src={selected.iconURL}
                                alt={selected.name}
                                width={80}
                                height={80}
                                quality={100}
                              />
                            </div>
                            <div className="text-center">
                              <h3 className="mt-6 text-xl font-semibold">
                                {selected.name}
                              </h3>
                              <h4 className="italic dark:text-gray-400">
                                {selected.description}
                              </h4>
                            </div>
                          </div>
                        </div>
                        {/* End Header with Image */}
                      </div>

                      <div className="mt-8 space-y-6">
                        {/* Mark as Shipped Button */}
                        <button
                          className="light:hover:bg-gray-200 flex w-full items-center space-x-3 rounded-lg border border-gray-300 bg-[#f7f7f7] py-5 px-3 dark:border-[#2A2A2A] dark:bg-[#1F1F1F] dark:text-white dark:hover:border-white"
                          onClick={() => {
                            checked
                              ? setCount((prev) => prev - 1)
                              : setCount((prev) => prev + 1);
                            setChecked((old) => !old);
                            setOpen(false);
                          }}
                        >
                          {!checked ? (
                            <CheckIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                          <p className="">
                            Mark as {checked ? "un" : null}shipped
                          </p>
                        </button>
                        {/* End Mark as Shipped Button */}
                      </div>

                      {/* End Object Content */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ObjectSlideOver;
