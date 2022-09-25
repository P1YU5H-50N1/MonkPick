import React, { useContext } from "react";
import { ProductContext } from "./ProductProvider";
import { Dialog, Transition } from "@headlessui/react";
import ProductPicker from "./ProductPicker";
import { Fragment, useState } from "react";

const ProductPickerWrapper = ({ isOpen, setIsOpen }) => {
	const { addProducts,disableAddProducts } = useContext(ProductContext);
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

									<ProductPicker />

									<div className="pt-4 px-6 border-t flex justify-end items-center gap-4">
										<button
											type="button"
											className="inline-flex bg-button justify-center rounded-md border border-transparent text-white px-4 py-2 text-sm font-medium"
											onClick={closeModal}
										>
											Cancel
										</button>
										<button
											disabled={disableAddProducts}
											type="button"
											className="inline-flex bg-button justify-center rounded-md border border-transparent text-white px-4 py-2 text-sm font-medium disabled:bg-gray-200 disabled:text-gray-500"
											onClick={() => {
												addProducts();
												closeModal();
											}}
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

export default ProductPickerWrapper;
