import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Telegram = () => {
	const [apiToken, setApiToken] = useState("");
	const [chatID, setChatID] = useState("");
	const handleSave = async () => {
		if (apiToken === "") {
			toast.warning("Vui lòng nhập APIToken hợp lệ");
		} else if (chatID === "") {
			toast.warning("Vui lòng nhập ChatID hợp lệ");
		} else {
			try {
				const accessToken = document.cookie
					.split("; ")
					.find((row) => row.startsWith("accessToken"))
					.split("=")[1];
				const response = await axios.post(
					"http://localhost:5000/api/set-telegram-config",
					{
						api_token: apiToken,
						chat_id: chatID,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						withCredentials: true,
					},
				);
				if (response.data.status === 200) {
					toast.success("Đã lưu Config Telegram thành công");
				}
			} catch (error) {
				console.log(error.response.data);
				toast.error("Lỗi không xác định");
			}
		}
	};
	useEffect(() => {
		const getTelegramConfig = async () => {
			const response = await axios.get(
				"http://localhost:5000/api/get-telegram-config",
			);
			if (response.status === 200) {
				setApiToken(response.data.api_token);
				setChatID(response.data.chat_id);
			}
		};
		getTelegramConfig();
	}, []);
	return (
		<div className='flex justify-center gap-2 flex-col items-center h-screen text-indigo-500'>
			<label className='md:w-1/3 w-11/12' htmlFor='token'>
				{apiToken != "" && "API Token"}{" "}
				<input
					value={apiToken}
					onChange={(e) => {
						setApiToken(e.target.value);
					}}
					id='token'
					type='text'
					placeholder='API Token'
					className='w-full  border border-indigo-500 rounded-lg p-2'
				/>
			</label>
			<label className='md:w-1/3 w-11/12' htmlFor='chatid'>
				{chatID != "" && "ChatID"}{" "}
				<input
					value={chatID}
					onChange={(e) => {
						setChatID(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSave();
						}
					}}
					type='text'
					className='w-full border border-indigo-500 rounded-lg p-2'
					placeholder='ChatID'
				/>
			</label>
			<button
				className='bg-indigo-500 md:w-1/3  w-11/12 rounded-lg p-2 text-white font-bold'
				onClick={() => {
					handleSave();
				}}
			>
				Lưu lại
			</button>
		</div>
	);
};
export default Telegram;
