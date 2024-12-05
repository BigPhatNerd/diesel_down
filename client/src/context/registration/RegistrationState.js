import React, { useReducer } from 'react'

import RegistrationContext from './registrationContext'
import RegistrationReducer from './registrationReducer'
import axios from 'axios'
import uuid from 'uuid/v4'

import {

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
	CLEAR_PROFILE
} from '../types'

import setAuthToken from '../../utils/setAuthToken'

const RegistrationState = props => {
	const initialState = {
		product: {},
		user: {
			isAuthenticated: false,
			email: '',
			appointments: []

		},
		loading: true,
		alert: [],
		profile: null,
		error: {}
	}


	const [state, dispatch] = useReducer(RegistrationReducer, initialState)





	//Load user
	const loadUser = async () => {

		if (localStorage.token) {
			setAuthToken(localStorage.token)
		}
		try {
			const res = await axios.get('/api/auth');

			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		} catch (err) {

			dispatch({
				type: AUTH_ERROR,
			})
		}
	}
	//login user
	const login = async (email, password) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const body = JSON.stringify({ email, password })
		try {
			const res = await axios.post('/api/auth', body, config)

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			})
			loadUser()
		} catch (err) {
			const errors = err.response?.data?.errors
			if (errors) {
				errors.forEach(error => {

					setAlert(error.msg, 'danger')
				})
			}
			dispatch({
				type: LOGIN_FAIL,
			})
		}
	}
	//logout user

	const logout = () => {

		dispatch({ type: LOGOUT })
		dispatch({ type: CLEAR_PROFILE })
		window.location.reload(false);
	}


	const setAlert = (msg, type) => {
		const id = uuid()

		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id },
		})
		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000)
	}


	const setEmail = email => {
		dispatch({
			type: SET_EMAIL,
			payload: email,
		})
	}

	const setName = name => {
		dispatch({
			type: SET_NAME,
			payload: name,
		})
	}

	//Register user
	const register = async ({
		name,
		email,
		password,

	}) => {

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const body = { name, email, password }

		try {

			setLoading(true)
			const res = await axios.post('/api/users/register', body, config)


			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			})
		} catch (err) {

			const errors = err.response.data.errors
			if (errors) {
				errors.forEach(error => {

					setAlert(error.msg, 'danger')
				})
			}

			dispatch({
				type: REGISTER_FAIL,
			})
		}
	}

	const contactUs = async (formData) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			await axios.post('/api/contact', formData, config);

			return true
		} catch (err) {
			console.error('Error sending contact form:', err);
			setAlert('Failed to send the message. Please try again later.', 'danger');
		}
	};

	//Set Loading
	const setLoading = trueOrFalse => {
		dispatch({
			type: SET_LOADING,
			payload: trueOrFalse,
		})
	}

	return (
		<RegistrationContext.Provider
			value={{
				user: state.user,
				alert: state.alert,
				profile: state.profile,
				error: state.error,
				setAlert,
				register,
				setEmail,
				setName,
				setLoading,
				login,
				logout,
				loadUser,
				contactUs
			}}
		>
			{props.children}
		</RegistrationContext.Provider>
	)
}

export default RegistrationState

//
