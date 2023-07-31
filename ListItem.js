import React from 'react';
import { StyleSheet , ScrollView, View } from 'react-native';
import Delete from './Delete';

const ListItem = (props) => {    
    return( 
        <ScrollView persistentScrollbar={true} contentInsetAdjustmentBehavior="automatic" style = {styles.container}>
            <GetItems list={props.list} clicked={props.clicked}/>
        </ScrollView>
    )};

const GetItems = (props) => {
    const list = props.list;
    const listItems = list.map(( item, index ) => 
    {
        return <View key = {index}>
                    <Delete content = {item} Datakey = {index} onDelete = {props.clicked}></Delete>
                </View>

    });

    return listItems
}

const styles = StyleSheet.create({
 container: {
    backgroundColor: '#1b1e24',
    height: "100%",
    color: "white",
   },
});

export default ListItem;