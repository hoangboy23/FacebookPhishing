import { useEffect, useState } from "react";

const AimTrainingGame = () => {
	const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [missedShots, setMissedShots] = useState(0);

	useEffect(() => {
		const moveTarget = () => {
			const newX = Math.random() * 90;
			const newY = Math.random() * 90;
			setTargetPosition({ x: newX, y: newY });
		};

		const checLive = setInterval(() => {
			if (!gameOver) {
				if (missedShots >= 3) {
					setGameOver(true);
				}
			}
		}, 0);

		const gameLoop = setInterval(() => {
			moveTarget();
		}, 2000);

		return () => {
			clearInterval(gameLoop);
			clearInterval(checLive);
		};
	}, [gameOver, missedShots]);

	useEffect(() => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
		});
	}, []);

	const shoot = (e) => {
		if (!gameOver) {
			const clickX = e.clientX;
			const clickY = e.clientY;
			const distance = Math.sqrt(
				Math.pow(clickX - (targetPosition.x * window.innerWidth) / 100, 2) +
					Math.pow(clickY - (targetPosition.y * window.innerHeight) / 100, 2),
			);
			if (distance < 50) {
				setScore(score + 1);
				moveTarget();
			} else {
				setMissedShots(missedShots + 1);
			}
		}
	};

	const restartGame = () => {
		setScore(0);
		setMissedShots(0);
		setGameOver(false);
	};

	const getRandomCoordinates = () => {
		const x = Math.random() * 90;
		const y = Math.random() * 90;
		return { x, y };
	};
	const moveTarget = () => {
		const { x, y } = getRandomCoordinates();
		setTargetPosition({ x, y });
	};

	return (
		<button
			className='text-indigo-500 relative w-full h-screen cursor-default'
			onClick={shoot}
		>
			<div
				className='absolute text-3xl cursor-crosshair'
				style={{
					top: `${targetPosition.y}vh`,
					left: `${targetPosition.x}vw`,
				}}
			>
				{!gameOver && "🎯"}
			</div>
			{gameOver && (
				<div className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center absolute text-xl'>
					<h2>Bạn thua!</h2>
					<p>Điểm số: {score}</p>
					<button onClick={restartGame}>Chơi lại</button>
				</div>
			)}
			<div className='absolute top-2.5 right-2.5 text-xl'>
				❤️ Mạng: {3 - missedShots}
				<br />
				🥅 Điểm: {score}
			</div>
		</button>
	);
};

export default AimTrainingGame;
