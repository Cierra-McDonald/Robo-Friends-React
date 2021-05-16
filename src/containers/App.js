import React, { useState, useEffect } from 'react'
import './App.css'
import CardList from '../components/CardList'
import Scroll from '../components/Scroll'
import SearchBox  from '../components/SearchBox'
import ErrorBoundry from '../components/ErrorBoundry'


function App() {
   const [robots, setRobots] = useState([])
   const [searchfield, setSearchfield] = useState('')
  
 
    useEffect(() => {
         fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => { setRobots(users)});
            
    }) //only run if count changes!
    
    const onSearchChange = (e) => { 
        
            setSearchfield(e.target.value)
    }
   
        const fileterRobots = robots.filter(robot => { 
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        return !robots.length ?  
            <h1>Loading...</h1> :
        (
        
            <div className="tc">
                <h1 className="f1">RoboFreinds</h1>
                <SearchBox onSearchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={fileterRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
    


export default App;
