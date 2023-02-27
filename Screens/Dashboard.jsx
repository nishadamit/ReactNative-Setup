import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Text, SafeAreaView } from 'react-native';

const Dashboard = () => {
  return (
    <View style={{marginTop: 120}}>
    <WebView
      // style={styles.container}
      source={{ uri: 'https://expo.dev' }}
    />
    </View>

  )
}

export default Dashboard