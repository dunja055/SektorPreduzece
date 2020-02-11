insert into obrazovanje (id,naziv,stepen_strucne_spreme,opis)
	values(1,'Master prava','VII-1b','Master mašinstva, prava,tehnologije, itd.');
insert into obrazovanje (id,naziv,stepen_strucne_spreme,opis)
	values(2,'Diplomirani inženjer saobraćaja','VII-1a','Osnovne četvorogodišnje akademske studije dipl.inž, dipl.prav., itd');
insert into obrazovanje (id,naziv,stepen_strucne_spreme,opis)
	values(3,'Diplomirani inženjer zaštite na radu','VII-1a','Osnovne četvorogodišnje akademske studije dipl.inž, dipl.prav., itd');
	
insert into preduzece (id,naziv,pib,sediste,opis)
	values(1,'Advokatska kancelarija Ćehović i saradnici',256478914,'Beograd','Advokatska kancelarija Ćehović nastoji da pruži pravne usluge na najefikasniji način. Advokatska kancelarija ima članove sa velikim iskustvom u svojoj oblasti rada, sa dugo radnog staža.');
insert into preduzece (id,naziv,pib,sediste,opis)
	values(2,'Auto škola FLOYD',523674891,'Novi Sad','Auto škola „FLOYD“ bavi se obukom kandidata za vozač „A1“, „A“, „B“, „C“ i „CE“ kategorije, kao i doobukom vozača, koji već poseduju vozačku dozvolu.');
insert into preduzece (id,naziv,pib,sediste,opis)
	values(3,'Inex plus d.o.o',856479321,'Beograd','Naša osnovna delatnost je pružanje usluga iz oblasti bezbednosti i zaštite. Naše sedište je u Beogradu, u Humskoj 3c, a imamo i regionalne centre u Novom Sadu, Šapcu, Kraljevu, Požarevcu i Nišu, kojima pokrivamo celu teritoriju Republike Srbije.');

insert into sektor (id,naziv,oznaka,preduzece)
	values(1,'Sektor zastupanja i odbrane','A',1);
insert into sektor (id,naziv,oznaka,preduzece)
	values(2,'Sektor za instruktore','B',2);
insert into sektor (id,naziv,oznaka,preduzece)
	values(3,'Sektor za tehničku zaštitu','A',3);
	

insert into radnik (id,ime,prezime,broj_lk, obrazovanje, sektor)
	values(1,'Jovan','Jovanovic',187596,1,1);
insert into radnik (id,ime,prezime,broj_lk, obrazovanje, sektor)
	values(2,'Marko','Markovic',254789,2,2);
insert into radnik (id,ime,prezime,broj_lk, obrazovanje, sektor)
	values(3,'Sara','Saric',347895,3,3);
