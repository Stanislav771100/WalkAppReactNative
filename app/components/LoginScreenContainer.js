import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addApi } from '../services/Root/actions/api';
import LoginScreen from './LoginScreen';

const mapStateToProps = state => {
  return {
    api: state.api
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ addApi }, dispatch)
    // myCustomPropsFunc: function(prop, value, reducer) {
    //   changeStateProp(prop, value, reducer)(dispatch);
    //   return null;
    // }
  };
};

const LoginScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

export default LoginScreenContainer;
