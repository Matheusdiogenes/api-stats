const pg = require('../database/pg')

module.exports = {
  team: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()    
    const result = await pg.pool.query({        
      text: `WITH teams AS (
        SELECT team_home AS "team" FROM "${table}"
        UNION ALL
        SELECT team_away FROM "${table}"
        )
        SELECT "team" FROM teams GROUP BY "team" ORDER BY "team";
      `
    })    
    res.status(200).json(result.rows)
  },

  goal: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()    
    const result = await pg.pool.query({        
      text: `WITH goals AS (
        SELECT game_date, team_home AS "TEAM", home_ft AS "ATTACK", away_ft AS "DEFENSE", home_ht AS "ATTACK HT", away_ht AS "DEFENSE HT"
        FROM "${table}"
        UNION ALL
        SELECT game_date, team_away, away_ft, home_ft, away_ht, home_ht
        FROM "${table}"
        )
        SELECT "TEAM",
          COUNT("TEAM") AS "MATCHE(S)",
          COUNT(CASE WHEN "ATTACK" > "DEFENSE" THEN 1 END) AS "WIN", 
          COUNT(CASE WHEN "ATTACK" = "DEFENSE" THEN 1 END) AS "DRAW", 
          COUNT(CASE WHEN "ATTACK" < "DEFENSE" THEN 1 END) AS "LOSS", 
          SUM("ATTACK") AS "ATTACK",
          SUM("DEFENSE") AS "DEFENSE",
          ROUND(AVG("ATTACK"), 1) AS "GOALS SCORED",
          ROUND(AVG("DEFENSE"), 1) AS "GOALS AGAINST",
          COUNT(CASE WHEN ("ATTACK" + "DEFENSE") > 2 THEN 1 END) AS "OVER 2.5",
          COUNT(CASE WHEN ("ATTACK" + "DEFENSE") < 3 THEN 1 END) AS "UNDER 2.5",
          COUNT(CASE WHEN ("ATTACK HT" + "DEFENSE HT") > 0 THEN 1 END) AS "OVER 0.5 HALFTIME",
          COUNT(CASE WHEN "ATTACK" > 0 and "DEFENSE" > 0 THEN 1 END) AS "BOTH TEAMS TO SCORE"
        FROM goals  
        GROUP BY "TEAM" ORDER BY "TEAM";
      `
    })    
    res.status(200).json(result.rows)
  },

  goalTeam: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const matche = req.params['matche']
    const result = await pg.pool.query({        
      text: `WITH goals AS (
        SELECT game_date, team_home AS "TEAM", home_ft AS "ATTACK", away_ft AS "DEFENSE", home_ht AS "ATTACK HT", away_ht AS "DEFENSE HT"
        FROM "${table}"
        UNION ALL
        SELECT game_date, team_away, away_ft, home_ft, away_ht, home_ht
        FROM "${table}"
      )
        SELECT "TEAM",
          COUNT("TEAM") AS "MATCHE(S)",
          COUNT(CASE WHEN "ATTACK" > "DEFENSE" THEN 1 END) AS "WIN", 
          COUNT(CASE WHEN "ATTACK" = "DEFENSE" THEN 1 END) AS "DRAW", 
          COUNT(CASE WHEN "ATTACK" < "DEFENSE" THEN 1 END) AS "LOSS", 
          SUM("ATTACK") AS "ATTACK",
          SUM("DEFENSE") AS "DEFENSE",
          ROUND(AVG("ATTACK"), 1) AS "GOALS SCORED",
          ROUND(AVG("DEFENSE"), 1) AS "GOALS AGAINST",
          COUNT(CASE WHEN ("ATTACK" + "DEFENSE") > 2 THEN 1 END) AS "OVER 2.5",
          COUNT(CASE WHEN ("ATTACK" + "DEFENSE") < 3 THEN 1 END) AS "UNDER 2.5",
          COUNT(CASE WHEN ("ATTACK HT" + "DEFENSE HT") > 0 THEN 1 END) AS "OVER 0.5 HALFTIME",
          COUNT(CASE WHEN "ATTACK" > 0 and "DEFENSE" > 0 THEN 1 END) AS "BOTH TEAMS TO SCORE"
        FROM goals
        WHERE LOWER("TEAM") = '${team}' 
          AND game_date IN (SELECT game_date FROM goals WHERE LOWER("TEAM") = '${team}' ORDER BY game_date DESC LIMIT ${matche})
        GROUP BY "TEAM";      
      `
    })    
    res.status(200).json(result.rows)
  },

}