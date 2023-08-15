import { useEffect, useRef, useState } from "react";
import Alert from "./Alert";
import { IoIosListBox } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import ClearBTN from "./ClearBTN";

//! Components
function ListItem({
	id,
	index,
	name,
	logDate,
	list,
	setList,
	showAlert,
	setName,
	inputContainerRef,
	setIsEditing,
}) {
	const handleRemove = (id) => {
		const newList = list.filter((list) => list.id !== id);
		setList(newList);
		showAlert(true, "Item Removed", "danger");
	};

	const handleEdit = (id, index) => {
		setIsEditing({ status: true, id: id, index: index });
		setName(list[index].name);
		inputContainerRef.current.focus();
	};

	return (
		<div className="flex justify-between flex-wrap md:flex-nowrap">
			<h2 className="font-bold text-[#69dce8] tracking-wide capitalize mr-7">
				{logDate}
			</h2>
			<h2 className="font-bold text-[#69dce8] tracking-wide capitalize">
				{name} Litres
			</h2>

			{/* //? Data changing buttons */}
			<div className="flex gap-4 w-full sm:w-auto  justify-center sm:justify-normal mt-4 sm:mt-0">
				<button
					className=" px-2 py-1 bg-[#00e8ad] rounded-md text-white"
					type="button"
					onClick={() => handleEdit(id, index)}
				>
					<TbEdit className="text-[#171c2a]" />
				</button>
				<button
					className="px-2 py-1 bg-red-500 rounded-md text-white"
					type="button"
					onClick={() => handleRemove(id)}
				>
					<MdDelete />
				</button>
			</div>
		</div>
	);
}

//! Main Component
const LetListApp = () => {
	//! Local storage
	const getLocalStorage = () => {
		let list = localStorage.getItem("list");
		if (list) {
			return JSON.parse(list);
		} else {
			return [];
		}
	};

	const inputContainerRef = useRef(null);
	//! states
	const [name, setName] = useState("");
	const [list, setList] = useState(getLocalStorage());
	const [totalLitreAmount, setTotalLitreAmount] = useState(0);
	const [isEditing, setIsEditing] = useState({
		status: false,
		id: "",
		index: "",
	});
	const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

	//! Event Handlers
	const handleInput = (e) => {
		const inputValue = e.target.value;
		setName(inputValue);
	};

	const showAlert = (show = false, msg = "", type = "") => {
		setAlert({
			show,
			msg,
			type,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name) {
			// display alert
			showAlert(true, "Empty Value Can't be logged", "danger");
		} else if (name && isEditing.status) {
			// My own alternative code.
			// const newList = list.filter((item) => item.id !== isEditing.id);
			// const newName = { id: isEditing.id, name: name };
			// setList([...newList, newName]);
			setList(
				list.map((item) => {
					if (item.id === isEditing.id) {
						return { ...item, name: name };
					} else {
						return item;
					}
				})
			);
			showAlert(true, "Log Edited", "safe");
			setName("");
			setIsEditing({ status: false, id: "", index: "" });
		} else {
			const date = new Date();
			const logDate =
				date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
			const newList = { id: crypto.randomUUID(), name, logDate };

			setList([...list, newList]);

			setName("");
			showAlert(true, "Log Added", "safe");
		}
		inputContainerRef.current.focus();
	};

	//? local Storage
	useEffect(() => {
		// LocalStorage
		localStorage.setItem("list", JSON.stringify(list));
	}, [list]);

	//? Total Litres
	useEffect(() => {
		const totalLitres = () => {
			//
			if (list.length > 0) {
				let total = 0;
				for (let x of list) {
					total += Number(x.name);
				}
				return total;
			} else {
				return 0;
			}
		};
		console.log("amount" + totalLitres());
		setTotalLitreAmount(totalLitres());
	}, [list]);

	return (
		<div className="gap-3 bg-[#0f172a] shadow-2xl px-8 py-6 rounded-md w-[80vw] max-w-[600px] flex flex-col items-center">
			{alert.show && (
				<Alert
					className="md:self-end"
					alert={alert}
					showAlert={showAlert}
					list={list}
				/>
			)}
			<h2 className="text-3xl font-sans text-[#ffd866] font-bold mb-4 flex justify-evenly items-center gap-2">
				<IoIosListBox className="-mb-1" />
				Milk Man
			</h2>
			<form
				className=" flex w-full"
				onSubmit={handleSubmit}
			>
				<input
					ref={inputContainerRef}
					className={`placeholder:text-[#1d8c9f] placeholder:font-bold border-2 border-r-0 ${
						isEditing.status ? "border-[#00e8ad]" : "border-[#ffd866]"
					} rounded-l-md px-2 py-1 bg-[#11141f] text-[#69dce8] font-bold w-[80%] grow`}
					type="number"
					value={name}
					onChange={handleInput}
					placeholder="Ex. 2 litres"
				/>
				<button
					className={`px-3 py-1 ${
						isEditing.status ? "bg-[#00e8ad]" : "bg-[#ffd866]"
					} rounded-r-md font-semibold text-[#171c2a]`}
				>
					{isEditing.status ? "Edit" : "Log"}
				</button>
			</form>
			<div className="flex flex-col w-full gap-5 my-7">
				{list.map((item, index) => {
					return (
						<>
							<div
								key={index}
								className="flex flex-row justify-between"
							>
								<h2 className="font-sans font-bold text-[#ffe266] mr-1">
									{index + 1}.
								</h2>
								<div className="basis-[96%] shrink">
									<ListItem
										key={item.id}
										{...item}
										list={list}
										setList={setList}
										showAlert={showAlert}
										setName={setName}
										index={index}
										inputContainerRef={inputContainerRef}
										setIsEditing={setIsEditing}
									/>
								</div>
							</div>
							{index === list.length - 1 ? null : (
								<hr className="border-t-[1px]" />
							)}
						</>
					);
				})}
				{list.length > 1 && (
					<>
						<hr className="border-t-[2px] border-[#00e8ad] mt-10" />
						<div className="flex justify-end w-full">
							<h2 className="text-[#00e8ad]  font-bold">
								Total <span className="text-xs">Litres</span> :
								<span className="text-2xl text-[#00e8ad] ml-2">
									{totalLitreAmount}
								</span>{" "}
							</h2>
						</div>
					</>
				)}
				{list.length > 0 && (
					<>
						<div className="mb-5"></div>
						<ClearBTN setList={setList} />
					</>
				)}
			</div>
		</div>
	);
};

export default LetListApp;
