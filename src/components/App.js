import React, { Component } from 'react';
import { connect } from 'react-redux' // so that we can connect this component to the redux store
import { addRecipe, removeFromCalendar } from '../actions'
import logo from '../logo.svg';
import '../App.css';
import { capitalize } from '../utils/helpers'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'

// My main component
class App extends Component {
  doThing = () => {
    //this.props.dispatch(addRecipe({}))
    this.props.selectRecipe({})
  }

  render() {
    //console.log('Props', this.props)
    const { calendar, remove } = this.props
    const mealOrder = ['breakfast', 'lunch', 'dinner']

    return (
      <div className='container'>
        <ul className='meal-types'>
          {mealOrder.map((mealType) => (
            <li key={mealType} className='subheader'>
              {capitalize(mealType)}
            </li>
          ))}
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                        <img src={meals[meal].image} alt={meals[meal].label} />
                        <button onClick={() => remove({ meal, day })}>Clear</button>
                      </div>
                      : <button className='icon-btn'>
                        <CalendarIcon size={30} />
                      </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

      </div>		       
    );
  }
}

// map the state to the props, so this component has access to the store
// the store is a object, but we need the props to be a array so work it into an array
// whatever we return from the function will be mapped to props and usable to the component
function mapStateToProps({ food, calendar }) {
  //console.log("test")
  //console.log(calendar)
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  // creates an array called calendar, each array contains an object, and that object has two properties,
  // day and meal, meal has an object with properties breakfast, lunch, dinner
  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        //console.log("!!!!!!!!!!")
        //console.log("day " + day + " meal " + meal)
        //console.log(meals[meal])
        //console.log(calendar[day])
        meals[meal] = calendar[day][meal] // adding a meal key and setting it to something, then adding it to the meals object
          ? food[calendar[day][meal]]
          : null

        //console.log(meals)
        return meals
      }, {})
    })),
  }
}

// Dont have to do this, wrapper for the dispatch, dispatch is a wrapper to the action
function mapDispatchToProps(dispatch) {
  return {
    selectRecipe: (data) => { addRecipe(data) },
    remove: (data) => { removeFromCalendar(data) }
  }
}

// connect()(App) - will allow the compont to dispatch actions
// We want to connect this component to the redux store so that we can get the calendar state thats living inside the redux store
export default connect(mapStateToProps, mapDispatchToProps)(App);


//meals: Object.keys(calendar[day]).reduce((meals, meal) => {  //want to reduce all of the calendar[day] keys (breakfast, lunch, dinner)
// to a single object

// meals[meal] = calendar[day][meal] ? calendar[day][meal] : null //meals the object we are building up, current meal of the calendar object
// breakfast (  ), then lunch then dinner