import {
	SET_SELECTED_PRODUCT,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	SET_LOADING,
	SET_ALERT,
	REMOVE_ALERT,
	SET_EMAIL,
	SET_NAME,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	GET_PROFILE,
	UPDATE_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE
} from '../types';

const RegistrationReducer = (state, action) => {

	switch (action.type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false
			};
		case PROFILE_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				loading: false,
				user: {
					isAuthenticated: false,
					email: '',

				}
			}
		case SET_SELECTED_PRODUCT:
			return {
				...state,
				product: action.payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				user: {
					...state.user,
					email: action.payload.email,
					isAuthenticated: true,


				},
				loading: false,
				alert: []

			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: {
					...state.user,
					isAuthenticated: false,

				},
				loading: false
			};
		case SET_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case SET_ALERT:
			return {
				...state,
				alert: [...state.alert, action.payload]
			};
		case REMOVE_ALERT:
			return {
				...state,
				alert: state.alert.filter(alert => alert.id !== action.payload)
			};
		case SET_EMAIL:
			return {
				...state,
				user: {
					...state.user,
					email: action.payload,

				}
			};
		case SET_NAME:
			return {
				...state,
				user: {
					...state.user,
					name: action.payload,

				}
			};

		case USER_LOADED:
			return {
				...state,
				user: {
					...state.user,
					appointments: action.payload?.appointments || [],
					isAuthenticated: true,
					email: action.payload?.email,

				}
			}

		default:
			return state
	}
}

export default RegistrationReducer