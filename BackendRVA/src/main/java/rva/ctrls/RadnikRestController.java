package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Radnik;
import rva.jpa.Sektor;
import rva.reps.RadnikRepository;
import rva.reps.SektorRepository;

@RestController
public class RadnikRestController {
	@Autowired
	private RadnikRepository radnikRepository;

	@Autowired
	private SektorRepository sektorRepository;

	//@Autowired
//	private JdbcTemplate jdbcTemplate;

	@GetMapping(value="radnik")
	public Collection<Radnik> getRadnik() {
		return radnikRepository.findAll();
	}

	@GetMapping(value = "radnik/{id}")
	public ResponseEntity<Radnik> getRadnik(@PathVariable("id") Integer id){
		Radnik radnik = radnikRepository.getOne(id);
		return new ResponseEntity<Radnik>(radnik, HttpStatus.OK);
	}

	@GetMapping(value="sektorZaRadnikaID/{id}")
	public Collection<Radnik> sektorZaRadnika(@PathVariable("id") Integer id){
		Sektor s = sektorRepository.getOne(id);
		return radnikRepository.findBySektor(s);
	}

	@GetMapping(value = "radnikIme/{ime}")
	public Collection<Radnik> getRadnikByIme(@PathVariable ("ime") String ime) {
		return radnikRepository.findByImeContainingIgnoreCase(ime);
	}

	@CrossOrigin
	@DeleteMapping (value = "radnik/{id}")
	public ResponseEntity<Radnik> deleteRadnik(@PathVariable("id") Integer id){
		if(!radnikRepository.existsById(id))
			return new ResponseEntity<Radnik>(HttpStatus.NO_CONTENT);
		radnikRepository.deleteById(id);
		return new ResponseEntity<Radnik>(HttpStatus.OK);
	}

	// insert
  @CrossOrigin
	@PostMapping(value = "radnik")
	public ResponseEntity<Void> insertRadnik(@RequestBody Radnik radnik){
		if(radnikRepository.existsById(radnik.getId()))
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		//stavkaPorudzbine.setRedniBroj(stavkaPorudzbineRepository.nextRBr(stavkaPorudzbine.getPorudzbina().getId()));
		radnikRepository.save(radnik);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@CrossOrigin
	@PutMapping(value = "radnik")
	public ResponseEntity<Void> updateRadnik(@RequestBody Radnik radnik){
		if(!radnikRepository.existsById(radnik.getId()))
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		radnikRepository.save(radnik);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

}
