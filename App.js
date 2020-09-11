import {  createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import PlanetsListScreen from './src/screens/PlanetsListScreen'
import ResidentsListScreen from './src/screens/ResidentsListScreen'
import ResidentsScreen from './src/screens/ResidentsScreen'
import FavoriteListScreen from './src/screens/FavoriteListScreen'

const navigator = createBottomTabNavigator({
  List: createStackNavigator({
    Planets: PlanetsListScreen,
    Residents: ResidentsListScreen,
    Resident: ResidentsScreen,
  }),
  Favorite: createStackNavigator({
    Favorite: FavoriteListScreen,
    Resident: ResidentsScreen,
  }),
  
},
{
  defaultNavigationOptions: () => {
    return{
      tabBarOptions: {
        activeTintColor: 'black',
        labelStyle: {
          fontSize: 22,
          fontWeight: 'bold',
          paddingBottom: 10
        },
      }
    }
  }
}
)

export default createAppContainer(navigator)