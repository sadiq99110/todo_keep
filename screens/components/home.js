import React, { useCallback, useEffect, useState } from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import * as ImagePicker from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>;

const TempScreen = () => {
  const richText = React.useRef();
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [pickerResponse, setPickerResponse] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=3')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      console.log(item.title);
      richText.current.insertImage(item.url)
      // richText.current.insertText(item.title)
    });
  })
  .catch(error => console.log(error));
  setTimeout(() => {
    setLoading(false)
  }, 5000);
  },[loading])

  const handleToolbarClick = () => {
    setIsHighlighted(!isHighlighted);
  };

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  console.log(uri);

  ImgToBase64.getBase64String(uri)
    .then(base64String => {
      const str = `data:${uri};base64,${base64String}`;
      richText.current.insertImage(str);
      // console.log(base64String)
    })
    .catch(err => console.log(err));

  return (
    <View style={{ flex: 1 }}>
        <ScrollView>
          {/* <Text>Description:</Text> */}
          {loading == true ? null : <RichEditor
            ref={richText}
            onChange={descriptionText => {
              //   console.log("descriptionText:", descriptionText);
            }}
          />}
        </ScrollView>

      <View style={{ position: 'absolute', bottom: 0 }}>
        <TouchableOpacity onPress={handleToolbarClick}>
          <RichToolbar
            editor={richText}
            actions={[
              actions.insertText,
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertLink,
              actions.heading1,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.keyboard,
              actions.setStrikethrough,
              actions.removeFormat,
              actions.checkboxList,
              actions.undo,
              actions.redo
            ]}
            iconMap={{ [actions.heading1]: handleHead }}
            selectedButtonStyle={{ backgroundColor: 'black' }} // applying the selected button style
            selectedIconTint="#FFFFFF" // optional: changing the selected icon tint color
            style={isHighlighted ? { backgroundColor: 'grey' } : {}} // applying the highlight style to the toolbar
            onPressAddImage={onImageLibraryPress}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TempScreen;
