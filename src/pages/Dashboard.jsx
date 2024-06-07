import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Favicon from "../public/favicon.ico";
import Account from "./Account";
import AimTrainingGame from "./AimTrainingGame";
import Config from "./Config";
import Data from "./Data";
import Menu from "./Menu";
import ModalLogout from "./ModalLogout";
import Telegram from "./Telegram";

const Dashboard = () => {
	const [currentContent, setCurrentContent] = useState("");
	const [showGoTop, setShowGoTop] = useState(false);
	const handleContentChange = (content) => {
		setCurrentContent(content);
	};
	const navigate = useNavigate();

	const goTo = (url) => {
		window.location.href = url;
	};
	useEffect(() => {
		const getStateLogin = async () => {
			try {
				const accessToken = document.cookie
					.split("; ")
					.find((row) => row.startsWith("accessToken"))
					.split("=")[1];
				const response = await axios.get(
					"http://localhost:5000/api/get-state-login",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						withCredentials: true,
					},
				);
				if (response.status === 200) {
					return;
				} else {
					toast.warning("Vui lòng đăng nhập lại!");
					navigate("/admin");
				}
			} catch (error) {
				toast.warning("Vui lòng đăng nhập lại!");
				navigate("/admin");
			}
		};
		getStateLogin();
	}, [currentContent, navigate]);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const currentScrollPosition = window.scrollY;
			if (currentScrollPosition > 0) {
				setShowGoTop(true);
			} else {
				setShowGoTop(false);
			}
		});
		return window.removeEventListener("scroll", () => {
			const currentScrollPosition = window.scrollY;
			if (currentScrollPosition > 10) {
				setShowGoTop(true);
			} else {
				setShowGoTop(false);
			}
		});
	});
	return (
		<div>
			<Helmet>
				<title>Dashboard</title>
				<link rel='shortcut icon' href={Favicon} type='image/x-icon' />
			</Helmet>
			<Menu setCurrentContent={handleContentChange} />
			<div className='fixed bottom-2 z-50 right-2 text-indigo-500 font-bold flex-col flex'>
				<button
					onClick={() => {
						goTo("https://t.me/tripleseven190504");
					}}
				>
					<FontAwesomeIcon icon={faTelegram} /> @tripleseven190504
				</button>
				<button
					onClick={() => {
						goTo("https://facebook.com/tripleseven190504");
					}}
				>
					<FontAwesomeIcon icon={faFacebook} /> @tripleseven190504
				</button>
			</div>
			{currentContent && showGoTop && (
				<button
					className='fixed top-1/2 right-2 rounded-full bg-indigo-500 text-white px-4 py-2'
					onClick={() => {
						window.scrollTo({
							top: 0,
							left: 0,
							behavior: "smooth",
						});
					}}
				>
					<FontAwesomeIcon icon={faCaretUp} />
				</button>
			)}
			{currentContent === "telegram" && <Telegram />}
			{currentContent === "data" && <Data />}
			{currentContent === "web" && <Config />}
			{currentContent === "account" && <Account />}
			{currentContent === "" && <AimTrainingGame />}
			{currentContent === "logout" && (
				<ModalLogout close={handleContentChange} />
			)}
		</div>
	);
};

export default Dashboard;
