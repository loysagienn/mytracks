
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {
    selectRoute,
    selectActivityInfo,
} from 'app/selectors';
import Activity from './Activity';

const mapStateToProps = (state) => {
    const route = selectRoute(state);
    const activity = selectActivityInfo(route.params.activityId)(state);

    return {
        route,
        activity,
    };
};

export default compose(
    connect(mapStateToProps),
)(Activity);
