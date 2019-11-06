import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addApi } from '../services/Root/actions/api';
import LoginScreen from './LoginScreen';
import { changeStateProp } from '../services/Root/actions/index';

const mapStateToProps = state => {
  console.log('statestatestate', state)
  return {
    user: state.user.data
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        changeStateProp
      },
      dispatch
    )
  };
};

const LoginScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

export default LoginScreenContainer;
