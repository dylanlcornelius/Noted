import React, {Component} from 'react';
import UserService from '../user/user.service';

type HeaderState = {
    firstName: string,
    lastName: string,
}

export class Header extends Component<{}, HeaderState> {
    state = {
        firstName: '',
        lastName: '',
    }

    componentDidMount() {
        UserService.getUser('1').then((user: any) => {
            this.setState({firstName: user.FirstName, lastName: user.LastName});
            console.log(this.state);
        });
    }

    render() {
        return (
            <>
                {this.state.firstName} {this.state.lastName}
            </>
        )
    }
}
