import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
} from 'react-native';

import Region from './Region';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], error: null };
  }
  gecis = ({ item }) => {
    const name = item.strCategory;
    const harf = 'c';
    this.props.navigation.navigate('CategoryName', { url: name, harf: harf });
  };

  componentDidMount = () => {
    this.categorie();
  };
  categorie = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          products: res.categories,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  keyExtractor = (item) => item.idCategory;

  fonk3 = ({ item }) => {
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => this.gecis({ item })}>
            <View
              style={{
                marginLeft: 8,
                width: 100,
                height: 100,
                borderRadius: 10,
                borderWidth: 1,
                marginRight: 4,
                backgroundColor: '#dcdcdc',
                marginBottom: 8,
              }}>
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  marginTop: 10,
                }}>
                {item.strCategory}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}></View>
        <ScrollView>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={this.state.products}
            numColumns={3}
            keyExtractor={this.keyExtractor}
            renderItem={(item) => this.fonk3(item)}
          />
        </ScrollView>
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

/**
 
 */
