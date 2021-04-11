import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';

class SinglePage extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      veriler: [],
      color: '#eeb422',
    }),
      (this.donusDegeri = new Animated.Value(0));
  }
  dondur() {
    this.donusDegeri.setValue(0);
    Animated.timing(this.donusDegeri, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
    }).start(() => this.dondur());
  }

  componentDidMount = () => {
    this.singleapp();
    this.dondur();
  };
  singleapp = () => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=` +
        this.props.route.params.id +
        ''
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ veriler: res.meals[0] });
      });
  };
  render() {
    const don = this.donusDegeri.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.container}>
        <Icon
          style={{ marginLeft: 100 }}
          name="star"
          color={this.state.color}
          size={20}
        />
        <Animated.Image
          source={{ uri: this.state.veriler.strMealThumb }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 50,
            marginLeft: 100,
            marginTop: 40,
            transform: [
              {
                rotate: don,
              },
            ],
          }}
        />

        <Text style={{ marginLeft: 30, marginTop: 30 }}>
          {this.state.veriler.strMeal}
        </Text>
        <Text style={{ marginLeft: 30, marginTop: 20 }}>
          {this.state.veriler.strCategory}
        </Text>
        <Text style={{ marginLeft: 30, marginTop: 20 }}>
          {this.state.veriler.strInstructions}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    marginLeft: 20,
    fontSize: 12,
  },
  animatedView: {
    width: 200,
    height: 200,
  },
});

export default SinglePage;
