import { useState } from "react";
import { TiTimes } from "react-icons/ti";

const Confirmation = ({ setList, ClearConfirmation, setClearConfirmation }) => {
	const handleClearAll = () => {
		setList([]);
		setClearConfirmation({ status: false });
	};
	return (
		<div
			className={`${
				ClearConfirmation.status ? "flex" : "hidden"
			} h-screen w-screen bg-black bg-opacity-80 absolute top-0 left-0 justify-center items-center`}
		>
			<Button className="bg-gray-800 py-5 max-w-[80%] flex flex-col">
				<h2 className="mb-7 balance">
					You're about to clear the list. Please, Confirm
				</h2>
				<div className="flex justify-evenly w-[80%] mx-auto">
					<Button onclick={() => handleClearAll()}>Confirm</Button>
					<Button
						className="bg-blue-300 flex items-center gap-1"
						onclick={() => setClearConfirmation({ status: false })}
					>
						<TiTimes className="-mb-1" />
						cancel
					</Button>
				</div>
			</Button>
		</div>
	);
};

function Button({ children, className = "bg-[#cd424d]", onclick }) {
	return (
		<button
			className={`text-white font-semibold mx-auto px-4 py-1 rounded-md ${className}`}
			type="button"
			onClick={onclick}
		>
			{children}
		</button>
	);
}

const ClearBTN = ({ setList }) => {
	const [ClearConfirmation, setClearConfirmation] = useState({ status: false });
	return (
		<>
			<Button onclick={() => setClearConfirmation({ status: true })}>
				Clear all
			</Button>
			<Confirmation
				setList={setList}
				ClearConfirmation={ClearConfirmation}
				setClearConfirmation={setClearConfirmation}
			/>
		</>
	);
};

export default ClearBTN;
