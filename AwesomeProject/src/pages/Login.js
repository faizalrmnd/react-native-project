import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Button,
  TextInput
} from 'react-native';
import { observer } from 'mobx-react'
import IgClone from '../store/store.js'

@observer
class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: {
        value: '',
        valid: true
      },
      password: {
        value: '',
        valid: true
      },
      name: {
        value: '',
        valid: true
      },
      emailreg: {
        value: '',
        valid: true
      },
      passreg: {
        value: '',
        valid: true
      },
      loginValid: false,
      regValid: false
    };
  }
  
  onLogin() {
    IgClone.login(this.state.email.value, this.state.password.value)
    .then(res => {
      this.props.navigation.navigate('Home')
    })
    .catch(error => {
      console.log(error)
    })
  }

  onReg () {
    IgClone.reg(this.state.name.value ,this.state.emailreg.value, this.state.passreg.value)
    .then(res => {
      this.props.navigation.navigate('Home')
    })
    .catch(error => {
      console.log(error)
    })
  }

  

  onChangeEmail = (stateName) => (e) => {

    let newState = {...this.state}
    newState[stateName].value = e

    this.setState({...newState})

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (re.test(String(this.state[stateName].value).toLowerCase())) {
      newState[stateName].valid = true

      // this.setState({emailVal: true})
    } else {
      newState[stateName].valid = false
      // this.setState({emailVal: false})
    }

    this.setState({...newState})
    
    this.validData()
  }

  onChangePass = (stateName) => (e) => {
    let newState = {...this.state}
    newState[stateName].value = e

    this.setState({...newState})

    if (this.state[stateName].value.length >= 5) {
      newState[stateName].valid = true
    } else {
      newState[stateName].valid = false
    }

    this.setState({...newState})

    this.validData()
  }

  onChangeName = (stateName) => (e) => {
    let newState = {...this.state}
    newState[stateName].value = e

    this.setState({...newState})

    if (this.state[stateName].value.length >= 3) {
      newState[stateName].valid = true
    } else {
      newState[stateName].valid = false
    }

    this.setState({...newState})

    this.validData()
  }

  validData = () => {
    if(this.state.email.value !== '' && this.state.password.value !== '' && this.state.email.valid && this.state.password.valid) {
      this.setState({loginValid: true})
    } else if (this.state.email.value === '' || this.state.password.value === '' || this.state.email.valid === false || this.state.password.valid === false) {
      this.setState({loginValid: false})
    }
    
    if ( this.state.name.valid && this.state.name.value !== '' && this.state.emailreg.value !== '' && this.state.passreg.value !== '' && this.state.emailreg.valid && this.state.passreg.valid) {
      this.setState({regValid: true})
    } else if (this.state.name.value === '' || this.state.emailreg.value === '' || this.state.passreg.value === '' || this.state.emailreg.valid === false || this.state.passreg.valid === false) {
      this.setState({regValid: false})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email.value}
          onChangeText={
            // (username) => this.setState({ username })
            this.onChangeEmail('email').bind(this)  
          }
          placeholder={'Email'}
          style={this.state.email.valid ? styles.input : styles.inputNotVal}
        />
        <TextInput
          value={this.state.password.value}
          onChangeText={this.onChangePass('password').bind(this)}
          placeholder={'Password'}
          secureTextEntry={true}
          style={this.state.password.valid ? styles.input : styles.inputNotVal}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          disabled={this.state.loginValid ? false : true}
          onPress={this.onLogin.bind(this)}
        />

        <TextInput
          value={this.state.name.value}
          onChangeText={this.onChangeName('name').bind(this)}
          placeholder={'Name'}
          style={this.state.name.valid ? styles.input : styles.inputNotVal}
        />

        <TextInput
          value={this.state.emailreg.value}
          onChangeText={
            this.onChangeEmail('emailreg').bind(this)  
          }
          placeholder={'Email'}
          style={this.state.emailreg.valid ? styles.input : styles.inputNotVal}
        />
        <TextInput
          value={this.state.passreg.value}
          onChangeText={this.onChangePass('passreg').bind(this)}
          placeholder={'Password'}
          secureTextEntry={true}
          style={this.state.passreg.valid ? styles.input : styles.inputNotVal}
        />
        
        <Button
          title={'register'}
          style={styles.input}
          disabled={this.state.regValid ? false : true}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputNotVal: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    marginBottom: 10,
  }
});

export default Login;