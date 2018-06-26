import { observable } from 'mobx'
import axios from 'axios'
import {
  AsyncStorage,
  Alert
} from 'react-native';

class IgClone {
  @observable posts = 'ssss'

  login = (email, password) => {

    return new Promise ((resolve, reject) => {
      console.log(email, password);
      
      axios.post('http://35.240.143.97/users/login', {
        email: email,
        password: password
      })
      .then((res) => {
        AsyncStorage.setItem('token', res.headers.token)
        .then(stored => {
          resolve()
        })
      })
      .catch((error) => {
        Alert.alert('Password atau Email anda salah!')
        reject(error)
      })
    })
  }

  reg = (name, email, password) => {
    return new Promise ((resolve, reject) => {
      axios.post('http://35.240.143.97/users/register', {
        name: name,
        email: email,
        password: password
      })
      .then((res) => {
        AsyncStorage.setItem('token', res.headers.token)
        .then(stored => {
          resolve()
        })
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  navigateToUpload = (payload) => {
    
  }
}


export default new IgClone()