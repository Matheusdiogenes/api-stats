module.exports = {
  //GET
  teamall : (req, res) => {
      res.status(200).send('GET todos os times diponíveis')    
  },
  //GET
  teamid : (req, res) => {
    res.status(200).send('GET time ID')    
  }  
}