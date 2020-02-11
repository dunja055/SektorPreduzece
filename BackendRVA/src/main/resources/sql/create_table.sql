DROP TABLE IF EXISTS obrazovanje CASCADE;
DROP TABLE IF EXISTS preduzece CASCADE;
DROP TABLE IF EXISTS sektor CASCADE;
DROP TABLE IF EXISTS radnik CASCADE;

DROP SEQUENCE IF EXISTS seq_obrazovanje;
DROP SEQUENCE IF EXISTS seq_preduzece;
DROP SEQUENCE IF EXISTS seq_sektor;
DROP SEQUENCE IF EXISTS seq_radnik;


CREATE TABLE obrazovanje(
	id INTEGER not null,
	naziv VARCHAR(100) not null,
	stepen_strucne_spreme VARCHAR(10) not null,
	opis VARCHAR(500) not null
);

CREATE TABLE preduzece(
	id INTEGER not null,
	naziv VARCHAR(100) not null,
	pib INTEGER not null,
	sediste VARCHAR(100) not null,
	opis VARCHAR(500) not null
);

CREATE TABLE sektor(
	id INTEGER not null,
	naziv VARCHAR(100) not null,
	oznaka VARCHAR(10) not null,
	preduzece INTEGER not null
);

CREATE TABLE radnik(
	id INTEGER not null,
	ime VARCHAR(50) not null,
	prezime VARCHAR(50) not null,
	broj_lk INTEGER not null,
	obrazovanje INTEGER not null,
	sektor INTEGER not null
);

ALTER TABLE obrazovanje ADD CONSTRAINT pk_obrazovanje PRIMARY KEY(id);
ALTER TABLE preduzece ADD CONSTRAINT pk_preduzece PRIMARY KEY(id);
ALTER TABLE sektor ADD CONSTRAINT pk_sektor PRIMARY KEY(id);
ALTER TABLE radnik ADD CONSTRAINT pk_radnik PRIMARY KEY(id);

ALTER TABLE sektor ADD CONSTRAINT fk_sektor_preduzece FOREIGN KEY(preduzece) REFERENCES preduzece(id);
ALTER TABLE radnik ADD CONSTRAINT fk_radnik_obrazovanje FOREIGN KEY(obrazovanje) REFERENCES obrazovanje(id);
ALTER TABLE radnik ADD CONSTRAINT fk_radnik_sektor FOREIGN KEY(sektor) REFERENCES sektor(id);

CREATE INDEX idxkf_sektor_preduzece ON sektor(preduzece);
CREATE INDEX idxfk_radnik_obrazovanje ON radnik(obrazovanje);
CREATE INDEX idxfk_radnik_sektor ON radnik(sektor);

CREATE SEQUENCE seq_obrazovanje increment 1;
CREATE SEQUENCE seq_preduzece increment 1;
CREATE SEQUENCE seq_sektor increment 1;
CREATE SEQUENCE seq_radnik increment 1;
