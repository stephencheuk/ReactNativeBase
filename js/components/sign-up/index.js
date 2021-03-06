
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Keyboard, Image, Platform, Dimensions, TouchableOpacity } from 'react-native';

import {popRoute} from '../../actions/route';

import {Container, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';

import theme from '../login/login-theme';
import styles from './styles';

class SignUp extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            visibleHeight: Dimensions.get('window').height,
            offset: {
                x:0,
                y:0
            }
        };
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    }
   
    componentWillMount () {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    keyboardWillShow (e) {
       let newSize = Dimensions.get('window').height - e.endCoordinates.height
       this.setState({offset :{y: 80}});
    }
    
    keyboardWillHide (e) {
        this.setState({offset :{y: 0}});
    }
    
    popRoute() {
        this.props.popRoute();
    }
    
    render() {
        return (
            <Container>
                <Content contentOffset={this.state.offset} scrollEnabled={false}>
                    <View theme={theme}>
                        <Image source={require('../../../images/sin.png')} style={styles.background} >
                            <Content padder>
                                <Text style={Platform.OS === 'android' ? styles.asignupHeader : styles.signupHeader}>CREATE ACCOUNT</Text>
                                <View style={Platform.OS === 'android' ? styles.asignupContainer : styles.signupContainer}>
                                    <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                        <Icon name="ios-person-outline" />
                                        <Input placeholder="Username"  style={styles.input}/>
                                    </InputGroup>

                                    <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                        <Icon name="ios-mail-open-outline" />
                                        <Input placeholder="Email"  style={styles.input}/>
                                    </InputGroup>

                                    <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                        <Icon name="ios-unlock-outline" />
                                        <Input placeholder="Password" secureTextEntry={true}  style={styles.input}/>
                                    </InputGroup>

                                    <Button rounded transparent  block large style={styles.signupBtn} textStyle={Platform.OS === 'android' ? {alignSelf: 'center',marginTop: 7,fontSize: 14,fontWeight: 'bold'} : {marginTop: -12,fontSize: 14,fontWeight: 'bold'}}   onPress={() => this.popRoute()}>
                                        Continue
                                    </Button>
                                    <TouchableOpacity>
                                        <Text style={styles.termsText}>Terms & Conditions</Text>
                                    </TouchableOpacity>
                                </View>
                            </Content>
                        </Image>
                    </View>
                </Content>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(SignUp);
