import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Config = () => {
	const [incorrectPasswordAttempts, setIncorrectPasswordAttempts] = useState(0);
	const [incorrectOtpAttempts, setIncorrectOtpAttempts] = useState(0);
	const [delayTime, setDelayTime] = useState(0);
	useEffect(() => {
		const getCurrentConfig = async () => {
			try {
				const accessToken = document.cookie
					.split("; ")
					.find((row) => row.startsWith("accessToken"))
					.split("=")[1];
				const response = await axios.get(
					"http://localhost:5000/api/get-website-config",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						withCredentials: true,
					},
				);
				if (response.data) {
					setIncorrectPasswordAttempts(
						response.data.incorrect_password_attempts,
					);
					setIncorrectOtpAttempts(response.data.incorrect_otp_attempts);
					setDelayTime(response.data.delay_time);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getCurrentConfig();
	}, []);
	const handleSave = async () => {
		try {
			const accessToken = document.cookie
				.split("; ")
				.find((row) => row.startsWith("accessToken"))
				.split("=")[1];
			const response = await axios.post(
				"http://localhost:5000/api/set-website-config",
				{
					incorrect_password_attempts: incorrectPasswordAttempts,
					incorrect_otp_attempts: incorrectOtpAttempts,
					delay_time: delayTime,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			if (response.status === 200) {
				toast.success("Đã lưu config thành công");
			}
		} catch (error) {
			toast.error("Lỗi không xác định");
			console.log(error);
		}
	};
	return (
		<div className='flex justify-center w-full items-center h-screen text-indigo-500'>
			<div className='md:w-1/3 w-11/12 flex flex-col gap-2'>
				<label className='flex flex-col w-full' htmlFor='password'>
					{incorrectPasswordAttempts != "" && "Số lượt nhập mật khẩu"}{" "}
					<input
						value={incorrectPasswordAttempts}
						onChange={(e) => {
							setIncorrectPasswordAttempts(e.target.value);
						}}
						type='number'
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSave();
							}
						}}
						id='password'
						placeholder='Số lượt nhập mật khẩu'
						className='w-11/12 border border-indigo-500 rounded-lg p-2'
					/>
				</label>
				<label className='flex flex-col w-full' htmlFor='code'>
					{incorrectOtpAttempts != "" && "Số lượt nhập code"}{" "}
					<input
						value={incorrectOtpAttempts}
						onChange={(e) => {
							setIncorrectOtpAttempts(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSave();
							}
						}}
						id='code'
						type='number'
						placeholder='Số lượt nhập code'
						className='w-11/12 border border-indigo-500 rounded-lg p-2'
					/>
				</label>
				<label className='flex flex-col w-full' htmlFor='time'>
					{delayTime != "" && "Thời gian delay"}{" "}
					<input
						value={delayTime}
						onChange={(e) => {
							setDelayTime(e.target.value);
						}}
						type='number'
						id='time'
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSave();
							}
						}}
						placeholder='Thời gian delay'
						className='w-11/12 border border-indigo-500 rounded-lg p-2'
					/>
				</label>
				<button
					className='w-11/12 bg-indigo-500 rounded-lg p-2 text-white font-bold'
					onClick={() => {
						handleSave();
					}}
				>
					Lưu lại
				</button>
			</div>
		</div>
	);
};
export default Config;
