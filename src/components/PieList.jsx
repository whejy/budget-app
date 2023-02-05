// /* eslint-disable no-unused-vars */
// import { FlatList, StyleSheet, View } from 'react-native';
// import Pie from './Pie';

// const styles = StyleSheet.create({
//   separator: {
//     height: 10,
//   },
// });

// const data = [
//   {
//     name: 'Seoul',
//     population: 21500000,
//     color: 'rgba(131, 167, 234, 1)',
//     legendFontColor: '#7F7F7F',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Toronto',
//     population: 2800000,
//     color: '#F00',
//     legendFontColor: '#7F7F7F',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Beijing',
//     population: 527612,
//     color: 'red',
//     legendFontColor: '#7F7F7F',
//     legendFontSize: 15,
//   },
//   {
//     name: 'New York',
//     population: 8538000,
//     color: '#ffffff',
//     legendFontColor: '#7F7F7F',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Moscow',
//     population: 11920000,
//     color: 'rgb(0, 0, 255)',
//     legendFontColor: '#7F7F7F',
//     legendFontSize: 15,
//   },
// ];

// const ItemSeparator = () => <View style={styles.separator} />;

// const PieList = () => {
//   return (
//     <View>
//       <Pie data={data} />
//     </View>
//     // <FlatList
//     //   data={data}
//     //   ItemSeparatorComponent={ItemSeparator}
//     //   renderItem={({ item }) => <Pie item={item} />}
//     //   keyExtractor={(item) => item.id}
//     // />
//   );
// };

// export default PieList;
