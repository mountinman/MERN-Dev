import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
	alerts: state.alert
});

const Alert = ({ alerts }) => {
	alert = alerts !== null &&
		alerts.length > 0 &&
		alerts.map((alert) => (
			<div key={alert.id} className={`alert alert-${alert.alertType}`}>
				{alert.msg}
			</div>
		));
	return !alerts.length <= 0 ? (<div className="alert-container">{alert}</div>) : null;
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Alert);
