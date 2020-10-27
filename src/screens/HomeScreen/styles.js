import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 10,
    },
    formContainer: {
        flexDirection: 'column',
        height: 80,
        marginTop: 20,
        // marginVertical: 20,
        marginBottom: 20,
        flex: 1,
        // paddingTop: 10,
        // paddingBottom: 10,
        // paddingLeft: 30,
        // paddingRight: 30,
    },
    formContainer2: {
        flexDirection: 'column',
        backgroundColor: 'white',
        height: 180,
        marginTop: 5,
        marginVertical: 20,
        marginBottom: 20,
        flex: 1,
        // paddingTop: 10,
        // paddingBottom: 20,
        // paddingLeft: 30,
        // paddingRight: 30,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 35,
        borderRadius: 5,
        backgroundColor: '#03FF3B',
        width: 120,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: "bold",
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,

        color: '#333333'
    },
    entityButton: {
        fontSize: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginRight: 20,
    }
})
