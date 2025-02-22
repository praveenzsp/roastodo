import Button from "./GetStartedButton";


export default function Hero() {


	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-8xl font-extrabold mb-2"> Welcome to RoasTodo</h1>
			<p className="text-lg text-gray-400 mb-4">Zero tolerance when it comes to unfinished tasks</p>
			<Button text="Get Started" />
		</div>
	);
}