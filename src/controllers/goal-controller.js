const pg = require('../database/pg')
module.exports = {
  teamOn : (req, res) => {
    const query = {
      text: `with teams as (
        SELECT team_home as "team" from serieA_ITA
        union all
        SELECT team_away from serieA_ITA
        ) select distinct "team" from teams
          order by "team"`
    }
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })
  },
 
  info : (req, res) => {    
      const query = {
      text :`with teams as (
        SELECT team_home as "team", home_ht as "for_ht", away_ht as "against_ht", home_ft as "for_ft", away_ft as "against_ft" from serieA_ITA
        union all
        SELECT team_away, away_ht, home_ht, away_ft, home_ft from serieA_ITA
        ) select distinct "team",
            count("team") as "amount_game",
            count(case when "for_ft" > "against_ft" then 1 end) as "win",
            count(case when "for_ft" = "against_ft" then 1 end) as "draw",
            count(case when "for_ft" < "against_ft" then 1 end) as "loss",
            round(avg("for_ft"), 2) as "avg_for",
            round(avg("against_ft"), 2) as "avg_against",
            round(avg("for_ft"+"against_ft"), 2) as "avg_total"
          from teams group by "team"`      
    }
    pg.pool.query(query, (err, result) => {
        if(err) {
          throw err
        }     
      res.status(200).json(result.rows)
    })
  },
  
  infoTeam: (req, res) => {
    const query = {
      text
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  }


}