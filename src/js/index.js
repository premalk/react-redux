import {render} from 'react-dom';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import axios from 'axios';
import reduxThunk from 'redux-thunk';



/*const mapDispatch = dispatch => ({   
	actionCreatorDemo: msg => {dispatch(actionCreatorDemo(msg))}
});*/

const ADD_NAME = 'ADD_NAME';
const ADD_AXIOS = 'ADD_AXIOS';

//const actionCreatorDemo = values => ({type:'ADD_NAME',data:values});

const initialStates = { name:[] };

const API_URL = 'https://api.github.com/search/users?q=language:javascript+location:lagos&sort=repositories&order=desc';

const rootReducer = (state = initialStates, action) => {
	
	const a = action.data;
	
	switch(action.type){
		case ADD_NAME:
			return { name: [...state.name,a]};
		case ADD_AXIOS:
			return { name: [action.da]};
		default:
			return state;
	}
};

// Axios Call in Redux
function testAxiosFunction(){
	return function(dispatch){
		axios.get(API_URL).then(response => {
			dispatch({ type:'ADD_AXIOS', data:response.data });
		})

	}
}

//const store = createStore(rootReducer);
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

store.subscribe (function () {
	//console.log( store.getState() );
});

class Main extends Component {
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event){
		event.preventDefault();
		//let name = this.refs.name.value;
		this.props.dispatch(testAxiosFunction());
	}
	render(){
		return(
			
			<div>
				<form onSubmit = {this.handleSubmit}>
					<div>
						<input type = 'text' id = 'name' ref = 'name' />
						<button type = 'submit'>Submit</button>
					</div>
					<div>
						{//this.props.name[0]
						}

                        { JSON.stringify(this.props) }

					</div>
				</form>
			</div>
			);
	}
}

function mapDispatchToProps(dispatch){
	return { actions:testAxiosFunction,dispatch }
}

function mapStateToProps(state){
	//console.log(state);
	return {name:state.name}
}

const Main2 = connect(mapStateToProps,mapDispatchToProps)(Main);


render(<Provider store={store}><Main2 /></Provider>,document.querySelector('#main'));

