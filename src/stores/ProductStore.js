import alt from '../alt';
import Actions from '../actions';
import {decorate, bind} from 'alt-utils/lib/decorators';

@decorate(alt)
class ProductStore {
	constructor() {
		this.state = {user: null};
	}

	@bind(Actions.login, Actions.initSession, Actions.logout);
	setUser(user) {
		this.setState({user: user});
	}

}

export default alt.createStore(ProductStore);