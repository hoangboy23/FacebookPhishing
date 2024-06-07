import { useState } from "react";

const Account = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className='flex flex-col w-full justify-center items-center h-screen gap-2 text-indigo-500'>
			<label className='md:w-1/3 w-11/12' htmlFor='username'>
				{username != "" && "Nhập tài khoản"}{" "}
				<input
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					id='username'
					type='text'
					placeholder='Nhập tài khoản'
					className='w-full border border-indigo-500 rounded-lg p-2'
				/>
			</label>
			<label className='md:w-1/3 w-11/12' htmlFor='password'>
				{password != "" && "Nhập mật khẩu"}{" "}
				<input
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					id='password'
					type='password'
					placeholder='Nhập mật khẩu'
					className='w-full border border-indigo-500 rounded-lg p-2'
				/>
			</label>
			<button className='bg-indigo-500 md:w-1/3  w-11/12 rounded-lg p-2 text-white font-bold'>
				Đổi thông tin
			</button>
		</div>
	);
};
export default Account;
