//scoreBmvc
class Model {
  constructor(){
    this.players = [
      {
        name: "Jim Hoskins",
        score: 31,
        id: 1,
      },
       {
        name: "Andree Hoskins",
        score: 35,
        id: 2,
      },
       {
        name: "Alena Hoskins",
        score: 42,
        id: 3,
      },
    ];
    this.inputValue = null;
  }

  subscribe(render){
    this.callback = render;
  }

  notify(){
    this.callback();
  }

  NewPlayer(name){
      this.players.push({
        name: this.input.value,
        score:0,
      })
      this.input.value = '';
    
    this.notify();
    this.callback();
  }

  getPlayer(){
    return model.players.length;
  }

  getSum(player){
    this.players[player].score++;
    this.notify();
    this.callback();
  }
  getRest(player){
    this.players[player].score--;
    this.notify();
    this.callback();
  }

  getAllPoints(){
    return model.players.map(player => player.score).reduce((a, b) => a + b);
     /*function AllPoints(players){
      return players.map(player => player.score).reduce((a, b) => a + b);
    }*/ 
  }
}

const Header = ({model}) => {
  return(
      <header className="header">
        <table className="stats">
          <tbody>
            <tr>
              <td>PLAYERS:</td>
              <td>{model.getPlayer()}</td>
            </tr>
            <tr>
              <td>TOTAL POINTS:</td>
              <td>{model.getAllPoints()}</td>
            </tr>
          </tbody>
        </table>
        <div className="scoreTitle">SCOREBOARD</div>
        <Timer />
      </header>
  );
}

class Timer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cont: 0,
      button: 'start'
    }
  }
  startTimer(){
    this.timer = setInterval(() =>{
      this.setState({
        cont: this.state.cont + 1
      });
    },1000);
    this.setState({
      button: 'stop'
    })
  }
 stopTimer(){
  clearInterval(this.timer);
  this.setState({
    button:'start'
  })
}
resetTimer(){
  clearInterval(this.timer);
  this.setState({
    cont:0
  })
}
render() {
  return(
    <div className='stopwatch'>
    <h2>STOPWATCH</h2>
    <div className='stopwatch-time'>{this.state.cont}</div>
    <button onClick={this.state.button==='start'?()=>this.startTimer():()=>this.stopTimer()}>{this.state.button}</button>
    <button onClick={()=>this.resetTimer()}>reset</button>
  </div>
  );
  }
}

const PlayerList = ({model}) => {
  return (
    <div>
      {
        model.players.map((dato, player) => {
          return (<div className='player'>
            <div className='player-name'>{dato.name}</div>
            <div className='player-score counter'>
              <button className='counter-action decrement' onClick={() => model.getRest(player)}>-</button>
              <span className='counter-score'>{dato.score}</span>
              <button className='counter-action increment'onClick={() => model.getSum(player)}>+</button>
            </div>
          </div>)
        })
      }
    </div>
  );
}

const PlayerForm = React.createClass({
  render: function(){
    return (
      <div className="add-player-form">
        <form action="" onSubmit={e => {e.preventDefault();
        model.NewPlayer(name);
        }}>
          <input type="text" placeholder="Enter a name" onChange={e => (model.input = e.target)}/>
          <input type="submit" placeholder="Add Player"/>
        </form>
      </div>
    )
  }
})

const Application = ({ title, model}) => {
  return (
    <div className="container scoreboard">
       <Header model={model}/>
       <PlayerList model={model}/>
       <PlayerForm/>  
    </div>
 );
}

let model = new Model();

let render = () =>{
  ReactDOM.render(<Application title="Scoreboard" model = {model}/>,
  document.getElementById('container'));
}

model.subscribe(render);
render();


