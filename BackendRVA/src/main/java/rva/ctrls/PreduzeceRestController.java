package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Preduzece;
import rva.reps.PreduzeceRepository;

@RestController
public class PreduzeceRestController {
	@Autowired
	private PreduzeceRepository preduzeceRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@GetMapping("preduzece")
	public Collection<Preduzece> getPreduzece() {
		return preduzeceRepository.findAll();
	}

	@GetMapping("preduzece/{id}")
	public Preduzece Preduzece(@PathVariable("id") Integer id) {
		return preduzeceRepository.getOne(id);
	}

	@GetMapping("preduzeceNaziv/{naziv}")
	public Collection<Preduzece> getPreduzeceByNaziv(@PathVariable ("naziv") String naziv){
		return preduzeceRepository.findByNazivContainingIgnoreCase(naziv);
	}

  @CrossOrigin
	@DeleteMapping("preduzece/{id}")
	public ResponseEntity<Preduzece> deletePreduzece(@PathVariable ("id") Integer id) {
		if (!preduzeceRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		preduzeceRepository.deleteById(id);
		if(id == 10)
			jdbcTemplate.execute(" INSERT INTO \"preduzece\" (\"id\", \"naziv\", \"pib\", \"sediste\", \"opis\") VALUES (10, 'Naziv Test', 123654789, 'Sediste Test', 'Opis test')");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// insert
  @CrossOrigin
	@PostMapping("preduzece")
		public ResponseEntity<Preduzece> insertPreduzece(@RequestBody Preduzece preduzece) {
			if (!preduzeceRepository.existsById(preduzece.getId())) {
				preduzeceRepository.save(preduzece);
				return new ResponseEntity<>(HttpStatus.OK);
			}
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}


	// update
  @CrossOrigin
		@PutMapping("preduzece")
		public ResponseEntity<Preduzece> updatePreduzece(@RequestBody Preduzece preduzece) {
			if (!preduzeceRepository.existsById(preduzece.getId()))
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			preduzeceRepository.save(preduzece);
			return new ResponseEntity<>(HttpStatus.OK);
		}
}
