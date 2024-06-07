import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Admin = () => {
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const goToDashboard = useNavigate();
	useEffect(() => {
		usernameRef.current?.focus();
	}, []);

	const handleLogin = async () => {
		try {
			if (username === "") {
				toast.warning("Chưa nhập tài khoản!");
				usernameRef.current?.focus();
			} else if (password === "") {
				toast.warning("Chưa điền mật khẩu");
				passwordRef.current?.focus();
			} else {
				const response = await axios.post(
					"http://localhost:5000/api/login",
					{
						username,
						password,
					},
					{ withCredentials: true },
				);
				document.cookie = `accessToken=${response.data.access_token}`;
				if (response.status === 200) {
					toast.success("Đăng nhập thành công!");
					goToDashboard("/dashboard");
				}
			}
		} catch (error) {
			if (error.response) {
				console.log(error.response.data);
				toast.warning(error.response.data.msg);
			} else if (error.request) {
				setErrorMessage("Lỗi kết nối");
			} else {
				setErrorMessage("Lỗi không xác định");
			}
		}
	};

	return (
		<div className='w-full flex justify-center items-center min-h-screen gap-2 flex-col'>
			<Helmet>
				<title>Đăng nhập</title>
			</Helmet>
			<div>
				<input
					ref={usernameRef}
					className='border border-indigo-500 rounded-lg p-2'
					type='text'
					placeholder='Tài khoản'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<input
					ref={passwordRef}
					className='border border-indigo-500 rounded-lg p-2'
					type='password'
					placeholder='Mật khẩu'
					value={password}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleLogin();
						}
					}}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button
				className='bg-indigo-500 rounded-lg p-2 text-white font-bold'
				onClick={handleLogin}
			>
				Đăng nhập
			</button>
			{errorMessage && <p className='text-red-500'>{errorMessage}</p>}
		</div>
	);
};

export default Admin;
