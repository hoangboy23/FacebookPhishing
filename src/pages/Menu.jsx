import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { faServer } from "@fortawesome/free-solid-svg-icons/faServer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const Menu = ({ setCurrentContent }) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreenWidth = () => {
			if (window.innerWidth < 768) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};
		checkScreenWidth();
		window.addEventListener("resize", checkScreenWidth);
		return () => {
			window.removeEventListener("resize", checkScreenWidth);
		};
	}, []);

	return (
		<div className='bg-indigo-200 sticky w-full'>
			<nav className='bg-white flex justify-between text-indigo-500 shadow-2xl p-2 px-4 text-lg'>
				<div className='flex gap-2'>
					<button
						className='hover:bg-indigo-500 cursor-pointer text-white p-1 px-2 rounded-lg bg-indigo-400'
						onClick={() => setCurrentContent("telegram")}
					>
						<FontAwesomeIcon icon={faTelegram} /> {!isMobile && "Telegram"}
					</button>
					<button
						className='hover:bg-indigo-500 cursor-pointer text-white p-1 px-2 rounded-lg bg-indigo-400'
						onClick={() => setCurrentContent("data")}
					>
						<FontAwesomeIcon icon={faServer} /> {!isMobile && "Data"}
					</button>
					<button
						className='hover:bg-indigo-500 cursor-pointer text-white p-1 px-2 rounded-lg bg-indigo-400'
						onClick={() => setCurrentContent("web")}
					>
						<FontAwesomeIcon icon={faGlobe} /> {!isMobile && "Cấu hình Web"}
					</button>
					<button
						className='hover:bg-indigo-500 cursor-pointer text-white p-1 px-2 rounded-lg bg-indigo-400'
						onClick={() => setCurrentContent("account")}
					>
						<FontAwesomeIcon icon={faUser} /> {!isMobile && "Tài khoản"}
					</button>
				</div>
				<button
					className='hover:bg-indigo-500 cursor-pointer text-white p-1 px-2 rounded-lg bg-indigo-400'
					onClick={() => setCurrentContent("logout")}
				>
					<FontAwesomeIcon icon={faRightFromBracket} />{" "}
					{!isMobile && "Đăng xuất"}
				</button>
			</nav>
		</div>
	);
};
Menu.propTypes = {
	setCurrentContent: PropTypes.func.isRequired,
};
export default Menu;
