import { AUTH, LOGINERROR, REGERROR, UPDATESTATUS, GETAUTHUSER, UPDATEIMAGEFILE } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const updateImageFile = (formData) => async (disptach) => {
  
  console.log(formData)
  
  try {
    
  } catch (error) {
    
  }
}

export const getAuthUser = (formData) => async (dispatch) => {
  
  try {
    const { data } = await api.getAuthUser(formData);
    dispatch({ type: GETAUTHUSER, data });
  } catch (error) {
    console.log(error);
  }

}

export const updateStatus = (formData) => async (dispatch) => {
  
  console.log(formData)
  try {
    const { data } = await api.updateStatus(formData);
  } catch (error) {
    console.log(error);
  }
}

export const login = (formData, navigation) => async (dispatch) => {
  try {
    
    const { data } = await api.login(formData);
    dispatch({ type: AUTH, data });
    navigation.navigate("Home",{
      userId: data.result._id,
  });

  } catch (error) {
    console.log(error);
    dispatch({ type: LOGINERROR, error})
  }
};

export const registration = (formData, navigation) => async (dispatch) => {
  try {

    const { data } = await api.registration(formData);
    
    dispatch({ type: AUTH, data });
    navigation.navigate("Home")

  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: REGERROR, error})
  }
};
