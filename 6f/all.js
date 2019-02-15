class Start extends React.Component {
	render(){
		return (
			<div className="main">
				<h1>
					<div className="sixty">60</div>
					<div className="seconds">
						Seconds<br />
						Challenge
						<div className="operator">+−×÷</div>
					</div>
				</h1>
				<div className="start" onClick={() => {this.props.onStart()}}>
					START!
				</div>
				<div className="desc">
				try to answer more as you can
				</div>
			</div>
		)
	}
}

class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			time: '1:00',
			time_: 60,
			num1: '',
			num2: '',
			op: '',
			op_: '',
			score: 0,
			answer: '',
			interval: 0,
		}
	}

	componentDidMount(){
		this.nextQuiz();
		const interval = setInterval(() => {
			this.tick();
		}, 1000)
		this.setState({
			interval,
		});
	}

	generateNum(){
		const time = this.state ? this.state.time_ : 60;
		if(time > 40 && time <= 60) {
			return Math.floor(Math.random() * 9 + 1);
		} else if (time > 20) {
			return Math.floor(Math.random() * 90 + 9);
		} else {
			return Math.floor(Math.random() * 900 + 99);
		}
	}

	generateOp(){
		let v = Math.floor(Math.random() * 4);
		let v_ = '+';
		if (v === 0) {
			v = '+';
			v_ = '+';
		} else if (v === 1) {
			v = '-';
			v_ = '-';
		} else if (v === 2) {
			v = '×';
			v_ = '*';
		} else {
			v = '÷';
			v_ = '/';
		}
		return {
			v,
			v_,
		};
	}

	tick(){
		if (this.state.time_ > 1) {
			this.setState({
				time_: this.state.time_ - 1,
				time: `0:${(this.state.time_ -1).toString().padStart(2, '0')}`,
			});
		} else {
			this.props.onEnd(this.state.score);
			clearInterval(this.state.interval);
		}
	}

	nextQuiz(){
		const op = this.generateOp();
		this.setState({
			num1: this.generateNum(),
			num2: this.generateNum(),
			op: op.v,
			op_: op.v_,
			answer: '',
		});
	}

	onChange(v){
		this.setState({
			answer: v,
		});
	}

	submit(e){
		if (e.key === 'Enter') {
			const input = parseInt(e.target.value, 10);
			const answer = eval(`${this.state.num1}${this.state.op_}${this.state.num2}`);
			if (input === answer) {
				let score = this.state.score;
				if (this.state.time_ >= 20) {
					score += 1;
				} else {
					score += 2;
				}
				this.setState({
					score,
				});
			} else {
				this.setState({
					score: this.state.score -1,
				});
			}
			this.nextQuiz();
		}
	}

	render(){
		return (
			<div className="wrapper">
				<div className="title">60 Seconds Challenge</div>
				<div className="score-wrapper">
					<div className="s">SCORE</div>
					<div className="n">{ this.state.score >= 0 ? this.state.score.toString().padStart(3, 0) : this.state.score}</div>
				</div>
				<div className="time">{this.state.time}</div>
				<div className="topic">
					<div className="num">{this.state.num1}</div>
					<div className="op">{this.state.op}</div>
					<div className="num">{this.state.num2}</div>
					<div className="op">=</div>
					<div className="answer">
						<input type="text" autoComplete="off" className="input"
							value={this.state.answer} onChange={(e) => {this.onChange(e.target.value)}}
							onKeyPress={(e) => {this.submit(e)}} />
						<div className="clue">press enter to answer</div>
					</div>
				</div>
			</div>
		)
	}
}

class End extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		return (
			<div className="final">
				<h1>
					<div className="title">60 Seconds Challenge</div>
					<div className="final-text">
						<div className="final-text-wrapper">
							<span className="b b-left"></span>
							YOUR FINAL SCORE
							<span className="b b-right"></span>
						</div>
					</div>
				</h1>
				<div className="score">{this.props.score}</div>
				<div className="start try-again" onClick={() => {this.props.onRestart()}}>
					TRY AGAIN!
				</div>
			</div>
		)
	}
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			status: 0,
		}
	}

	onStart(){
		this.setState({status: 1});
	}

	onRestart(){
		this.setState({
			status: 0,
			score: 0,
		});
	}

	onEnd(score){
		this.setState({
			score,
			status: 2,
			time: '1:00',
			time_: 60,
		});
	}

	render(){
		return <div>
			{this.state.status === 0 ? <Start onStart={() => {this.onStart()}}/> : null}
			{this.state.status === 1 ? <Game onEnd={(score) => {this.onEnd(score)}} /> : null}
			{this.state.status === 2 ? <End onRestart={() => {this.onRestart()}} score={this.state.score}/> : null}
		</div>
	}
}

function render() {
	ReactDOM.render(
		<App/>,
		document.getElementById('root')
	);
}

render();