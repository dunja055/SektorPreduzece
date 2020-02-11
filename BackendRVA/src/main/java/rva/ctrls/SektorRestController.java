package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

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

import rva.jpa.Sektor;
import rva.reps.SektorRepository;

@RestController
public class SektorRestController {

	@Autowired
	private SektorRepository sektorRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@GetMapping("sektor")
	public Collection<Sektor> getSektor() {
		return sektorRepository.findAll();
	}

	@GetMapping("sektor/{id}")
	public Sektor getSektor(@PathVariable("id") Integer id) {
		return sektorRepository.getOne(id);
	}

	@GetMapping("sektorNaziv/{naziv}")
	public Collection<Sektor> getSektorByNaziv(@PathVariable ("naziv") String naziv) {
		return sektorRepository.findByNazivContainingIgnoreCase(naziv);
	}

  @CrossOrigin
	@Transactional
	@DeleteMapping("sektor/{id}")
	public ResponseEntity<Sektor> deleteSektor(@PathVariable ("id") Integer id) {
		if (!sektorRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		jdbcTemplate.execute("delete from radnik where sektor = "+id);
		sektorRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// insert
  @CrossOrigin
		@PostMapping("sektor")
			public ResponseEntity<Sektor> insertSektor(@RequestBody Sektor sektor) {
				if (!sektorRepository.existsById(sektor.getId())) {
					sektorRepository.save(sektor);
					return new ResponseEntity<>(HttpStatus.OK);
				}
				return new ResponseEntity<>(HttpStatus.CONFLICT);
			}


		// update
    @CrossOrigin
			@PutMapping("sektor")
			public ResponseEntity<Sektor> updateSektor(@RequestBody Sektor sektor) {
				if (!sektorRepository.existsById(sektor.getId()))
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				sektorRepository.save(sektor);
				return new ResponseEntity<>(HttpStatus.OK);
			}
}
