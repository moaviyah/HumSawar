// import React from 'react';




// import { StyleSheet, View, Text, FlatList } from 'react-native';

// const rides = [
//   {
//     id: 1,
//     date: 'Jan 2, 2022',
//     from: 'Chicago, IL',
//     to: 'Madison, WI',
//     price: 25,
//     seats: 2,
//   },
//   {
//     id: 2,
//     date: 'Dec 15, 2021',
//     from: 'Los Angeles, CA',
//     to: 'San Diego, CA',
//     price: 15,
//     seats: 1,
//   },
//   {
//     id: 3,
//     date: 'Nov 20, 2021',
//     from: 'New York, NY',
//     to: 'Boston, MA',
//     price: 30,
//     seats: 3,
//   },
// ];

// const RideItem = ({ ride }) => {
//   return (
//     <View style={styles.rideItem}>
//       <Text style={styles.rideDate}>{ride.date}</Text>
//       <View style={styles.rideDetails}>
//         <Text style={styles.rideLocation}>{ride.from} to {ride.to}</Text>
//         <Text style={styles.ridePrice}>${ride.price}</Text>
//       </View>
//     </View>
//   );
// };

// const History = () => {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={rides}
//         renderItem={({ item }) => <RideItem ride={item} />}
//         keyExtractor={(item) => item.id.toString()}
//         style={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   list: {
//     marginTop: 10,
//   },
//   rideItem: {
//     padding: 10,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   rideDate: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   rideDetails: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   rideLocation: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   ridePrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default History;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';

// const History = () => {
//   const [isRideTaken, setIsRideTaken] = useState(true);

//   const toggleSwitch = () => setIsRideTaken(previousState => !previousState);

//   return (
//     <View style={styles.container}>
//       <View style={styles.switchContainer}>
//         <Text style={styles.switchText}>Rides Given</Text>
//         <Switch
//           trackColor={{ false: '#767577', true: '#81b0ff' }}
//           thumbColor={isRideTaken ? '#f5dd4b' : '#f4f3f4'}
//           onValueChange={toggleSwitch}
//           value={isRideTaken}
//         />
//         <Text style={styles.switchText}>Rides Taken</Text>
//       </View>
//       <ScrollView>
//         <View style={styles.rideContainer}>
//           <Text style={styles.rideTitle}>
//             {isRideTaken ? 'Ride Given' : 'Ride Taken'}
//           </Text>
//           <Text style={styles.rideText}>Date: 12-02-2023</Text>
//           <Text style={styles.rideText}>Time: 9:00 am</Text>
//           <Text style={styles.rideText}>Start Location: Lahore</Text>
//           <Text style={styles.rideText}>Destination: Islamabad</Text>
//           <Text style={styles.rideText}>Price: Rs. 1500</Text>
//         </View>
//         <View style={styles.rideContainer}>
//           <Text style={styles.rideTitle}>
//             {isRideTaken ? 'Ride Given' : 'Ride Taken'}
//           </Text>
//           <Text style={styles.rideText}>Date: 11-02-2023</Text>
//           <Text style={styles.rideText}>Time: 5:00 pm</Text>
//           <Text style={styles.rideText}>Start Location: Islamabad</Text>
//           <Text style={styles.rideText}>Destination: Lahore</Text>
//           <Text style={styles.rideText}>Price: Rs. 1200</Text>
//         </View>
//         <View style={styles.rideContainer}>
//           <Text style={styles.rideTitle}>
//             {isRideTaken ? 'Ride Given' : 'Ride Taken'}
//           </Text>
//           <Text style={styles.rideText}>Date: 10-02-2023</Text>
//           <Text style={styles.rideText}>Time: 2:00 pm</Text>
//           <Text style={styles.rideText}>Start Location: Karachi</Text>
//           <Text style={styles.rideText}>Destination: Quetta</Text>
//           <Text style={styles.rideText}>Price: Rs. 2000</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   switchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   switchText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 10,
//     color: '#555',
//   },
//   rideContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 20,
//     backgroundColor: '#f7f7f7',
//   },
//   rideIcon: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 20,
//   },
//   rideInfoContainer: {
//     flex: 1,
//   },
//   rideInfo: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#333',
//   },
//   rideDate: {
//     fontSize: 16,
//     color: '#555',
//   },
//   ridePrice: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   noRidesContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   noRidesText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#555',
//   },
// });


// export default History

// import { useState } from 'react';
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
// import { View } from 'react-native';
// function History() {
//   const [activeTab, setActiveTab] = useState('given');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <View>
//       <Tabs variant="enclosed-colored" isFitted>
//         <TabList mb="2">
//           <Tab
//             _selected={{ color: 'white', bg: 'blue.500' }}
//             onClick={() => handleTabClick('given')}
//             isSelected={activeTab === 'given'}
//           >
//             Rides Given
//           </Tab>
//           <Tab
//             _selected={{ color: 'white', bg: 'blue.500' }}
//             onClick={() => handleTabClick('taken')}
//             isSelected={activeTab === 'taken'}
//           >
//             Rides Taken
//           </Tab>
//         </TabList>

//         <TabPanels>
//           <TabPanel>
//             <div>Content for Rides Given</div>
//           </TabPanel>
//           <TabPanel>
//             <div>Content for Rides Taken</div>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </View>
//   );
// }

// export default History
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { primary } from '../theme/Theme';

const HistoryScreen = () => {
  const [selectedTab, setSelectedTab] = useState('given');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'given' && styles.activeTabButton]}
          onPress={() => handleTabPress('given')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'given' && styles.activeTabButtonText]}>Rides Given</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'taken' && styles.activeTabButton]}
          onPress={() => handleTabPress('taken')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'taken' && styles.activeTabButtonText]}>Rides Taken</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {selectedTab === 'given' && (
          <View style={styles.ridesGivenContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Rides Given Screen</Text>
              {/* Add your content here */}
            </View>
          </View>
        )}
        {selectedTab === 'taken' && (
          <View style={styles.ridesTakenContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Rides Taken Screen</Text>
              <View style={styles.infoContainer}>
                <Ionicons name="information-circle-outline" size={24} color="gray" />
                <Text style={styles.infoText}>You haven't taken any rides yet</Text>
              </View>
              {/* Add your content here */}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTabButton: {
    backgroundColor: primary,
  },
  tabButtonText: {
    color: '#444',
    fontSize: 16,
  },
  activeTabButtonText: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  ridesGivenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ridesTakenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default HistoryScreen;


