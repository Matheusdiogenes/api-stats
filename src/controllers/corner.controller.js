const pg = require('../database/pg')

module.exports = {  
  corner: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()    
    const result = await pg.pool.query({        
      text: `WITH corners AS (
        SELECT game_date, team_home AS "team", corners_home_ft AS "FOR", corners_away_ft AS "AGAINST"          
        FROM "${table}"
        UNION ALL
        SELECT game_date, team_away, corners_away_ft, corners_home_ft
        FROM "${table}"
        )
        SELECT "team",
          COUNT("team") AS "g",    
          ROUND(AVG("FOR"), 1) AS "for",
          ROUND(AVG("AGAINST"), 1) AS "against",          
          ROUND(AVG("AGAINST" + "FOR"), 1) AS "av."
        FROM corners  
        GROUP BY "team" ORDER BY "team";
      `
    })    
    res.status(200).json(result.rows)
  },
  
  cornerTeam: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()    
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const matche = req.params['matche']
    const result = await pg.pool.query({        
      text: `WITH corners AS (
        SELECT game_date, team_home AS "team", corners_home_ft AS "FOR", corners_away_ft AS "AGAINST"        
        FROM "${table}"
        UNION ALL
        SELECT game_date, team_away, corners_away_ft, corners_home_ft
        FROM "${table}"
        )
        SELECT "team",
          COUNT("team") AS "g",    
          ROUND(AVG("FOR"), 1) AS "for",
          ROUND(AVG("AGAINST"), 1) AS "against",          
          ROUND(AVG("AGAINST" + "FOR"), 1) AS "av."
        FROM corners  
        WHERE LOWER("team") = '${team}' AND 
          game_date IN (SELECT game_date FROM corners WHERE LOWER("team") = '${team}' 
                          ORDER BY game_date DESC LIMIT ${matche})        
        GROUP BY "team" ORDER BY "team";
      `
    })    
    res.status(200).json(result.rows)
  },
  
  perDomain: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const domain = req.params['domain'].toLowerCase()
    const op = {
      "home": ['team_home', 'corners_home_ft', 'corners_away_ft', 'corners_home_ht', 'corners_away_ht'],
      "away": ['team_away','corners_away_ft', 'corners_home_ft',  'corners_away_ht', 'corners_home_ht']
    }
    const result = await pg.pool.query({        
      text: `SELECT ${op[domain][0]} AS "team", 
              COUNT(${op[domain][0]}) AS "g", 
              ROUND(AVG(${op[domain][1]}), 1) AS "for", 
              ROUND(AVG(${op[domain][2]}), 1) AS "against",               
              ROUND(AVG(${op[domain][1]} + ${op[domain][2]} ), 1) AS "av."              
            FROM "${table}"
            GROUP BY ${op[domain][0]} ORDER BY "team"`
    })    
    res.status(200).json(result.rows)    
  },  
  
  perDomainTeam: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const domain = req.params['domain'].toLowerCase()
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const matche = req.params['matche']
    const op = {
      "home": ['team_home', 'corners_home_ft', 'corners_away_ft', 'corners_home_ht', 'corners_away_ht'],
      "away": ['team_away','corners_away_ft', 'corners_home_ft',  'corners_away_ht', 'corners_home_ht']
    }
    const result = await pg.pool.query({        
      text: `SELECT ${op[domain][0]} AS "team", 
              COUNT(${op[domain][0]}) AS "g", 
              ROUND(AVG(${op[domain][1]}), 1) AS "for", 
              ROUND(AVG(${op[domain][2]}), 1) AS "against", 
              ROUND(AVG(${op[domain][1]} + ${op[domain][2]} ), 1) AS "av."              
            FROM "${table}"
            WHERE lower(${op[domain][0]}) = '${team}'
                  AND game_date in (SELECT game_date FROM ${table} 
                                    WHERE LOWER(${op[domain][0]}) = '${team}' 
                                    ORDER BY game_date DESC LIMIT ${matche} )
            GROUP BY ${op[domain][0]}`
    })    
    res.status(200).json(result.rows)
    
  },  

}
