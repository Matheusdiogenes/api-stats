CREATE TABLE IF NOT EXISTS ita_sa(
  game_date DATE NOT NULL,
  team_home VARCHAR(40) NOT NULL,
  team_away VARCHAR(40) NOT NULL,    
  home_ft INT,
  away_ft INT,
  home_ht INT,
  away_ht INT,
  corners_home_ht INT,
  corners_away_ht INT,
  corners_home_ft INT,
  corners_away_ft INT,
  UNIQUE(game_date, team_home, team_away)
);