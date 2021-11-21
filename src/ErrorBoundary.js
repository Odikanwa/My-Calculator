import React from 'react';

//Error Boundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    //Update state so the next render would show the fallback UI
    static getDerivedStateFromError (error) {
        return {hasError: true};
    }

    render() {
        if (this.state.hasError) {
            return 'Error'
        }
        return this.props.children;
    }
}
export default ErrorBoundary;