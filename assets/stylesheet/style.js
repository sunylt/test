

module.exports = {
  wrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    height: 55,
    backgroundColor: '#39b981'
  },
  content: {
    flex: 1
  },
  title: {
    fontSize:50,
    textAlign: 'center',
    opacity: .5,
    marginTop: 40,
    marginBottom: 10
  },
  inputBox: {
      height: 40,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#f1f1f1',
      marginLeft: 15,
      marginRight:15,
      marginBottom: 20,
      paddingLeft: 4,
      fontSize: 14
  },
  listBox: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    height: 240
  },
  rowItem: {
    borderColor: '#ededed',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5
  },
  ft:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 80,
    paddingRight: 80
  },
  normal: {borderWidth: 1, borderColor: '#ffffff', padding: 5, borderRadius: 4, fontSize: 12},
  actived: {borderWidth: 1, borderColor: '#42b983', padding: 5, borderRadius: 4, color: '#42b983', fontSize:12},
  footer: {
    height: 40
  }
}
