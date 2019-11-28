import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginScreen from './LoginScreen';
import { changeStateProp } from '../../actions/index';

const mapStateToProps = state => {
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
