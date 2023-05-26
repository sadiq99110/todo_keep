import React, { useEffect, useRef, useState } from 'react'
import { Button, FlatList, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './css/styles'
import Crudfunctions, { db } from './dbFunctions/dbfunctions';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";


const InnerScreen = ({navigation, route}) => {  
    const [data, setData] = useState([])
    const [count, setCount] = useState(false)
    const isFocused = useIsFocused();
    const refRBSheet = useRef();
    const [id, setId] = useState();
    const [isRowDirection, setIsRowDirection] = useState(false); // Initial direction is column
    
    
    useEffect(() => {
      console.log("Count", count)
        getNotesData()
    },[count,isFocused])

    // console.log(isFocused)
    // getNotifications Data
    const getNotesData = () => {
        db.transaction(txn => {
            txn.executeSql(
              `SELECT * FROM items ORDER BY id ASC`,
              [],
              (sqlTxn, res) => {
                // console.log("Items retrieved successfully");
                let len = res.rows.length;
                // console.log("ROWS", len);
                if (len > 0) {
                  let newData = []; // Create a new array to store the updated data
                  for (let i = 0; i < len; i++) {
                    // console.log("Data ==> ", res.rows.item(i));
                    let item = res.rows.item(i);
                    newData.push({ id: item.id, title: item.title, description: item.description,
                      //  imageUrl:item.imageUrl, 
                       isNotificationSchedule:item.isNotificationSchedule });
                    console.log("New Data", newData);
                  }
                  setData(newData); // Update the state with the new data
                }
              },
              error => {
                // console.log("Error on getting categories: " + error.message);
              }
            );
          });
    };
    
    // getNotifications Data    
    
    Crudfunctions.createTables();
    
    // console.log("Data", data)

  // handle delete function 
    const handleDelete = (id) => {
      Crudfunctions.deleteSingleItem(id, () => {
        setCount(prevCount => !prevCount);
        refRBSheet.current.close();
      });
    };
  // handle delete function end  

  // handle change direction
    const handleChangeDirection = () => {
      console.log("Testt")
      setIsRowDirection(!isRowDirection);
    };
  // handle change direction end

  return ( 
    <View style={[styles.edit_screen_background, {backgroundColor:'#1a1a1a'}]}>
           <Icon name="columns" size={25} color="#6f6f6f" onPress={handleChangeDirection}/>

            <FlatList
            key={isRowDirection ? 'row' : 'column'} // Re-render FlatList when direction changes
            numColumns={isRowDirection ? undefined : 2} // Set numColumns to 2 only when the direction is column
            keyExtractor={(item) => item.id.toString()} // Convert the key to a string
            data={data}
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            bounces={false}
            renderItem={({ item, index }) => (
                <Pressable style={isRowDirection ? [styles.rowListBox, {backgroundColor:index % 2 == 0 ? '#868686' : '#C5FF75', borderColor:index % 2 == 0 ? '#868686' : '#C5FF75'}] : [styles.listBox, , {backgroundColor:index % 2 == 0 ? '#868686' : '#C5FF75', borderColor:index % 2 == 0 ? '#868686' : '#C5FF75'}]} onLongPress={() => {
                    refRBSheet.current.open()
                    setId(item.id)
                }} 
                onPress={() => navigation.navigate("editDetail",{
                    data:{
                        id:item.id,
                        title:item.title,
                        description:item.description,
                        // imageUrl:[
                        //  uri = item.imageUrl
                        // ]
                    }
                })
               }
                >
                  {
                    item.isNotificationSchedule == 1 ? 
                      <TouchableOpacity style={styles.bell_icon}>
                        <Icon name="bell" size={18} color={index % 2 == 0 ? '#C5FF75': '#868686'}/>
                      </TouchableOpacity> 
                    :
                    null
                  }
                 <Text style={[styles.titleText, {color: index % 2 == 0 ? 'white' : '#868686'}]} numberOfLines={2} ellipsizeMode='tail'>{item.title}</Text>
                <Text style={[styles.titleText, {color: index % 2 == 0 ? 'white' : '#868686'}]} numberOfLines={2} ellipsizeMode='tail'>{item.description}</Text>
                </Pressable>  
            )}
            />
        <TouchableOpacity onPress={() => navigation.navigate("editDetail")} style={styles.add_button}>
            <Icon name="plus" size={20} color="black" style={styles.add_button_text}/>
        </TouchableOpacity>

        {/* BottomSheet */}
        <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={false}
                    closeOnPressMask={true}
                    height={200}
                    openDuration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            backgroundColor:'grey'
                        }
                    }}
                >
                    <TouchableOpacity style={styles.bottomSheetButton} onPress={() => handleDelete(id)}>
                        <Text style={styles.bottomSheetButtonText}>Delete</Text>
                    </TouchableOpacity>
                </RBSheet>
        {/* BottomSheet */}        
    </View>
   )
}

export default InnerScreen