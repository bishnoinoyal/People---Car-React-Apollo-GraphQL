const Title = ({text = "PEOPLE AND THEIR CARS"}) => {
    const styles = getStyles()
    return <h1 style={styles.title}>{text}</h1>
  }
  
  const getStyles = () => ({
    title: {
      fontSize: 20,
      padding: '15px',
      marginBottom: '50px',
      fontWeight: 'normal',
    }
  })
  
  export default Title