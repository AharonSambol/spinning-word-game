import { useState } from 'react'
import './App.css'
import words from './words';

function App() {
	const [wordLen, setWordLen] = useState(6);
	const [wordCount, setWordCount] = useState(4);
	const [words, setWords] = useState(undefined);
	const [orders, setOrders] = useState(undefined);
	if(words === undefined) {
		setWords(CreateWords(wordLen, wordCount));
		return <></>;
	}
	if(orders === undefined) {
		setOrders(CreateRandOrder(wordLen, wordCount));
		return <></>;
	}
	console.log(wordCount, wordLen);

	let wl = Array.from({ length: wordLen }, (_, i) => i);
	let wc = Array.from({ length: wordCount }, (_, i) => i);

	return (<div style={{fontSize: "2.5em", fontFamily: "monospace"}}>
		<div style={{fontSize: "0.6em"}}>
			<form onSubmit={(e) => e.preventDefault() }>
			Amount of words: <input type='number' onKeyDown={(event) => {
				if(event.key === 'Enter' && Number(event.target.value) > 1) {
					setWordCount(Number(event.target.value));
					setOrders(undefined);
					setWords(undefined);
				}
			}}></input>
			</form>
		</div>
		<div style={{fontSize: "0.6em"}}>
			Length of words: <input type='number' onKeyDown={(event) => {
				if(event.key === 'Enter' && Number(event.target.value) > 1 && Number(event.target.value) < 11) {
					setWordLen(Number(event.target.value));
					setOrders(undefined);
					setWords(undefined);
				}
			}}></input>
		</div>
		
		<button style={{fontSize: "1em"}} onClick={() => {
			setWords(CreateWords(wordLen, wordCount));
			setOrders(CreateRandOrder(wordLen, wordCount));
		}}>New Game</button>

		<br/>
		<br/>
		
		<div>{isCorrect(orders) ? "You Win!" : ""}</div>
		<div style={{display: "flex"}}>
			{wl.map(i => 
				<button key={i} style={{padding: "1em", border: "solid"}} onClick={() => {
					let newOrders = [...orders];
					newOrders[i] = [...orders[i].slice(1), orders[i][0]];
					setOrders(newOrders);
				}}>^</button>
			)}
		</div>
		<div style={{display: "flex"}}>
			{wl.map(i => 
				<div style={{padding: "1em", border: "solid"}} className='row' key={i}>
					{wc.map(j => <>
						{ words[i][orders[i][j]] } { j < (wordCount - 1) ? <><br/><br/></> : <></> }
					</>)}
				</div>
			)}		
		</div>
		<div style={{display: "flex"}}>
			{wl.map(i => 
				<button key={i} style={{padding: "1em", border: "solid"}} onClick={() => {
					let newOrders = [...orders];
					newOrders[i] = [orders[i][orders[i].length - 1], ...orders[i].slice(0, -1)];
					setOrders(newOrders);
				}}>v</button>
			)}
		</div>
		<br/>

	</div>)
}

function isCorrect(order) {
	for (let col = 0; col < order[0].length; col++) {
		const first = order[0][col];
		for (let row = 1; row < order.length; row++) {
			if(order[row][col] != first) {
				console.log(order, order[row][col], first);
				return false;
			}
		}
	}
	return true;
}


function CreateWords(len, count) {
	let wordsByLen = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
	words.forEach(word => {
		wordsByLen[word.length].push(word);
	});

	const wordsOfLen = wordsByLen[len];
	const origChosenWords = Array.from({ length: count }, () => wordsOfLen[Math.floor(Math.random() * wordsOfLen.length)]);
	origChosenWords.forEach(x => console.log(x));
	const chosenWords = Array.from({ length: len }, (_, j) =>
		origChosenWords.map(word => word[j])
	);
	return chosenWords;
}

function CreateRandOrder(len, count) {
	let res = [];

	for (let j = 0; j < len; j++) {
		let choices = Array.from({ length: count }, (_, i) => i);
		const idx = Math.floor(Math.random() * count);
		let newChoices = [...choices.slice(idx, count), ...choices.slice(0, idx)];
		res.push(newChoices);
	}
	console.log(res);
	return res;

}

export default App
