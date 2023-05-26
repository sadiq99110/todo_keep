import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from '../css/styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Crudfunctions from '../dbFunctions/dbfunctions';
import * as ImagePicker from 'react-native-image-picker';
import NotificationScheduler from '../notification/notificationSchedule';

const EditDetail = ({ navigation, route }) => {
  const preScreenData = route.params
  console.log("data from previous screen", preScreenData)


  const [title, setTitle] = useState(
    preScreenData ? preScreenData.data.title : ''
  )
  const [description, setDescription] = useState(
    preScreenData ? preScreenData.data.description : ''
  )
  const [id, setId] = useState(
    preScreenData ? preScreenData.data.id : ''
  )

  const [data, setData] = useState([])
  const [pickerResponse, setPickerResponse] = useState(null);
  const [url, setUrl] = useState('')
  const [imageList, setImageList] = useState([]);
  const [imageUrl, setImageUrl] = useState([])


  const [isNotificationSchedule, setIsNotificationSchedule] = useState(false);
    const handleNotificationSchedule = (value) => {
    setIsNotificationSchedule(value);
  };

  console.log("isNotificationSchedule ",isNotificationSchedule)
  

  console.log("checking",title)

  useEffect(() => {
    const handleBackButtonClick = () => {
      const updatedData = [...data, { title, description }];
      data.push(title, description, isNotificationSchedule)
        // console.log(`title ${data[0]} and description ${data[1]}`)
     if(data[0] == '' && data[1] == '' ){
         return
    } else{
        if(id){
          console.log("Id exist")
          Crudfunctions.updateInDatabase(id,title,description,isNotificationSchedule)
        }else{
          console.log("Id not exist")
          Crudfunctions.addNotesToDatabase(data)    
        }
     }  
    //   console.log('Back button pressed with data:', updatedData);
      navigation.goBack(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    
    return () => {
      backHandler.remove();
    };
  }, [navigation, data, title, description,isNotificationSchedule])

  // Image picker start

    
      const selectImage = useCallback(() => {
        const options = {
          selectionLimit: 0, // Set 0 for unlimited selection
          mediaType: 'photo',
          includeBase64: false,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          if (response.assets) {
            setImageList([...imageList, ...response.assets]);
          }
        });
      }, [imageList]);
    
      const removeImage = useCallback((index) => {
        setImageList((prevImageList) => {
          const updatedList = [...prevImageList];
          updatedList.splice(index, 1);
          return updatedList;
        });
      }, []);
      
    
      const renderImageItem = useCallback(({ item, index }) => {
        if (!item.uri) {
          return null; // Skip rendering if image URI is not available
        }
    
        return (
          <View style={styles.imageBox}>
            <Image source={{ uri: item.uri }} style={styles.imageInNotes} />
            <TouchableOpacity onPress={() => removeImage(index)} style={styles.iconInImageNotes}>
              <Icon name="remove" size={20} color="red" />
            </TouchableOpacity>
          </View>
        );
      }, []);

      // remove image

  // Image picker end

  console.log("---<>",imageList)

  imageList.map((item, index) => {
     console.log("After Map", item.uri) 
     imageUrl.push(item.uri)
  })

  console.log(imageUrl)
  return (
    <View style={styles.edit_screen_background}>
      {/* <ScrollView> */}
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Title"
          placeholderTextColor="grey"
          multiline={true}
          autoCapitalize="none"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <View style={styles.createBottomSheet}>
            <View style={styles.createBottomSheetHeader}>
            <Text style={styles.createBottomSheetHeaderText}>Description</Text>
            </View>
            <NotificationScheduler isNotificationSchedule={isNotificationSchedule} setIsNotificationSchedule={handleNotificationSchedule} />
          <ScrollView>
            <TextInput
              style={[styles.input,{color:'#C5FF75'}]}
              underlineColorAndroid="transparent"
              placeholder="Description"
              placeholderTextColor="grey"
              multiline={true}  
              autoCapitalize="none"
              value={description}
              onChangeText={(text) => setDescription(text)}
    />
          <FlatList
        data={imageList}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.uri}
      />
          </ScrollView>
        </View>

      {/* </ScrollView> */}
    </View>
  )
}

export default EditDetail
