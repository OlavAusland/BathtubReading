import { StyleSheet } from "react-native"

export const profileStyle = StyleSheet.create({
    header:{
        flex: 1, 
        flexDirection:'row', 
        justifyContent:'center', 
        paddingTop:25,
        backgroundColor:"#A45C40",
        width:'100%',
    },
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    avatar:{
        width:150,
        height:150,
        borderRadius:150,
        overlayColor:'rgba(0, 0, 0, 0)'
    },
    settings:{
        flexDirection:'row',
        overflow:'hidden'
    },
    settingsButton:{
        flex:1,
        overflow:'hidden',
        height:50,
        borderRadius:0,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#000000',
        shadowOffset:{width:0, height:1},
        shadowRadius:1,
        shadowOpacity:0.18,
        elevation:1
    },
    content:{
        overflow:'hidden',
        width:'100%',
        flex: 3,
        alignItems:'center',
        backgroundColor:"#E4B7A0",
    },
    list:{
        overflow:'hidden',
        backgroundColor:'#F6EEE0',
        shadowColor:'black',
        height:10,
        shadowOffset:{height:3, width:1},
        shadowOpacity:1,
        elevation:2,
        borderBottomWidth:1,
        borderWidth:2   
    },
    image:{
        width:150,
        height:150,
        borderRadius:5,
        backgroundColor:'black'
    },
    card:{
        backgroundColor:"#E4B7A0",
        borderRadius:5,
        borderWidth:1
    },
    modal:{
    },
    modalView: {
        margin: 5,
        marginTop:50,
        width:'97.5%',
        height:'65%',
        backgroundColor: "#E4B7A0",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalButton:{
        height:'100%', 
        width:'50%', 
        backgroundColor:'#FFFFFF', 
        justifyContent:'center', 
        alignItems:'center'
      },
      input: {
        flex:1,
        width: '80%',
        color: "#000000",
        fontSize: 18,
        backgroundColor: "#FFFFFF",
        borderRadius:8,
        padding:5,
        marginBottom:20,
        height:30,
        shadowColor: '#171717',
        shadowOffset: {width:0, height:4},
        shadowOpacity: 0.2,
        elevation:2
    },
    checkAvailabilityButton:{
        justifyContent:'center', 
        alignItems:'center',
        height:'60%', 
        borderRadius:10, 
        backgroundColor:'#FFFFFF',
        shadowColor: '#171717',
        shadowOffset: {width:0, height:4},
        shadowOpacity: 0.2,
        elevation:2
    } 
})
