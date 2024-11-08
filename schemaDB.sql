DROP TABLE IF EXISTS "Votes";
DROP TABLE IF EXISTS "Options";
DROP TABLE IF EXISTS "Categories";

CREATE TABLE "Categories" (
    category_id TEXT PRIMARY KEY,
    category_name TEXT NOT NULL
);

CREATE TABLE "Options" (
    option_id TEXT PRIMARY KEY,
    category_id TEXT,
    option_name TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE "Votes" (
    vote_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    category_id TEXT,
    option_id TEXT,
    rank INTEGER CHECK (rank >= 1 AND rank <= 4),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    FOREIGN KEY (option_id) REFERENCES Options(option_id)
);

INSERT INTO Categories (category_id, category_name) VALUES ("1", "CLIP DEL AÑO");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("1-1", "1", "auronplay");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("1-2", "1", "CrystalMolly");        
INSERT INTO Options (option_id, category_id, option_name) VALUES ("1-3", "1", "Gemita");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("1-4", "1", "Guanyar");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("1-5", "1", "IlloJuan y elBokeron");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("1-6", "1", "Lacuevadepaink");      
INSERT INTO Options (option_id, category_id, option_name) VALUES ("1-7", "1", "PipePunk");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("1-8", "1", "Repta Live");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("1-9", "1", "Rubius");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("1-10", "1", "xCry");
INSERT INTO Categories (category_id, category_name) VALUES ("2", "ENFADO DEL AÑO");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("2-1", "2", "agustin51");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("2-2", "2", "DjMaRiiO");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("2-3", "2", "elxokas");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("2-4", "2", "Ibai y Messi");        
INSERT INTO Options (option_id, category_id, option_name) VALUES ("2-5", "2", "Nissaxter");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("2-6", "2", "PipePunk");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("2-7", "2", "rickyedit");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("2-8", "2", "rivers_gg");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("2-9", "2", "sezarbluelive");       
INSERT INTO Options (option_id, category_id, option_name) VALUES ("2-10", "2", "WestCOL");
INSERT INTO Categories (category_id, category_name) VALUES ("3", "STREAMER IRL DEL AÑO");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("3-1", "3", "Alanalarana");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("3-2", "3", "ArrozyDesgracias");    
INSERT INTO Options (option_id, category_id, option_name) VALUES ("3-3", "3", "Brunenger");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("3-4", "3", "Grenheir");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("3-5", "3", "JapanJordi");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("3-6", "3", "Kidi");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("3-7", "3", "llunaclark");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("3-8", "3", "MarioTaxi");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("3-9", "3", "MarioTQ");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("3-10", "3", "viviendoenlacalle");  
INSERT INTO Categories (category_id, category_name) VALUES ("4", "MEJOR VARIETY STREAMER");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("4-1", "4", "aldo_geo");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("4-2", "4", "alexelcapo");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("4-3", "4", "Carola");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("4-4", "4", "elded");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("4-5", "4", "ElMariana");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("4-6", "4", "IlloJuan");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("4-7", "4", "knekro");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("4-8", "4", "rivers_gg");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("4-9", "4", "Roier");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("4-10", "4", "Rubius");
INSERT INTO Categories (category_id, category_name) VALUES ("5", "MEJOR COBERTURA INFORMATIVA");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("5-1", "5", "davooxeneize");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("5-2", "5", "el_yuste");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("5-3", "5", "Flavio Azzaro");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("5-4", "5", "gerardromero");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("5-5", "5", "Julio Astillero");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("5-6", "5", "Kilometro Cero");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("5-7", "5", "La Secta Deportiva");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("5-8", "5", "LACOBRAAA");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("5-9", "5", "rubenmartinweb");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("5-10", "5", "ZonaFUT");
INSERT INTO Categories (category_id, category_name) VALUES ("6", "ROLEPLAYER DEL AÑO");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("6-1", "6", "AgenteMaxo");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("6-2", "6", "DessT3");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("6-3", "6", "epidemic77");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("6-4", "6", "Eskimalito");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("6-5", "6", "FolagorLives");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("6-6", "6", "kenaivsouza");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("6-7", "6", "Nexxuz");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("6-8", "6", "RDjavi");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("6-9", "6", "Roier");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("6-10", "6", "TomateKing");
INSERT INTO Categories (category_id, category_name) VALUES ("7", "STREAMER PROMESA");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("7-1", "7", "angelogam3r");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("7-2", "7", "chaleselcrackk");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("7-3", "7", "futbolcontemo7");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("7-4", "7", "iaguirregabiria");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("7-5", "7", "KotaroHayama_");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("7-6", "7", "Mechaaax");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("7-7", "7", "paaulacg_");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("7-8", "7", "ReyDeLaCity");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("7-9", "7", "SoyBB7");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("7-10", "7", "soycande30");
INSERT INTO Categories (category_id, category_name) VALUES ("8", "MEJOR MINISERIE DE CONTENIDO");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("8-1", "8", "7 Dias Para Palmarla");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("8-2", "8", "Backrooms");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("8-3", "8", "BELLUM");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("8-4", "8", "El Cielo");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("8-5", "8", "El Hoyo en Minecraft");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("8-6", "8", "Escondite en Francia");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("8-7", "8", "Garry's Deluxe");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("8-8", "8", "Hormigeo 2");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("8-9", "8", "PermadeaZ 2");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("8-10", "8", "Squid Craft Games 2");
INSERT INTO Categories (category_id, category_name) VALUES ("9", "EVENTO DEL AÑO");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("9-1", "9", "24 horas en el Obelisco");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("9-2", "9", "Coscu Army Awards 2023");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("9-3", "9", "Dogfight Wild Tournament");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("9-4", "9", "El ultimo en levantar las manos");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("9-5", "9", "Final Four desde el Spotify Camp Nou");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("9-6", "9", "King of the Ring");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("9-7", "9", "La Velada del Año III");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("9-8", "9", "Parense de manos");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("9-9", "9", "Partidazo de Youtubers 4");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("9-10", "9", "Stream Fighters 2");
INSERT INTO Categories (category_id, category_name) VALUES ("10", "STREAMER REVELACION");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("10-1", "10", "adricontreras4");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("10-2", "10", "davooxeneize");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("10-3", "10", "nilojeda");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("10-4", "10", "Poloteli");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("10-5", "10", "RDjavi");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("10-6", "10", "rene8808");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("10-7", "10", "Roier");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("10-8", "10", "Spursito");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("10-9", "10", "WestCOL");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("10-10", "10", "xCry");
INSERT INTO Categories (category_id, category_name) VALUES ("11", "MEJOR SERIE DE CONTENIDO");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("11-1", "11", "DEDsafio ARK");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("11-2", "11", "El Dios de Todo");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("11-3", "11", "Exodo");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("11-4", "11", "Experimento Hardcore");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("11-5", "11", "Minecraft Extremo");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("11-6", "11", "Mundial F1 Online 2");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("11-7", "11", "Pokemon Twitch Cup 3");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("11-8", "11", "Proyecto176");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("11-9", "11", "Reinos Enfrentados 3");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("11-10", "11", "Timeland");
INSERT INTO Categories (category_id, category_name) VALUES ("12", "STREAMER DEL AÑO");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("12-1", "12", "DjMaRiiO");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("12-2", "12", "ElMariana");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("12-3", "12", "ElSpreen");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("12-4", "12", "elxokas");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("12-5", "12", "Ibai");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("12-6", "12", "IlloJuan");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("12-7", "12", "rivers_gg");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("12-8", "12", "Rubius");
INSERT INTO Options (option_id, category_id, option_name) VALUES ("12-9", "12", "WestCOL");

DROP TRIGGER IF EXISTS limit_votes_per_category;

CREATE TRIGGER limit_votes_per_category
    BEFORE INSERT ON Votes
    WHEN (
        SELECT COUNT(*)
        FROM Votes
        WHERE category_id = NEW.category_id
        AND username = NEW.username
    ) >= 4
    BEGIN
        SELECT RAISE(ABORT, 'You can only vote 4 times per category');
END;
DROP TRIGGER IF EXISTS limit_votes_per_same_option_per_category;
CREATE TRIGGER limit_votes_per_same_option_per_category
    BEFORE INSERT ON Votes
    WHEN (
        SELECT COUNT(*)
        FROM Votes
        WHERE category_id = NEW.category_id
            AND username = NEW.username
            AND option_id = NEW.option_id
    ) >= 1
    BEGIN
        SELECT RAISE(ABORT, 'You cannot vote twice for the same option');
END;
DROP TRIGGER IF EXISTS limit_rank_vote_per_category;
CREATE TRIGGER limit_rank_vote_per_category
    BEFORE INSERT ON Votes
    WHEN (
        SELECT COUNT(*)
        FROM Votes
        WHERE category_id = NEW.category_id
            AND username = NEW.username
            AND rank = NEW.rank
    ) >= 1
    BEGIN
        SELECT RAISE(ABORT, 'You cannot vote with the same ranking more then once');
END;