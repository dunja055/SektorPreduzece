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

import rva.jpa.Obrazovanje;
import rva.reps.ObrazovanjeRepository;

@RestController
public class ObrazovanjeRestController {

	@Autowired
	private ObrazovanjeRepository obrazovanjeRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@GetMapping("obrazovanje")
	public Collection<Obrazovanje> getObrazovanje() {
		return obrazovanjeRepository.findAll();
	}

	@GetMapping("obrazovanje/{id}")
	public Obrazovanje getObrazovanje(@PathVariable("id") Integer id) {
		return obrazovanjeRepository.getOne(id);
	}

	@GetMapping("obrazovanjeNaziv/{naziv}")
	public Collection<Obrazovanje> getObrazovanjeByNaziv(@PathVariable ("naziv") String naziv) {
		return obrazovanjeRepository.findByNazivContainingIgnoreCase(naziv);
	}

  @CrossOrigin
	@DeleteMapping("obrazovanje/{id}")
	public ResponseEntity<Obrazovanje> deleteObrazovanje(@PathVariable("id") Integer id) {
		if(!obrazovanjeRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		obrazovanjeRepository.deleteById(id);
		if(id == 21)
			jdbcTemplate.execute(" INSERT INTO \"obrazovanje\"(\"id\", \"naziv\", \"stepen_strucne_spreme\", \"opis\") VALUES (21, 'Naziv test', 'Stepen T', 'Opis test')");
		return new ResponseEntity<>(HttpStatus.OK);
	}


	// insert
  @CrossOrigin
	@PostMapping("obrazovanje")
		public ResponseEntity<Obrazovanje> insertObrazovanje(@RequestBody Obrazovanje obrazovanje) {
			if (!obrazovanjeRepository.existsById(obrazovanje.getId())) {
				obrazovanjeRepository.save(obrazovanje);
				return new ResponseEntity<>(HttpStatus.OK);
			}
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

	@CrossOrigin
	@PutMapping("obrazovanje")
	public ResponseEntity<Obrazovanje> updateObrazovanje(@RequestBody Obrazovanje obrazovanje) {
		if (!obrazovanjeRepository.existsById(obrazovanje.getId()))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		obrazovanjeRepository.save(obrazovanje);
		return new ResponseEntity<>(HttpStatus.OK);
	}


}
