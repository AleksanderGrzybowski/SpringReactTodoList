import React, { Component } from 'react';

export default class App extends Component {
    render() {
        console.log(this.props)
        let elements = this.props.todos.map(t => <p key={t.id}>Todo: {t.description} {t.importance}</p>)
        return (
            <div>
                React works, if two plus two is {2 + 2}
                {elements}
                <button onClick={this.props.onCreate}>Click</button>
            </div>
        );
    }
}
