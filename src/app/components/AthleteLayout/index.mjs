
import {connect} from 'react-redux';
import {compose} from 'recompose';
import AthleteLayout from './AthleteLayout';

const mapStateToProps = ({
    athlete: athleteInfo,
}) => ({
    athleteInfo,
});

export default compose(
    connect(mapStateToProps),
)(AthleteLayout);
