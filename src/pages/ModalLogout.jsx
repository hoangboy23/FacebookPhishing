import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ModalLogout = ({ close }) => {
	const navigate = useNavigate();
	const LogOut = async () => {
		try {
			const accessToken = document.cookie
				.split("; ")
				.find((row) => row.startsWith("accessToken"))
				.split("=")[1];
			await axios.post(
				"http://localhost:5000/api/logout",
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			toast.success("Đã đăng xuất");
			navigate("/admin");
		} catch (error) {
			navigate("/admin");
		}
	};
	return (
		<div className='fixed top-0 left-0 text-indigo-500 justify-center items-center flex h-screen w-full bg-black bg-opacity-20'>
			<div className='bg-white flex-col shadow-2xl border rounded-lg p-3  w-8/12 md:w-1/3'>
				<b>Bạn có muốn đăng xuất?</b>
				<div className='flex w-full justify-center items-center gap-2 mt-2'>
					<button
						className='w-1/2 bg-indigo-500 text-white rounded-lg p-1 hover:bg-indigo-600'
						onClick={() => {
							LogOut();
						}}
					>
						Đăng xuất
					</button>
					<button
						className='w-1/2 bg-indigo-500 text-white rounded-lg p-1 hover:bg-indigo-600'
						onClick={() => {
							close("");
						}}
					>
						Hủy bỏ
					</button>
				</div>
			</div>
		</div>
	);
};
ModalLogout.propTypes = {
	close: PropTypes.func.isRequired,
};
export default ModalLogout;
