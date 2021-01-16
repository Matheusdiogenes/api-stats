module.exports = {
  get : (req, res) => {
      res.status(200).send('GET todos os times diponíveis')
    
  },
  getTeam : (req, res) => {
    const team = req.params.team
    res.status(200).send('GET time por nome: '+ team)
  }
}