import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    // main screen
    add_button : {
        position:'absolute',
        bottom:20,
        right:20,
        backgroundColor:'#6f6f6f',
        padding:10,
        borderRadius:50,
        height:60,
        width:60,
        justifyContent:'center',
        alignItems:'center',
        // borderWidth:1,
        // borderColor:'#F4F6FA'
        
    },
    add_button_text:{
        color:'#F4F6FA',
        fontSize:20,
        fontWeight:'500'
    },
    listBox:{
        width:'40%',
        height:100,
        backgroundColor:'grey',
        borderColor:'black',
        borderWidth:1,
        borderRadius:10,
        flexDirection:'column',
        marginLeft:'5%',
        padding:10,
        // justifyContent:'center',
        // alignItems:'center',
        marginTop:40
    },
    rowListBox:{
        width:'90%',
        height:100,
        backgroundColor:'grey',
        borderColor:'black',
        borderWidth:1,
        borderRadius:10,
        flexDirection:'column',
        marginLeft:'5%',
        padding:10,
        // justifyContent:'center',
        // alignItems:'center',
        marginTop:40
    },
    titleText:{
        fontSize:16,
        color:'black',
        textAlign:'left'
    },
    iconBox:{
        position:'absolute',
        right:10,
        top:10
    },
    menu_provider:{
            backgroundColor: "grey",
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
            flexDirection: "column",
          
    },  
    bottomSheetButton: {
        width: '90%',
        height: 50,
        backgroundColor:'#a6524e',
        marginLeft: '2.5%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSheetButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '700',
        fontFamily: 'GothicA1-Bold',
    },
    noDataStyle:{
        fontSize:30,
        textAlign:'center',
        fontWeight:'500',
        marginTop:20,
        color:'grey'
    },
    columnRowIcon:{
        position:'absolute',
        right:20,
        top:10,
        marginBottom:20,
    },
    // edit screen
    edit_screen_background:{
        // backgroundColor:'#1a1a1a',
        backgroundColor:'#C5FF75',
        flex:1
    },
    input:{
        width:'90%',
        marginLeft:'5%',
        color: '#2C2C2C', // Replace 'blue' with your desired color
                fontSize: 25, // Replace 16 with your desired font size
                paddingLeft: 10, // Replace 10 with your desired padding value
                paddingRight: 10, 
    },  
    bottom_bar:{
        position:'absolute',
        bottom:0,
        width:'100%',
        height:40,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:'#1a1a1a',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },  
    createBottomSheet:{
        width:'100%',
        height:'80%',
        backgroundColor:'#1a1a1a',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        position:'absolute',
        bottom:0        
    },
    createBottomSheetHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
        paddingHorizontal:20
    },
    createBottomSheetHeaderText:{
        color:'white',
        fontSize:20,
    },
    imageBox:{
        paddingHorizontal:30,
        paddingVertical:30,
    },  
    imageInNotes:{ 
        width: "100%", 
        height: 200,
        borderRadius:10
    },
    iconInImageNotes:{ 
        position: 'absolute', 
        top: 0, 
        right: 5 
    },
    // stack header
    header_icons:{
        flexDirection:'row'
    },
    // Notification, date picker
    bell_icon:{
        position:'absolute',
        right:20,
        top:20
    },  
    date_picker_style:{
        backgroundColor:'white',
        width:'100%',
        height:250,
        justifyContent:'center',
        alignItems:'center'
    },
    schedule_button:{
        backgroundColor:'#C5FF75',
        paddingHorizontal:25,
        paddingVertical:10,
        borderRadius:10,
        marginTop:10
    },
    schedule_button_text:{
        fontSize:14,
        color:'#1a1a1a',
        fontWeight:'500'
    }
})