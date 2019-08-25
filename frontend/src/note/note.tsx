import React, {Component} from 'react';

type NoteState = {
    content: String
}

export class Note extends Component<{}, NoteState> {
    state = {
        content: ''
    }

    componentDidMount() {
        
    }

    render() {
        return (
            // <p>{this.state.content}</p>
            <p>NOTE</p>
        )
    }
}
