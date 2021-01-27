const pg = require('../database/pg')
module.exports = {
  //GET
  teamAll : (req, res) => {
    pg.pool.query('SELECT team_home FROM seriea_ita', (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })
  },
  //GET
  teamid : (req, res) => {
    res.status(200).send('GET time ID')    
  }  
}