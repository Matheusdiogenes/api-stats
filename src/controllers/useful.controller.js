const pg = require('../database/pg')

module.exports = {
  homeAway: async (req, res) => {
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const domain = req.params['domain'].toLowerCase()
    const matche = req.params['matche']
    const op = {
      "home": ['team_home', 'team_away', 'home_ft', 'away_ft', 'home_ht', 'away_ht', 'corners_home_ft', 'corners_away_ft','corners_home_ht', 'corners_away_ht'],
      "away": ['team_away', 'team_home', 'away_ft', 'home_ft', 'away_ht', 'home_ht', 'corners_away_ft', 'corners_home_ft','corners_away_ht', 'corners_home_ht']
    }
    const result = await pg.pool.query({        
      text: `SELECT ${op[domain][0]} AS "t1", 
              ${op[domain][1]} AS "t2",
              ${op[domain][2]} AS "t1ft", 
              ${op[domain][3]} AS "t2ft", 
              ${op[domain][4]} AS "t1ht", 
              ${op[domain][5]} AS "t2ht", 
              ${op[domain][6]} AS "ct1ft", 
              ${op[domain][7]} AS "ct2ft", 
              ${op[domain][8]} AS "ct1ht", 
              ${op[domain][9]} AS "ct2ht"
            FROM "${table}"
            WHERE LOWER(${op[domain][0]}) = LOWER('${team}') ORDER BY game_date DESC LIMIT ${matche}`
    })    
    res.status(200).json(result.rows)
  },

  all: async (req, res) => {
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()    
    const result = await pg.pool.query({        
      text: `SELECT team_home AS "t1", 
              team_away AS "t2", 
              home_ft AS "t1ft", 
              away_ft AS "t2ft", 
              home_ht AS "t1ht", 
              away_ht AS "t2ht", 
              corners_home_ft AS "ct1ft", 
              corners_away_ft AS "ct2ft", 
              corners_home_ht AS "ct1ht", 
              corners_away_ht AS "ct2ht"
            FROM "${table}"
            WHERE LOWER(team_home) = LOWER('${team}') OR team_away = LOWER('${team}') 
            ORDER BY game_date DESC LIMIT 10`
    })    
    res.status(200).json(result.rows)
  },

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

}
