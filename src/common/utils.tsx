import * as React from 'react';
import * as R from 'ramda';
import {KeyValuePair} from 'ramda';

export const withRouteOnEnter = callback => (BaseComponent) => {
    const routeOnEnterCallback = (props) => {
        if (callback && typeof callback === 'function') {
            callback(props);
        }
    };

    class RouteOnEnterComponent extends React.Component<{ location: any }, {}> {
        componentWillMount() {
            routeOnEnterCallback(this.props);
        }

        // TODO: Function is probably not needed. Delete it in case this is confirmed.
        // componentWillReceiveProps(nextProps) {
        //     // not 100% sure about using `location.key` to distinguish between routes
        //     if (nextProps.location.key !== this.props.location.key) {
        //         routeOnEnterCallback(nextProps);
        //     }
        // }

        render() {
            return (
                <BaseComponent {...this.props} />
            );
        }
    }

    return RouteOnEnterComponent;
};