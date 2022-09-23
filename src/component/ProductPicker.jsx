import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const ProductPicker = ({ isOpen, setIsOpen }) => {
	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-md py-6 bg-white text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg mx-6 font-medium leading-6 text-gray-900"
									>
										Select Products
									</Dialog.Title>

									<div className="mt-2 px-6 border-t pt-2">
										<div class="relative text-gray-600 border focus-within:text-gray-400">
											<span class="absolute inset-y-0 left-0 flex items-center pl-2">
												<svg
													fill="none"
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													viewBox="0 0 24 24"
													class="w-6 h-6"
												>
													<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
												</svg>
											</span>
											<input
												type="search"
												name="q"
												class="py-2 text-sm pl-10 pr-5 w-full focus:outline-none focus:bg-white focus:text-gray-900"
												placeholder="Search..."
												autocomplete="off"
											/>
										</div>
									</div>

									<div className="mt-2 text px-6 border-t">
										Product Item
									</div>

									<div className="pt-4 px-6 border-t flex justify-end items-center gap-4">
										<button
											type="button"
											className="inline-flex bg-button justify-center rounded-md border border-transparent text-white px-4 py-2 text-sm font-medium"
											onClick={closeModal}
										>
											Cancel
										</button>
										<button
											type="button"
											className="inline-flex bg-button justify-center rounded-md border border-transparent text-white px-4 py-2 text-sm font-medium"
											onClick={closeModal}
										>
											Add
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default ProductPicker;
