class AQI extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			area: [],
			currentCity: '',
			currentTown: '',
			lastUpdate: '',
			currentData: {},
		}
	}

	componentDidMount(){
		this.fetchData();
	}

	async fetchData(){
		const { data } = await axios.get('https://api-proxy.noob.tw/http://opendata.epa.gov.tw/ws/Data/AQI/?$format=json');

		const area = [];

		Array.from(data).forEach((station) => {
			area.push(station.County);
		});

		const d = new Date();

		this.setState({
			data,
			currentCity: data[0].County,
			currentTown: data[0].SiteName,
			currentData: data[0],
			area: Array.from(new Set(area)),
			lastUpdate: `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
		});
	}

	selectCity(e){
		this.setState({
			currentCity: e.target.value,
			currentTown: this.state.data.filter(x => x.County === e.target.value)[0].SiteName,
			currentData: this.state.data.filter(x => x.County === e.target.value)[0],
		});
	}

	selectTown(cityName, townName){
		this.setState({
			currentTown: townName,
			currentData: this.state.data.find(x => (x.County === cityName && x.SiteName === townName)),
		});
	}

	render() {
		return (
		<div className="center">
			<div className="p">
				<header>
					<div className="block-title">
						<h1>空氣品質指標 (AQI)</h1>
						<select onChange={(e) => this.selectCity(e)}>
							{this.state.area.map((x, i) => <option key={i}>{x}</option>)}
						</select>
					</div>
					<table className="example">
						<thead>
							<tr>
								<th className="level1">0~50</th>
								<th className="level2">51~100</th>
								<th className="level3">101~150</th>
								<th className="level4">151~200</th>
								<th className="level5">201~300</th>
								<th className="level6">301~400</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>良好</td>
								<td>普通</td>
								<td>對敏感族群不健康</td>
								<td>對所有族群不健康</td>
								<td>非常不健康</td>
								<td>危害</td>
							</tr>
						</tbody>
					</table>
				</header>
				<div className="wrapper">
					{ this.state.area.length === 0 ? <div>Loading...</div> : <div>
						<div className="title">
							<h2>{this.state.currentCity}</h2>
							<div className="dotdotdot">..................................................................................................................................................</div>
							<div>{this.state.lastUpdate} 更新</div>
						</div>
						<div className="flex">
							<div className="block">
								<Station name={this.state.currentData.SiteName} value={this.state.currentData.AQI}></Station>
								<ul>
									<li>
										臭氧
										<div className="small"> O<sub>3</sub>(ppb)</div>
										<div className="station-value">{this.state.currentData.O3}</div>
									</li>
									<li>
										懸浮微粒
										<div className="small"> PM<sub>10</sub>(μg/m<sup>3</sup>)</div>
										<div className="station-value">{this.state.currentData.PM10}</div>
									</li>
									<li>
										細懸浮微粒
										<div className="small"> PM<sub>2.5</sub>(μg/m<sup>3</sup>)</div>
										<div className="station-value">{this.state.currentData['PM2.5']}</div>
									</li>
									<li>
										一氧化碳
										<div className="small"> CO(ppm)</div>
										<div className="station-value">{this.state.currentData.CO}</div>
									</li>
									<li>
										二氧化硫
										<div className="small"> SO<sub>2</sub>(ppb)</div>
										<div className="station-value">{this.state.currentData.SO2}</div>
									</li>
									<li>
										二氧化氮
										<div className="small"> NO<sub>2</sub>(ppb)</div>
										<div className="station-value">{this.state.currentData.NO2}</div>
									</li>
								</ul>
							</div>
							<div className="grid">
								{this.state.data.filter(x => x.County === this.state.currentCity).map((x, i) =>
									<div key={i} onClick={
										() => {console.log('a');this.selectTown(x.County, x.SiteName);}
									}>
										<Station name={x.SiteName} value={x.AQI} ></Station>
									</div>
								)}
							</div>
						</div>
					</div>}
				</div>
			</div>
			<footer>
				<div className="left">資料來源：行政院環境保護署</div>
				<div className="copyright">Copyright © 2019 HexSchool. All rights reserved.</div>
			</footer>
		</div>
		);
	}
}

const Station = (props) => {
	let level = 1;
	if (props.value >= 301) {
		level = 6;
	} else if (props.value >= 201) {
		level = 5;
	} else if (props.value >= 151) {
		level = 4;
	} else if (props.value >= 101) {
		level = 3;
	} else if (props.value >= 51) {
		level = 2;
	}
	return <div className="box">
		<div className="name">{props.name}</div>
		<div className={`value level${level}`}>{props.value}</div>
	</div>
}

function render() {
	ReactDOM.render(
		<AQI />,
		document.getElementById('root')
	);
}

render();