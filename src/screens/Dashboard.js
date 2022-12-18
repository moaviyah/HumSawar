import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Home from './Home';
import Profile from '../screens/Profile'
import CustomDrawer from '../navigation/CustomDrawer';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
const Drawer = createDrawerNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons'
import Messages from '../message/Messages';
import Settings from '../screens/Settings';
import History from '../screens/History';
import About from '../screens/About';
import FontAwesome from'react-native-vector-icons/FontAwesome'
import AntDesign from'react-native-vector-icons/AntDesign'
import { primary } from '../theme/Theme';


const Dashboard = ({ navigation }) => {
    return (
        <Drawer.Navigator drawerContent={props =><CustomDrawer {...props}/>} screenOptions={{headerStyle:({backgroundColor: 'transparent',}), headerTitleStyle:({})}} >
       
            <Drawer.Screen 
            name ="Home"
            component={Home} 
            options={{
               swipeEnabled:true,
               drawerIcon:()=>(
                <Ionicons name='home-outline' size={22} color={primary} />
               )
            } 
            }/>
            <Drawer.Screen name="Profile" component={Profile} 
            options={{
                drawerIcon:()=>(
                 <Ionicons name='person-outline' size={22}  color={primary}/>
 
                )
             }}/> 
             <Drawer.Screen name="Messages" component={Messages}
             options={{
                drawerIcon:()=>(
                 <Ionicons name='chatbox-ellipses-outline' size={22}  color={primary}/>
 
                )
             }} />
            <Drawer.Screen name="History" component={History} 
            options={{
                drawerIcon:()=>(
                 <FontAwesome name='history' size={22} color={primary} />
                )
             }}/> 
             
            <Drawer.Screen name="Settings" component={Settings} 
            options={{
                drawerIcon:()=>(
                 <Ionicons name='settings-outline' size={22} color={primary}/>
                )
             }}/>
             <Drawer.Screen name="About" component={About} 
            options={{
                drawerIcon:()=>(
                 <AntDesign name='info' size={22} color={primary} />
                )
             }}/>
        
        </Drawer.Navigator >
    );
}

export default Dashboard;