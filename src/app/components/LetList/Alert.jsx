import { useEffect } from "react";

const Alert = ({ alert, showAlert, list, className }) => {
	useEffect(() => {
		const removeAlert = setTimeout(() => {
			showAlert();
		}, 2000);
		return () => clearTimeout(removeAlert);
	}, [list]);
	return (
		<div
			className={`flex justify-center items-center text-sm font-semibold rounded-md px-4 py-1 ${className} ${
				alert.type === "safe"
					? "bg-[#69dce8] text-[#171c2a]"
					: "bg-[#cd424d] text-white"
			}`}
		>
			{alert.msg}
		</div>
	);
};

export default Alert;
