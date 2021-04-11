import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Category from './Category';

export default class Region extends Component {
  constructor(props) {
    super(props);
    this.state = { bolgeler: [] };
  }

  fonk2 = ({ item }) => {
    const name = item.strArea;
    const harf = 'a';
    //adreesi navigate etmek
    this.props.navigation.navigate('CategoryName', { url: name, harf: harf });
  };
  componentDidMount = () => {
    this.region();
  };

  region = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          bolgeler: res.meals,
        });
      });
  };

  keyExtractor = (item) => item.styleid;

  renderItem1 = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => this.fonk2({ item })}>
          <View
            style={{
              marginLeft: 8,
              width: 70,
              height: 40,
              borderRadius: 10,
              borderWidth: 1,
              marginRight: 4,
              backgroundColor: '#dcdcdc',
              marginBottom: 4,
            }}>
            <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 10 }}>
              {item.strArea}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <ScrollView horizontal={true}>
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={this.state.bolgeler}
              numColumns={30}
              keyExtractor={this.keyExtractor}
              renderItem={(item) => this.renderItem1(item)}
            />
          </ScrollView>
        </View>
        <Category />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  text: {
    color: '#94989f',
  },
});

/** <ScrollView horizontal={true}> */
