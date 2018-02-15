

import React from "react"
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  Alert
} from "react-native"
import { Card} from 'react-native-card-view'
import axios from "axios"

const Profile = ({
  profile: {
    name: { first = "",  last = "default" },
    picture: { thumbnail },
    location:{city="",state="",street=""}
 
  }
}) => (
  <View style={{ flexDirection: "column", marginBottom: 20 }}>
    <Image
      style={{ width: 150, height: 150, marginTop: 100,justifyContent: 'center',
      alignItems: 'center'}}
      source={{ uri: thumbnail }}
    />
    <Text
     
      style={styles.text}
    >{`${first} ${last}`}</Text>
     <Text
      style={styles.text}
    >{`${city} ${state} ${street}`}</Text>
  </View>
)

export default class App extends React.Component {
  state = {
    profiles: [],
    loading: false
  }

  componentDidMount() {
    this.fetchUsers()
  }

  async fetchUsers() {
    this.setState({ loading: true })
    const users = await axios.get(`https://randomuser.me/api?results`)
    this.setState({ profiles: users.data.results })
    this.setState({ loading: false })
  }

  render() {
    const profiles = this.state.profiles
console.log(profiles);
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 50 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return (
      <Card
      
     >
        {profiles.map(profile => (
          <Profile
           
            key={profile.login.username}
            profile={profile}
          />
        ))}
     </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "steelblue",
    paddingTop: 50,
    paddingBottom: 50,
    padding: 30
  },
  text: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
    justifyContent: 'center',
      alignItems: 'center'
  }
})

