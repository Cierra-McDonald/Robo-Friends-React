import React, { Component } from 'react'
import './App.css'
import CardList from '../components/CardList'
import Scroll from '../components/Scroll'
import SearchBox  from '../components/SearchBox'
import ErrorBoundry from '../components/ErrorBoundry'


class App extends Component {
    constructor() { 
        super()
        this.state = { 
            robots: [],
            searchfield: ''

        }
    }

    componentDidMount = () => { 
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> { 
                return response.json();
            })
            .then(users => { 
                this.setState({ robots: users })})
        }

    onSearchChange = (e) => { 
        this.setState({ 
            searchfield: e.target.value
        })
    }
    
    render () { 
        const { robots, searchfield } = this.state;
        const fileterRobots = robots.filter(robot => { 
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        return !robots.length ?  
            <h1>Loading...</h1> :
        (
        
            <div className="tc">
                <h1 className="f1">RoboFreinds</h1>
                <SearchBox onSearchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={fileterRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
    
}

export default App;
