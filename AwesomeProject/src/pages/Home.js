import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  AsyncStorage,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';
import { Query } from "react-apollo";
import { GET_ALL_POST_QUERY } from '../graphql/querytype'
// import { observer } from 'mobx-react'
// import IgClone from '../store/store.js'

// @observer
class Home extends Component {

  // navigateToPost = async () => {
  //   console.log()
  //   try {
  //     const value = await AsyncStorage.getItem('token');
  //     console.log(value)
  //   } catch (error) {
  //     console.log("Error retrieving data" + error);
  //   }
  //   IgClone
  // }

  navigateToPost () {
    this.props.navigation.navigate('Post')
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.navigateToPost.bind(this)}
          title="Post a Picture"
        />
        <Query query={ GET_ALL_POST_QUERY }>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <Text>Loading ...</Text>
              )
            } else {
              console.log('ini', data.posts)
              if (error) {
                return (
                  <Text>Error nih..!</Text>
                )
              } else {
                return (
                  <View>
                    <FlatList data={data.posts} keyExtractor={this._keyExtractor} renderItem={(post) => {

                      console.log(post)
                      return (
                        <View style={ styles.card }>
                          <Image style={{width: 250, height: 250}} source={{uri: post.item.image}}/>
                          <Text>{ post.item.caption }</Text>
                          {/* <Button
                            onPress={ () => {
                              this.props.navigation.navigate('Detail', {
                                // charName: `${post.item.name}`,
                                selected: post.item
                              });
                            } }
                            title="See Details"
                          /> */}
                        </View>
                      )
                    } }/>
                  </View>
                );
              }
            }
          }}
        </Query>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    padding: 10
  }
})

export default Home;