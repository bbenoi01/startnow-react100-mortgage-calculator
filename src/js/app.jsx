import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    
    this.state = {
      balanceInput: '',
      rateInput: '',
      termSelect: '15',
      pmtOutput: '',
    }

    this.updatebalanceInput = this.updatebalanceInput.bind(this);
    this.updaterateInput = this.updaterateInput.bind(this);
    this.updatetermSelect = this.updatetermSelect.bind(this);
    this.calculatePmt = this.calculatePmt.bind(this);
  }

  

  updatebalanceInput(e) {
    this.setState({balanceInput: e.target.value})
  }

  updaterateInput(e) {
    this.setState({rateInput: e.target.value})
  }

  updatetermSelect(e) {
    this.setState({termSelect: e.target.value})
  }

  calculatePmt(e) {

    e.preventDefault();
    var balance = this.state.balanceInput;
    var rate = ((this.state.rateInput / 100) / 12);
    var term = this.state.termSelect * 12;
    var topEq = rate * (Math.pow((rate + 1), term));
    var btmEq = (Math.pow((1 + rate), term)) - 1;
    var mthlyPmt = (balance * (topEq / btmEq)).toFixed(2);
    var pmtOutput = '$' + mthlyPmt + ' is your payment.'

    this.setState({pmtOutput});

  }

  render() {
    return (
      <div className='container'>
        {/* your JSX goes here */}
        <div className='col-sm-offset-2 col-sm-10'>
          <div className="page-header">
            <h3>Mortgage Calculator</h3>
          </div>
        </div> 
        <form className='form-horizontal' onSubmit={this.calculatePmt} >
          <div className='form-group'>
            <label htmlFor='balance' className='col-sm-2 control-label'>Loan Balance</label>
            <div className='col-sm-10'>
              <input type='number' name='balance' className='form-control' id='balance' onChange={this.updatebalanceInput} value={this.state.balanceInput} />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='rate' className='col-sm-2 control-label'>Interest Rate (%)</label>
            <div className='col-sm-10'>
              <input type='number' name='rate' className='form-control' step='0.01' id='rate' onChange={this.updaterateInput} value={this.state.rateInput} />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='term' className='col-sm-2 control-label'>Loan Term (years)</label>
            <div className='col-sm-10'>
              <select name='term' className='form-control' id='term' onChange={this.updatetermSelect} value={this.state.termSelect}>
                <option value='15'>15</option>
                <option value='30'>30</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button type='submit' name='submit' className='btn btn-primary'>Calculate</button>
            </div>
          </div>
          <h3 id='output' name='output'>
            <p>{this.state.pmtOutput}</p>
          </h3>
        </form>
      </div>
    );
  }
}
