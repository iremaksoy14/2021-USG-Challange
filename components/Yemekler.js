import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    marginLeft: 20,
    fontSize: 12,
  },
});

class Yemekler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yemekler: [],
      color: '#eeb422',
     
        id:"",
      
   

      error: false,
    };
  }

  calistir = ({ item }) => {
    const name = item.idMeal;

    this.props.navigation.navigate('ProductDetail', { id: name });
  };
  componentDidMount = () => {
    this.yukle();
  };
  yukle = () => {
    const url =
      `https://www.themealdb.com/api/json/v1/1/filter.php?` +
      this.props.route.params.harf +
      '=' +
      this.props.route.params.url +
      '';

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          yemekler: res.meals,
        });
      });
  };
  keyExtractor = (item) => item.idMeal;


renkdegistir=({item},e)=>{
    this.setState({id:item.idMeal})
   
     for(var i=0;i<this.state.yemekler.length;i++){
       if(this.state.yemekler[i].idMeal==this.state.id)
       {
         e.target.color="#ff0000"
       }
     }
}
 

  renitem = ({ item }) => {
    return (
      <View>
        <View
          style={{
            borderRadius: 10,
            borderColor: '#eee9e9',
            borderWidth: 2,
            width: 160,
            height: 160,
            marginLeft: 20,
            marginBottom: 15,
            backgroundColor: '#eee9e9',
          }}>
          <TouchableOpacity onPress={() => this.calistir({ item })}>
            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
              <Icon onPress={(e)=>{
               
             this.renkdegistir(e,{item})
                
               
              }}
                style={{ marginLeft: 100 }}
                name="star"
                color={this.state.color} 
                
                size={20}
              />
              <Image
                style={{
                  width: 80,
                  height: 80,
                  marginTop: 20,
                  marginLeft: 20,
                  borderRadius: 10,
                }}
                source={{ uri: item.strMealThumb }}
              />
              <Text style={styles.item}>{item.strMeal}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.yemekler}
          renderItem={(item) => this.renitem(item)}
          numColumns={2}
        />
      </View>
    );
  }
}

export default Yemekler;
