import React from 'react';
import {StyleSheet} from 'react-native';
import Network from './Main View/Network/Network';

function HomeScreen(props) {
    return (
        <div style={styles.main}>
            <Network />
        </div>
    );
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#191919',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default HomeScreen;