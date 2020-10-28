import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    buttoncss: {
        height: 40, 
        marginLeft: 30, 
        marginRight: 30, 
        marginTop: 10, 
        height: 50,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
    },
    buttonimage: {
        height: 47,
        borderRadius: 5,
        backgroundColor: 'black',
        width: '85%',
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 10,
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#FFC700',
        width: '85%',
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    formContainer: {
        flexDirection: 'column',
        height: 80,
        marginTop: 20,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})
