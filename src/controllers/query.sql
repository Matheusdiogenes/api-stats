WITH geral as (
  SELECT game_date, team_home as "team", home_ft as "for", away_ft as "concede", home_ht as "forHT", away_ht as "concedeHT"        
  FROM "seriea_ita" WHERE team_home = 'Napoli'
  union all
  SELECT game_date, team_away, away_ft, home_ft, away_ht, home_ht         
  FROM "seriea_ita" WHERE team_away = 'Napoli'
) 
  SELECT
    count(case when "for" > "concede" then 1 end) as "win",
    count(case when "for" = "concede" then 1 end) as "draw",
    count(case when "for" < "concede" then 1 end) as "loss",
    round(avg("for"), 2) as "avg_for_goal",
    round(avg("concede"), 2) as "avg_concede_goal",
    round(avg("for"+ "concede"), 2) as "avg_total_goal"    
  FROM geral 
  WHERE game_date in (SELECT game_date FROM geral order by game_date desc LIMIT 10 ) 

WITH geral as (
        SELECT team_home as "team", home_ft as "for", away_ft as "concede", home_ht as "forHT", away_ht as "concedeHT"        
        FROM "seriea_ita"
        union all
        SELECT team_away, away_ft, home_ft, away_ht, home_ht         
        FROM "seriea_ita"
      ) 
        SELECT "team", 
          count('team'),
          count(case when "for" > "concede" then 1 end) as "win",
          count(case when "for" = "concede" then 1 end) as "draw",
          count(case when "for" < "concede" then 1 end) as "loss",
          round(avg("for"), 2) as "avg_for_goal",
          round(avg("concede"), 2) as "avg_concede_goal",
          round(avg("for"+ "concede"), 2) as "avg_total_goal"
          
        FROM geral 
        GROUP BY "team" order by "win" desc